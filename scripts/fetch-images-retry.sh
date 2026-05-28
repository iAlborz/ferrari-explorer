#!/usr/bin/env bash
# Retry fetching images using MediaWiki pageimages API (follows redirects).
set -u

OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/cars"
mkdir -p "$OUT_DIR"

declare -a ENTRIES=(
  "458-italia|Ferrari 458"
  "488-gtb|Ferrari 488"
  "f8-tributo|Ferrari F8 Tributo"
  "296-gtb|Ferrari 296 GTB"
  "f12berlinetta|Ferrari F12berlinetta"
  "812-superfast|Ferrari 812 Superfast"
  "612-scaglietti|Ferrari 612 Scaglietti"
  "599-gtb|Ferrari 599 GTB Fiorano"
  "575m|Ferrari 575M Maranello"
  "360-modena|Ferrari 360"
  "gtc4lusso|Ferrari GTC4Lusso"
  "california|Ferrari California"
  "portofino|Ferrari Portofino"
  "roma|Ferrari Roma"
  "monza-sp1|Ferrari Monza SP1 and SP2"
  "monza-sp2|Ferrari Monza SP1 and SP2"
  "sp3-daytona|Ferrari Daytona SP3"
  "p80c|Ferrari P80/C"
  "br20|Ferrari BR20"
  "j50|Ferrari J50"
  "omologata|Ferrari Omologata"
  "sp48-unica|Ferrari SP48 Unica"
)

fetch() {
  local slug="$1"
  local title="$2"
  local out="$OUT_DIR/$slug.jpg"

  if [[ -s "$out" ]]; then
    echo "skip  $slug"
    return 0
  fi

  local enc
  enc=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$title")

  local url
  url=$(curl -sf "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&titles=$enc&redirects=1" \
    | python3 -c "import json,sys
try:
  d=json.load(sys.stdin)
  pages=d.get('query',{}).get('pages',{})
  for _,p in pages.items():
    s=p.get('original',{}).get('source','')
    if s:
      print(s); break
except Exception:
  pass")

  if [[ -z "$url" ]]; then
    echo "miss  $slug  ($title)"
    return 1
  fi

  if curl -sfL --max-time 30 "$url" -o "$out"; then
    echo "ok    $slug  <- $(echo "$url" | head -c 80)"
  else
    echo "fail  $slug"
    rm -f "$out"
    return 1
  fi
}

for entry in "${ENTRIES[@]}"; do
  slug="${entry%%|*}"
  title="${entry##*|}"
  fetch "$slug" "$title" &
done
wait

echo
ls -1 "$OUT_DIR"/*.jpg 2>/dev/null | wc -l | xargs -I{} echo "Total: {} images"
