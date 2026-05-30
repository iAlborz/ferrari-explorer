import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkAuth, searchImages } from "./_picker-helpers.js";

const PAGE_SIZE = 10;

// In-memory cache: query → full result list. Persists across invocations within
// a warm serverless container; new container = fresh fetch. Good enough.
const queryCache = new Map<string, Awaited<ReturnType<typeof searchImages>>>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (!checkAuth(req)) return res.status(401).json({ error: "auth required" });

  try {
    const { query, page = 0 } = req.body ?? {};
    if (!query) return res.status(400).json({ error: "missing query" });
    // Only serve from cache if the cached list is non-empty — an empty result
    // probably means we got rate-limited and shouldn't be sticky.
    let all = queryCache.get(query);
    if (!all || all.length === 0) {
      all = await searchImages(query);
      if (all.length > 0) queryCache.set(query, all);
    }
    const slice = all.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    return res.status(200).json({ results: slice, total: all.length, page });
  } catch (e: any) {
    return res.status(500).json({ error: e.message ?? String(e) });
  }
}
