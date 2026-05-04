import Link from "next/link";
import { Signature } from "@/components/signature";

export default function HomePage() {
  return (
    <main className="min-h-screen grid-background flex items-center justify-center px-6 py-12 md:px-12">

      <div className="w-full max-w-5xl">

        {/* CADRE GLOBAL */}
        <section className="relative rounded-[32px] border border-black/5 bg-[linear-gradient(180deg,#ffffff_0%,#f5efe6_100%)] px-8 py-12 md:px-14 md:py-16 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

          {/* SIGNATURE INTÉGRÉE */}
          <div className="flex flex-col items-center">

            <Signature />

            <div className="mt-4 h-px w-12 bg-black/10" />

            <p className="mt-4 text-[11px] tracking-[0.25em] text-black/40 text-center">
              ORIENTATION STRATÉGIQUE
            </p>

          </div>

          {/* TITRE */}
          <h1 className="mt-10 text-center font-serif text-[36px] leading-[1.2] md:text-[56px]">
            Dans quel rôle êtes-vous
            <br className="hidden md:block" />
            réellement le plus utile ?
          </h1>

          {/* SOUS TEXTE */}
          <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-7 text-black/60 md:text-[16px]">
            Une lecture rapide pour identifier le type de rôle dans lequel votre manière de réfléchir et d’agir crée le plus de valeur.
          </p>

          {/* TRAIT */}
          <div className="mx-auto mt-8 h-px w-16 bg-black/10" />

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/start"
              className="group inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm text-white transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-900"
            >
              Identifier mon rôle

              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

        </section>

      </div>
    </main>
  );
}
