import { CmsWatermarkUploader } from "@/components/CmsWatermarkUploader";

export default function CmsMediaPage() {
  return (
    <section className="container-x section-y">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase text-hvac-green">CMS media</p>
        <h1 className="text-4xl font-black text-ink md:text-6xl">Automatický vodoznak na fotky</h1>
        <p className="mt-5 text-lg leading-8 text-graphite">
          Ukážka logiky pre administráciu: nahratá fotka dostane X-Klima vodoznak a až následne sa použije na webe.
        </p>
      </div>
      <CmsWatermarkUploader />
    </section>
  );
}
