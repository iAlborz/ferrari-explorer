import type { Category } from "../data/cars";

export function CategoryCard({
  categories,
  onOpenModel,
}: {
  categories: Category[];
  onOpenModel: (modelId: string) => void;
}) {
  return (
    <div className="w-72 shrink-0 md:w-80">
      {categories.map((category, idx) => (
        <div key={category.id} className={idx > 0 ? "mt-6" : ""}>
          {/* Title */}
          <div className="px-1 pb-3 text-center">
            <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
              {category.name}
            </h2>
          </div>

          {/* Models stacked newest-first */}
          <div className="flex flex-col gap-[10px]">
            {[...category.models].reverse().map((m) => (
              <button
                key={m.id}
                onClick={() => !m.comingSoon && onOpenModel(m.id)}
                disabled={m.comingSoon}
                className="model-tile group relative block w-full text-left"
              >
                {/* Image / placeholder */}
                {m.comingSoon || !m.image ? (
                  <div className="flex aspect-[3/2] w-full flex-col items-center justify-center rounded-[10px] bg-surface text-center">
                    <div className="font-display text-lg font-bold tracking-tight text-neutral-700">
                      {m.name}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-stone-400">
                      Coming soon
                    </div>
                  </div>
                ) : (
                  <div className="w-full overflow-hidden rounded-[10px]">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block"
                    />
                  </div>
                )}

                {/* Hover chin */}
                <div className="pointer-events-none absolute inset-x-0 -bottom-3 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white shadow-lg">
                    {m.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
