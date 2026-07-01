"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Menu, Phone, Search, Snowflake, X } from "lucide-react";
import { cleanPhone, navItems, phone, searchEntries } from "@/lib/data";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return searchEntries.slice(0, 7);
    }

    return searchEntries
      .filter((entry) => `${entry.title} ${entry.type}`.toLowerCase().includes(value))
      .slice(0, 9);
  }, [query]);

  function closeAll() {
    setMenuOpen(false);
    setSearchOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x flex h-20 items-center justify-between gap-4">
          <Link href="/" className="focus-ring flex items-center gap-2" onClick={closeAll}>
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-hvac-navy text-white">
              <Snowflake size={22} aria-hidden="true" />
            </span>
            <span className="leading-none">
              <span className="block whitespace-nowrap text-lg font-bold text-ink">X-Klima</span>
              <span className="block text-xs font-semibold uppercase text-hvac-green">Slovakia</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Hlavná navigácia">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-semibold text-graphite transition hover:bg-mist hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              aria-label="Vyhľadávanie"
              onClick={() => setSearchOpen(true)}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink transition hover:border-hvac-aqua hover:text-hvac-blue"
            >
              <Search size={19} aria-hidden="true" />
            </button>
            <a
              href={`tel:${cleanPhone}`}
              className="focus-ring flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm font-semibold text-ink transition hover:border-hvac-green hover:bg-frost"
            >
              <Phone size={17} aria-hidden="true" />
              <span className="whitespace-nowrap text-hvac-blue">{phone}</span>
            </a>
            <Link
              href="/contact"
              className="focus-ring flex h-11 items-center rounded-md bg-hvac-blue px-4 text-sm font-bold text-white transition hover:bg-hvac-navy"
            >
              <span className="hidden whitespace-nowrap 2xl:inline">Cenová ponuka</span>
              <span className="whitespace-nowrap 2xl:hidden">Ponuka</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-label="Vyhľadávanie"
              onClick={() => setSearchOpen(true)}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink"
            >
              <Search size={19} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink"
            >
              {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-line bg-white lg:hidden">
            <nav className="container-x grid gap-1 py-4" aria-label="Mobilná navigácia">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="focus-ring rounded-md px-3 py-3 text-base font-semibold text-ink hover:bg-mist"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${cleanPhone}`}
                onClick={closeAll}
                className="focus-ring mt-3 flex items-center justify-center gap-2 rounded-md border border-line px-4 py-3 font-bold text-hvac-blue"
              >
                <Phone size={18} aria-hidden="true" />
                {phone}
              </a>
              <Link
                href="/contact"
                onClick={closeAll}
                className="focus-ring flex items-center justify-center rounded-md bg-hvac-blue px-4 py-3 font-bold text-white"
              >
                Cenová ponuka
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      {searchOpen ? (
        <div className="fixed inset-0 z-[80] bg-ink/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="mx-auto mt-20 max-w-3xl overflow-hidden rounded-lg bg-white shadow-soft">
            <div className="flex items-center gap-3 border-b border-line px-4 py-4">
              <Search className="text-hvac-blue" size={21} aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Hľadať produkt, PDF, kontakt alebo službu"
                className="min-w-0 flex-1 bg-transparent text-lg font-semibold text-ink outline-none placeholder:text-graphite"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Zatvoriť vyhľadávanie"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {results.map((entry) => (
                <Link
                  key={`${entry.href}-${entry.title}`}
                  href={entry.href}
                  onClick={closeAll}
                  className="focus-ring grid gap-1 rounded-md px-4 py-3 transition hover:bg-mist"
                >
                  <span className="text-sm font-semibold text-hvac-blue">{entry.type}</span>
                  <span className="text-base font-bold text-ink">{entry.title}</span>
                </Link>
              ))}
              {results.length === 0 ? (
                <div className="rounded-md bg-frost px-4 py-5 text-sm font-semibold text-graphite">
                  Nenašli sa žiadne výsledky. Skúste značku, výkon alebo typ služby.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
