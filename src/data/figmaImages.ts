/**
 * Looks up per-variation images extracted from Figma.
 * Images live at /cars/figma/{slug}-{n}.jpg
 */
import figmaCars from "./figma-cars.json";

// Build a map from slug → image file paths
const slugMap = new Map<string, string[]>(
  (figmaCars as { slug: string; image_files: string[] }[]).map((c) => [
    c.slug,
    c.image_files,
  ])
);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Maps "computed slug from cars.ts" → "actual slug in figma-cars.json".
 * Use when cars.ts uses a year range but the figma data uses a single year,
 * or when the variation name differs slightly (e.g. "GTC4Lusso" vs "GTC4 Lusso").
 *
 * Both `slugifyVariation` and `getVariationImages` apply this map.
 */
const SLUG_ALIASES: Record<string, string> = {
  // 512 BB family — figma calls it "BB 512"
  "512-bb-1976-1981": "bb-512-1976-1981",
  "512-bbi-1981-1984": "bb-512-1976-1981",
  "512-bb-lm-1978-1981": "512-bb-lm-1978",

  // 308 GT4 era — figma uses 1988-1993 era stamp
  "308-gt4-1973-1980": "308-gt4-1988-1993",
  "208-gt4-1975-1980": "208-gt4-1988-1993",

  // Mondial — figma's actual entry names
  "mondial-32-1985-1988": "mondial-32-coupe-cabriolet-1985-1988",
  "mondial-t-1988-1993": "mondial-32-t-1988-1993",

  // 550/575M family
  "550-barchetta-pininfarina-2000-2001": "550-barchetta-pininfarina-1998",
  "575m-maranello-2002-2006": "575m-maranello-2002-2005",
  "superamerica-2005-2006": "superamerica-2005",

  // 599 family
  "599-gtb-fiorano-2006-2012": "599-gtb-fiorano-2006",
  "599-gto-2010-2012": "599-gto-2011",
  "sa-aperta-2010-2011": "599-sa-aperta-2011",
  "599xx-2010-2011": "599xx-2010",

  // F12
  "f12berlinetta-2012-2017": "f12berlinetta-2013",

  // 812 family — single-year stamps in figma
  "812-superfast-2017-2023": "812-superfast-2018",
  "812-gts-2019-2023": "812-gts-2020",
  "812-competizione-2021-2022": "812-competizione-2023",
  "812-competizione-a-2021-2022": "812-competizione-a-2023",

  // 365 Daytona
  "365-gts4-daytona-spider-1969-1973": "365-gts4-daytona-1969-1973",
  "365-gtb4-competizione-1971-1976": "365-gtb4-daytona-competizione-s2-1972",

  // 612, FF, GTC4
  "612-scaglietti-2004-2011": "612-scaglietti-2004",
  "ff-2011-2016": "ff-2012",
  "gtc4lusso-2016-2020": "gtc4-lusso-2016-2020",

  // V8 GT family
  "california-2008-2014": "california-2009",
  "california-t-2014-2017": "california-t-2015",
  "portofino-2017-2020": "portofino-2018",
  "portofino-m-2020-2021": "portofino-m-2021",
  "roma-2019": "roma-2022",
  "roma-spider-2023": "roma-spider-2024",

  // Icona
  "monza-sp1-2019-2020": "monza-sp1-2019",
  "monza-sp2-2019-2020": "monza-sp2-2019",
};

/** Variation slug from name + year — matches the keys in figma-cars.json. */
export function slugifyVariation(name: string, year: string): string {
  const raw = slugify(`${name} ${year}`);
  return SLUG_ALIASES[raw] ?? raw;
}

/**
 * Returns the first available image URL for a variation, or null if not found.
 */
export function getVariationImage(name: string, year: string): string | null {
  const files = slugMap.get(slugifyVariation(name, year));
  if (!files || files.length === 0) return null;
  return `/cars/figma/${files[0]}`;
}

/**
 * Returns all image URLs for a variation (primary + secondary shots).
 */
export function getVariationImages(name: string, year: string): string[] {
  const files = slugMap.get(slugifyVariation(name, year)) ?? [];
  return files.map((f) => `/cars/figma/${f}`);
}
