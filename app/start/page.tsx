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

  const selectedOption = useMemo(() => primaryOptions.find((o) => o.id === primary) ?? null, [primary]);

  const handlePrimary = (axis: AxisKey) => {
    setPrimary(axis);
    setScore((prev) => applyDelta(prev, { [axis]: 3 }));
    setStep("followup-1");
  };

  const handleFollowUp = (answer: Answer) => {
    setScore((prev) => applyDelta(prev, answer.delta));
    if (step === "followup-1") {
      setStep("followup-2");
      return;
    }
    const params = new URLSearchParams({
      s: String(score.structuration + (answer.delta.structuration ?? 0)),
      c: String(score.comprehension + (answer.delta.comprehension ?? 0)),
      v: String(score.valorisation + (answer.delta.valorisation ?? 0)),
      primary: primary ?? "",
    });
    router.push(`/result?${params.toString()}`);
  };

  return (
    <main className="min-h-screen px-6 py-12 md:px-12">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <Signature />
        {step === "primary" ? (
          <section className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl">Quel est votre besoin central actuellement ?</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {primaryOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => handlePrimary(option.id)}
                  className="surface p-6 text-left transition hover:-translate-y-0.5 hover:border-black/20"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-black/50">{option.subtitle}</p>
                  <h2 className="mt-2 font-serif text-2xl">{option.title}</h2>
                  <p className="mt-3 text-sm text-black/65">{option.context}</p>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {selectedOption && step !== "primary" ? (
          <QuestionCard
            prompt={selectedOption.followUps[step === "followup-1" ? 0 : 1].prompt}
            answers={selectedOption.followUps[step === "followup-1" ? 0 : 1].answers}
            onSelect={handleFollowUp}
          />
        ) : null}
      </div>
    </main>
  );
}
