#!/usr/bin/env python3
"""
Extract all Ferrari car variation data from saved Figma metadata.
- Parses every variation frame (name, year, images, production count, description)
- Exports all image nodes via Figma REST API
- Saves structured JSON to src/data/figma-cars.json
- Downloads all images to public/cars/figma/
"""

import json, re, os, sys, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from xml.etree import ElementTree as ET

# ── Config ────────────────────────────────────────────────────────────────────
METADATA_FILE = (
    "/Users/alborzheydaryan/.claude/projects/"
    "-Users-alborzheydaryan-Desktop-MyApps-Ferrari/"
    "9f4afb6b-15ce-4a81-8379-cee5023706ad/tool-results/"
    "mcp-figma-get_metadata-1779925229504.txt"
)
FILE_KEY   = "PCNZSGcbMRG6a18MnjEaK4"
TOKEN      = os.environ.get("FIGMA_TOKEN", "")
OUT_JSON   = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/src/data/figma-cars.json"
OUT_IMAGES = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/public/cars/figma"
BATCH_SIZE = 50
DL_WORKERS = 12


# ── Helpers ───────────────────────────────────────────────────────────────────
def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[–—]", "-", text)
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text.strip())
    return re.sub(r"-+", "-", text)


def figma_export_urls(node_ids: list) -> dict:
    ids_param = ",".join(node_ids)
    url = f"https://api.figma.com/v1/images/{FILE_KEY}?ids={ids_param}&format=png&scale=2"
    req = urllib.request.Request(url, headers={"X-Figma-Token": TOKEN})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.loads(r.read())
            if data.get("err"):
                print(f"  API error: {data['err']}")
                return {}
            return data.get("images", {})
        except Exception as e:
            print(f"  Batch attempt {attempt+1} failed: {e}")
            time.sleep(2 ** attempt)
    return {}


def download_image(url: str, dest: str, retries=3) -> bool:
    for attempt in range(retries):
        try:
            urllib.request.urlretrieve(url, dest)
            return True
        except Exception as e:
            if attempt == retries - 1:
                print(f"  FAILED: {os.path.basename(dest)} — {e}")
            time.sleep(1)
    return False


# ── Step 1: Parse Figma XML ───────────────────────────────────────────────────
print("Loading Figma metadata…")
with open(METADATA_FILE) as f:
    raw = json.load(f)
xml_text = raw[0]["text"]

print("Parsing XML…")
try:
    root = ET.fromstring(f"<root>{xml_text}</root>")
except ET.ParseError as e:
    print(f"XML parse error: {e}")
    sys.exit(1)

YEAR_RE       = re.compile(r"\b\d{4}\b")
IMAGE_NAME_RE = re.compile(r"^image(\s+\d+)?$", re.IGNORECASE)

variations = []
seen_slugs = set()


def parse_frame(frame_el):
    title_text  = None
    image_nodes = []
    production  = None
    description = None
    tag_labels  = []

    for child in frame_el:
        tag  = child.tag
        name = child.get("name", "")
        nid  = child.get("id", "")

        if tag == "text":
            if YEAR_RE.search(name) and len(name) < 80 and title_text is None:
                title_text = name
            elif len(name) > 100:
                description = name  # keep the last/longest

        elif tag == "rounded-rectangle":
            n_lower = name.lower().strip()
            if n_lower != "image 4" and IMAGE_NAME_RE.match(n_lower):
                image_nodes.append(nid)

        elif tag == "frame":
            for sub in child:
                sub_name = sub.get("name", "")
                if sub.tag == "text":
                    if sub_name.isdigit():
                        production = sub_name
                    elif len(sub_name) > 3 and not sub_name.isdigit():
                        tag_labels.append(sub_name)

    if title_text and image_nodes:
        slug = slugify(title_text)
        if slug not in seen_slugs:
            seen_slugs.add(slug)
            variations.append({
                "name":             title_text,
                "slug":             slug,
                "image_nodes":      image_nodes,
                "production_count": production,
                "tags":             tag_labels,
                "description":      description or "",
            })


