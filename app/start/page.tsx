"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/question-card";
import { Signature } from "@/components/signature";
import { primaryOptions } from "@/lib/questions";
import { INITIAL_SCORE, applyDelta, type Answer, type AxisKey, type VectorScore } from "@/lib/scoring";

type Step = "primary" | "followup-1" | "followup-2";

export default function StartPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("primary");
  const [score, setScore] = useState<VectorScore>(INITIAL_SCORE);
  const [primary, setPrimary] = useState<AxisKey | null>(null);

  const selectedOption = useMemo(
    () => primaryOptions.find((o) => o.id === primary) ?? null,
    [primary]
  );

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

    const finalScore = applyDelta(updatedScore, {});

    const params = new URLSearchParams({
      s: String(finalScore.structuration),
      c: String(finalScore.comprehension),
      v: String(finalScore.valorisation),
      primary: primary ?? "",
    });

    router.push(`/result?${params.toString()}`);
  };

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl space-y-10">

        <Signature />

        {step === "primary" && (
          <section className="space-y-10 text-center">

            {/* TITRE */}
            <h1 className="font-serif text-3xl leading-tight md:text-5xl">
              Dans quel rôle êtes-vous réellement le plus utile ?
            </h1>

            {/* SOUS-TEXTE */}
            <p className="mx-auto max-w-xl text-sm text-black/60 md:text-base">
              Une lecture rapide pour identifier le type de rôle dans lequel votre manière de réfléchir et d’agir crée le plus de valeur.
            </p>

            {/* CARTES */}
            <div className="grid gap-5 md:grid-cols-3 text-left">

              {/* STRUCTURATION */}
              <button
                onClick={() => handlePrimary("structuration")}
                className="surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/20"
              >
                <h2 className="font-serif text-xl">Structurer</h2>
                <p className="mt-2 text-sm text-black/60">
                  Organiser, clarifier, construire des systèmes.
                </p>
              </button>

              {/* COMPRÉHENSION */}
              <button
                onClick={() => handlePrimary("comprehension")}
                className="surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/20"
              >
                <h2 className="font-serif text-xl">Comprendre</h2>
                <p className="mt-2 text-sm text-black/60">
                  Analyser, interpréter, donner du sens.
                </p>
              </button>

              {/* VALORISATION */}
              <button
                onClick={() => handlePrimary("valorisation")}
                className="surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/20"
              >
                <h2 className="font-serif text-xl">Valoriser</h2>
                <p className="mt-2 text-sm text-black/60">
                  Améliorer l’impact, la perception et la présentation.
                </p>
              </button>

            </div>
          </section>
        )}

        {selectedOption && step !== "primary" && (
          <QuestionCard
            prompt={
              selectedOption.followUps[
                step === "followup-1" ? 0 : 1
              ].prompt
            }
            answers={
              selectedOption.followUps[
                step === "followup-1" ? 0 : 1
              ].answers
            }
            onSelect={handleFollowUp}
          />
        )}

      </div>
    </main>
  );
}
