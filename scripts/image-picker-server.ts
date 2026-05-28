/**
 * Vite dev-server middleware exposing two endpoints used by the in-page
 * image picker:
 *
 *   POST /api/search-images   { query, page }       → { urls: [...] }
 *   POST /api/save-selection  { slug, urls }        → { saved: [...] }
 *
 * Only mounted when running `vite dev` — in production builds the routes
 * don't exist and the picker UI is hidden.
 */
import type { Plugin, ViteDevServer } from "vite";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(PROJECT_ROOT, "src/data/figma-cars.json");
const IMG_DIR = path.join(PROJECT_ROOT, "public/cars/figma");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

const BAD_TOKENS = [
  "thumb", "thumbnail", "_small", "preview", "icon", "favicon",
  "-150x", "-300x", "-360x", "-460x", "-560x", "-768x", "-770x",
];

const PAGE_SIZE = 10;

async function ddgFetch(url: string, extraHeaders: Record<string, string> = {}) {
  const res = await fetch(url, { headers: { "User-Agent": UA, ...extraHeaders } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res;
}

async function getVqd(query: string): Promise<string | null> {
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;
  const res = await ddgFetch(url);
  const html = await res.text();
  const m =
    /vqd=['"]([\d-]+)['"]/.exec(html) ||
    /vqd=([\d-]+)/.exec(html);
  return m ? m[1] : null;
}

async function searchImages(query: string): Promise<string[]> {
  const vqd = await getVqd(query);
  if (!vqd) return [];
  const api =
    "https://duckduckgo.com/i.js?" +
    new URLSearchParams({
      l: "us-en",
      o: "json",
      q: query,
      vqd,
      f: ",,,,,",
      p: "1",
      v7exp: "a",
    }).toString();
  const res = await ddgFetch(api, {
    Referer: "https://duckduckgo.com/",
    Accept: "application/json, text/javascript, */*; q=0.01",
  });
  const data = (await res.json()) as { results?: Array<{ image?: string }> };
  return (data.results ?? [])
    .map((r) => r.image)
    .filter((u): u is string => !!u)
    .filter((u) => !BAD_TOKENS.some((t) => u.toLowerCase().includes(t)));
}

async function readJson() {
  return JSON.parse(await fs.readFile(JSON_PATH, "utf8")) as Array<{
    slug: string;
    image_files: string[];
    curated?: boolean;
  }>;
}

async function writeJson(data: unknown) {
  await fs.writeFile(JSON_PATH, JSON.stringify(data, null, 2));
}

async function downloadAndCompress(url: string, dest: string): Promise<boolean> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength < 10_000) return false;
    await fs.writeFile(dest, buf);
    // Compress + resize with sips (macOS)
    spawnSync("sips", ["-Z", "1200", "-s", "format", "jpeg", dest, "--out", dest, "-s", "formatOptions", "80"], { stdio: "ignore" });
    const st = await fs.stat(dest);
    if (st.size < 30_000) {
      await fs.unlink(dest).catch(() => {});
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

async function readBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res: any, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

// In-memory cache: query → full list of result URLs (so "Load more" doesn't
// re-hit DDG every time)
const queryCache = new Map<string, string[]>();

export function imagePickerPlugin(): Plugin {
  return {
    name: "image-picker-server",
    apply: "serve",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api/search-images", async (req, res) => {
        if (req.method !== "POST") return sendJson(res, 405, { error: "POST only" });
        try {
          const { query, page = 0 } = await readBody(req);
          if (!query) return sendJson(res, 400, { error: "missing query" });
          if (!queryCache.has(query)) {
            queryCache.set(query, await searchImages(query));
          }
          const all = queryCache.get(query)!;
          const slice = all.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
          sendJson(res, 200, { urls: slice, total: all.length, page });
        } catch (e: any) {
          sendJson(res, 500, { error: e.message ?? String(e) });
        }
      });

      server.middlewares.use("/api/save-selection", async (req, res) => {
        if (req.method !== "POST") return sendJson(res, 405, { error: "POST only" });
        try {
          const { slug, urls } = await readBody(req);
          if (!slug || !Array.isArray(urls)) return sendJson(res, 400, { error: "slug+urls required" });

          const cars = await readJson();
          const car = cars.find((c) => c.slug === slug);
          if (!car) return sendJson(res, 404, { error: "slug not found" });

          // Some entries in `urls` may be existing local files (e.g.
          // "/cars/figma/enzo-2002-1.jpg") — read those into memory first so
          // they survive the wipe below.
          const cachedLocal = new Map<string, Buffer>();
          for (const url of urls) {
            const localMatch = /^\/cars\/figma\/(.+?)(?:\?.*)?$/.exec(url);
            if (localMatch) {
              const fp = path.join(IMG_DIR, localMatch[1]);
              try {
                cachedLocal.set(url, await fs.readFile(fp));
              } catch {
                // local file gone, will skip below
              }
            }
          }

          // Delete existing files for this slug
          const existing = await fs.readdir(IMG_DIR);
          const slugFileRe = new RegExp(`^${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-\\d+\\.(jpg|jpeg|png|webp)$`, "i");
          for (const fn of existing) {
            if (slugFileRe.test(fn)) {
              await fs.unlink(path.join(IMG_DIR, fn)).catch(() => {});
            }
          }

          const saved: string[] = [];
          for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const dest = path.join(IMG_DIR, `${slug}-${i + 1}.jpg`);
            const cached = cachedLocal.get(url);
            if (cached) {
              await fs.writeFile(dest, cached);
              saved.push(path.basename(dest));
            } else if (await downloadAndCompress(url, dest)) {
              saved.push(path.basename(dest));
            }
          }

          car.image_files = saved;
          car.curated = true;
          await writeJson(cars);

          sendJson(res, 200, { saved });
        } catch (e: any) {
          sendJson(res, 500, { error: e.message ?? String(e) });
        }
      });
    },
  };
}
