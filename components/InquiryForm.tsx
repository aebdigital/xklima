"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

type InquiryFormProps = {
  productName?: string;
  compact?: boolean;
  selectedVariant?: string;
  onBack?: () => void;
  variant?: "inquiry" | "contact";
};

export function InquiryForm({
  productName = "Nešpecifikovaný produkt",
  compact = false,
  selectedVariant,
  onBack,
  variant = "inquiry"
}: InquiryFormProps) {
  const [sent, setSent] = useState(false);
  const isContact = variant === "contact";
  const showProductField = Boolean(selectedVariant);
  const labelClass = `grid ${isContact ? "gap-1.5" : "gap-2"} text-sm font-semibold text-graphite`;
  const inputClass = `focus-ring ${
    isContact ? "h-10" : "h-11"
  } rounded-md border border-line bg-white px-3 text-ink`;

  if (sent) {
    return (
      <div className="rounded-lg border border-hvac-aqua bg-white p-6">
        <CheckCircle2 className="mb-3 text-hvac-aqua" size={28} aria-hidden="true" />
        <h3 className="text-xl font-bold text-ink">{isContact ? "Ďakujeme za správu" : "Ďakujeme za dopyt"}</h3>
        <p className="mt-2 text-sm leading-6 text-graphite">
          {isContact
            ? "Ozveme sa vám čo najskôr a dohodneme ďalší postup."
            : "Ozveme sa vám s návrhom vhodného riešenia, dostupnosťou zariadenia a ďalším postupom."}
        </p>
      </div>
    );
  }

  return (
    <form
      className={`grid rounded-lg border border-line bg-white shadow-sm ${
        isContact ? "gap-3 p-5 md:p-6" : "gap-4 p-5"
      }`}
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className={onBack ? "grid gap-3" : ""}>
        {onBack ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className="focus-ring rounded-md border border-line px-3 py-2 text-sm font-bold text-ink transition hover:bg-mist"
            >
              Zmeniť variant
            </button>
          </div>
        ) : null}
        <h2 className={`${isContact || compact ? "text-2xl" : "text-3xl"} font-bold text-ink`}>
          {isContact ? "Napíšte nám" : "Odoslať nezáväzný dopyt"}
        </h2>
      </div>

      {selectedVariant ? (
        <div className="rounded-md border border-hvac-aqua/40 bg-mist p-4">
          <p className="text-xs font-bold uppercase text-hvac-green">Vybraný variant</p>
          <p className="mt-1 text-lg font-bold text-ink">{selectedVariant}</p>
        </div>
      ) : null}

      {showProductField ? (
        <label className={labelClass}>
          Produkt
          <input
            value={productName}
            readOnly
            className="focus-ring h-11 rounded-md border border-line bg-frost px-3 font-bold text-ink"
          />
        </label>
      ) : null}

      <div className={`grid ${isContact ? "gap-3" : "gap-4"} sm:grid-cols-2`}>
        <label className={labelClass}>
          Meno
          <input required className={inputClass} placeholder="Vaše meno" />
        </label>
        <label className={labelClass}>
          Telefón
          <input required className={inputClass} placeholder="+421..." />
        </label>
      </div>

      <label className={labelClass}>
        {isContact ? "Správa" : "Priestor / poznámka"}
        <textarea
          rows={isContact ? 4 : compact ? 3 : 5}
          className={`focus-ring rounded-md border border-line bg-white px-3 text-ink ${isContact ? "py-2.5" : "py-3"}`}
          placeholder={
            isContact
              ? "Napíšte, s čím vám môžeme pomôcť..."
              : "Napr. byt Košice, obývačka 34 m2, chladenie aj kúrenie..."
          }
        />
      </label>

      <button
        type="submit"
        className={`focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-hvac-blue font-bold text-white transition hover:bg-hvac-navy ${
          isContact ? "justify-self-start px-4 py-2.5 text-sm" : "px-5 py-3"
        }`}
      >
        <Send size={17} aria-hidden="true" />
        {isContact ? "Odoslať správu" : "Odoslať dopyt"}
      </button>
    </form>
  );
}
