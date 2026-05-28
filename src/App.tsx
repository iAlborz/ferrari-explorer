import { useEffect, useState } from "react";
import { FERRARI, allModels, type Category } from "./data/cars";
import { Header } from "./components/Header";
import { CategoryCard } from "./components/CategoryCard";
import { ModelDetail } from "./components/ModelDetail";

// Parse the model id from the URL path. "/m/f50" → "f50". "/" → null.
function modelIdFromPath(pathname: string): string | null {
  const m = pathname.match(/^\/m\/([^/]+)\/?$/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function App() {
  const [activeModelId, setActiveModelId] = useState<string | null>(() =>
    modelIdFromPath(window.location.pathname)
  );

  const activeModel = activeModelId
    ? allModels(FERRARI).find((m) => m.id === activeModelId) ?? null
    : null;

  // Group certain categories into a single card on the home screen.
  // First id in each group determines where the group appears in the strip.
  const HOME_GROUPS: string[][] = [
    ["ev", "front-v12-4door", "front-v12-gt"],
    ["front-v12", "mid-flat12", "front-v12-vintage"],
    ["mid-v8-hybrid", "mid-v8"],
  ];
  const categoryGroups: Category[][] = (() => {
    const byId = new Map(FERRARI.categories.map((c) => [c.id, c]));
    const groupByMember = new Map<string, string[]>();
    HOME_GROUPS.forEach((g) => g.forEach((id) => groupByMember.set(id, g)));
    const consumed = new Set<string>();
    const result: Category[][] = [];
    for (const cat of FERRARI.categories) {
      if (consumed.has(cat.id)) continue;
      const group = groupByMember.get(cat.id);
      if (group) {
        if (group[0] !== cat.id) {
          consumed.add(cat.id);
          continue;
        }
        const cats = group.map((id) => byId.get(id)).filter(Boolean) as Category[];
        cats.forEach((c) => consumed.add(c.id));
        result.push(cats);
      } else {
        result.push([cat]);
        consumed.add(cat.id);
      }
    }
    return result;
  })();

  // Open a model: push the URL.
  const openModel = (id: string) => {
    window.history.pushState({}, "", `/m/${encodeURIComponent(id)}`);
    setActiveModelId(id);
  };

  // Close: go back so browser history stays clean.
  const closeModel = () => {
    if (modelIdFromPath(window.location.pathname)) {
      window.history.back();
    } else {
      setActiveModelId(null);
    }
  };

  // Sync state with URL on browser back/forward.
  useEffect(() => {
    const onPopState = () => setActiveModelId(modelIdFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Lock body scroll while the ModelDetail overlay is open.
  useEffect(() => {
    document.body.style.overflow = activeModel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModel]);

  // Esc closes the model overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModel) closeModel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModel]);

  return (
    <div className="min-h-screen">
      <Header brandName={FERRARI.name} />

      <main className="pb-24">
        <div className="flex items-start gap-5 overflow-x-auto px-6 md:px-12 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryGroups.map((group) => (
            <CategoryCard
              key={group.map((c) => c.id).join("+")}
              categories={group}
              onOpenModel={openModel}
            />
          ))}
        </div>
      </main>

      {activeModel && <ModelDetail model={activeModel} onClose={closeModel} />}
    </div>
  );
}
