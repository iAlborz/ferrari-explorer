#!/usr/bin/env python3
"""Resume downloading missing Figma images, respecting rate limits."""

import json, os, time, subprocess, urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

FIGMA_FILE_KEY = "PCNZSGcbMRG6a18MnjEaK4"
FIGMA_TOKEN    = os.environ.get("FIGMA_TOKEN", "")
OUT_JSON       = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/src/data/figma-cars.json"
IMG_DIR        = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/public/cars/figma"
BATCH_SIZE     = 50
CONCURRENCY    = 10
MAX_RETRIES    = 3
BATCH_DELAY    = 35   # seconds between Figma API calls

with open(OUT_JSON) as f:
    cars = json.load(f)

# Find missing images
missing = []   # (node_id, slug, idx)
for car in cars:
    for idx, nid in enumerate(car['image_nodes'], 1):
        fname_jpg = f"{car['slug']}-{idx}.jpg"
        fname_png = f"{car['slug']}-{idx}.png"
        if not os.path.exists(os.path.join(IMG_DIR, fname_jpg)) and \
           not os.path.exists(os.path.join(IMG_DIR, fname_png)):
            missing.append((nid, car['slug'], idx))

print(f"Missing images: {len(missing)}")
if not missing:
    print("Nothing to do.")
    exit(0)

node_to_file = {nid: f"{slug}-{idx}.png" for nid, slug, idx in missing}
all_nodes = list(node_to_file.keys())
batches = [all_nodes[i:i+BATCH_SIZE] for i in range(0, len(all_nodes), BATCH_SIZE)]
estimated_minutes = (len(batches) - 1) * BATCH_DELAY / 60
print(f"Fetching URLs in {len(batches)} batch(es), ETA ~{estimated_minutes:.1f} min for API calls…\n")

def fetch_image_urls(node_batch):
    ids_str = ','.join(node_batch)
    url = (f"https://api.figma.com/v1/images/{FIGMA_FILE_KEY}"
           f"?ids={ids_str}&format=png&scale=2")
    req = urllib.request.Request(url, headers={'X-Figma-Token': FIGMA_TOKEN})
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read())
    return data.get('images', {})

node_url_map = {}
for i, batch in enumerate(batches, 1):
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            urls = fetch_image_urls(batch)
            node_url_map.update(urls)
            print(f"  Batch {i}/{len(batches)}: got {len(urls)} URLs")
            if i < len(batches):
                print(f"  Waiting {BATCH_DELAY}s…")
                time.sleep(BATCH_DELAY)
            break
        except Exception as e:
            print(f"  Batch {i} attempt {attempt} failed: {e}")
            wait = 60 * attempt
            if attempt < MAX_RETRIES:
                print(f"  Waiting {wait}s…")
                time.sleep(wait)
            else:
                print(f"  Batch {i} permanently failed — skipping")

print(f"\nResolved {len(node_url_map)} URLs. Downloading…")

def download_image(args):
    nid, fname = args
    url = node_url_map.get(nid)
    if not url:
        return fname, False, "no URL"
    dest = os.path.join(IMG_DIR, fname)
    if os.path.exists(dest):
        return fname, True, "already exists"
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Ferrari-App/1.0'})
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = resp.read()
            with open(dest, 'wb') as f:
                f.write(data)
            return fname, True, f"{len(data):,} bytes"
        except Exception as e:
            if attempt < MAX_RETRIES:
                time.sleep(1)
            else:
                return fname, False, str(e)

tasks = [(nid, fname) for nid, fname in node_to_file.items()]
downloaded = failed = 0

with ThreadPoolExecutor(max_workers=CONCURRENCY) as pool:
    futures = {pool.submit(download_image, t): t for t in tasks}
    for fut in as_completed(futures):
        fname, ok, msg = fut.result()
        if ok:
            downloaded += 1
            if downloaded % 50 == 0 or downloaded <= 3:
                print(f"  [{downloaded}/{len(tasks)}] {fname} — {msg}")
        else:
            failed += 1
            print(f"  FAILED: {fname} — {msg}")

print(f"\nDownloaded: {downloaded}  Failed: {failed}")

# Convert new PNGs to JPEG
print("\nConverting new PNGs to JPEG…")
png_files = list(Path(IMG_DIR).glob('*.png'))
converted = 0
for png in png_files:
    jpg = png.with_suffix('.jpg')
    result = subprocess.run(
        ['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '85',
         str(png), '--out', str(jpg)],
        capture_output=True
    )
    if result.returncode == 0:
        png.unlink()
        converted += 1
    else:
        print(f"  sips failed for {png.name}")
print(f"Converted {converted} PNGs to JPEG")

# Update image_files in JSON
for car in cars:
    image_files = []
    for idx in range(1, len(car['image_nodes']) + 1):
        fname_jpg = f"{car['slug']}-{idx}.jpg"
        fname_png = f"{car['slug']}-{idx}.png"
        if os.path.exists(os.path.join(IMG_DIR, fname_jpg)):
            image_files.append(fname_jpg)
        elif os.path.exists(os.path.join(IMG_DIR, fname_png)):
            image_files.append(fname_png)
        else:
            image_files.append(fname_jpg)  # placeholder
    car['image_files'] = image_files

with open(OUT_JSON, 'w') as f:
    json.dump(cars, f, indent=2, ensure_ascii=False)

total_imgs = len(list(Path(IMG_DIR).glob('*.jpg'))) + len(list(Path(IMG_DIR).glob('*.png')))
print(f"\nTotal images in {IMG_DIR}: {total_imgs}")
print(f"JSON updated: {OUT_JSON}")
print("Done.")
