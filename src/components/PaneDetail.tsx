import type { Model } from "../data/cars";
import { ModelCard } from "./ModelCard";

export function PaneDetail({
  title,
  blurb,
  models,
  onClose,
  onOpenModel,
}: {
  title: string;
  blurb: string;
  models: Model[];
  onClose: () => void;
  onOpenModel: (id: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-30 overflow-y-auto bg-canvas">
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed right-6 top-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-black/5 text-neutral-900 backdrop-blur hover:bg-black/10 md:right-12 md:top-12"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M6 6 L18 18 M18 6 L6 18" />
        </svg>
      </button>

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 md:px-12 md:pt-32">
        <div className="max-w-3xl">
          <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-neutral-600 md:text-xl">{blurb}</p>
          <div className="mt-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
            {models.length} {models.length === 1 ? "model" : "models"}
          </div>
        </div>

        <ul className="mt-12 flex items-start gap-5 overflow-x-auto pb-4 md:mt-16 -mx-6 px-6 md:-mx-12 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {models.map((m) => (
            <li key={m.id} className="w-72 shrink-0 md:w-80">
              <ModelCard model={m} onOpen={() => onOpenModel(m.id)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
