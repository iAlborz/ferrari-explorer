#!/usr/bin/env python3
"""
Replace each variation's images with 4 high-quality press shots from a
curated allowlist of sources. Avoids scale models, vinyl wraps, and watermarked
stock photos that the unconstrained search picked up.

Source priority (per variation):
  1. supercars.net           (broad, all-era press + editorial)
  2. netcarshow.com          (modern press shots, clean)
  3. commons.wikimedia.org   (vintage and supplementary)

For each variation:
  - Query each source in order via DuckDuckGo `site:` filter
  - Collect candidate URLs, drop URLs containing thumbnail/preview tokens
  - Download in order, skip if <40 KB after compression
  - Keep going until we have 4 clean images (or run out of candidates)
  - Delete the previous images for that variation and replace

Resumable: re-runs skip variations where ALL 4 files start with `curated-`.
"""

import json, os, re, sys, time, urllib.request, urllib.parse, hashlib

JSON_PATH = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/src/data/figma-cars.json"
OUT_DIR   = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/public/cars/figma"
TARGET    = 4
MIN_BYTES = 40_000           # after compression — skip tiny thumbs
UA        = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0) AppleWebKit/605.1.15 Safari/605.1.15"

SOURCES = [
    "supercars.net",
]

# URL substrings that suggest a thumbnail / preview / low-res variant — skip these
BAD_TOKENS = (
    "thumb", "thumbnail", "_small", "preview", "icon", "favicon",
    "-150x", "-300x", "-360x", "-460x", "-560x", "-768x", "-770x",
)


def http_get(url, headers=None, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": UA, **(headers or {})})
    return urllib.request.urlopen(req, timeout=timeout).read()


def ddg_image_urls(query):
    try:
        html = http_get(f"https://duckduckgo.com/?q={urllib.parse.quote(query)}&iax=images&ia=images").decode("utf-8", "ignore")
    except Exception:
        return []
    m = re.search(r"vqd=['\"]([\d-]+)['\"]", html) or re.search(r"vqd=([\d-]+)", html)
    if not m:
        return []
    vqd = m.group(1)
    api = "https://duckduckgo.com/i.js?" + urllib.parse.urlencode({
        "l": "us-en", "o": "json", "q": query, "vqd": vqd,
        "f": ",,,,,", "p": "1", "v7exp": "a",
    })
    try:
        raw = http_get(api, headers={"Referer": "https://duckduckgo.com/", "Accept": "application/json"}).decode("utf-8", "ignore")
        return [r["image"] for r in json.loads(raw).get("results", []) if r.get("image")]
    except Exception:
        return []


def strip_year(name: str) -> str:
    """Drop trailing year / year-range from the variation name for searching.
       '458 Speciale A 2015' → '458 Speciale A'
       'F40 1987-1992'      → 'F40'
       'LaFerrari 2013–2016' → 'LaFerrari'
    """
    return re.sub(r"\s+\(?\s*(19|20)\d\d(\s*[-–—]\s*(19|20)?\d{2,4})?\)?\s*$", "", name).strip()


def gather_candidates(name: str) -> list[str]:
    """Search each source in priority order, return de-duplicated URL list."""
    query_name = strip_year(name)
    seen, out = set(), []
    for src in SOURCES:
        urls = ddg_image_urls(f"Ferrari {query_name} site:{src}")
        for u in urls:
            if u in seen:
                continue
            low = u.lower()
            if any(t in low for t in BAD_TOKENS):
                continue
            seen.add(u)
            out.append(u)
        time.sleep(1.5)
    return out


def resize_inplace(path: str, max_w: int = 1200) -> None:
    os.system(f'sips -Z {max_w} -s format jpeg "{path}" --out "{path}" -s formatOptions 80 >/dev/null 2>&1')


def sha256_file(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def download(url: str, dest: str, used_hashes: set[str]) -> str | None:
    try:
        data = http_get(url, timeout=20)
    except Exception:
        return None
    if len(data) < 10_000:
        return None
    with open(dest, "wb") as f:
        f.write(data)
    resize_inplace(dest)
    if os.path.getsize(dest) < MIN_BYTES:
        os.remove(dest)
        return None
    h = sha256_file(dest)
    if h in used_hashes:
        os.remove(dest)
        return None
    used_hashes.add(h)
    return h


def delete_existing(slug: str) -> None:
    """Remove all existing files for a slug from disk."""
    pat = re.compile(rf"^{re.escape(slug)}-\d+\.(jpg|jpeg|png|webp)$", re.I)
    for fn in os.listdir(OUT_DIR):
        if pat.match(fn):
            try: os.remove(os.path.join(OUT_DIR, fn))
            except Exception: pass


def main():
    with open(JSON_PATH) as f:
        cars = json.load(f)

    # Pre-seed used_hashes with all currently-on-disk files so cross-variation dupes
    # are still avoided even when we replace cars one at a time.
    used_hashes = set()
    for fn in os.listdir(OUT_DIR):
        if fn.endswith((".jpg", ".jpeg", ".png", ".webp")):
            try:
                used_hashes.add(sha256_file(os.path.join(OUT_DIR, fn)))
            except Exception:
                pass

    # Skip variations already processed in a previous run.
    todo = [c for c in cars if not c.get("curated")]

    print(f"{len(todo)} variations to refetch\n")

    for i, car in enumerate(todo, 1):
        slug = car["slug"]
        name = car["name"]
        print(f"[{i}/{len(todo)}] {name}")

        candidates = gather_candidates(name)
        print(f"  {len(candidates)} candidate URLs from curated sources")

        if len(candidates) < 2:
            print(f"  ⚠ insufficient — keeping existing images")
            continue

        # Stage replacements to a temp prefix first; only swap once we have ≥1
        staged = []  # list of new filenames
        for url in candidates:
            if len(staged) >= TARGET:
                break
            idx = len(staged) + 1
            ext = ".jpg"
            dest = os.path.join(OUT_DIR, f"curated-{slug}-{idx}{ext}")
            # Remove pre-existing hash from set temporarily so we can re-download fresh.
            h = download(url, dest, used_hashes)
            if h:
                staged.append(os.path.basename(dest))
                print(f"  ✓ {os.path.basename(dest)}")
            time.sleep(0.4)

        if not staged:
            print(f"  ✗ no usable images — keeping existing")
            continue

        # Swap: delete old files, rename staged files to slug-1.jpg, slug-2.jpg, …
        delete_existing(slug)
        final_names = []
        for idx, fname in enumerate(staged, 1):
            src = os.path.join(OUT_DIR, fname)
            dst = os.path.join(OUT_DIR, f"{slug}-{idx}.jpg")
            os.rename(src, dst)
            final_names.append(os.path.basename(dst))

        car["image_files"] = final_names
        car["curated"] = True
        with open(JSON_PATH, "w") as f:
            json.dump(cars, f, indent=2, ensure_ascii=False)

        time.sleep(1.0)

    print("\nDone.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nInterrupted — partial progress saved.")
        sys.exit(1)
