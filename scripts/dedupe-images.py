#!/usr/bin/env python3
"""
Find duplicate images (by SHA-256 of file bytes) and replace them with fresh
DuckDuckGo results, skipping any hash we've already used.

Detects two kinds of duplicates:
  1. Same image used twice within a single variation
  2. Same image used across different variations

For each duplicate, deletes the file and downloads a replacement that isn't
already in the global hash set.
"""

import json, os, re, sys, time, hashlib, urllib.request, urllib.parse

JSON_PATH   = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/src/data/figma-cars.json"
OUT_DIR     = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/public/cars/figma"
TARGET      = 4
MIN_BYTES   = 20_000
SLEEP_QUERY = 1.5
SLEEP_DL    = 0.4
USER_AGENT  = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"


def http_get(url: str, headers: dict | None = None, timeout: int = 20) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, **(headers or {})})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def sha256_file(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def sha256_bytes(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def ddg_image_urls(query: str) -> list[str]:
    url = f"https://duckduckgo.com/?q={urllib.parse.quote(query)}&iax=images&ia=images"
    try:
        html = http_get(url).decode("utf-8", errors="ignore")
    except Exception:
        return []
    m = re.search(r"vqd=['\"]([\d-]+)['\"]", html) or re.search(r"vqd=([\d-]+)", html)
    if not m:
        return []
    vqd = m.group(1)
    api = (
        "https://duckduckgo.com/i.js?"
        + urllib.parse.urlencode({
            "l": "us-en", "o": "json", "q": query, "vqd": vqd,
            "f": ",,,,,", "p": "1", "v7exp": "a",
        })
    )
    headers = {"Referer": "https://duckduckgo.com/", "Accept": "application/json"}
    try:
        raw = http_get(api, headers=headers).decode("utf-8", errors="ignore")
        return [r.get("image") for r in json.loads(raw).get("results", []) if r.get("image")]
    except Exception:
        return []


def resize_inplace(path: str, max_w: int = 1200) -> None:
    os.system(f'sips -Z {max_w} -s format jpeg "{path}" --out "{path}" -s formatOptions 80 >/dev/null 2>&1')


def fetch_unique(query: str, used_hashes: set[str], dest: str) -> str | None:
    """Try search results until we find one whose bytes aren't already used."""
    for url in ddg_image_urls(query):
        try:
            data = http_get(url, timeout=15)
        except Exception:
            continue
        if len(data) < MIN_BYTES:
            continue
        h = sha256_bytes(data)
        if h in used_hashes:
            continue
        with open(dest, "wb") as f:
            f.write(data)
        resize_inplace(dest)
        # re-hash after resize (sips re-encodes, so the file hash changes)
        new_hash = sha256_file(dest)
        used_hashes.add(new_hash)
        time.sleep(SLEEP_DL)
        return new_hash
    return None


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    with open(JSON_PATH) as f:
        cars = json.load(f)

    # Step 1: hash every referenced file
    print("Hashing existing images…")
    file_hash: dict[str, str] = {}    # filename → hash
    for car in cars:
        for fname in car.get("image_files") or []:
            path = os.path.join(OUT_DIR, fname)
            if not os.path.exists(path):
                continue
            if fname in file_hash:
                continue
            file_hash[fname] = sha256_file(path)

    # Step 2: find duplicates
    # - within-variation: same hash appears twice in one variation's files
    # - cross-variation: same hash used by multiple variations
    hash_owners: dict[str, list[tuple[str, str]]] = {}  # hash → [(slug, fname), …]
    for car in cars:
        for fname in car.get("image_files") or []:
            h = file_hash.get(fname)
            if not h:
                continue
            hash_owners.setdefault(h, []).append((car["slug"], fname))

    dup_files: set[tuple[str, str]] = set()  # (slug, fname)
    for h, owners in hash_owners.items():
        if len(owners) > 1:
            # Keep the first occurrence; mark the rest as duplicates
            for slug, fname in owners[1:]:
                dup_files.add((slug, fname))

    print(f"  {len(file_hash)} unique files referenced")
    print(f"  {len(dup_files)} duplicate references to remove\n")

    if not dup_files:
        print("No duplicates found. Done.")
        return

    used_hashes = set(file_hash.values())
    by_slug = {c["slug"]: c for c in cars}

    # Step 3: per slug, replace each dup with a fresh, unique image
    dup_by_slug: dict[str, list[str]] = {}
    for slug, fname in dup_files:
        dup_by_slug.setdefault(slug, []).append(fname)

    for i, (slug, fnames) in enumerate(dup_by_slug.items(), 1):
        car = by_slug[slug]
        name = car["name"]
        print(f"[{i}/{len(dup_by_slug)}] {name}  — {len(fnames)} dup(s) to replace")

        # Remove the duplicate filenames from image_files list
        car["image_files"] = [f for f in car["image_files"] if f not in fnames]
        # Delete those files from disk too
        for fname in fnames:
            path = os.path.join(OUT_DIR, fname)
            if os.path.exists(path):
                try: os.remove(path)
                except Exception: pass

        # Now fetch replacements until we have at least TARGET total
        needed = TARGET - len(car["image_files"])
        if needed <= 0:
            continue

        next_idx = (max(
            [int(re.search(r"-(\d+)\.", f).group(1)) for f in car["image_files"] if re.search(r"-(\d+)\.", f)]
            or [0]
        )) + 1
        query = f"Ferrari {name}"

        for _ in range(needed):
            dest = os.path.join(OUT_DIR, f"{slug}-{next_idx}.jpg")
            new_hash = fetch_unique(query, used_hashes, dest)
            if new_hash:
                car["image_files"].append(os.path.basename(dest))
                print(f"  ✓ {os.path.basename(dest)}")
                next_idx += 1
            else:
                print(f"  ✗ couldn't find unique replacement")
                break

        # Save incrementally
        with open(JSON_PATH, "w") as f:
            json.dump(cars, f, indent=2, ensure_ascii=False)
        time.sleep(SLEEP_QUERY)

    print(f"\nDone. Re-run to verify no duplicates remain.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nInterrupted — progress saved.")
        sys.exit(1)
