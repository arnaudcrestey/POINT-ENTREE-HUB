import Link from "next/link";
import { Signature } from "@/components/signature";

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7f9ff] via-[#f4efe8] to-[#e9edf5] px-6 py-12 flex items-center justify-center">
      <section className="w-full max-w-2xl rounded-[32px] border border-black/5 bg-white/90 p-8 text-center shadow-[0_30px_90px_rgba(15,23,42,0.10)] md:p-12">
        <div className="mb-8 flex justify-center">
          <Signature />
        </div>

        <p className="text-xs uppercase tracking-[0.28em] text-[#315f8c]">
          Demande transmise
        </p>

        <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
          Votre message a bien été envoyé.
        </h1>

        <p className="mt-6 text-sm leading-7 text-slate-600">
          Merci pour votre retour. Votre résultat et votre situation vont pouvoir
          être lus avec plus de précision.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#315f8c] px-6 py-3 text-sm font-medium text-white"
        >
          Retour au hub
        </Link>
      </section>
    </main>
  );
}
