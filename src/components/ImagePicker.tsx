import { useEffect, useState } from "react";

type SearchResult = {
  image: string;
  title: string;
  url: string;
  source: string;
};

type Props = {
  /** slug used to save the selection on disk + JSON */
  slug: string;
  /** initial search query (model name + year) */
  initialQuery: string;
  /** image URLs (or local paths) currently in use, prefilled as selected */
  currentlySelected: string[];
  onClose: () => void;
  /** Called after a successful save so the parent can refresh */
  onSaved?: (files: string[]) => void;
};

/** Strip any existing `site:<host>` clause so we can replace it cleanly. */
function withoutSiteFilter(q: string): string {
  return q.replace(/\s*site:\S+\s*/gi, " ").replace(/\s+/g, " ").trim();
}

const PW_KEY = "ferrari-picker-auth";
const getStoredPassword = (): string => localStorage.getItem(PW_KEY) ?? "";
const setStoredPassword = (pw: string) => localStorage.setItem(PW_KEY, pw);
const clearStoredPassword = () => localStorage.removeItem(PW_KEY);

/** Wrap fetch so every picker API call carries the saved password header. */
async function pickerFetch(url: string, init: RequestInit = {}): Promise<Response> {
  return fetch(url, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      "X-Picker-Auth": getStoredPassword(),
    },
  });
}

