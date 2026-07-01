import Link from "next/link";
import { footerColumns, quickActions } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-hvac-navy text-white">
      <div className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-hvac-blue font-black">
                XK
              </span>
              <span>
                <span className="block text-2xl font-bold">X-Klima Slovakia</span>
                <span className="block text-sm text-white/70">Klimatizácie, chladenie a tepelné čerpadlá</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/75">
              Certifikovaný partner pre návrh, montáž a servis HVAC riešení pre domácnosti, firmy a priemysel na východnom Slovensku.
            </p>
            <div className="mt-6 grid max-w-md grid-cols-2 gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="focus-ring flex items-center gap-2 rounded-md border border-white/15 px-3 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    <Icon size={17} aria-hidden="true" />
                    {action.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-bold uppercase text-white/60">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link className="text-sm text-white/80 transition hover:text-white" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/70">
          <p>© 2026 X-Klima Slovakia s.r.o.</p>
        </div>
      </div>
    </footer>
  );
}
