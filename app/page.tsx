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

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 md:px-12">
      <div className="w-full max-w-5xl space-y-12">

        {/* SIGNATURE */}
        <div className="flex flex-col items-center">
          <Signature />
          <div className="mt-4 h-px w-12 bg-black/10" />
        </div>

        {/* ÉTAPE 1 */}
        {step === "primary" && (
          <section className="text-center space-y-10">

            <h1 className="font-serif text-[32px] md:text-[52px] leading-tight">
              Quel type de rôle êtes-vous capable d’assumer ?
            </h1>

            <p className="mx-auto max-w-xl text-[15px] md:text-[16px] text-black/60 leading-7">
              Trois logiques d’action différentes. Trois manières d’intervenir.
              <br className="hidden md:block" />
              Identifiez celle dans laquelle vous êtes réellement solide.
            </p>

            <div className="grid gap-6 md:grid-cols-3">

              <button
                onClick={() => handlePrimary("structuration")}
                className="group rounded-[20px] border border-black/5 bg-white/70 backdrop-blur-sm p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="font-serif text-xl">Structurer</h2>
                <p className="mt-3 text-sm text-black/60 leading-6">
                  Mettre en place, organiser, construire un cadre solide.
                </p>
              </button>

              <button
                onClick={() => handlePrimary("comprehension")}
                className="group rounded-[20px] border border-black/5 bg-white/70 backdrop-blur-sm p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="font-serif text-xl">Comprendre</h2>
                <p className="mt-3 text-sm text-black/60 leading-6">
                  Analyser, interpréter, apporter une lecture claire.
                </p>
              </button>

              <button
                onClick={() => handlePrimary("valorisation")}
                className="group rounded-[20px] border border-black/5 bg-white/70 backdrop-blur-sm p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="font-serif text-xl">Valoriser</h2>
                <p className="mt-3 text-sm text-black/60 leading-6">
                  Améliorer l’impact, rendre visible et attractif.
                </p>
              </button>

            </div>
          </section>
        )}

        {/* ÉTAPE 2 */}
        {step === "followup-1" && (
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
        )}

        {/* ÉTAPE 3 */}
        {step === "followup-2" && (
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
        )}

      </div>
    </main>
  );
}
