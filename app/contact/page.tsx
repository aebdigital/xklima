import { Mail, MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import { cleanPhone, email, phone } from "@/lib/data";

export default function ContactPage() {
  return (
    <section className="container-x section-y">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Kontakt</p>
          <h1 className="text-4xl font-black text-ink md:text-6xl">Ozvite sa X-Klima</h1>
          <p className="mt-5 text-lg leading-8 text-graphite">
            Pre návrh klimatizácie, servis, referenčný projekt alebo kariéru. Najrýchlejšia cesta je telefón.
          </p>

          <div className="mt-8 grid gap-3">
            <a href={`tel:${cleanPhone}`} className="rounded-lg border border-line bg-white p-5 transition hover:border-hvac-aqua">
              <Phone className="mb-3 text-hvac-blue" size={24} aria-hidden="true" />
              <p className="text-sm font-bold text-graphite">Zavolajte nám</p>
              <p className="mt-1 text-xl font-bold text-ink">{phone}</p>
            </a>
            <a href={`mailto:${email}`} className="rounded-lg border border-line bg-white p-5 transition hover:border-hvac-aqua">
              <Mail className="mb-3 text-hvac-blue" size={24} aria-hidden="true" />
              <p className="text-sm font-bold text-graphite">E-mail</p>
              <p className="mt-1 text-xl font-bold text-ink">{email}</p>
            </a>
            <div className="rounded-lg border border-line bg-white p-5">
              <MapPin className="mb-3 text-hvac-blue" size={24} aria-hidden="true" />
              <p className="text-sm font-bold text-graphite">Adresa</p>
              <p className="mt-1 text-xl font-bold text-ink">Rampová 4, Košice</p>
            </div>
          </div>
        </div>

        <InquiryForm productName="Všeobecný dopyt X-Klima" />
      </div>
    </section>
  );
}
