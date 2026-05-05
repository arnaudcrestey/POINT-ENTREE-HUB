"use client";

import { useEffect, useState } from "react";
import type { AxisKey } from "@/lib/scoring";

type AiAnalysis = {
  lecture: string;
  projection: string;
  attention: string[];
  suite: string[];
};

type Props = {
  dominant: AxisKey;
  entity: string;
  structuration: number;
  comprehension: number;
  valorisation: number;
  color: string;
  isDark: boolean;
};

export function AiResultAnalysis({
  dominant,
  entity,
  structuration,
  comprehension,
  valorisation,
  color,
  isDark,
}: Props) {
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const response = await fetch("/api/analyse-resultat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dominant,
            entity,
            structuration,
            comprehension,
            valorisation,
          }),
        });

        const data = await response.json();
        setAnalysis(data);
      } catch {
        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    }

    loadAnalysis();
  }, [dominant, entity, structuration, comprehension, valorisation]);

  if (loading) {
    return (
      <section
        className={`rounded-[32px] border p-6 md:p-8 ${
          isDark ? "border-white/10 bg-white/10" : "border-black/5 bg-white/85"
        }`}
      >
        <p className="text-xs uppercase tracking-[0.28em] opacity-50">
          Analyse en cours
        </p>
        <h2 className="mt-3 font-serif text-3xl">
          Lecture personnalisée de votre profil…
        </h2>
        <p className="mt-5 text-sm leading-7 opacity-70">
          Votre résultat est en train d’être interprété à partir des trois axes.
        </p>
      </section>
    );
  }

  if (!analysis) return null;

  return (
    <>
      <section
        className={`rounded-[32px] border p-6 md:p-8 ${
          isDark ? "border-white/10 bg-white/10" : "border-black/5 bg-white/85"
        }`}
      >
        <p className="text-xs uppercase tracking-[0.28em] opacity-50">
          Analyse personnalisée
        </p>

        <h2 className="mt-3 font-serif text-3xl">Lecture fine du résultat</h2>

        <p className="mt-5 whitespace-pre-line text-sm leading-7 opacity-75">
          {analysis.lecture}
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section
          className={`rounded-[28px] border p-6 md:p-8 ${
            isDark
              ? "border-white/10 bg-white/10"
              : "border-black/5 bg-white/85"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.28em] opacity-50">
            Projection concrète
          </p>

          <h2 className="mt-3 font-serif text-3xl">Votre place possible</h2>

          <p className="mt-5 whitespace-pre-line text-sm leading-7 opacity-75">
            {analysis.projection}
          </p>
        </section>

        <section
          className={`rounded-[28px] border p-6 md:p-8 ${
            isDark
              ? "border-white/10 bg-white/10"
              : "border-black/5 bg-white/85"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.28em] opacity-50">
            Points d’attention
          </p>

          <h2 className="mt-3 font-serif text-3xl">
            À vérifier avant d’aller plus loin
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 opacity-75">
            {analysis.attention.map((item) => (
              <li key={item} className="flex gap-3">
                <span style={{ color }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section
        className={`rounded-[28px] border p-6 md:p-8 ${
          isDark ? "border-white/10 bg-white/10" : "border-black/5 bg-white/85"
        }`}
      >
        <p className="text-xs uppercase tracking-[0.28em] opacity-50">
          Suite logique
        </p>

        <h2 className="mt-3 font-serif text-3xl">
          Ce qu’il faut regarder maintenant
        </h2>

        <div className="mt-5 space-y-3 text-sm leading-6">
          {analysis.suite.map((item, index) => (
            <div key={item} className="flex gap-3">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs text-white"
                style={{ backgroundColor: color }}
              >
                {index + 1}
              </span>
              <span className="opacity-75">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
