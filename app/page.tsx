import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { cleanPhone, pageLinks, phone, processSteps, products, references, services } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = products.filter((product) => product.category === "Klimatizácie").slice(0, 3);

  return (
    <>
      <section className="relative min-h-[76vh] overflow-hidden bg-white">
        <Image
          src="/images/aeb/hero1.jpg"
          alt="X-Klima Slovakia realizácia klimatizácie"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/25" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-frost to-transparent" />

        <div className="container-x relative flex min-h-[76vh] items-center py-14">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-md border border-hvac-aqua/30 bg-white/85 px-3 py-2 text-sm font-bold uppercase text-hvac-blue">
              Klimatizácie, chladenie a tepelné čerpadlá
            </p>
            <h1 className="text-5xl font-black leading-[1.05] text-ink md:text-7xl">X-Klima Slovakia</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite md:text-xl">
              Svetlejší, technickejší web postavený na pôvodnom vizuálnom návrhu: reálne referencie, dopytové produkty,
              porovnávač, vyhľadávanie, downloads a kalkulačka pripravená na doplnenie cien.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="focus-ring inline-flex items-center gap-2 rounded-md bg-hvac-blue px-5 py-3 font-bold text-white transition hover:bg-hvac-navy"
              >
                Pozrieť klimatizácie
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a
                href={`tel:${cleanPhone}`}
                className="focus-ring inline-flex items-center gap-2 rounded-md border border-line bg-white px-5 py-3 font-bold text-ink transition hover:border-hvac-green"
              >
                <Phone size={18} aria-hidden="true" />
                {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="soft-band py-8">
        <div className="container-x grid gap-3 md:grid-cols-4">
          {[
            ["20+ rokov", "praktické skúsenosti s HVAC"],
            ["Košice", "zázemie pre východné Slovensko"],
            ["24 h", "priorita pri servisnom dopyte"],
            ["CMS ready", "produkty, PDF a fotografie"]
          ].map(([value, label]) => (
            <div key={value} className="rounded-lg border border-line bg-white px-5 py-4">
              <p className="text-2xl font-black text-hvac-blue">{value}</p>
              <p className="mt-1 text-sm font-semibold text-graphite">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x section-y">
        <div className="mb-9 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Služby</p>
          <h2 className="text-4xl font-bold text-ink md:text-5xl">Návrh z pôvodného webu, ale v čistejšom HVAC systéme</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} href={service.href} className="card group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <Icon className="mb-4 text-hvac-blue" size={24} aria-hidden="true" />
                  <h3 className="text-xl font-bold text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite">{service.text}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Proces</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl">Od m2 a výkonu k reálnemu návrhu montáže</h2>
            <p className="mt-5 text-lg leading-8 text-graphite">
              Katalóg pomáha vybrať smer, ale finálny výkon sa rieši dopytom. Presne tak, aby stránka nepôsobila ako e-shop,
              ale ako predajný nástroj pre obhliadku a ponuku.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-line bg-frost p-5">
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-hvac-blue font-black text-white">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x section-y">
        <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Produkty</p>
            <h2 className="text-4xl font-bold text-ink md:text-5xl">Klímy s tagmi, filtrami a porovnávaním</h2>
          </div>
          <Link href="/products" className="focus-ring inline-flex items-center gap-2 rounded-md border border-line px-4 py-3 font-bold text-ink hover:bg-white">
            Celý katalóg
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="card group overflow-hidden">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-8 transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-hvac-blue">{product.brand}</p>
                <h3 className="mt-1 text-xl font-bold text-ink">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite">{product.short}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-md bg-mist px-2 py-1 text-xs font-semibold text-ink">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-hvac-navy py-16 text-white">
        <div className="container-x grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-hvac-lime">Referencie</p>
            <h2 className="text-4xl font-bold md:text-5xl">Reálne realizácie ostávajú silným vizuálnym jadrom</h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              Pôvodný návrh mal dobrý základ v referenčných fotografiách. Tu ich používame svetlejšie, skenovateľnejšie
              a s jasnejším prechodom na dopyt.
            </p>
            <Link href="/references" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-bold text-hvac-navy">
              Všetky referencie
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {references.slice(0, 4).map((reference) => (
              <div key={reference.title} className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
                <div className="relative aspect-[16/10]">
                  <Image src={reference.image} alt={reference.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold uppercase text-hvac-lime">{reference.type}</p>
                  <h3 className="mt-1 font-bold">{reference.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{reference.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x section-y">
        <div className="grid gap-4 md:grid-cols-3">
          {pageLinks.slice(0, 6).map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.title} href={link.href} className="rounded-lg border border-line bg-white p-5 transition hover:border-hvac-aqua">
                <Icon className="mb-4 text-hvac-blue" size={24} aria-hidden="true" />
                <h3 className="text-lg font-bold text-ink">{link.title}</h3>
                <p className="mt-2 text-sm leading-6 text-graphite">{link.text}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Cenová ponuka</p>
            <h2 className="text-4xl font-bold text-ink">Kalkulačka je pripravená na finálne vzorce</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-graphite">
              Kým nebudú ceny a vzorce potvrdené, používa orientačný výpočet výkonu a zbiera dopyt.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/calculator" className="focus-ring inline-flex items-center gap-2 rounded-md bg-hvac-blue px-5 py-3 font-bold text-white">
              Otvoriť kalkulačku
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="focus-ring inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 font-bold text-ink">
              <CheckCircle2 size={17} aria-hidden="true" />
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
