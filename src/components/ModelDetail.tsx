import { useState } from "react";
import type { Model } from "../data/cars";
import { getVariationImages, slugifyVariation } from "../data/figmaImages";
import { ImagePicker } from "./ImagePicker";

// Only show the picker in dev — in production builds the API endpoints don't exist.
const isDev = import.meta.env.DEV;

export function ModelDetail({ model, onClose }: { model: Model; onClose: () => void }) {
  // Which variation's image picker is open, by variation id
  const [picking, setPicking] = useState<string | null>(null);
  // Bump this to force img tags to refetch after a save
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-canvas">
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed right-6 top-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-black/5 text-neutral-900 backdrop-blur hover:bg-black/10 md:right-12 md:top-12"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M6 6 L18 18 M18 6 L6 18" />
        </svg>
      </button>

      {/* Title + tags */}
      <div className="mx-auto max-w-7xl px-6 pt-20 md:px-12 md:pt-28">
        <div className="text-xs uppercase tracking-[0.2em] text-stone-400">{model.year}</div>
        <h2 className="mt-1 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
          {model.name}
        </h2>
        {model.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {model.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-neutral-200 bg-surface px-2.5 py-0.5 text-[11px] uppercase tracking-[0.15em] text-stone-500"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Variation cards */}
      <div className="w-full pt-8 pb-32 md:pt-12">
        <div className="flex items-start gap-5 overflow-x-auto pb-4 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 md:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] md:pr-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {model.variations.map((v) => {
            const figmaImgs = getVariationImages(v.name, v.year);
            const images = figmaImgs.length > 0 ? figmaImgs : [model.image];
            const slug = slugifyVariation(v.name, v.year);

            return (
              <div key={v.id} className="w-72 shrink-0 md:w-80">
                {/* Header: name, year, power — above the images */}
                <div className="px-1 pb-3">
                  <div className="flex items-baseline justify-between gap-2">
                    {isDev ? (
                      <button
                        type="button"
                        onClick={() => setPicking(v.id)}
                        className="text-left font-display text-base font-bold leading-tight tracking-tight underline-offset-4 hover:underline md:text-lg"
                        title="Click to pick images"
                      >
                        {v.name}
                      </button>
                    ) : (
                      <h3 className="font-display text-base font-bold leading-tight tracking-tight md:text-lg">
                        {v.name}
                      </h3>
                    )}
                    <span className="shrink-0 text-xs text-stone-400">{v.year}</span>
                  </div>
                  {v.power && (
                    <div
                      className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.15em]"
                      style={{ backgroundColor: "rgba(212,0,0,0.10)", color: "var(--color-rosso-deep)" }}
                    >
                      {v.power}
                    </div>
                  )}
                </div>

                {/* All photos at natural aspect ratio, 10px gap between them */}
                <div className="flex flex-col gap-[10px]">
                  {images.map((src, i) => (
                    <img
                      key={`${src}?${refreshKey}`}
                      src={`${src}?v=${refreshKey}`}
                      alt={i === 0 ? v.name : `${v.name} — photo ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-auto rounded-[10px]"
                    />
                  ))}
                </div>

                {/* Description: below the images, paragraphs separated by blank lines */}
                <div className="px-1 pt-3 text-sm leading-relaxed text-neutral-600 space-y-3">
                  {v.description.split(/\n\s*\n/).map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Image picker modal */}
                {isDev && picking === v.id && (
                  <ImagePicker
                    slug={slug}
                    initialQuery={`Ferrari ${v.name}`}
                    currentlySelected={figmaImgs}
                    onClose={() => setPicking(null)}
                    onSaved={() => {
                      setPicking(null);
                      setRefreshKey((k) => k + 1);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