print("Walking frames…")
for el in root.iter("frame"):
    parse_frame(el)

print(f"Found {len(variations)} unique car variations")


# ── Step 2: Collect all image node IDs ───────────────────────────────────────
all_node_ids = []
seen_nids = set()
for v in variations:
    for nid in v["image_nodes"]:
        if nid not in seen_nids:
            seen_nids.add(nid)
            all_node_ids.append(nid)

print(f"Total unique image nodes: {len(all_node_ids)}")


# ── Step 3: Fetch download URLs ───────────────────────────────────────────────
print(f"\nFetching export URLs in batches of {BATCH_SIZE}…")
node_urls: dict = {}

total_batches = (len(all_node_ids) + BATCH_SIZE - 1) // BATCH_SIZE
for i in range(0, len(all_node_ids), BATCH_SIZE):
    batch = all_node_ids[i : i + BATCH_SIZE]
    bn = i // BATCH_SIZE + 1
    print(f"  Batch {bn}/{total_batches} ({len(batch)} nodes)…", end=" ", flush=True)
    urls = figma_export_urls(batch)
    node_urls.update(urls)
    print(f"got {len(urls)} URLs")
    time.sleep(0.4)

print(f"Total URLs received: {len(node_urls)}")


# ── Step 4: Build download list ───────────────────────────────────────────────
downloads = []  # (url, dest_path, filename)
for v in variations:
    files = []
    for ii, nid in enumerate(v["image_nodes"]):
        url = node_urls.get(nid)
        if url:
            filename = f"{v['slug']}-{ii+1}.jpg"
            dest = os.path.join(OUT_IMAGES, filename)
            downloads.append((url, dest, filename))
            files.append(filename)
        else:
            files.append(None)
    v["image_files"] = [f for f in files if f]


# ── Step 5: Download concurrently ────────────────────────────────────────────
print(f"\nDownloading {len(downloads)} images ({DL_WORKERS} workers)…")
os.makedirs(OUT_IMAGES, exist_ok=True)

succeeded = failed = 0

def dl_task(args):
    url, dest, _ = args
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return True
    return download_image(url, dest)

with ThreadPoolExecutor(max_workers=DL_WORKERS) as pool:
    futs = {pool.submit(dl_task, args): args for args in downloads}
    for i, fut in enumerate(as_completed(futs), 1):
        if fut.result():
            succeeded += 1
        else:
            failed += 1
        if i % 100 == 0 or i == len(downloads):
            print(f"  {i}/{len(downloads)}  ✓{succeeded}  ✗{failed}")

print(f"\nDownloads: {succeeded} OK, {failed} failed")


# ── Step 6: PNG→JPEG via sips ─────────────────────────────────────────────────
print("Converting PNG→JPEG…")
converted = 0
for fname in os.listdir(OUT_IMAGES):
    if fname.endswith(".png"):
        src  = os.path.join(OUT_IMAGES, fname)
        dest = src.replace(".png", ".jpg")
        if os.system(f'sips -s format jpeg "{src}" --out "{dest}" -s formatOptions 85 >/dev/null 2>&1') == 0:
            os.remove(src)
            converted += 1
print(f"Converted {converted} PNGs")


# ── Step 7: Save JSON ─────────────────────────────────────────────────────────
output = [
    {
        "name":             v["name"],
        "slug":             v["slug"],
        "image_files":      v.get("image_files", []),
        "production_count": v["production_count"],
        "tags":             v["tags"],
        "description":      v["description"],
    }
    for v in variations
]

with open(OUT_JSON, "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"\n✓ {len(output)} variations → {OUT_JSON}")
print(f"✓ Images → {OUT_IMAGES}/")
print("\nSample:")
for v in output[:5]:
    print(f"  {v['name']}  imgs={len(v['image_files'])}  desc={len(v['description'])}c  prod={v['production_count']}")
