import { useEffect, useState } from "react";

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

export function ImagePicker({ slug, initialQuery, currentlySelected, onClose, onSaved }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [urls, setUrls] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Ordered list — order is what gets saved (and is user-reorderable via drag).
  const [selected, setSelected] = useState<string[]>([...currentlySelected]);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // Fetch a page of results
  const fetchPage = async (q: string, pageIdx: number, append: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/search-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, page: pageIdx }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "search failed");
      setUrls((prev) => (append ? [...prev, ...data.urls] : data.urls));
      setTotal(data.total ?? 0);
      setPage(pageIdx);
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  // Initial load + on new query submission
  useEffect(() => {
    fetchPage(submittedQuery, 0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submittedQuery]);

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
      const res = await fetch("/api/save-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, urls: selected }),
      });
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
            {total > 0 && ` · ${urls.length} of ${total} loaded`}
          </span>
          {error && <span className="text-red-600">{error}</span>}
        </div>

        {/* Image grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {urls.map((url) => {
            const isSel = isSelected(url);
            return (
              <button
                key={url}
                type="button"
                onClick={() => toggleSelected(url)}
                className={`group relative aspect-[4/3] overflow-hidden rounded-lg bg-surface ring-2 ring-offset-2 ring-offset-canvas transition ${
                  isSel ? "ring-rosso-deep" : "ring-transparent hover:ring-neutral-300"
                }`}
                style={{ "--tw-ring-color": isSel ? "var(--color-rosso-deep)" : undefined } as React.CSSProperties}
              >
                <img
                  src={url}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    // Hide broken images instead of letting them clutter the grid
                    (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                  }}
                />
                {isSel && (
                  <div className="pointer-events-none absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-white text-neutral-900 shadow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M5 12 L10 17 L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {!loading && urls.length === 0 && (
          <p className="mt-12 text-center text-sm text-stone-500">
            No results. Try a different query.
          </p>
        )}

        {/* Footer: load more + save */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => fetchPage(submittedQuery, page + 1, true)}
            disabled={loading || urls.length >= total}
            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 disabled:opacity-40"
          >
            {loading ? "Loading…" : urls.length >= total ? "No more results" : "Load 10 more"}
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
