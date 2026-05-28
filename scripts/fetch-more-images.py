#!/usr/bin/env python3
"""
For every variation that has fewer than 4 images, search DuckDuckGo Images
for "Ferrari <name> <year>", download the top results, and update
figma-cars.json so the new images are referenced.

Resumable: re-runs skip variations that already have 4+ images.
"""

import json, os, re, sys, time, urllib.request, urllib.parse, urllib.error

JSON_PATH   = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/src/data/figma-cars.json"
OUT_DIR     = "/Users/alborzheydaryan/Desktop/MyApps/Ferrari/public/cars/figma"
TARGET      = 4                 # min images per variation
PER_QUERY   = 6                 # results to try per search (we keep first N that download cleanly)
MIN_BYTES   = 20_000            # skip thumbnails / placeholders
SLEEP_QUERY = 1.5               # between DuckDuckGo calls
SLEEP_DL    = 0.4               # between image downloads
USER_AGENT  = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"


def http_get(url: str, headers: dict | None = None, timeout: int = 20) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, **(headers or {})})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def ddg_vqd(query: str) -> str | None:
    """DuckDuckGo requires a vqd token before image search will return JSON."""
    url = f"https://duckduckgo.com/?q={urllib.parse.quote(query)}&iax=images&ia=images"
    try:
        html = http_get(url).decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  vqd fetch failed: {e}")
        return None
    m = re.search(r"vqd=['\"]([\d-]+)['\"]", html) or re.search(r"vqd=([\d-]+)", html)
    return m.group(1) if m else None


def ddg_image_urls(query: str) -> list[str]:
    """Returns a list of image URLs from DDG's i.js endpoint."""
    vqd = ddg_vqd(query)
    if not vqd:
        return []
    api = (
        "https://duckduckgo.com/i.js?"
        + urllib.parse.urlencode({
            "l": "us-en", "o": "json", "q": query, "vqd": vqd,
            "f": ",,,,,", "p": "1", "v7exp": "a",
        })
    )
    headers = {
        "Referer": "https://duckduckgo.com/",
        "Accept": "application/json, text/javascript, */*; q=0.01",
    }
    try:
        raw = http_get(api, headers=headers).decode("utf-8", errors="ignore")
        data = json.loads(raw)
    except Exception as e:
        print(f"  i.js failed: {e}")
        return []
    return [r.get("image") for r in data.get("results", []) if r.get("image")]


def download_image(url: str, dest: str) -> bool:
    try:
        data = http_get(url, timeout=15)
    except Exception:
        return False
    if len(data) < MIN_BYTES:
        return False
    with open(dest, "wb") as f:
        f.write(data)
    return True


def png_to_jpg(path: str) -> str:
    if not path.lower().endswith(".png"):
        return path
    jpg = path[:-4] + ".jpg"
    if os.system(f'sips -s format jpeg "{path}" --out "{jpg}" -s formatOptions 80 >/dev/null 2>&1') == 0:
        os.remove(path)
        return jpg
    return path


def resize_inplace(path: str, max_w: int = 1200) -> None:
    """Match the sizing pass we did before push."""
    os.system(f'sips -Z {max_w} -s format jpeg "{path}" --out "{path}" -s formatOptions 80 >/dev/null 2>&1')


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    with open(JSON_PATH) as f:
        cars = json.load(f)

    needs = [c for c in cars if len(c.get("image_files") or []) < TARGET]
    print(f"{len(needs)} variations need more images (target: {TARGET} each)\n")
    os.makedirs(OUT_DIR, exist_ok=True)

    for i, car in enumerate(needs, 1):
        slug = car["slug"]
        name = car["name"]
        existing = list(car.get("image_files") or [])
        needed = TARGET - len(existing)
        if needed <= 0:
            continue

        query = f"Ferrari {name}"
        print(f"[{i}/{len(needs)}] {name}  (need {needed} more)")

        try:
            urls = ddg_image_urls(query)[:PER_QUERY]
        except Exception as e:
            print(f"  search failed: {e}")
            urls = []

        added = 0
        next_idx = len(existing) + 1
        for url in urls:
            if added >= needed:
                break
            ext = ".png" if ".png" in url.lower().split("?")[0] else ".jpg"
            tmp = os.path.join(OUT_DIR, f"{slug}-{next_idx}{ext}")
            if download_image(url, tmp):
                if tmp.endswith(".png"):
                    tmp = png_to_jpg(tmp)
                resize_inplace(tmp)
                existing.append(os.path.basename(tmp))
                next_idx += 1
                added += 1
                print(f"  ✓ {os.path.basename(tmp)}")
            time.sleep(SLEEP_DL)

        car["image_files"] = existing
        if added < needed:
            print(f"  (only got {added}/{needed})")

        # Save progress after each car so we can resume on crash/interrupt
        with open(JSON_PATH, "w") as f:
            json.dump(cars, f, indent=2, ensure_ascii=False)

        time.sleep(SLEEP_QUERY)

    # Final summary
    remaining = sum(1 for c in cars if len(c.get("image_files") or []) < TARGET)
    print(f"\nDone. {len(cars) - remaining}/{len(cars)} variations have {TARGET}+ images.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nInterrupted — progress saved.")
        sys.exit(1)
