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

function normalizeAnalysis(data: any): AiAnalysis | null {
  if (!data || typeof data !== "object") return null;

  return {
    lecture:
      typeof data.lecture === "string"
        ? data.lecture
        : "L’analyse personnalisée n’a pas pu être générée correctement pour le moment.",
    projection:
      typeof data.projection === "string"
        ? data.projection
        : "Votre résultat indique néanmoins une orientation exploitable dans l’écosystème.",
    attention: Array.isArray(data.attention)
      ? data.attention
      : ["Vérifier la cohérence entre le résultat et votre situation réelle."],
    suite: Array.isArray(data.suite)
      ? data.suite
      : ["Transmettre quelques éléments de contexte pour affiner la lecture."],
  };
}

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
    let active = true;

    async function load() {
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

        if (!active) return;

        if (!response.ok || data.error) {
          setAnalysis(null);
        } else {
          setAnalysis(normalizeAnalysis(data));
        }
      } catch {
        if (active) setAnalysis(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [dominant, entity, structuration, comprehension, valorisation]);

  if (loading) {
    return (
      <section
        className={`rounded-[32px] border p-6 md:p-8 ${
          isDark ? "border-white/10 bg-white/10" : "border-black/5 bg-white/85"
        }`}
      >
        <p className="text-xs uppercase tracking-[0.28em] opacity-50">
          Analyse personnalisée
        </p>
        <h2 className="mt-3 font-serif text-3xl">Lecture en cours…</h2>
        <p className="mt-5 text-sm leading-7 opacity-70">
          Votre résultat est en cours d’interprétation.
        </p>
      </section>
    );
  }

  if (!analysis) {
    return (
      <section
        className={`rounded-[32px] border p-6 md:p-8 ${
          isDark ? "border-white/10 bg-white/10" : "border-black/5 bg-white/85"
        }`}
      >
        <p className="text-xs uppercase tracking-[0.28em] opacity-50">
          Analyse personnalisée
        </p>
        <h2 className="mt-3 font-serif text-3xl">
          Analyse indisponible pour le moment
        </h2>
        <p className="mt-5 text-sm leading-7 opacity-70">
          Le résultat reste exploitable. Vous pouvez transmettre votre situation
          via le formulaire ci-dessous pour recevoir une lecture personnalisée.
        </p>
      </section>
    );
  }

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
            isDark ? "border-white/10 bg-white/10" : "border-black/5 bg-white/85"
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
            isDark ? "border-white/10 bg-white/10" : "border-black/5 bg-white/85"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.28em] opacity-50">
            Points d’attention
          </p>

          <h2 className="mt-3 font-serif text-3xl">
            À vérifier avant d’aller plus loin
          </h2>

          <ul className="mt-5 space-y-3 text-sm leading-6 opacity-75">
            {analysis.attention.map((item, index) => (
              <li key={`${item}-${index}`} className="flex gap-3">
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
            <div key={`${item}-${index}`} className="flex gap-3">
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

