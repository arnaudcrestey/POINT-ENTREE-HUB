"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { QuestionCard } from "@/components/question-card";
import { Signature } from "@/components/signature";

import {
  primaryOptions,
  QUESTIONS_PER_SESSION,
} from "@/lib/questions";

import {
  INITIAL_SCORE,
  INITIAL_SUBSIGNALS,

  applyDelta,
  applySubSignals,

  type Answer,
  type AxisKey,
  type Question,
  type VectorScore,
  type SubSignals,
} from "@/lib/scoring";

type Step = "primary" | "followup";

function pickRandomQuestions<T>(
  items: T[],
  count: number
): T[] {
  return [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function shuffleAnswers(
  question: Question
): Question {
  return {
    ...question,

    answers: [...question.answers].sort(
      () => Math.random() - 0.5
    ),
  };
}

export default function StartPage() {
  const router = useRouter();

  const [step, setStep] =
    useState<Step>("primary");

  const [score, setScore] =
    useState<VectorScore>(
      INITIAL_SCORE
    );

  const [subSignals, setSubSignals] =
    useState<SubSignals>(
      INITIAL_SUBSIGNALS
    );

  const [primary, setPrimary] =
    useState<AxisKey | null>(null);

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const currentQuestion = useMemo(() => {
    return questions[currentIndex];
  }, [questions, currentIndex]);

  const handlePrimary = (
    axis: AxisKey
  ) => {
    const selectedOption =
      primaryOptions.find(
        (option) => option.id === axis
      );

    if (!selectedOption) return;

    const selectedQuestions =
      pickRandomQuestions(
        selectedOption.followUps,
        QUESTIONS_PER_SESSION
      ).map(shuffleAnswers);

    setPrimary(axis);

    setQuestions(selectedQuestions);

    setCurrentIndex(0);

    setScore({
      ...INITIAL_SCORE,
      [axis]: 100,
    });

    setSubSignals(
      INITIAL_SUBSIGNALS
    );

    setStep("followup");
  };

  const handleFollowUp = (
    answer: Answer
  ) => {
    if (!primary) return;

    const updatedScore =
      applyDelta(
        score,
        answer.delta
      );

    const updatedSubSignals =
      applySubSignals(
        subSignals,
        answer.subSignals
      );

    const lockedScore: VectorScore = {
      ...updatedScore,

      [primary]: Math.max(
        updatedScore[primary],
        100
      ),
    };

    const nextIndex =
      currentIndex + 1;

    if (
      nextIndex < questions.length
    ) {
      setScore(lockedScore);

      setSubSignals(
        updatedSubSignals
      );

      setCurrentIndex(nextIndex);

      return;
    }

    const params =
      new URLSearchParams({
        s: String(
          lockedScore.structuration
        ),

        c: String(
          lockedScore.comprehension
        ),

        v: String(
          lockedScore.valorisation
        ),

        axis: primary,

        clarte: String(
          updatedSubSignals.clarte
        ),

        methode: String(
          updatedSubSignals.methode
        ),

        pilotage: String(
          updatedSubSignals.pilotage
        ),

        discernement: String(
          updatedSubSignals.discernement
        ),

        ecoute: String(
          updatedSubSignals.ecoute
        ),

        lecture: String(
          updatedSubSignals.lecture
        ),

        perception: String(
          updatedSubSignals.perception
        ),

        impact: String(
          updatedSubSignals.impact
        ),

        lisibilite: String(
          updatedSubSignals.lisibilite
        ),
      });

    router.push(
      `/result?${params.toString()}`
    );
  };

  const cardClass =
    "group relative overflow-hidden rounded-[22px] border border-[#e6ddd2] bg-[linear-gradient(180deg,rgba(253,250,244,0.96)_0%,rgba(246,239,229,0.96)_100%)] p-6 text-left shadow-[0_18px_48px_rgba(75,55,32,0.075)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#315f8c]/40 hover:shadow-[0_24px_64px_rgba(49,95,140,0.16)]";

  return (
    <main className="min-h-screen grid-background flex items-center justify-center px-4 py-6 sm:px-6 md:px-12 md:py-12">
      <div className="w-full max-w-6xl">
        <section className="relative rounded-[28px] border border-black/5 bg-[linear-gradient(180deg,#ffffff_0%,#f5efe6_100%)] px-6 py-9 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:px-8 sm:py-12 md:rounded-[32px] md:px-16 md:py-16">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#315f8c]/10 blur-3xl" />

          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-[#c8a46b]/14 blur-3xl" />

          <div className="relative mb-14 flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
            <div className="flex shrink-0 flex-col items-center overflow-visible pb-6">
              <Signature />
            </div>

            <div className="w-fit rounded-full border border-[#d8c7ad] bg-white/55 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#8b6d43] shadow-sm">
              Lecture de positionnement
            </div>
          </div>

          {step === "primary" && (
            <section>
              <h1 className="relative max-w-4xl font-serif text-[34px] leading-[1.12] tracking-[-0.02em] text-[#14110d] sm:text-[48px] md:text-[60px]">
                Quel type de rôle êtes-vous réellement en capacité
                d’assumer&nbsp;?
              </h1>

              <div className="relative mt-6 max-w-2xl space-y-3 text-[16px] leading-8 text-black/60 md:text-[17px]">
                <p>
                  Trois logiques d’intervention distinctes. Une seule correspond
                  à votre manière d’agir lorsque cela compte.
                </p>

                <p>
                  Identifiez celle dans laquelle vous êtes réellement fiable.
                </p>
              </div>

              <div className="relative mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                {/* TES 3 CARTES RESTENT IDENTIQUES */}
              </div>
            </section>
          )}

          {step === "followup" &&
            currentQuestion && (
              <div className="relative overflow-visible pb-6">
                <div className="mb-5 text-center text-[10px] uppercase tracking-[0.22em] text-[#8b6d43]">
                  Question {currentIndex + 1} /{" "}
                  {questions.length}
                </div>

                <QuestionCard
                  prompt={
                    currentQuestion.prompt
                  }
                  answers={
                    currentQuestion.answers
                  }
                  onSelect={
                    handleFollowUp
                  }
                />
              </div>
            )}
        </section>
      </div>
    </main>
  );
}
