import { Download, FileText, PlusCircle } from "lucide-react";
import { downloads } from "@/lib/data";

export default function DownloadsPage() {
  return (
    <section className="container-x section-y">
      <div className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-black text-ink md:text-6xl">PDF dokumenty pre klimatizácie a servis</h1>
        <p className="mt-5 text-lg leading-8 text-graphite">
          Technické podklady, servisné dokumenty a formuláre, ktoré sa vám môžu hodiť pri výbere alebo údržbe zariadenia.
        </p>
      </div>

      <div className="grid gap-4">
        {downloads.map((item) => (
          <article key={item.href} className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-mist text-hvac-blue">
                  <FileText size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase text-hvac-green">{item.category}</p>
                  <h2 className="mt-1 text-xl font-bold text-ink">{item.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-graphite">
                    {item.type} · {item.size}
                  </p>
                </div>
              </div>
              <a
                href={item.href}
                download
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-hvac-blue px-4 py-3 font-bold text-white transition hover:bg-hvac-navy"
              >
                <Download size={17} aria-hidden="true" />
                Stiahnuť
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-line bg-white p-6">
        <PlusCircle className="mb-3 text-hvac-aqua" size={26} aria-hidden="true" />
        <h2 className="text-2xl font-bold text-ink">Potrebujete ďalší dokument?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-graphite">
          Ak hľadáte konkrétny technický list alebo servisný podklad, napíšte nám a pošleme vám správny materiál.
        </p>
        <a href="mailto:info@xklima.sk" className="focus-ring mt-4 inline-flex rounded-md border border-line px-4 py-3 font-bold text-ink hover:bg-mist">
          Vyžiadať dokument
        </a>
      </div>
    </section>
  );
}
