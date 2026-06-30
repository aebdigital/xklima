"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Download, FileUp, ImageIcon, Wand2 } from "lucide-react";

export function CmsWatermarkUploader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [ready, setReady] = useState(false);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFileName(file.name);
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) {
        URL.revokeObjectURL(url);
        return;
      }

      const maxWidth = 1400;
      const scale = Math.min(1, maxWidth / image.width);
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      context.save();
      context.globalAlpha = 0.16;
      context.fillStyle = "#ffffff";
      context.strokeStyle = "rgba(11, 92, 122, 0.28)";
      context.lineWidth = 2;
      context.font = `700 ${Math.max(26, canvas.width / 18)}px Arial, sans-serif`;
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(-Math.PI / 7);

      const text = "X-KLIMA SLOVAKIA";
      const metrics = context.measureText(text);
      const stepX = metrics.width + 180;
      const stepY = Math.max(140, canvas.height / 5);

      for (let y = -canvas.height; y < canvas.height; y += stepY) {
        for (let x = -canvas.width; x < canvas.width; x += stepX) {
          context.strokeText(text, x, y);
          context.fillText(text, x, y);
        }
      }

      context.restore();
      setReady(true);
      URL.revokeObjectURL(url);
    };

    image.src = url;
  }

  function downloadWatermarked() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const link = document.createElement("a");
    const baseName = fileName.replace(/\.[^.]+$/, "") || "xklima-foto";
    link.download = `${baseName}-watermark.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.9);
    link.click();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <FileUp className="mb-4 text-hvac-blue" size={28} aria-hidden="true" />
        <h2 className="text-2xl font-bold text-ink">Upload fotografie</h2>
        <p className="mt-2 text-sm leading-6 text-graphite">
          Po výbere obrázka sa automaticky vykreslí vodoznak X-Klima. Rovnaký krok sa dá presunúť do CMS upload pipeline.
        </p>
        <label className="focus-ring mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-hvac-aqua bg-mist px-4 py-6 text-center font-bold text-hvac-blue">
          <ImageIcon size={20} aria-hidden="true" />
          Vybrať obrázok
          <input type="file" accept="image/*" onChange={handleFile} className="sr-only" />
        </label>

        <button
          type="button"
          disabled={!ready}
          onClick={downloadWatermarked}
          className="focus-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-hvac-blue px-4 py-3 font-bold text-white transition hover:bg-hvac-navy disabled:cursor-not-allowed disabled:bg-graphite"
        >
          <Download size={17} aria-hidden="true" />
          Stiahnuť s vodoznakom
        </button>

        <div className="mt-5 rounded-md bg-frost p-4">
          <p className="text-sm font-bold text-ink">CMS pravidlo</p>
          <p className="mt-1 text-sm leading-6 text-graphite">
            Pri ostrom CMS by sa vodoznak pridal po nahratí originálu a uložili by sa verzie: originál, web náhľad, watermarked.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-line bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-graphite">
          <Wand2 size={17} aria-hidden="true" />
          Náhľad
          {fileName ? <span className="text-ink">{fileName}</span> : null}
        </div>
        <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-md bg-frost">
          <canvas ref={canvasRef} className={`max-h-[620px] max-w-full ${ready ? "block" : "hidden"}`} />
          {!ready ? <p className="px-6 text-center text-sm font-semibold text-graphite">Vyberte fotografiu pre náhľad vodoznaku.</p> : null}
        </div>
      </div>
    </div>
  );
}
