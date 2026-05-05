import Link from "next/link";
import { Signature } from "@/components/signature";

export default function HomePage() {
  return (
    <main className="min-h-screen grid-background flex items-center justify-center px-4 py-6 sm:px-6 md:px-12 md:py-12">
      <div className="w-full max-w-6xl">
        <section className="relative overflow-hidden rounded-[28px] border border-black/5 bg-[linear-gradient(180deg,#ffffff_0%,#f5efe6_100%)] px-6 py-9 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:px-8 sm:py-12 md:rounded-[32px] md:px-16 md:py-16">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#315f8c]/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/3 rounded-full bg-[#c8a46b]/14 blur-3xl" />

          {/* HEADER */}
          <div className="relative mb-12 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between md:mb-16">
            <Signature />

            <div className="w-fit rounded-full border border-[#d8c7ad] bg-white/60 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#8b6d43] shadow-[0_12px_35px_rgba(139,109,67,0.08)]">
              Lecture de positionnement
            </div>
          </div>

          {/* CONTENU */}
          <div className="relative max-w-5xl">
            <h1 className="max-w-4xl font-serif text-[42px] leading-[1.02] tracking-[-0.035em] text-[#14110d] sm:text-[54px] md:text-[72px]">
              Où êtes-vous réellement utile ?
            </h1>

            <div className="mt-8 max-w-3xl space-y-4 text-[16px] leading-8 text-black/60 md:text-[18px]">
              <p className="flex items-start gap-3">
                <span className="mt-[13px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#315f8c]" />
                <span>
                  Trois manières d’intervenir. Une seule correspond réellement à
                  votre façon d’agir.
                </span>
              </p>

              <p className="flex items-start gap-3">
                <span className="mt-[13px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#c8a46b]" />
                <span>
                  Identifiez votre position naturelle en quelques questions,
                  sans inscription.
                </span>
              </p>
            </div>

            <div className="mt-8 max-w-2xl rounded-[18px] border border-black/5 bg-white/45 px-5 py-4 shadow-[0_14px_35px_rgba(0,0,0,0.035)] backdrop-blur-sm sm:px-6">
              <p className="flex items-start gap-3 text-[14px] leading-7 text-black/45 md:text-[15px]">
                <span className="mt-[11px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#8b6d43]" />
                <span>
                  Pas un test. Une lecture courte pour comprendre dans quel rôle
                  vous pouvez réellement apporter de la valeur.
                </span>
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/start"
                className="group inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#315f8c_0%,#223f60_100%)] px-8 py-4 text-sm font-medium text-white shadow-[0_18px_45px_rgba(49,95,140,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_22px_55px_rgba(49,95,140,0.34)] sm:w-auto"
              >
                Se positionner
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <div className="text-center text-[13px] leading-6 text-black/40 sm:text-left">
                2 minutes · sans inscription
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
