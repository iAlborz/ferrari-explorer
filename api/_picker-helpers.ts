/**
 * Shared helpers for the picker API: auth check, DDG image search, GitHub commit.
 * Runs as Vercel Node serverless functions.
 */
import sharp from "sharp";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

const BAD_TOKENS = [
  "thumb", "thumbnail", "_small", "preview", "icon", "favicon",
  "-150x", "-300x", "-360x", "-460x", "-560x", "-768x", "-770x",
];

export type SearchResult = {
  image: string;
  title: string;
  url: string;
  source: string;
};

/** Return true if request carries the correct picker password. */
export function checkAuth(req: any): boolean {
  const required = process.env.PICKER_PASSWORD;
  if (!required) return true; // not configured = open access
  const provided = req.headers?.["x-picker-auth"];
  return provided === required;
}

/** Step 1: scrape the DDG search-page HTML for a vqd token. */
async function getVqd(query: string): Promise<string | null> {
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    console.warn(`[picker] vqd page returned ${res.status}`);
    return null;
  }
  const html = await res.text();
  const m = /vqd=['"]([\d-]+)['"]/.exec(html) || /vqd=([\d-]+)/.exec(html);
  if (!m) console.warn(`[picker] no vqd token in ${html.length}-byte HTML; preview: ${html.slice(0, 200)}`);
  return m ? m[1] : null;
}

/** Step 2: hit the i.js endpoint with that token and parse results. */
export async function searchImages(query: string): Promise<SearchResult[]> {
  const vqd = await getVqd(query);
  if (!vqd) return [];
  const api =
    "https://duckduckgo.com/i.js?" +
    new URLSearchParams({
      l: "us-en", o: "json", q: query, vqd, f: ",,,,,", p: "1", v7exp: "a",
    }).toString();
  const res = await fetch(api, {
    headers: {
      "User-Agent": UA,
      Referer: "https://duckduckgo.com/",
      Accept: "application/json, text/javascript, */*; q=0.01",
    },
  });
  if (!res.ok) {
    console.warn(`[picker] i.js returned ${res.status}`);
    return [];
  }
  let data: { results?: Array<{ image?: string; title?: string; url?: string }> };
  try {
    data = await res.json();
  } catch (e) {
    console.warn(`[picker] i.js JSON parse failed: ${e}`);
    return [];
  }
  return (data.results ?? [])
    .filter((r): r is { image: string; title?: string; url?: string } => !!r.image)
    .filter((r) => !BAD_TOKENS.some((t) => r.image.toLowerCase().includes(t)))
    .map((r) => {
      let source = "";
      try {
        source = r.url ? new URL(r.url).hostname.replace(/^www\./, "") : "";
      } catch {}
      return { image: r.image, title: r.title ?? "", url: r.url ?? "", source };
    });
}

/** Download a URL, normalize via sharp (max 1200px wide, JPEG quality 80). */
export async function downloadAndCompress(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength < 10_000) return null;
    const processed = await sharp(buf)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    if (processed.byteLength < 30_000) return null;
    return processed;
  } catch {
    return null;
  }
}

type GhContext = { owner: string; repo: string; branch: string; token: string };

export function ghContext(): GhContext | null {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/repo"
  if (!token || !repo || !repo.includes("/")) return null;
  const [owner, name] = repo.split("/");
  return {
    owner,
    repo: name,
    branch: process.env.GITHUB_BRANCH || "main",
    token,
  };
}

/**
 * Commit a set of file changes to GitHub in a single tree+commit.
 * `files` keyed by repo-relative path. Value is Buffer (write), null (delete),
 * or string (write as utf-8 text).
 */
export async function commitFiles(
  gh: GhContext,
  files: Record<string, Buffer | string | null>,
  message: string,
): Promise<void> {
  const { Octokit } = await import("@octokit/rest");
  const oct = new Octokit({ auth: gh.token });

  // Resolve the current branch tip
  const ref = await oct.git.getRef({
    owner: gh.owner,
    repo: gh.repo,
    ref: `heads/${gh.branch}`,
  });
  const headSha = ref.data.object.sha;
  const headCommit = await oct.git.getCommit({
    owner: gh.owner,
    repo: gh.repo,
    commit_sha: headSha,
  });

  // Upload each non-null file as a blob to get its sha
  const tree: Array<{
    path: string;
    mode: "100644";
    type: "blob";
    sha: string | null;
  }> = [];

  for (const [path, body] of Object.entries(files)) {
    if (body === null) {
      // delete: include with sha=null in the tree update
      tree.push({ path, mode: "100644", type: "blob", sha: null });
      continue;
    }
    const isBuffer = Buffer.isBuffer(body);
    const blob = await oct.git.createBlob({
      owner: gh.owner,
      repo: gh.repo,
      content: isBuffer
        ? (body as Buffer).toString("base64")
        : Buffer.from(body as string, "utf8").toString("base64"),
      encoding: "base64",
    });
    tree.push({ path, mode: "100644", type: "blob", sha: blob.data.sha });
  }

  const newTree = await oct.git.createTree({
    owner: gh.owner,
    repo: gh.repo,
    base_tree: headCommit.data.tree.sha,
    tree,
  });

  const newCommit = await oct.git.createCommit({
    owner: gh.owner,
    repo: gh.repo,
    message,
    tree: newTree.data.sha,
    parents: [headSha],
  });

  await oct.git.updateRef({
    owner: gh.owner,
    repo: gh.repo,
    ref: `heads/${gh.branch}`,
    sha: newCommit.data.sha,
  });
}

/** Read a file from the repo as UTF-8 text. */
export async function readRepoFile(gh: GhContext, path: string): Promise<string> {
  const { Octokit } = await import("@octokit/rest");
  const oct = new Octokit({ auth: gh.token });
  const res = await oct.repos.getContent({
    owner: gh.owner,
    repo: gh.repo,
    path,
    ref: gh.branch,
  });
  const data: any = res.data;
  if (!data || !data.content) throw new Error(`file not found: ${path}`);
  return Buffer.from(data.content, data.encoding || "base64").toString("utf8");
}

/** List files in a repo directory. */
export async function listRepoDir(
  gh: GhContext,
  path: string,
): Promise<string[]> {
  const { Octokit } = await import("@octokit/rest");
  const oct = new Octokit({ auth: gh.token });
  try {
    const res = await oct.repos.getContent({
      owner: gh.owner,
      repo: gh.repo,
      path,
      ref: gh.branch,
    });
    if (!Array.isArray(res.data)) return [];
    return res.data.map((f: any) => f.name);
  } catch {
    return [];
  }
}
