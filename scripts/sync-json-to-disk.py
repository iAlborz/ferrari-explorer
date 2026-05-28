#!/usr/bin/env python3
"""Reconcile figma-cars.json with the actual files on disk.
For each entry, image_files becomes the sorted list of {slug}-N.jpg files that exist."""
import json, os, re

JSON_PATH = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/src/data/figma-cars.json"
OUT_DIR   = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/public/cars/figma"

with open(JSON_PATH) as f:
    cars = json.load(f)

on_disk = set(os.listdir(OUT_DIR))
changed = 0
for car in cars:
    slug = car["slug"]
    matches = sorted(
        [fn for fn in on_disk if re.match(rf"^{re.escape(slug)}-\d+\.jpg$", fn)],
        key=lambda fn: int(re.search(r"-(\d+)\.", fn).group(1)),
    )
    if matches != list(car.get("image_files") or []):
        car["image_files"] = matches
        changed += 1

with open(JSON_PATH, "w") as f:
    json.dump(cars, f, indent=2, ensure_ascii=False)

print(f"Synced {changed} entries to match disk.")

# Coverage report
buckets = {"0": 0, "1": 0, "2": 0, "3": 0, "4+": 0}
for car in cars:
    n = len(car.get("image_files") or [])
    buckets["4+" if n >= 4 else str(n)] += 1
print("Coverage:", buckets)
print(f"Need more (<4): {sum(1 for c in cars if len(c.get('image_files') or []) < 4)}")
