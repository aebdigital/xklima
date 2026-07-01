"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardList,
  Factory,
  Home,
  Hotel,
  Ruler,
  Snowflake,
  ThermometerSun
} from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

type Step = 1 | 2 | 3 | 4 | 5;
type PropertyType = "byt" | "dom" | "kancelaria" | "prevadzka";
type SolutionType = "single" | "multisplit";
type SunType = "low" | "normal" | "high";
type InsulationType = "new" | "standard" | "weak";

const steps = ["Priestor", "Parametre", "Riešenie", "Výkon", "Kontakt"];

const propertyTypes = [
  { value: "byt", title: "Byt", text: "spálne, obývačka, pracovňa", icon: Home, defaultRooms: 2 },
  { value: "dom", title: "Rodinný dom", text: "viac izieb alebo podlažie", icon: Hotel, defaultRooms: 4 },
  { value: "kancelaria", title: "Kancelária", text: "open space alebo samostatné kancelárie", icon: Building2, defaultRooms: 3 },
  { value: "prevadzka", title: "Prevádzka", text: "obchod, gastro, služby", icon: Factory, defaultRooms: 2 }
] satisfies Array<{
  value: PropertyType;
  title: string;
  text: string;
  icon: typeof Home;
  defaultRooms: number;
}>;

const roomOptions = [1, 2, 3, 4, 5];
const powerOptions = [
  { kw: 2.5, area: "do 25 m2" },
  { kw: 3.5, area: "25 - 40 m2" },
  { kw: 5.0, area: "40 - 60 m2" }
];

const brandOptions = ["Bez preferencie", "AUX", "Toshiba", "Samsung", "Daikin", "Mitsubishi"];

const optionLabels = {
  install: "Montáž a uvedenie do prevádzky",
  inspection: "Obhliadka pred ponukou",
  condensate: "Odvod kondenzu",
  service: "Pravidelný servis"
};

function formatKw(value: number) {
  return `${value.toFixed(1)} kW`;
}

function recommendedPowerForArea(area: number) {
  if (area <= 25) return 2.5;
  if (area <= 42) return 3.5;
  return 5.0;
}

