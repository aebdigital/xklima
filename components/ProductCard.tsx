"use client";

import Image from "next/image";
import Link from "next/link";
import { Scale, Send } from "lucide-react";
import type { Product } from "@/lib/data";

type ProductCardProps = {
  product: Product;
  selected?: boolean;
  onCompare?: (slug: string) => void;
};

export function ProductCard({ product, selected = false, onCompare }: ProductCardProps) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <Link href={`/products/${product.slug}`} className="group block bg-white">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-frost to-mist">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-7 transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badges.slice(0, 2).map((badge) => (
              <span key={badge} className="rounded-md bg-white/95 px-2 py-1 text-xs font-bold text-hvac-navy shadow-sm">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-hvac-blue">{product.brand}</p>
            <Link href={`/products/${product.slug}`} className="focus-ring mt-1 block rounded-sm text-xl font-bold text-ink hover:text-hvac-blue">
              {product.name}
            </Link>
          </div>
          <span className="shrink-0 rounded-md border border-line px-2 py-1 text-sm font-bold text-ink">{product.powerKw} kW</span>
        </div>

        <p className="text-sm leading-6 text-graphite">{product.short}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-mist px-2 py-1 text-xs font-semibold text-ink">
              {tag}
            </span>
          ))}
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
          <div>
            <dt className="font-semibold text-graphite">Priestor</dt>
            <dd className="mt-1 font-bold text-ink">do {product.maxM2} m2</dd>
          </div>
          <div>
            <dt className="font-semibold text-graphite">Varianty</dt>
            <dd className="mt-1 font-bold text-ink">{product.variants.map((variant) => variant.label).join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onCompare?.(product.slug)}
            className={`focus-ring flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-bold transition ${
              selected
                ? "border-hvac-aqua bg-hvac-aqua text-white"
                : "border-line text-ink hover:border-hvac-aqua hover:text-hvac-blue"
            }`}
          >
            <Scale size={16} aria-hidden="true" />
            {selected ? "V porovnaní" : "Porovnať"}
          </button>
          <Link
            href={`/products/${product.slug}#dopyt`}
            className="focus-ring flex items-center justify-center gap-2 rounded-md bg-hvac-blue px-3 py-2 text-sm font-bold text-white transition hover:bg-hvac-navy"
          >
            <Send size={16} aria-hidden="true" />
            Dopyt
          </Link>
        </div>
      </div>
    </article>
  );
}
