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
    "group relative overflow-hidden rounded-[22px] border border-[#e6ddd2] bg-[linear-gradient(180deg,rgba(253,250,244,0.96)_0%,rgba(246,239,229,0.96)_100%)] p-6 text-left shadow-[0_18px_48px_rgba(75,55,32,0.075)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#315f8c]/40 hover:shadow-[0_24px_64px_rgba(49,95,140,0.16)]";

  return (
    <main className="min-h-screen grid-background flex items-center justify-center px-4 py-6 sm:px-6 md:px-12 md:py-12">
      <div className="w-full max-w-6xl">
        <section className="relative overflow-hidden rounded-[28px] border border-black/5 bg-[linear-gradient(180deg,#ffffff_0%,#f5efe6_100%)] px-6 py-9 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:px-8 sm:py-12 md:rounded-[32px] md:px-16 md:py-16">

          {/* LIGHT EFFECTS */}
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#315f8c]/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-[#c8a46b]/14 blur-3xl" />

          {/* HEADER */}
          <div className="relative mb-14 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
            <Signature />

            <div className="w-fit rounded-full border border-[#d8c7ad] bg-white/55 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#8b6d43]">
              Lecture de positionnement
            </div>
          </div>

          {/* ÉTAPE 1 */}
          {step === "primary" && (
            <section>
              <h1 className="relative max-w-4xl font-serif text-[34px] leading-[1.12] tracking-[-0.02em] text-[#14110d] sm:text-[48px] md:text-[60px]">
  Quel type de rôle êtes-vous réellement en capacité d’assumer&nbsp;?
</h1>

              <div className="relative mt-6 max-w-2xl space-y-3 text-[16px] leading-8 text-black/60 md:text-[17px]">
                <p>
                  Trois logiques d’intervention distinctes. Une seule correspond à votre manière d’agir lorsque cela compte.
                </p>
                <p>
                  Identifiez celle dans laquelle vous êtes réellement fiable.
                </p>
              </div>

              {/* CARTES */}
              <div className="relative mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">

                {/* STRUCTURER */}
                <button
                  onClick={() => handlePrimary("structuration")}
                  className={cardClass}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#315f8c,#c8a46b)] opacity-90" />

                  <h2 className="font-serif text-[24px] text-[#14110d]">
                    Structurer
                  </h2>

                  <p className="mt-3 text-[14px] leading-6 text-black/55">
                    Mettre en place un cadre, organiser et rendre une activité réellement opérationnelle.
                  </p>

                  <p className="mt-4 text-[13px] italic text-black/40">
                    Vous prenez naturellement le rôle de celui qui organise et rend les choses solides.
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-black/7 pt-4">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#8b6d43]">
                      Choisir ce rôle
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#315f8c]/15 text-[#315f8c] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#315f8c] group-hover:text-white">
                      →
                    </span>
                  </div>
                </button>

                {/* COMPRENDRE */}
                <button
                  onClick={() => handlePrimary("comprehension")}
                  className={cardClass}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#315f8c,#c8a46b)] opacity-90" />

                  <h2 className="font-serif text-[24px] text-[#14110d]">
                    Comprendre
                  </h2>

                  <p className="mt-3 text-[14px] leading-6 text-black/55">
                    Analyser une situation, en comprendre les mécanismes et apporter une lecture exploitable.
                  </p>

                  <p className="mt-4 text-[13px] italic text-black/40">
                    Vous cherchez à comprendre avant d’agir, pour éviter les erreurs de lecture.
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-black/7 pt-4">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#8b6d43]">
                      Choisir ce rôle
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#315f8c]/15 text-[#315f8c] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#315f8c] group-hover:text-white">
                      →
                    </span>
                  </div>
                </button>

                {/* VALORISER */}
                <button
                  onClick={() => handlePrimary("valorisation")}
                  className={cardClass}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#315f8c,#c8a46b)] opacity-90" />

                  <h2 className="font-serif text-[24px] text-[#14110d]">
                    Valoriser
                  </h2>

                  <p className="mt-3 text-[14px] leading-6 text-black/55">
                    Améliorer la perception, renforcer l’impact et rendre une offre réellement visible.
                  </p>

                  <p className="mt-4 text-[13px] italic text-black/40">
                    Vous voyez immédiatement comment améliorer l’impact et la perception.
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-black/7 pt-4">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#8b6d43]">
                      Choisir ce rôle
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#315f8c]/15 text-[#315f8c] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#315f8c] group-hover:text-white">
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
