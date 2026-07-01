import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LifeBuoy, Wrench } from "lucide-react";

const blocks = [
  "Návrh výkonu podľa priestoru a prevádzky",
  "Čisté vedenie trás, kondenzu a elektro prípravy",
  "Uvedenie do prevádzky a vysvetlenie ovládania",
  "Servisné čistenie, dezinfekcia a kontrola tesnosti",
  "Diagnostika porúch a odporúčanie výmeny komponentov",
  "Dokumentácia a protokol pre zákazníka"
];

export default function InstallationServicePage() {
  return (
    <>
      <section className="bg-white py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Montáž/servis</p>
            <h1 className="text-4xl font-black text-ink md:text-6xl">Montáž, revízie a servis klimatizácií</h1>
            <p className="mt-5 text-lg leading-8 text-graphite">
              Zabezpečíme návrh výkonu, čistú montáž, uvedenie do prevádzky aj pravidelný servis počas životnosti zariadenia.
            </p>
            <Link href="/calculator#quote-form" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-md bg-hvac-blue px-5 py-3 font-bold text-white">
              Požiadať o termín
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src="/images/aeb/about.jpg" alt="Montáž a servis X-Klima" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container-x section-y">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block, index) => (
            <div key={block} className="rounded-lg border border-line bg-white p-5">
              {index < 3 ? <Wrench className="mb-4 text-hvac-blue" size={24} aria-hidden="true" /> : <LifeBuoy className="mb-4 text-hvac-blue" size={24} aria-hidden="true" />}
              <p className="font-bold leading-6 text-ink">{block}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="servis" className="bg-hvac-navy py-16 text-white">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-hvac-lime">Servisný režim</p>
            <h2 className="text-3xl font-bold md:text-4xl">Ročný servis predlžuje životnosť a drží záruku pod kontrolou</h2>
          </div>
          <div className="grid gap-3">
            {["Čistenie výparníka", "Kontrola kondenzu", "Meranie prevádzkových stavov", "Záznam do protokolu"].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                <CheckCircle2 className="mt-1 shrink-0 text-hvac-lime" size={20} aria-hidden="true" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
