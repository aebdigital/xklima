import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { references } from "@/lib/data";

export default function ReferencesPage() {
  return (
    <>
      <section className="bg-white py-16">
        <div className="container-x">
          <h1 className="text-4xl font-black text-ink md:text-6xl">Realizácie X-Klima Slovakia</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">
            Vybrané projekty z oblasti klimatizácie, chladenia a technických riešení pre firmy, prevádzky aj ubytovacie zariadenia.
          </p>
        </div>
      </section>

      <section className="container-x section-y">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {references.map((reference) => (
            <article key={reference.title} className="card overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={reference.image} alt={reference.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-sm font-bold uppercase text-hvac-green">{reference.type}</p>
                <h2 className="mt-1 text-xl font-bold text-ink">{reference.title}</h2>
                <p className="mt-1 text-sm font-semibold text-hvac-blue">{reference.place}</p>
                <p className="mt-4 text-sm leading-6 text-graphite">{reference.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-hvac-navy py-14 text-white">
        <div className="container-x flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase text-hvac-lime">Máte podobný projekt?</p>
            <h2 className="text-3xl font-bold">Pošlite nám dopyt a navrhneme výkon aj montáž.</h2>
          </div>
          <Link href="/calculator" className="focus-ring inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-bold text-hvac-navy">
            Cenová ponuka
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
