#!/usr/bin/env python3
"""Targeted fetch for the 2 458 Challenge variations that DDG choked on."""
import json, os, re, time, urllib.request, urllib.parse

JSON_PATH = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/src/data/figma-cars.json"
OUT_DIR   = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/public/cars/figma"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0) AppleWebKit/605.1.15 Safari/605.1.15"


def http_get(url, headers=None, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": UA, **(headers or {})})
    return urllib.request.urlopen(req, timeout=timeout).read()


def ddg_images(query):
    html = http_get(f"https://duckduckgo.com/?q={urllib.parse.quote(query)}&iax=images&ia=images").decode("utf-8", "ignore")
    m = re.search(r"vqd=['\"]([\d-]+)['\"]", html) or re.search(r"vqd=([\d-]+)", html)
    if not m: return []
    vqd = m.group(1)
    api = "https://duckduckgo.com/i.js?" + urllib.parse.urlencode({
        "l": "us-en", "o": "json", "q": query, "vqd": vqd,
        "f": ",,,,,", "p": "1", "v7exp": "a",
    })
    try:
        raw = http_get(api, headers={"Referer": "https://duckduckgo.com/"}).decode("utf-8", "ignore")
        return [r["image"] for r in json.loads(raw).get("results", []) if r.get("image")]
    except Exception as e:
        print(f"  i.js: {e}")
        return []


with open(JSON_PATH) as f:
    cars = json.load(f)

targets = [
    ("458-challenge-2011", "Ferrari 458 Challenge race car"),
    ("458-challenge-evo-2014", "Ferrari 458 Challenge EVO"),
]

for slug, query in targets:
    car = next(c for c in cars if c["slug"] == slug)
    existing = list(car.get("image_files") or [])
    need = 4 - len(existing)
    if need <= 0:
        continue
    print(f"\n{slug}: need {need} more images")
    print(f"  query: {query}")
    urls = ddg_images(query)
    print(f"  got {len(urls)} url candidates")
    next_idx = len(existing) + 1
    added = 0
    for url in urls:
        if added >= need: break
        try:
            data = http_get(url, timeout=15)
        except Exception:
            continue
        if len(data) < 20_000:
            continue
        dest = os.path.join(OUT_DIR, f"{slug}-{next_idx}.jpg")
        with open(dest, "wb") as f:
            f.write(data)
        os.system(f'sips -Z 1200 -s format jpeg "{dest}" --out "{dest}" -s formatOptions 80 >/dev/null 2>&1')
        existing.append(os.path.basename(dest))
        next_idx += 1
        added += 1
        print(f"  ✓ {os.path.basename(dest)}")
        time.sleep(0.4)
    car["image_files"] = existing
    time.sleep(2)

with open(JSON_PATH, "w") as f:
    json.dump(cars, f, indent=2, ensure_ascii=False)

print("\nDone.")
