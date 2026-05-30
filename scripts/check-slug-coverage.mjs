/**
 * For each variation in cars.ts whose slug doesn't exist in figma-cars.json,
 * print the closest existing slug as a suggested fix.
 */
import { readFileSync } from "node:fs";
import { transformSync } from "../node_modules/.pnpm/esbuild@0.27.0/node_modules/esbuild/lib/main.js";

function slugify(text) {
  return text.toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const src = readFileSync("src/data/cars.ts", "utf8");
const js = transformSync(src, { loader: "ts", format: "esm" }).code;
const dataUrl = "data:text/javascript;base64," + Buffer.from(js).toString("base64");
const { FERRARI } = await import(dataUrl);

// Mirror the SLUG_ALIASES map from figmaImages.ts so the check matches runtime behavior.
const aliasesSrc = readFileSync("src/data/figmaImages.ts", "utf8");
const aliasMatch = aliasesSrc.match(/SLUG_ALIASES[^=]*=\s*({[\s\S]*?});/);
const SLUG_ALIASES = aliasMatch
  ? Object.fromEntries(
      [...aliasMatch[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
    )
  : {};
function resolved(slug) {
  return SLUG_ALIASES[slug] ?? slug;
}

const figma = JSON.parse(readFileSync("src/data/figma-cars.json", "utf8"));
const figmaSlugs = new Set(figma.map((c) => c.slug));

function bestMatch(targetSlug) {
  // Score = 1 if one prefix-contains the other, else Jaccard on word tokens
  const targetParts = new Set(targetSlug.split("-"));
  let best = { slug: null, score: 0 };
  for (const candidate of figmaSlugs) {
    const candidateParts = new Set(candidate.split("-"));
    const intersection = [...targetParts].filter((t) => candidateParts.has(t)).length;
    const union = new Set([...targetParts, ...candidateParts]).size;
    const jaccard = intersection / union;
    let score = jaccard;
    // Bonus for shared prefix (matches model name)
    const sharedPrefix = targetSlug.slice(0, [...candidate].findIndex((c, i) => c !== targetSlug[i]));
    if (sharedPrefix.length >= 3) score += 0.1;
    if (score > best.score) best = { slug: candidate, score };
  }
  return best;
}

let missing = 0;
for (const cat of FERRARI.categories) {
  for (const model of cat.models) {
    for (const v of model.variations) {
      const rawSlug = slugify(`${v.name} ${v.year}`);
      const slug = resolved(rawSlug);
      if (!figmaSlugs.has(slug)) {
        missing++;
        const sugg = bestMatch(slug);
        const figmaEntry = figma.find((c) => c.slug === sugg.slug);
        console.log(`✗  ${rawSlug}${rawSlug !== slug ? " (alias→" + slug + ")" : ""}`);
        console.log(`     name: "${v.name}"  year: "${v.year}"`);
        console.log(`   → best: ${sugg.slug}  (figma name: "${figmaEntry?.name}")`);
        console.log();
      }
    }
  }
}
console.log(`${missing} variations missing.`);