export function ImagePicker({ slug, initialQuery, currentlySelected, onClose, onSaved }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Ordered list — order is what gets saved (and is user-reorderable via drag).
  const [selected, setSelected] = useState<string[]>([...currentlySelected]);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  // Auth state — when null we don't know yet, true = ok, false = needs password.
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  // On mount: verify the stored password (if any) against /api/auth-check.
  useEffect(() => {
    (async () => {
      try {
        const res = await pickerFetch("/api/auth-check");
        const data = await res.json();
        if (!data.authRequired) {
          setAuthed(true); // no password configured server-side
        } else {
          setAuthed(res.ok); // 200 → ok, 401 → needs prompt
        }
      } catch {
        setAuthed(false);
      }
    })();
  }, []);

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setStoredPassword(pwInput);
    const res = await pickerFetch("/api/auth-check");
    if (res.ok) {
      setAuthed(true);
      setPwInput("");
    } else {
      clearStoredPassword();
      setPwError("Wrong password.");
    }
  };

  // Fetch a page of results
  const fetchPage = async (q: string, pageIdx: number, append: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const res = await pickerFetch("/api/search-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, page: pageIdx }),
      });
      if (res.status === 401) {
        clearStoredPassword();
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "search failed");
      const newResults: SearchResult[] = data.results ?? [];
      setResults((prev) => (append ? [...prev, ...newResults] : newResults));
      setTotal(data.total ?? 0);
      setPage(pageIdx);
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  /** Replace the search query with `<base> site:<host>` and re-run. */
  const narrowToSource = (host: string) => {
    if (!host) return;
    const base = withoutSiteFilter(query);
    const next = `${base} site:${host}`.trim();
    setQuery(next);
    setSubmittedQuery(next);
  };

  // Initial load + on new query submission — only after auth is confirmed.
  useEffect(() => {
    if (authed) fetchPage(submittedQuery, 0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submittedQuery, authed]);

  const isSelected = (url: string) => selected.includes(url);

  const toggleSelected = (url: string) => {
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  /** Move selected[fromIdx] to position toIdx (before the item currently there). */
  const reorder = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) return;
    setSelected((prev) => {
      const next = [...prev];
      const [item] = next.splice(fromIdx, 1);
      // After removal, indices >= fromIdx shift left by 1
      const insertAt = toIdx > fromIdx ? toIdx - 1 : toIdx;
      next.splice(insertAt, 0, item);
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await pickerFetch("/api/save-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, urls: selected }),
      });
      if (res.status === 401) {
        clearStoredPassword();
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "save failed");
      onSaved?.(data.saved as string[]);
      onClose();
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setSaving(false);
    }
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && query !== submittedQuery) {
      setSubmittedQuery(query.trim());
    }
  };

  // While checking auth — show nothing yet to avoid a flash.
  if (authed === null) return null;

  // Not authed → password prompt, blocking the rest of the UI.
  if (authed === false) {
    return (
      <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
        <form
          onSubmit={submitPassword}
          onClick={(e) => e.stopPropagation()}
          className="w-[20rem] rounded-2xl bg-canvas p-6 shadow-2xl"
        >
          <h2 className="font-display text-xl font-bold tracking-tight">Password required</h2>
          <p className="mt-1 text-sm text-stone-500">
            Enter the picker password to edit images. Your browser remembers it.
          </p>
          <input
            type="password"
            autoFocus
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            className="mt-4 w-full rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm outline-none focus:border-neutral-500"
          />
          {pwError && <p className="mt-2 text-xs text-red-600">{pwError}</p>}
          <div className="mt-4 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm text-stone-600 hover:text-stone-900">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white">
              Unlock
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-auto my-8 max-w-5xl rounded-2xl bg-canvas p-6 shadow-2xl md:my-12 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Pick images for <span className="italic">{slug}</span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full bg-black/5 hover:bg-black/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6 L18 18 M18 6 L6 18" />
            </svg>
          </button>
        </div>

        {/* Currently selected — always visible, persists across searches */}
        <div className="mt-5 rounded-xl border border-neutral-200 bg-white p-3">
          <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500">
            Selected · {selected.length}
          </div>
          {selected.length === 0 ? (
            <div className="py-6 text-center text-sm text-stone-400">
              No images selected yet. Pick from the search results below.
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {selected.map((url, idx) => (
                <div
                  key={url}
                  draggable
                  onDragStart={() => setDragIndex(idx)}
                  onDragEnd={() => setDragIndex(null)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (dragIndex === null || dragIndex === idx) return;
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (dragIndex !== null) reorder(dragIndex, idx);
                    setDragIndex(null);
                  }}
                  className={`group relative shrink-0 cursor-grab active:cursor-grabbing ${
                    dragIndex === idx ? "opacity-40" : ""
                  }`}
                  title="Drag to reorder"
                >
                  <img
                    src={url}
                    alt=""
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    draggable={false}
                    className="pointer-events-none h-20 w-28 rounded-md object-cover"
                  />
                  <div className="pointer-events-none absolute left-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-white/90 text-[10px] font-bold text-neutral-900">
                    {idx + 1}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSelected(url)}
                    aria-label="Remove from selection"
                    className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-neutral-900 text-white shadow hover:bg-neutral-700"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M6 6 L18 18 M18 6 L6 18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search box */}
        <form onSubmit={handleQuerySubmit} className="mt-5 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search query"
            className="flex-1 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm outline-none focus:border-neutral-500"
          />
          <button
            type="submit"
            disabled={query.trim() === submittedQuery}
            className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Search
          </button>
        </form>

        {/* Status row */}
        <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
          <span>
            {selected.length} selected
            {total > 0 && ` · ${results.length} of ${total} loaded`}
          </span>
          {error && <span className="text-red-600">{error}</span>}
        </div>

        {/* Image grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((r) => {
            const isSel = isSelected(r.image);
            const tooltip = [r.title, r.source].filter(Boolean).join(" — ");
            return (
              <div
                key={r.image}
                className={`group relative aspect-[4/3] overflow-hidden rounded-lg bg-surface ring-2 ring-offset-2 ring-offset-canvas transition ${
                  isSel ? "ring-rosso-deep" : "ring-transparent group-hover:ring-neutral-300"
                }`}
                style={{ "--tw-ring-color": isSel ? "var(--color-rosso-deep)" : undefined } as React.CSSProperties}
                title={tooltip}
              >
                <button
                  type="button"
                  onClick={() => toggleSelected(r.image)}
                  className="absolute inset-0 block w-full"
                  aria-label={r.title || "Select image"}
                >
                  <img
                    src={r.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget.closest(".group") as HTMLElement | null)?.style.setProperty("display", "none");
                    }}
                  />
                </button>

                {/* Hover overlay: title + source + "narrow to source" button */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto">
                  {r.title && (
                    <div className="line-clamp-2 text-[11px] font-medium leading-snug text-white">
                      {r.title}
                    </div>
                  )}
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="truncate text-[10px] text-white/70">{r.source}</span>
                    {r.source && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); narrowToSource(r.source); }}
                        className="shrink-0 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-medium text-neutral-900 hover:bg-white"
                        title={`Search only on ${r.source}`}
                      >
                        site:{r.source}
                      </button>
                    )}
                  </div>
                </div>

                {isSel && (
                  <div className="pointer-events-none absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-white text-neutral-900 shadow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M5 12 L10 17 L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {!loading && results.length === 0 && (
          <p className="mt-12 text-center text-sm text-stone-500">
            No results. Try a different query.
          </p>
        )}

        {/* Footer: load more + save */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => fetchPage(submittedQuery, page + 1, true)}
            disabled={loading || results.length >= total}
            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 disabled:opacity-40"
          >
            {loading ? "Loading…" : results.length >= total ? "No more results" : "Load 10 more"}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-sm text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving || selected.length === 0}
              className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              {saving ? "Saving…" : `Save ${selected.length} image${selected.length === 1 ? "" : "s"}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