export function CalculatorClient() {
  const [step, setStep] = useState<Step>(1);
  const [propertyType, setPropertyType] = useState<PropertyType>("byt");
  const [roomCount, setRoomCount] = useState(2);
  const [totalArea, setTotalArea] = useState(48);
  const [height, setHeight] = useState(2.6);
  const [sun, setSun] = useState<SunType>("normal");
  const [insulation, setInsulation] = useState<InsulationType>("standard");
  const [people, setPeople] = useState(3);
  const [solution, setSolution] = useState<SolutionType>("multisplit");
  const [brand, setBrand] = useState("Bez preferencie");
  const [roomPowers, setRoomPowers] = useState([2.5, 3.5]);
  const [options, setOptions] = useState({
    install: true,
    inspection: true,
    condensate: true,
    service: false
  });

  const activeProperty = propertyTypes.find((item) => item.value === propertyType) ?? propertyTypes[0];

  const result = useMemo(() => {
    const volume = totalArea * height;
    const sunFactor = sun === "high" ? 1.18 : sun === "low" ? 0.95 : 1;
    const insulationFactor = insulation === "weak" ? 1.16 : insulation === "new" ? 0.9 : 1;
    const peopleLoad = Math.max(0, people - 2) * 0.12;
    const calculated = Math.max(2.5, volume * 0.045 * sunFactor * insulationFactor + peopleLoad);
    const rounded = Math.ceil(calculated * 2) / 2;
    const selectedTotal = roomPowers.reduce((sum, power) => sum + power, 0);
    const averageRoomArea = Math.max(1, Math.round(totalArea / roomCount));

    return {
      volume: Math.round(volume),
      calculatedKw: rounded,
      selectedTotal,
      averageRoomArea,
      recommendation:
        rounded <= 2.6 ? "2.5 - 2.6 kW" : rounded <= 3.6 ? "3.5 kW" : rounded <= 5.1 ? "5.0 kW" : "individuálny návrh"
    };
  }, [height, insulation, people, roomCount, roomPowers, sun, totalArea]);

  const selectedOptions = Object.entries(options)
    .filter(([, enabled]) => enabled)
    .map(([key]) => optionLabels[key as keyof typeof optionLabels]);

  const solutionLabel = roomCount === 1 ? "Single split" : solution === "multisplit" ? "Multisplit" : "Samostatné jednotky";
  const formSummary = `Kalkulačka: ${activeProperty.title}, ${roomCount} miestn., ${totalArea} m2, ${solutionLabel}, ${brand}, ${formatKw(result.selectedTotal)} spolu`;

  function goToStep(nextStep: number) {
    setStep(Math.min(5, Math.max(1, nextStep)) as Step);
  }

  function handlePropertyChange(value: PropertyType) {
    const selected = propertyTypes.find((item) => item.value === value) ?? propertyTypes[0];
    setPropertyType(value);
    handleRoomCount(selected.defaultRooms);
  }

  function handleRoomCount(nextCount: number) {
    const nextArea = Math.max(18, Math.round(totalArea / nextCount));
    const nextDefaultPower = recommendedPowerForArea(nextArea);

    setRoomCount(nextCount);
    setRoomPowers((current) => Array.from({ length: nextCount }, (_, index) => current[index] ?? nextDefaultPower));

    if (nextCount === 1) {
      setSolution("single");
    } else if (solution === "single") {
      setSolution("multisplit");
    }
  }

  function updateRoomPower(index: number, power: number) {
    setRoomPowers((current) => current.map((item, itemIndex) => (itemIndex === index ? power : item)));
  }

  function toggleOption(key: keyof typeof options) {
    setOptions((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <div className="container-x section-y">
      <div className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-black text-ink md:text-6xl">Kalkulačka klimatizácie</h1>
        <p className="mt-5 text-lg leading-8 text-graphite">
          Vyskladajte priestor, počet miestností, riešenie a výkon. Výsledok odošlete ako podklad pre cenovú ponuku.
        </p>
      </div>

      <div className="mb-8 overflow-hidden rounded-lg border border-line bg-white shadow-sm">
        <div className="h-1 bg-line">
          <div className="h-full bg-hvac-aqua transition-all duration-300" style={{ width: `${(step / steps.length) * 100}%` }} />
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((item, index) => {
            const indexStep = (index + 1) as Step;
            const isActive = step === indexStep;
            const isDone = step > indexStep;

            return (
              <button
                key={item}
                type="button"
                onClick={() => goToStep(indexStep)}
                className={`focus-ring flex h-12 items-center gap-3 rounded-md px-3 text-left text-sm font-bold transition ${
                  isActive ? "bg-hvac-blue text-white" : isDone ? "bg-mist text-ink" : "text-graphite hover:bg-frost"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs ${
                    isActive ? "bg-white text-hvac-blue" : isDone ? "bg-hvac-aqua text-white" : "bg-frost text-graphite"
                  }`}
                >
                  {isDone ? <Check size={14} aria-hidden="true" /> : index + 1}
                </span>
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <section className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-6">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-hvac-blue">Krok {step} z 5</p>
              <h2 className="mt-1 text-3xl font-bold text-ink">{steps[step - 1]}</h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-md bg-mist px-3 py-2 text-sm font-bold text-ink">
              <ClipboardList size={16} aria-hidden="true" />
              {result.recommendation}
            </span>
          </div>

          {step === 1 ? (
            <div className="grid gap-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {propertyTypes.map((item) => {
                  const Icon = item.icon;
                  const selected = propertyType === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => handlePropertyChange(item.value)}
                      className={`focus-ring grid min-h-32 gap-3 rounded-lg border p-4 text-left transition ${
                        selected ? "border-hvac-aqua bg-mist" : "border-line bg-white hover:border-hvac-aqua"
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <Icon className={selected ? "text-hvac-blue" : "text-graphite"} size={24} aria-hidden="true" />
                        {selected ? <CheckCircle2 className="text-hvac-aqua" size={20} aria-hidden="true" /> : null}
                      </span>
                      <span>
                        <span className="block text-xl font-bold text-ink">{item.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-graphite">{item.text}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div>
                <p className="mb-3 text-sm font-bold text-ink">Počet miestností</p>
                <div className="grid grid-cols-5 gap-2">
                  {roomOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleRoomCount(item)}
                      className={`focus-ring h-12 rounded-md border text-lg font-bold transition ${
                        roomCount === item ? "border-hvac-blue bg-hvac-blue text-white" : "border-line bg-frost text-ink hover:border-hvac-aqua"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-graphite">
                Celková plocha
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="12"
                    max="180"
                    value={totalArea}
                    onChange={(event) => setTotalArea(Number(event.target.value))}
                    className="w-full accent-hvac-blue"
                  />
                  <span className="w-24 rounded-md bg-mist px-2 py-2 text-center font-bold text-ink">{totalArea} m2</span>
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
                  <span className="w-24 rounded-md bg-mist px-2 py-2 text-center font-bold text-ink">{height.toFixed(1)} m</span>
                </div>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-graphite">
                Preslnenie
                <select
                  value={sun}
                  onChange={(event) => setSun(event.target.value as SunType)}
                  className="focus-ring h-11 rounded-md border border-line bg-frost px-3 font-bold text-ink"
                >
                  <option value="low">nižšie</option>
                  <option value="normal">štandardné</option>
                  <option value="high">veľké presklenie / juh</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-graphite">
                Izolácia
                <select
                  value={insulation}
                  onChange={(event) => setInsulation(event.target.value as InsulationType)}
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
                    max="16"
                    value={people}
                    onChange={(event) => setPeople(Number(event.target.value))}
                    className="w-full accent-hvac-blue"
                  />
                  <span className="w-24 rounded-md bg-mist px-2 py-2 text-center font-bold text-ink">{people}</span>
                </div>
              </label>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-6">
              {roomCount > 1 ? (
                <div>
                  <p className="mb-3 text-sm font-bold text-ink">Typ riešenia</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { value: "multisplit" as SolutionType, title: "Multisplit", text: "jedna vonkajšia jednotka pre viac miestností" },
                      { value: "single" as SolutionType, title: "Samostatné jednotky", text: "každá miestnosť má vlastný komplet" }
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setSolution(item.value)}
                        className={`focus-ring rounded-lg border p-4 text-left transition ${
                          solution === item.value ? "border-hvac-aqua bg-mist" : "border-line bg-white hover:border-hvac-aqua"
                        }`}
                      >
                        <span className="text-xl font-bold text-ink">{item.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-graphite">{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div>
                <p className="mb-3 text-sm font-bold text-ink">Preferovaná značka</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {brandOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setBrand(item)}
                      className={`focus-ring h-11 rounded-md border px-3 text-sm font-bold transition ${
                        brand === item ? "border-hvac-blue bg-hvac-blue text-white" : "border-line bg-frost text-ink hover:border-hvac-aqua"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="grid gap-4">
              {roomPowers.map((power, index) => (
                <div key={index} className="rounded-lg border border-line bg-frost p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-hvac-blue">Miestnosť {index + 1}</p>
                      <p className="text-sm text-graphite">Približne {result.averageRoomArea} m2 podľa celkovej plochy</p>
                    </div>
                    <span className="rounded-md bg-white px-3 py-2 text-sm font-bold text-ink">{formatKw(power)}</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {powerOptions.map((item) => {
                      const selected = Math.abs(power - item.kw) < 0.1;

                      return (
                        <button
                          key={item.kw}
                          type="button"
                          onClick={() => updateRoomPower(index, item.kw)}
                          className={`focus-ring rounded-md border px-3 py-3 text-left transition ${
                            selected ? "border-hvac-blue bg-white text-ink shadow-sm" : "border-line bg-white/70 text-graphite hover:border-hvac-aqua"
                          }`}
                        >
                          <span className="block text-lg font-bold">{formatKw(item.kw)}</span>
                          <span className="mt-1 block text-xs font-semibold">{item.area}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {step === 5 ? (
            <div className="grid gap-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {(Object.keys(optionLabels) as Array<keyof typeof optionLabels>).map((key) => {
                  const selected = options[key];

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleOption(key)}
                      className={`focus-ring flex items-center gap-3 rounded-md border p-4 text-left font-bold transition ${
                        selected ? "border-hvac-aqua bg-mist text-ink" : "border-line bg-white text-graphite hover:border-hvac-aqua"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                          selected ? "border-hvac-aqua bg-hvac-aqua text-white" : "border-line bg-frost"
                        }`}
                      >
                        {selected ? <Check size={14} aria-hidden="true" /> : null}
                      </span>
                      {optionLabels[key]}
                    </button>
                  );
                })}
              </div>

              <InquiryForm productName={formSummary} selectedVariant={result.recommendation} compact />
            </div>
          ) : null}

          <div className="mt-7 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => goToStep(step - 1)}
              disabled={step === 1}
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md border border-line px-4 font-bold text-ink transition hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Späť
            </button>
            <button
              type="button"
              onClick={() => goToStep(step + 1)}
              disabled={step === 5}
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md bg-hvac-blue px-5 font-bold text-white transition hover:bg-hvac-navy disabled:cursor-not-allowed disabled:opacity-40"
            >
              Pokračovať
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </section>

        <aside className="grid gap-4 lg:sticky lg:top-28">
          <div className="rounded-lg bg-hvac-navy p-6 text-white shadow-sm">
            <Snowflake className="mb-5 text-hvac-aqua" size={28} aria-hidden="true" />
            <p className="text-sm font-bold uppercase text-hvac-lime">Súhrn</p>
            <h2 className="mt-2 text-3xl font-bold">{result.recommendation}</h2>
            <div className="mt-6 grid gap-3 text-sm">
              {[
                ["Priestor", activeProperty.title],
                ["Miestnosti", `${roomCount}`],
                ["Plocha", `${totalArea} m2`],
                ["Riešenie", solutionLabel],
                ["Značka", brand],
                ["Zvolený výkon", formatKw(result.selectedTotal)]
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <span className="text-white/70">{label}</span>
                  <span className="text-right font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <div className="grid gap-3 text-sm">
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
                  Výpočet
                </span>
                <span className="font-bold text-ink">{formatKw(result.calculatedKw)}</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-frost px-4 py-3">
                <span className="inline-flex items-center gap-2 font-semibold text-graphite">
                  <ThermometerSun size={16} aria-hidden="true" />
                  Doplnky
                </span>
                <span className="text-right font-bold text-ink">{selectedOptions.length}</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-graphite">
              Cena sa doplní po kontrole trasy montáže, umiestnenia jednotiek a technických detailov priestoru.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
