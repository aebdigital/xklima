"use client";

import { useMemo, useState } from "react";
import { Calculator, CheckCircle2, Home, Ruler } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

export function CalculatorClient() {
  const [area, setArea] = useState(35);
  const [height, setHeight] = useState(2.6);
  const [sun, setSun] = useState("normal");
  const [insulation, setInsulation] = useState("standard");
  const [people, setPeople] = useState(2);

  const result = useMemo(() => {
    const volume = area * height;
    const sunFactor = sun === "high" ? 1.18 : sun === "low" ? 0.95 : 1;
    const insulationFactor = insulation === "weak" ? 1.16 : insulation === "new" ? 0.9 : 1;
    const peopleLoad = Math.max(0, people - 2) * 0.12;
    const kw = Math.max(2.5, (volume * 0.045 * sunFactor * insulationFactor + peopleLoad));
    const rounded = Math.ceil(kw * 2) / 2;

    return {
      volume: Math.round(volume),
      kw: rounded,
      label: rounded <= 2.6 ? "2.5 - 2.6 kW" : rounded <= 3.6 ? "3.5 kW" : rounded <= 5.1 ? "5.0 kW" : "individuálny návrh"
    };
  }, [area, height, insulation, people, sun]);

  return (
    <div className="container-x section-y">
      <div className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-black text-ink md:text-6xl">Cenová ponuka na klimatizáciu</h1>
        <p className="mt-5 text-lg leading-8 text-graphite">
          Zadajte základné parametre miestnosti a pošlite nám podklady pre návrh vhodného riešenia a montáže.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-graphite">
              Plocha miestnosti
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="120"
                  value={area}
                  onChange={(event) => setArea(Number(event.target.value))}
                  className="w-full accent-hvac-blue"
                />
                <span className="w-20 rounded-md bg-mist px-2 py-2 text-center font-bold text-ink">{area} m2</span>
              </div>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-graphite">
              Výška stropu
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="2.2"
                  max="4.2"
                  step="0.1"
                  value={height}
                  onChange={(event) => setHeight(Number(event.target.value))}
                  className="w-full accent-hvac-blue"
                />
                <span className="w-20 rounded-md bg-mist px-2 py-2 text-center font-bold text-ink">{height.toFixed(1)} m</span>
              </div>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-graphite">
              Preslnenie
              <select value={sun} onChange={(event) => setSun(event.target.value)} className="focus-ring h-11 rounded-md border border-line bg-frost px-3 font-bold text-ink">
                <option value="low">nižšie</option>
                <option value="normal">štandardné</option>
                <option value="high">veľké presklenie / juh</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-graphite">
              Izolácia
              <select
                value={insulation}
                onChange={(event) => setInsulation(event.target.value)}
                className="focus-ring h-11 rounded-md border border-line bg-frost px-3 font-bold text-ink"
              >
                <option value="new">novostavba / dobrá</option>
                <option value="standard">štandardná</option>
                <option value="weak">slabšia / starší objekt</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-graphite sm:col-span-2">
              Bežný počet osôb
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={people}
                  onChange={(event) => setPeople(Number(event.target.value))}
                  className="w-full accent-hvac-blue"
                />
                <span className="w-20 rounded-md bg-mist px-2 py-2 text-center font-bold text-ink">{people}</span>
              </div>
            </label>
          </div>
        </div>

        <aside className="grid gap-5">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <Calculator className="mb-4 text-hvac-blue" size={28} aria-hidden="true" />
            <p className="text-sm font-bold uppercase text-hvac-green">Odporúčanie</p>
            <h2 className="mt-2 text-4xl font-black text-ink">{result.label}</h2>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="flex items-center justify-between rounded-md bg-frost px-4 py-3">
                <span className="inline-flex items-center gap-2 font-semibold text-graphite">
                  <Home size={16} aria-hidden="true" />
                  Objem
                </span>
                <span className="font-bold text-ink">{result.volume} m3</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-frost px-4 py-3">
                <span className="inline-flex items-center gap-2 font-semibold text-graphite">
                  <Ruler size={16} aria-hidden="true" />
                  Výkon
                </span>
                <span className="font-bold text-ink">{result.kw.toFixed(1)} kW</span>
              </div>
            </div>
            <div className="mt-5 flex gap-3 rounded-md bg-mist p-4 text-sm leading-6 text-graphite">
              <CheckCircle2 className="mt-1 shrink-0 text-hvac-aqua" size={18} aria-hidden="true" />
              <p>Pri ponuke overíme značku, trasu montáže, odvod kondenzu aj umiestnenie vonkajšej jednotky.</p>
            </div>
          </div>
        </aside>
      </div>

      <div id="quote-form" className="mt-10 scroll-mt-28">
        <InquiryForm productName={`Kalkulačka: ${result.label}, ${area} m2`} />
      </div>
    </div>
  );
}
