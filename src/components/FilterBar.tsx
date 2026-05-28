import type { Filter } from "../data/cars";

export function FilterBar({
  filters,
  activeId,
  onPick,
}: {
  filters: Filter[];
  activeId: string;
  onPick: (id: string) => void;
}) {
  const items = [{ id: "all", label: "All" }, ...filters];

  return (
    <div className="flex justify-center px-6 pb-8 md:px-12">
      <div className="flex rounded-full bg-surface p-1 gap-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => onPick(item.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                active
                  ? "bg-canvas text-stone-900 shadow-sm"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
