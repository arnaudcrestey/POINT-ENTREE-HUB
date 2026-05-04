import Link from "next/link";
import { Signature } from "@/components/signature";

export default function HomePage() {
  return (
    <main className="min-h-screen grid-background flex items-center justify-center px-6 py-12 md:px-12">

      <div className="w-full max-w-6xl">

        <section className="relative rounded-[32px] border border-black/5 bg-[linear-gradient(180deg,#ffffff_0%,#f5efe6_100%)] px-8 py-12 md:px-16 md:py-16 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-10">
            <Signature />
            <div className="text-[11px] tracking-[0.2em] text-black/40 uppercase">
              Lecture professionnelle
            </div>
          </div>

          {/* TITRE */}
          <h1 className="font-serif text-[34px] leading-[1.2] md:text-[56px] max-w-4xl">
            Quel type de rôle êtes-vous réellement capable d’assumer ?
          </h1>

          {/* TEXTE */}
          <div className="mt-6 max-w-2xl text-[15px] leading-7 text-black/60 md:text-[16px] space-y-2">
            <p>
              Structurer, analyser ou produire demandent des logiques très différentes.
            </p>
            <p>
              En quelques questions, identifiez votre position naturelle et la manière dont vous pouvez réellement intervenir dans un système existant.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm text-white transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-900"
            >
              Accéder à la lecture
              <span className="ml-2">→</span>
            </Link>

            <div className="text-[13px] text-black/40">
              2 minutes · sans inscription
            </div>
          </div>

          {/* BLOCS */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="rounded-[20px] border border-black/5 bg-white/70 p-6">
              <h3 className="font-medium text-[16px] mb-2">Position claire</h3>
              <p className="text-[14px] text-black/50 leading-6">
                Une lecture directe du rôle dans lequel vous êtes réellement pertinent.
              </p>
            </div>

            <div className="rounded-[20px] border border-black/5 bg-white/70 p-6">
              <h3 className="font-medium text-[16px] mb-2">Projection</h3>
              <p className="text-[14px] text-black/50 leading-6">
                Une vision concrète du type de responsabilités que vous pouvez assumer.
              </p>
            </div>

            <div className="rounded-[20px] border border-black/5 bg-white/70 p-6">
              <h3 className="font-medium text-[16px] mb-2">Orientation</h3>
              <p className="text-[14px] text-black/50 leading-6">
                Une direction claire vers un cadre structuré correspondant à votre profil.
              </p>
            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
