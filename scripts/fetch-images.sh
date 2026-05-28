#!/usr/bin/env bash
# Fetch Ferrari images from Wikipedia REST API.
# Each entry: slug|wikipedia-article-title
set -u

OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/cars"
mkdir -p "$OUT_DIR"

declare -a ENTRIES=(
  # Mid-engine V12 flagships
  "288-gto|Ferrari_288_GTO"
  "f40|Ferrari_F40"
  "f50|Ferrari_F50"
  "enzo|Enzo_Ferrari_(automobile)"
  "laferrari|LaFerrari"
  "f80|Ferrari_F80"
  # Mid-engine V8 sports
  "308-gtb|Ferrari_308_GTB/GTS"
  "f355|Ferrari_F355"
  "360-modena|Ferrari_360"
  "f430|Ferrari_F430"
  "458-italia|Ferrari_458"
  "488-gtb|Ferrari_488"
  "f8-tributo|Ferrari_F8_Tributo"
  "296-gtb|Ferrari_296_GTB"
  # Front-engine V12 GT
  "550-maranello|Ferrari_550"
  "575m|Ferrari_575M_Maranello"
  "599-gtb|Ferrari_599_GTB_Fiorano"
  "612-scaglietti|Ferrari_612_Scaglietti"
  "f12berlinetta|Ferrari_F12berlinetta"
  "812-superfast|Ferrari_812_Superfast"
  "gtc4lusso|Ferrari_GTC4Lusso"
  # Front-engine V8 GT
  "california|Ferrari_California"
  "portofino|Ferrari_Portofino"
  "roma|Ferrari_Roma"
  # One-offs / Icona / coach-built
  "monza-sp1|Ferrari_Monza_SP1"
  "monza-sp2|Ferrari_Monza_SP1"
  "sp3-daytona|Ferrari_Daytona_SP3"
  "p80c|Ferrari_P80/C"
  "omologata|List_of_Ferrari_one-off_cars"
  "br20|Ferrari_BR20"
  "sp48-unica|List_of_Ferrari_one-off_cars"
  "j50|Ferrari_J50"
)

fetch() {
  local slug="$1"
  local title="$2"
  local out="$OUT_DIR/$slug.jpg"

  if [[ -s "$out" ]]; then
    echo "skip  $slug"
    return 0
  fi

  local url
  url=$(curl -sf "https://en.wikipedia.org/api/rest_v1/page/summary/$title" \
    | python3 -c "import json,sys
try:
  d=json.load(sys.stdin)
  s=d.get('originalimage',{}).get('source') or d.get('thumbnail',{}).get('source','')
  print(s)
except Exception:
  print('')")

  if [[ -z "$url" ]]; then
    echo "miss  $slug  (no image in $title)"
    return 1
  fi

  if curl -sfL "$url" -o "$out"; then
    echo "ok    $slug  <- $url"
  else
    echo "fail  $slug"
    rm -f "$out"
    return 1
  fi
}

export -f fetch
export OUT_DIR

for entry in "${ENTRIES[@]}"; do
  slug="${entry%%|*}"
  title="${entry##*|}"
  fetch "$slug" "$title" &
done
wait

echo
echo "Done. Files in $OUT_DIR:"
ls -1 "$OUT_DIR" | wc -l | xargs -I{} echo "  {} images"
