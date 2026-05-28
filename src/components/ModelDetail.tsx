import type { Model } from "../data/cars";
import { getVariationImages } from "../data/figmaImages";

export function ModelDetail({ model, onClose }: { model: Model; onClose: () => void }) {
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
      <div className="mx-auto max-w-7xl pt-8 pb-32 md:pt-12">
        <div className="flex items-start gap-5 overflow-x-auto pb-4 px-6 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {model.variations.map((v) => {
            const figmaImgs = getVariationImages(v.name, v.year);
            const primary   = figmaImgs[0] ?? model.image;
            const secondary = figmaImgs[1] ?? null;

            return (
              <div key={v.id} className="w-72 shrink-0 overflow-hidden rounded-xl bg-white shadow md:w-80">
                {/* Primary photo */}
                <div className="aspect-[4/3] overflow-hidden bg-surface">
                  <img
                    src={primary}
                    alt={v.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Secondary photo when available */}
                {secondary && (
                  <div className="aspect-[4/3] overflow-hidden bg-surface border-t border-neutral-100">
                    <img
                      src={secondary}
                      alt={`${v.name} — alternate`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="border-t border-neutral-200 p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-base font-bold leading-tight tracking-tight md:text-lg">
                      {v.name}
                    </h3>
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
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{v.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
