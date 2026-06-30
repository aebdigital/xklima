"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

type InquiryFormProps = {
  productName?: string;
  compact?: boolean;
  selectedVariant?: string;
  onBack?: () => void;
};

export function InquiryForm({ productName = "Nešpecifikovaný produkt", compact = false, selectedVariant, onBack }: InquiryFormProps) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-lg border border-hvac-aqua bg-white p-6">
        <CheckCircle2 className="mb-3 text-hvac-aqua" size={28} aria-hidden="true" />
        <h3 className="text-xl font-bold text-ink">Dopyt je pripravený</h3>
        <p className="mt-2 text-sm leading-6 text-graphite">
          Toto je front-end prototyp. Pri napojení CMS/backendu sa formulár odošle do CRM alebo e-mailu X-Klima.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold uppercase text-hvac-green">Dopytový formulár</p>
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="focus-ring rounded-md border border-line px-3 py-2 text-sm font-bold text-ink transition hover:bg-mist"
            >
              Zmeniť variant
            </button>
          ) : null}
        </div>
        <h2 className={`${compact ? "text-2xl" : "text-3xl"} mt-2 font-bold text-ink`}>Odoslať nezáväzný dopyt</h2>
      </div>

      {selectedVariant ? (
        <div className="rounded-md border border-hvac-aqua/40 bg-mist p-4">
          <p className="text-xs font-bold uppercase text-hvac-green">Vybraný variant</p>
          <p className="mt-1 text-lg font-bold text-ink">{selectedVariant}</p>
        </div>
      ) : null}

      <label className="grid gap-2 text-sm font-semibold text-graphite">
        Produkt
        <input
          value={productName}
          readOnly
          className="focus-ring h-11 rounded-md border border-line bg-frost px-3 font-bold text-ink"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Meno
          <input required className="focus-ring h-11 rounded-md border border-line bg-white px-3 text-ink" placeholder="Vaše meno" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Telefón
          <input required className="focus-ring h-11 rounded-md border border-line bg-white px-3 text-ink" placeholder="+421..." />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-graphite">
        Priestor / poznámka
        <textarea
          rows={compact ? 3 : 5}
          className="focus-ring rounded-md border border-line bg-white px-3 py-3 text-ink"
          placeholder="Napr. byt Košice, obývačka 34 m2, chladenie aj kúrenie..."
        />
      </label>

      <button
        type="submit"
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-hvac-blue px-5 py-3 font-bold text-white transition hover:bg-hvac-navy"
      >
        <Send size={17} aria-hidden="true" />
        Odoslať dopyt
      </button>
    </form>
  );
}
