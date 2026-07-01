import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { ProductConfigurator } from "@/components/ProductConfigurator";
import { getProduct, getRelatedProducts, products } from "@/lib/data";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: "Produkt nenájdený | X-Klima"
    };
  }

  return {
    title: `${product.name} | X-Klima Slovakia`,
    description: product.short
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <>
      <section className="bg-white py-8">
        <div className="container-x">
          <Link href="/products" className="focus-ring inline-flex items-center gap-2 rounded-md px-1 py-2 text-sm font-bold text-hvac-blue">
            <ArrowLeft size={16} aria-hidden="true" />
            Späť na katalóg
          </Link>
        </div>
      </section>

      <section className="bg-white pb-14">
        <div className="container-x grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-hvac-green">{product.category}</p>
            <h1 className="text-4xl font-black text-ink md:text-6xl">{product.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">{product.short}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-mist px-3 py-2 text-sm font-bold text-ink">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-line bg-frost">
              <div className="relative aspect-[16/10] bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain p-10"
                />
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <ProductConfigurator product={product} />
          </aside>
        </div>
      </section>

      <section className="container-x section-y">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Technické údaje</p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl">Technický prehľad</h2>
            <p className="mt-4 text-base leading-7 text-graphite">
              Základné parametre pomôžu pri rýchlom porovnaní modelov. Presné dimenzovanie overíme podľa priestoru.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(product.specs).map(([label, value]) => (
              <div key={label} className="rounded-lg border border-line bg-white p-4">
                <p className="text-sm font-bold text-graphite">{label}</p>
                <p className="mt-2 text-lg font-bold text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Výhody</p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl">Prečo zvoliť tento model</h2>
          </div>
          <div className="grid gap-3">
            {product.highlights.map((highlight) => (
              <div key={highlight} className="flex gap-3 rounded-lg border border-line bg-frost p-4">
                <CheckCircle2 className="mt-1 shrink-0 text-hvac-aqua" size={20} aria-hidden="true" />
                <p className="font-semibold text-ink">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x section-y">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Podobné produkty</p>
            <h2 className="text-3xl font-bold text-ink md:text-4xl">Ďalšie riešenia z kategórie {product.category}</h2>
          </div>
          <Link href="/products" className="focus-ring inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-3 font-bold text-ink">
            Všetky produkty
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <Link key={item.slug} href={`/products/${item.slug}`} className="card group overflow-hidden">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-8 transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-hvac-blue">{item.brand}</p>
                <h3 className="mt-1 text-xl font-bold text-ink">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite">{item.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
