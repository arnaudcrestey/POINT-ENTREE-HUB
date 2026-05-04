"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/question-card";
import { Signature } from "@/components/signature";
import { INITIAL_SCORE, applyDelta, type Answer, type AxisKey, type VectorScore } from "@/lib/scoring";

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

        {step === "primary" && (
          <section className="text-center space-y-10">

            <h1 className="font-serif text-3xl md:text-5xl leading-tight">
              Dans quel rôle êtes-vous réellement le plus utile ?
            </h1>

            <p className="mx-auto max-w-xl text-sm md:text-base text-black/60">
              Identifiez le type de rôle dans lequel votre manière de penser et d’agir crée le plus de valeur.
            </p>

            {/* CARTES */}
            <div className="grid gap-6 md:grid-cols-3">

              {[
                {
                  id: "structuration",
                  title: "Structurer",
                  desc: "Organiser, clarifier, construire.",
                },
                {
                  id: "comprehension",
                  title: "Comprendre",
                  desc: "Analyser, interpréter, donner du sens.",
                },
                {
                  id: "valorisation",
                  title: "Valoriser",
                  desc: "Améliorer l’impact et la perception.",
                },
              ].map((card) => (
                <button
                  key={card.id}
                  onClick={() => handlePrimary(card.id as AxisKey)}
                  className="group rounded-[20px] border border-black/5 bg-white/70 backdrop-blur-sm p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <h2 className="font-serif text-xl">{card.title}</h2>
                  <p className="mt-3 text-sm text-black/60">{card.desc}</p>
                </button>
              ))}

            </div>

          </section>
        )}

        {step !== "primary" && (
          <QuestionCard
            prompt="Face à une situation complexe, votre premier réflexe est :"
            answers={[
              { label: "Structurer et organiser", delta: { structuration: 2 } },
              { label: "Analyser et comprendre", delta: { comprehension: 2 } },
              { label: "Améliorer et valoriser", delta: { valorisation: 2 } },
            ]}
            onSelect={handleFollowUp}
          />
        )}

      </div>
    </main>
  );
}
