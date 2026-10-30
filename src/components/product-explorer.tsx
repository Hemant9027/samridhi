"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import {
  PRODUCT_CATEGORIES,
  type Product,
  type ProductCategory,
} from "@/lib/products";
import { ProductCard } from "@/components/product-card";

type SortKey = "name-asc" | "name-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "name-asc", label: "Name A–Z" },
  { key: "name-desc", label: "Name Z–A" },
];

function applyFilters(
  all: Product[],
  query: string,
  category: ProductCategory | "all",
  sort: SortKey,
): Product[] {
  const q = query.trim().toLowerCase();
  let list = all.filter((p) =>
    category === "all" ? true : p.category === category,
  );
  if (q) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.form.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q),
    );
  }
  list = [...list].sort((a, b) =>
    sort === "name-asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  );
  return list;
}

export function ProductExplorer({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const [, startTransition] = useTransition();

  const initialCategory = (() => {
    const c = searchParams.get("category");
    return PRODUCT_CATEGORIES.includes(c as ProductCategory)
      ? (c as ProductCategory)
      : "all";
  })();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState<ProductCategory | "all">(initialCategory);
  const [sort, setSort] = useState<SortKey>("name-asc");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () => applyFilters(products, query, category, sort),
    [products, query, category, sort],
  );

  // Keep the URL shareable without reloading the page.
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "all") params.set("category", category);
    const qs = params.toString();
    const id = window.setTimeout(() => {
      startTransition(() => {
        router.replace(`/products${qs ? `?${qs}` : ""}`, { scroll: false });
      });
    }, 150);
    return () => window.clearTimeout(id);
  }, [query, category, router]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const hasFilters = query.trim() !== "" || category !== "all";

  const reset = () => {
    setQuery("");
    setCategory("all");
    searchRef.current?.focus();
  };

  const categoryButtons = (
    <fieldset>
      <legend className="text-xs font-bold uppercase tracking-[0.14em] text-olive-600">
        Category
      </legend>
      <div className="mt-3 space-y-1.5" role="radiogroup" aria-label="Product category">
        {(["all", ...PRODUCT_CATEGORIES] as const).map((c) => {
          const selected = category === c;
          const count =
            c === "all"
              ? products.length
              : products.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setCategory(c)}
              className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-sm transition-colors ${
                selected
                  ? "bg-forest-800 font-semibold text-ivory-50"
                  : "bg-ivory-200/70 text-charcoal-700 hover:bg-forest-100"
              }`}
            >
              <span>{c === "all" ? "All categories" : c}</span>
              <span className={selected ? "text-forest-200" : "text-charcoal-400"}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );

  const grid = (
    <>
      {filtered.length > 0 ? (
        <motion.ul
          layout={!reduceMotion}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.li
                layout={!reduceMotion}
                key={p.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="card mx-auto max-w-lg px-8 py-14 text-center" role="status">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest-100">
            <Search className="h-5 w-5 text-forest-700" aria-hidden />
          </div>
          <h2 className="mt-4 font-serif text-xl font-semibold text-charcoal-950">
            No products match your search
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
            Try a different name, or clear the filters to see the full catalogue.
          </p>
          <button type="button" onClick={reset} className="btn btn-outline btn-sm mt-6">
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset filters
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar filters */}
      <aside className="hidden lg:block">
        <div className="card sticky top-24 space-y-6 p-5">
          {categoryButtons}
          <div>
            <label
              htmlFor="product-sort"
              className="text-xs font-bold uppercase tracking-[0.14em] text-olive-600"
            >
              Sort by
            </label>
            <select
              id="product-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="field-input mt-3"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          {hasFilters ? (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-800"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Reset filters
            </button>
          ) : null}
        </div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400"
              aria-hidden
            />
            <label htmlFor="product-search" className="sr-only">
              Search products by name
            </label>
            <input
              ref={searchRef}
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, e.g. Samortho"
              className="field-input pl-10!"
              autoComplete="off"
            />
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="btn btn-outline btn-sm lg:hidden"
            aria-haspopup="dialog"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filters
            {category !== "all" ? (
              <span className="ml-1 rounded-full bg-forest-800 px-1.5 text-[0.65rem] font-bold text-ivory-50">
                1
              </span>
            ) : null}
          </button>
        </div>

        <p className="mt-4 text-sm text-charcoal-500" role="status">
          Showing <strong className="text-charcoal-800">{filtered.length}</strong> of{" "}
          {products.length} products
        </p>

        <div className="mt-5">{grid}</div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.button
              type="button"
              aria-label="Close filters"
              className="absolute inset-0 bg-charcoal-950/40"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: "100%" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-ivory-50 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-ivory-300 px-5 py-4">
                <span className="font-serif text-lg font-semibold text-charcoal-950">
                  Filters
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ivory-300 text-charcoal-700"
                >
                  <X className="h-4.5 w-4.5" aria-hidden />
                </button>
              </div>
              <div className="flex-1 space-y-6 overflow-y-auto p-5">
                {categoryButtons}
                <div>
                  <label
                    htmlFor="product-sort-mobile"
                    className="text-xs font-bold uppercase tracking-[0.14em] text-olive-600"
                  >
                    Sort by
                  </label>
                  <select
                    id="product-sort-mobile"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="field-input mt-3"
                  >
                    {SORTS.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 border-t border-ivory-300 p-5">
                <button type="button" onClick={reset} className="btn btn-outline btn-sm flex-1">
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="btn btn-primary btn-sm flex-1"
                >
                  Show {filtered.length}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
