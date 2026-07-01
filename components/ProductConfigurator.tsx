"use client";

import { useMemo, useState } from "react";
import { Check, Ruler, Send, ThermometerSun } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import type { Product } from "@/lib/data";

type ProductConfiguratorProps = {
  product: Product;
};

export function ProductConfigurator({ product }: ProductConfiguratorProps) {
  const [variantLabel, setVariantLabel] = useState(product.variants[0]?.label);
  const [step, setStep] = useState<"select" | "form">("select");
  const activeVariant = useMemo(
    () => product.variants.find((variant) => variant.label === variantLabel) ?? product.variants[0],
    [product.variants, variantLabel]
  );
  const selectedVariant = `${activeVariant.label} · ${activeVariant.areaM2}`;

  function showFormStep() {
    setStep("form");
    window.requestAnimationFrame(() => {
      document.getElementById("dopyt")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div id="dopyt" className="scroll-mt-28 overflow-hidden rounded-lg" aria-live="polite">
      <div className="step-flow" data-step={step}>
        <div className="step-panel">
          <div className="step-card step-card-select rounded-lg border border-line bg-white p-5 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Krok 1 · Výber podľa výkonu</p>
            <div className="grid gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.label}
                  type="button"
                  onClick={() => setVariantLabel(variant.label)}
                  className={`focus-ring grid rounded-md border p-4 text-left transition ${
                    activeVariant.label === variant.label
                      ? "border-hvac-aqua bg-mist"
                      : "border-line bg-white hover:border-hvac-aqua"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-ink">{variant.label}</span>
                    {activeVariant.label === variant.label ? <Check size={18} className="text-hvac-aqua" aria-hidden="true" /> : null}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-3 text-sm font-semibold text-graphite">
                    <span className="inline-flex items-center gap-1">
                      <Ruler size={15} aria-hidden="true" />
                      {variant.areaM2}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ThermometerSun size={15} aria-hidden="true" />
                      {variant.installHint}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-md bg-frost p-4">
              <p className="text-sm font-bold text-ink">Vybraný variant: {selectedVariant}</p>
              <p className="mt-1 text-sm leading-6 text-graphite">
                Odporúčanie slúži ako orientácia. Finálny výkon určí obhliadka podľa presklenia, orientácie, izolácie a počtu osôb.
              </p>
            </div>

            <button
              type="button"
              onClick={showFormStep}
              className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-hvac-blue px-4 py-3 font-bold text-white transition hover:bg-hvac-navy"
            >
              <Send size={17} aria-hidden="true" />
              Odoslať dopyt
            </button>
          </div>
        </div>

        <div className="step-panel">
          <div className="step-card step-card-form">
            <InquiryForm
              key={`${product.slug}-${activeVariant.label}`}
              productName={`${product.name} · ${selectedVariant}`}
              selectedVariant={selectedVariant}
              compact
              onBack={() => setStep("select")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
