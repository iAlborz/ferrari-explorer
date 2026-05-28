#!/usr/bin/env python3
"""Test the curated fetcher on a single slug end-to-end."""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from importlib.machinery import SourceFileLoader
m = SourceFileLoader("s", os.path.join(os.path.dirname(__file__), "fetch-curated-images.py")).load_module()

TARGET_SLUG = sys.argv[1] if len(sys.argv) > 1 else "458-italia-2009-2015"

with open(m.JSON_PATH) as f:
    cars = json.load(f)
car = next((c for c in cars if c["slug"] == TARGET_SLUG), None)
if not car:
    print(f"slug not found: {TARGET_SLUG}")
    sys.exit(1)

print(f"Target: {car['name']} ({car['slug']})")
print(f"Currently has {len(car.get('image_files') or [])} images: {car.get('image_files')}")
print()

candidates = m.gather_candidates(car["name"])
print(f"\n{len(candidates)} candidates after filtering")
print("Top 10:")
for u in candidates[:10]:
    print(f"  - {u}")

# Download 4 unique
used = set()
staged = []
for url in candidates:
    if len(staged) >= 4: break
    dest = os.path.join(m.OUT_DIR, f"test-{car['slug']}-{len(staged)+1}.jpg")
    if m.download(url, dest, used):
        size = os.path.getsize(dest)
        print(f"  ✓ {os.path.basename(dest)} ({size//1024} KB)  ← {url[:80]}")
        staged.append(dest)

print(f"\nDownloaded {len(staged)} test files. Inspect them at {m.OUT_DIR}/test-*.jpg")
