import Link from "next/link";
import { Signature } from "@/components/signature";

export default function MerciPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#eef2f8] via-[#f5efe7] to-[#e7edf6] px-6 py-12">
      
      <div className="absolute left-[-120px] top-[120px] h-72 w-72 rounded-full bg-[#315f8c]/10 blur-[90px]" />
      <div className="absolute bottom-[60px] right-[-80px] h-80 w-80 rounded-full bg-[#cdb28a]/20 blur-[100px]" />

      <section className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[38px] border border-black/5 bg-white/80 shadow-[0_40px_120px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        
        <div className="border-b border-black/5 px-8 py-10 md:px-12">
          <Signature />
        </div>

        <div className="px-8 py-12 text-center md:px-14 md:py-16">
          
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#8a7557]">
            Transmission confirmée
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-tight text-[#111827] md:text-5xl">
            Votre situation a bien été transmise
          </h1>

          <div className="mx-auto mt-8 h-px w-20 bg-[#d5c2a0]" />

          <div className="mx-auto mt-8 max-w-xl space-y-6 text-sm leading-8 text-slate-600 md:text-[15px]">
            <p>
              Les éléments transmis pourront désormais être relus dans un cadre
              plus précis et plus contextualisé.
            </p>

            <p>
              Cette étape permet simplement d’évaluer si une cohérence
              professionnelle mérite d’être approfondie.
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex rounded-full bg-[#315f8c] px-7 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(49,95,140,0.20)] transition duration-300 hover:-translate-y-0.5"
            >
              Revenir à l’environnement principal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
