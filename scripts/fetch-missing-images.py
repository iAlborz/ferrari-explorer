#!/usr/bin/env python3
"""
Fetch images for Ferrari variation cards that have no Figma images.
Uses Wikipedia's pageimages API to find real image URLs.
Saves to public/cars/figma/{slug}-1.jpg and updates figma-cars.json.
"""

import json, os, re, time, urllib.request, urllib.parse

JSON_PATH = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/src/data/figma-cars.json"
OUT_DIR   = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/public/cars/figma"

# Search term to use for each missing slug
WIKIPEDIA_SEARCHES = {
    "599xx-evoluzione-2011":      "Ferrari 599XX",
    "812-superfast-2018":         "Ferrari 812 Superfast",
    "12cilindri-2024":            "Ferrari 12Cilindri",
    "365-gtc-1968-1969":          "Ferrari 365 GTC",
    "456-gt-1992-1997":           "Ferrari 456 GT",
    "gtc4-lusso-2016-2020":       "Ferrari GTC4Lusso",
    "360-n-gt-1999-2004":         "Ferrari 360 Modena",
    "scuderia-spider-16m-2009":   "Ferrari F430 Scuderia",
    "488-gt-modificata-2020":     "Ferrari 488",
    "f8-spider-2020-2023":        "Ferrari F8 Tributo",
    "296-gtb-2022":               "Ferrari 296 GTB",
    "amalfi-2026":                "Ferrari Amalfi",
    "512-f1-1512-1964":           "Ferrari 512 F1",
    "312-b3-1973":                "Ferrari 312B",
    "sp-ffx-2014":                "Ferrari FXX",
    "sp48-unica-2022":            "Ferrari 488 Pista",
    "hc25-2026":                  "Ferrari",
    "849-testarossa-spider-2026": "Ferrari Testarossa",
}


def wiki_api(params: dict) -> dict:
    params["format"] = "json"
    url = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 Ferrari-app/1.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read())


def wikipedia_image_url(search_term: str) -> str | None:
    """Return a direct image URL via Wikipedia search → pageimages."""
    # Step 1: search for the page
    try:
        data = wiki_api({"action": "query", "list": "search", "srsearch": search_term, "srlimit": 1})
        results = data.get("query", {}).get("search", [])
        if not results:
            return None
        title = results[0]["title"]
    except Exception as e:
        print(f"  search error: {e}")
        return None

    # Step 2: get page image
    try:
        data = wiki_api({
            "action": "query",
            "titles": title,
            "prop": "pageimages",
            "pithumbsize": 800,
        })
        pages = data.get("query", {}).get("pages", {})
        for page in pages.values():
            src = page.get("thumbnail", {}).get("source")
            if src:
                # use 800px — Wikipedia's allowed sizes include 800
                return src
    except Exception as e:
        print(f"  pageimages error: {e}")
    return None


def download(url: str, dest: str) -> bool:
    headers = {"User-Agent": "Mozilla/5.0 Ferrari-app/1.0"}
    req = urllib.request.Request(url, headers=headers)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                data = r.read()
            if len(data) < 5000:
                print(f"  too small ({len(data)} bytes), skipping")
                return False
            with open(dest, "wb") as f:
                f.write(data)
            return True
        except Exception as e:
            print(f"  attempt {attempt+1} failed: {e}")
            time.sleep(2)
    return False


def png_to_jpg(path: str) -> str:
    if not path.endswith(".png"):
        return path
    jpg = path[:-4] + ".jpg"
    os.system(f'sips -s format jpeg "{path}" --out "{jpg}" -s formatOptions 85 >/dev/null 2>&1')
    if os.path.exists(jpg):
        os.remove(path)
        return jpg
    return path


# ── Main ──────────────────────────────────────────────────────────────────────
with open(JSON_PATH) as f:
    cars = json.load(f)

missing = [c for c in cars if not c.get("image_files")]
print(f"{len(missing)} cars without images\n")

os.makedirs(OUT_DIR, exist_ok=True)
updated = 0

for car in missing:
    slug = car["slug"]
    name = car["name"]
    dest = os.path.join(OUT_DIR, f"{slug}-1.jpg")

    if os.path.exists(dest) and os.path.getsize(dest) > 5000:
        print(f"✓ {name} — already exists")
        car["image_files"] = [f"{slug}-1.jpg"]
        updated += 1
        continue

    search = WIKIPEDIA_SEARCHES.get(slug)
    if not search:
        print(f"✗ {name} — no search term, skipping")
        continue

    print(f"→ {name}  (searching: \"{search}\")")
    img_url = wikipedia_image_url(search)
    if not img_url:
        print(f"  no image found")
        continue

    print(f"  {img_url[:90]}…")
    ext = ".png" if ".png" in img_url.lower() else ".jpg"
    tmp = dest if ext == ".jpg" else dest.replace(".jpg", ".png")

    if download(img_url, tmp):
        if tmp.endswith(".png"):
            tmp = png_to_jpg(tmp)
        print(f"  ✓ {os.path.basename(tmp)}")
        car["image_files"] = [os.path.basename(tmp)]
        updated += 1
    else:
        print(f"  ✗ download failed")

    time.sleep(2)

with open(JSON_PATH, "w") as f:
    json.dump(cars, f, indent=2, ensure_ascii=False)

print(f"\nDone. {updated} cars now have images.")
