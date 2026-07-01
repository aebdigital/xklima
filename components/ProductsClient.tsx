"use client";

import { useMemo, useState } from "react";
import { Filter, RotateCcw, Scale } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, uniqueBrands, uniqueCategories } from "@/lib/data";

type ProductsClientProps = {
  initialCategory?: string;
};

export function ProductsClient({ initialCategory = "" }: ProductsClientProps) {
  const brands = uniqueBrands();
  const categories = uniqueCategories();
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState(initialCategory || "all");
  const [minPower, setMinPower] = useState(0);
  const [area, setArea] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const brandMatch = brand === "all" || product.brand === brand;
      const categoryMatch = category === "all" || product.category === category;
      const powerMatch = product.variants.some((variant) => variant.powerKw >= minPower);
      const areaMatch = area === 0 || product.maxM2 >= area;

      return brandMatch && categoryMatch && powerMatch && areaMatch;
    });
  }, [area, brand, category, minPower]);

  const selectedProducts = products.filter((product) => selected.includes(product.slug));

  function toggleCompare(slug: string) {
    setSelected((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      if (current.length >= 4) {
        return [...current.slice(1), slug];
      }

      return [...current, slug];
    });
  }

  function reset() {
    setBrand("all");
    setCategory("all");
    setMinPower(0);
    setArea(0);
  }

  return (
    <div className="container-x section-y">
      <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h1 className="max-w-3xl text-4xl font-black text-ink md:text-6xl">Klimatizácie</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-graphite">
            Porovnajte modely podľa výkonu, značky a odporúčanej plochy. Vybraný variant odošlite ako nezáväzný dopyt.
          </p>
        </div>
        <a
          href="#compare"
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-4 py-3 text-sm font-bold text-ink shadow-sm transition hover:border-hvac-aqua hover:text-hvac-blue"
        >
          <Scale size={17} aria-hidden="true" />
          Porovnávač
        </a>
      </div>

      <div className="mb-8 rounded-lg border border-line bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-ink">
          <Filter size={17} aria-hidden="true" />
          Filter
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <label className="grid gap-2 text-sm font-semibold text-graphite">
            Kategória
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="focus-ring h-11 rounded-md border border-line bg-frost px-3 font-bold text-ink"
            >
              <option value="all">Všetky</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-graphite">
            Značka
            <select
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              className="focus-ring h-11 rounded-md border border-line bg-frost px-3 font-bold text-ink"
            >
              <option value="all">Všetky značky</option>
              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-graphite">
            Minimálny výkon
            <select
              value={minPower}
              onChange={(event) => setMinPower(Number(event.target.value))}
              className="focus-ring h-11 rounded-md border border-line bg-frost px-3 font-bold text-ink"
            >
              <option value={0}>Ľubovoľný</option>
              <option value={2.5}>od 2.5 kW</option>
              <option value={3.5}>od 3.5 kW</option>
              <option value={5}>od 5.0 kW</option>
              <option value={8}>od 8.0 kW</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-graphite">
            Priestor
            <select
              value={area}
              onChange={(event) => setArea(Number(event.target.value))}
              className="focus-ring h-11 rounded-md border border-line bg-frost px-3 font-bold text-ink"
            >
              <option value={0}>Ľubovoľné m2</option>
              <option value={25}>aspoň 25 m2</option>
              <option value={40}>aspoň 40 m2</option>
              <option value={55}>aspoň 55 m2</option>
              <option value={120}>aspoň 120 m2</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-sm font-semibold text-graphite">
            Zobrazené: <span className="text-ink">{filtered.length}</span> produktov
          </p>
          <button
            type="button"
            onClick={reset}
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-bold text-ink transition hover:bg-mist"
          >
            <RotateCcw size={15} aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            selected={selected.includes(product.slug)}
            onCompare={toggleCompare}
          />
        ))}
      </div>

      <section id="compare" className="mt-14 scroll-mt-24">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase text-hvac-green">Porovnávač</p>
            <h2 className="text-3xl font-bold text-ink">Porovnanie vybraných produktov</h2>
          </div>
          {selected.length > 0 ? (
            <button
              type="button"
              onClick={() => setSelected([])}
              className="focus-ring rounded-md border border-line px-3 py-2 text-sm font-bold text-ink hover:bg-mist"
            >
              Vyčistiť
            </button>
          ) : null}
        </div>

        {selectedProducts.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-line bg-white">
            <table className="min-w-[760px] w-full border-collapse text-left text-sm">
              <thead className="bg-mist text-ink">
                <tr>
                  <th className="w-40 px-4 py-3 font-bold">Parameter</th>
                  {selectedProducts.map((product) => (
                    <th key={product.slug} className="px-4 py-3 font-bold">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {["brand", "category", "power", "area", "tags", "noise"].map((row) => (
                  <tr key={row}>
                    <th className="bg-frost px-4 py-3 font-bold text-graphite">
                      {row === "brand"
                        ? "Značka"
                        : row === "category"
                          ? "Kategória"
                          : row === "power"
                            ? "Výkon"
                            : row === "area"
                              ? "m2"
                              : row === "noise"
                                ? "Hlučnosť"
                                : "Tagy"}
                    </th>
                    {selectedProducts.map((product) => (
                      <td key={`${product.slug}-${row}`} className="px-4 py-3 font-semibold text-ink">
                        {row === "brand"
                          ? product.brand
                          : row === "category"
                            ? product.category
                            : row === "power"
                              ? product.variants.map((variant) => variant.label).join(", ")
                              : row === "area"
                                ? `do ${product.maxM2} m2`
                                : row === "noise"
                                  ? product.specs["Hlučnosť"] || product.specs["Typ"] || "podľa konfigurácie"
                                  : product.tags.join(", ")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center">
            <Scale className="mx-auto mb-3 text-hvac-blue" size={28} aria-hidden="true" />
            <p className="font-semibold text-ink">Vyberte 2 až 4 produkty pomocou tlačidla Porovnať.</p>
          </div>
        )}
      </section>

      {selected.length > 0 ? (
        <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100vw-32px)] max-w-[680px] -translate-x-1/2 rounded-lg border border-line bg-white p-3 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-bold text-ink">{selected.length} produktov v porovnávači</span>
            <a href="#compare" className="focus-ring rounded-md bg-hvac-blue px-4 py-2 text-sm font-bold text-white">
              Zobraziť porovnanie
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
