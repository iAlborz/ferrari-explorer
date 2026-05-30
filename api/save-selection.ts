import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  checkAuth,
  downloadAndCompress,
  ghContext,
  commitFiles,
  readRepoFile,
  listRepoDir,
} from "./_picker-helpers.js";

const IMG_DIR = "public/cars/figma";
const JSON_PATH = "src/data/figma-cars.json";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (!checkAuth(req)) return res.status(401).json({ error: "auth required" });

  const gh = ghContext();
  if (!gh) {
    return res
      .status(500)
      .json({ error: "GITHUB_TOKEN and GITHUB_REPO must be set" });
  }

  try {
    const { slug, urls } = req.body ?? {};
    if (!slug || !Array.isArray(urls)) {
      return res.status(400).json({ error: "slug + urls required" });
    }

    // Pull current state from GitHub
    const carsJsonText = await readRepoFile(gh, JSON_PATH);
    const cars: any[] = JSON.parse(carsJsonText);
    let car = cars.find((c) => c.slug === slug);
    if (!car) {
      // Upsert: this slug doesn't have an entry yet — create one.
      console.log(`[picker] creating new figma-cars.json entry for "${slug}"`);
      car = {
        name: slug,
        slug,
        image_files: [],
        production_count: null,
        tags: [],
        description: "",
      };
      cars.push(car);
    }

    // For each entry: if it's an existing local file, we re-download via the
    // public URL on the deployed site (the simplest cross-version way to keep
    // it). External URLs go through the standard download path.
    const filesToCommit: Record<string, Buffer | string | null> = {};

    // Delete every existing slug-N.{jpg,jpeg,png,webp} file on the repo
    const existing = await listRepoDir(gh, IMG_DIR);
    const slugFileRe = new RegExp(
      `^${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-\\d+\\.(jpg|jpeg|png|webp)$`,
      "i",
    );
    for (const fn of existing) {
      if (slugFileRe.test(fn)) {
        filesToCommit[`${IMG_DIR}/${fn}`] = null;
      }
    }

    // Process each URL in order
    const baseHost = (req.headers["x-forwarded-host"] || req.headers.host) as string;
    const proto = (req.headers["x-forwarded-proto"] as string) || "https";
    const siteOrigin = `${proto}://${baseHost}`;

    const saved: string[] = [];
    for (let i = 0; i < urls.length; i++) {
      let url: string = urls[i];

      // Re-host local-path entries through the live site so downloadAndCompress
      // can fetch them via HTTP. Strip cache-bust query strings if any.
      if (url.startsWith("/cars/figma/")) {
        url = siteOrigin + url.replace(/\?.*$/, "");
      }

      const buf = await downloadAndCompress(url);
      if (!buf) continue;
      const filename = `${slug}-${saved.length + 1}.jpg`;
      filesToCommit[`${IMG_DIR}/${filename}`] = buf;
      saved.push(filename);
    }

    // Update the JSON entry
    car.image_files = saved;
    car.curated = true;
    filesToCommit[JSON_PATH] = JSON.stringify(cars, null, 2) + "\n";

    await commitFiles(gh, filesToCommit, `picker: update ${slug} (${saved.length} images)`);

    return res.status(200).json({
      saved,
      message:
        "Committed to GitHub — Vercel will redeploy in ~60s and the new images will be live.",
    });
  } catch (e: any) {
    return res.status(500).json({ error: e.message ?? String(e) });
  }
}
