import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CmsPage() {
  return (
    <section className="container-x section-y">
      <p className="mb-3 text-sm font-bold uppercase text-hvac-green">Administrácia</p>
      <h1 className="text-4xl font-black text-ink md:text-6xl">Administrácia obsahu</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite">
        Spravujte fotografie pre web a exportujte ich s jednotným vodoznakom X-Klima Slovakia.
      </p>
      <Link href="/cms/media" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-md bg-hvac-blue px-5 py-3 font-bold text-white">
        Správa fotografií
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </section>
  );
}
