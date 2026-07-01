import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Wrench } from "lucide-react";

const roles = [
  {
    title: "Montážny technik HVAC",
    type: "full-time",
    text: "Montáž klimatizácií, chladiacich rozvodov a servisné výjazdy v Košickom kraji.",
    icon: Wrench
  },
  {
    title: "Servisný technik",
    type: "plný úväzok / živnosť",
    text: "Diagnostika, čistenie, revízie a komunikácia so zákazníkom po odovzdaní.",
    icon: BriefcaseBusiness
  }
];

export default function CareerPage() {
  return (
    <section className="container-x section-y">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Kariéra</p>
        <h1 className="text-4xl font-black text-ink md:text-6xl">Pridajte sa k montážnemu tímu</h1>
        <p className="mt-5 text-lg leading-8 text-graphite">
          Hľadáme ľudí, ktorí rozumejú technike, férovej práci u zákazníka a chcú rásť v oblasti klimatizácií a servisu.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <article key={role.title} className="rounded-lg border border-line bg-white p-6 shadow-sm">
              <Icon className="mb-5 text-hvac-blue" size={28} aria-hidden="true" />
              <p className="text-sm font-bold uppercase text-hvac-green">{role.type}</p>
              <h2 className="mt-2 text-2xl font-bold text-ink">{role.title}</h2>
              <p className="mt-4 text-sm leading-6 text-graphite">{role.text}</p>
              <Link href="/contact" className="focus-ring mt-5 inline-flex items-center gap-2 rounded-md bg-hvac-blue px-4 py-3 font-bold text-white">
                Kontaktovať
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
