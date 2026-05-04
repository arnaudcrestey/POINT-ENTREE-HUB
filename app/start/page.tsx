"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/question-card";
import { Signature } from "@/components/signature";
import {
  INITIAL_SCORE,
  applyDelta,
  type Answer,
  type AxisKey,
  type VectorScore,
} from "@/lib/scoring";

type Step = "primary" | "followup-1" | "followup-2";

export default function StartPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("primary");
  const [score, setScore] = useState<VectorScore>(INITIAL_SCORE);
  const [primary, setPrimary] = useState<AxisKey | null>(null);

  const handlePrimary = (axis: AxisKey) => {
    setPrimary(axis);
    setScore((prev) => applyDelta(prev, { [axis]: 3 }));
    setStep("followup-1");
  };

  const handleFollowUp = (answer: Answer) => {
    const updatedScore = applyDelta(score, answer.delta);

    if (step === "followup-1") {
      setScore(updatedScore);
      setStep("followup-2");
      return;
    }

    const params = new URLSearchParams({
      s: String(updatedScore.structuration),
      c: String(updatedScore.comprehension),
      v: String(updatedScore.valorisation),
      primary: primary ?? "",
    });

    router.push(`/result?${params.toString()}`);
  };

  const cardClass =
    "group relative overflow-hidden rounded-[22px] border border-black/5 bg-white/75 p-6 text-left shadow-[0_14px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#315f8c]/35 hover:bg-white hover:shadow-[0_22px_55px_rgba(49,95,140,0.14)]";

  return (
    <main className="min-h-screen grid-background flex items-center justify-center px-4 py-6 sm:px-6 md:px-12 md:py-12">
      <div className="w-full max-w-6xl">
        <section className="relative overflow-hidden rounded-[28px] border border-black/5 bg-[linear-gradient(180deg,#ffffff_0%,#f5efe6_100%)] px-6 py-9 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:px-8 sm:py-12 md:rounded-[32px] md:px-16 md:py-16">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#315f8c]/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-[#c8a46b]/14 blur-3xl" />

          {/* HEADER */}
          <div className="relative mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <Signature />

            <div className="w-fit rounded-full border border-[#d8c7ad] bg-white/55 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#8b6d43]">
              Lecture professionnelle
            </div>
          </div>

          {/* ÉTAPE 1 */}
          {step === "primary" && (
            <section>
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/35">
                Orientation stratégique
              </div>

              <h1 className="relative mt-8 max-w-4xl font-serif text-[35px] leading-[1.08] tracking-[-0.02em] text-[#14110d] sm:text-[46px] md:text-[56px]">
                Quel type de rôle êtes-vous capable d’assumer ?
              </h1>

              <div className="relative mt-6 max-w-2xl space-y-3 text-[16px] leading-8 text-black/60 md:text-[17px]">
                <p>
                  Trois logiques d’action différentes. Trois manières
                  d’intervenir.
                </p>
                <p>
                  Identifiez celle dans laquelle vous êtes réellement solide.
                </p>
              </div>

              <div className="relative mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                <button
                  onClick={() => handlePrimary("structuration")}
                  className={cardClass}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#315f8c,#c8a46b)] opacity-70" />

                  <h2 className="font-serif text-[24px] text-[#14110d]">
                    Structurer
                  </h2>

                  <p className="mt-3 text-[14px] leading-6 text-black/50">
                    Mettre en place, organiser, construire un cadre solide.
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b6d43]">
                      Choisir ce rôle
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#315f8c]/10 text-[#315f8c] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#315f8c] group-hover:text-white">
                      →
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handlePrimary("comprehension")}
                  className={cardClass}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#315f8c,#c8a46b)] opacity-70" />

                  <h2 className="font-serif text-[24px] text-[#14110d]">
                    Comprendre
                  </h2>

                  <p className="mt-3 text-[14px] leading-6 text-black/50">
                    Analyser, interpréter, apporter une lecture claire.
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b6d43]">
                      Choisir ce rôle
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#315f8c]/10 text-[#315f8c] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#315f8c] group-hover:text-white">
                      →
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handlePrimary("valorisation")}
                  className={cardClass}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#315f8c,#c8a46b)] opacity-70" />

                  <h2 className="font-serif text-[24px] text-[#14110d]">
                    Valoriser
                  </h2>

                  <p className="mt-3 text-[14px] leading-6 text-black/50">
                    Améliorer l’impact, rendre visible et attractif.
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b6d43]">
                      Choisir ce rôle
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#315f8c]/10 text-[#315f8c] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#315f8c] group-hover:text-white">
                      →
                    </span>
                  </div>
                </button>
              </div>
            </section>
          )}

          {/* ÉTAPE 2 */}
          {step === "followup-1" && (
            <div className="relative">
              <QuestionCard
                prompt="Face à une situation à gérer, votre premier réflexe est :"
                answers={[
                  {
                    id: "structurer",
                    label: "Poser un cadre et organiser",
                    delta: { structuration: 2 },
                  },
                  {
                    id: "comprendre",
                    label: "Analyser avant d’agir",
                    delta: { comprehension: 2 },
                  },
                  {
                    id: "valoriser",
                    label: "Améliorer ce qui est visible",
                    delta: { valorisation: 2 },
                  },
                ]}
                onSelect={handleFollowUp}
              />
            </div>
          )}

          {/* ÉTAPE 3 */}
          {step === "followup-2" && (
            <div className="relative">
              <QuestionCard
                prompt="Dans un projet, vous êtes le plus à l’aise pour :"
                answers={[
                  {
                    id: "systeme",
                    label: "Construire une structure efficace",
                    delta: { structuration: 2 },
                  },
                  {
                    id: "analyse",
                    label: "Apporter une compréhension fine",
                    delta: { comprehension: 2 },
                  },
                  {
                    id: "impact",
                    label: "Rendre le résultat plus impactant",
                    delta: { valorisation: 2 },
                  },
                ]}
                onSelect={handleFollowUp}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
