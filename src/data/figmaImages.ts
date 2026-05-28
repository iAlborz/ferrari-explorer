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
 * Returns the first available image URL for a variation, or null if not found.
 * Falls back to the second image if the first file is somehow missing.
 */
export function getVariationImage(name: string, year: string): string | null {
  const slug = slugify(`${name} ${year}`);
  const files = slugMap.get(slug);
  if (!files || files.length === 0) return null;
  return `/cars/figma/${files[0]}`;
}

/**
 * Returns all image URLs for a variation (primary + secondary shots).
 */
export function getVariationImages(name: string, year: string): string[] {
  const slug = slugify(`${name} ${year}`);
  const files = slugMap.get(slug) ?? [];
  return files.map((f) => `/cars/figma/${f}`);
}
