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
    if (!queryCache.has(query)) {
      queryCache.set(query, await searchImages(query));
    }
    const all = queryCache.get(query)!;
    const slice = all.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    return res.status(200).json({ results: slice, total: all.length, page });
  } catch (e: any) {
    return res.status(500).json({ error: e.message ?? String(e) });
  }
}
