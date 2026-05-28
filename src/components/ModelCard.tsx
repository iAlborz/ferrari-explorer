import type { Model } from "../data/cars";

export function ModelCard({ model, onOpen }: { model: Model; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="card block w-72 shrink-0 overflow-hidden rounded-xl bg-white text-left shadow hover:shadow-xl hover:scale-105 md:w-80"
    >
      <div className="px-4 pt-3.5 pb-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
            {model.name}
          </h3>
          <span className="shrink-0 text-xs text-neutral-500">{model.year}</span>
        </div>
        <p className="mt-0.5 line-clamp-1 text-sm text-neutral-600">{model.tagline}</p>
      </div>
      <div className="aspect-[4/3] w-full overflow-hidden bg-white p-3 pt-0">
        <img
          src={model.image}
          alt={model.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    </button>
  );
}
