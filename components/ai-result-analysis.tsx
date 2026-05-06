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

  const cardClass = `rounded-[32px] border p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] md:p-9 ${
    isDark ? "border-white/10 bg-white/10" : "border-white/70 bg-white/88"
  }`;

  if (loading) {
    return (
      <section className={cardClass}>
        <p className="text-xs uppercase tracking-[0.28em] opacity-50">
          Analyse personnalisée
        </p>

        <h2 className="mt-3 font-serif text-3xl leading-tight">
          Lecture en cours…
        </h2>

        <p className="mt-5 text-sm leading-7 opacity-70">
          Votre résultat est en cours d’interprétation.
        </p>
      </section>
    );
  }

  if (!analysis) {
    return (
      <section className={cardClass}>
        <p className="text-xs uppercase tracking-[0.28em] opacity-50">
          Analyse personnalisée
        </p>

        <h2 className="mt-3 font-serif text-3xl leading-tight">
          Analyse indisponible pour le moment
        </h2>

        <p className="mt-5 text-sm leading-7 opacity-70">
          Le résultat reste exploitable. Vous pouvez transmettre votre situation
          via le formulaire ci-dessous pour recevoir une lecture plus précise.
        </p>
      </section>
    );
  }

  return (
    <section className={cardClass}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] opacity-50">
            Analyse personnalisée
          </p>

          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
            Lecture professionnelle du résultat
          </h2>
        </div>

        <p
          className="w-fit rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em]"
          style={{
            color,
            borderColor: `${color}40`,
            backgroundColor: `${color}10`,
          }}
        >
          {entity}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-sm leading-7 opacity-78 whitespace-pre-line">
            {analysis.lecture}
          </p>

          <div className="mt-7 border-t pt-6 opacity-90">
            <p className="text-xs uppercase tracking-[0.22em] opacity-45">
              Projection
            </p>

            <p className="mt-3 text-sm leading-7 opacity-75 whitespace-pre-line">
              {analysis.projection}
            </p>
          </div>
        </div>

        <div
          className={`rounded-[24px] border p-5 ${
            isDark
              ? "border-white/10 bg-black/15"
              : "border-black/5 bg-[#f8fafc]"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.22em] opacity-45">
            Points à vérifier
          </p>

          <ul className="mt-4 space-y-3 text-sm leading-6">
            {analysis.attention.slice(0, 2).map((item, index) => (
              <li key={`${item}-${index}`} className="flex gap-3">
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="opacity-75">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-5">
            <p className="text-xs uppercase tracking-[0.22em] opacity-45">
              Suite utile
            </p>

            <ul className="mt-4 space-y-3 text-sm leading-6">
              {analysis.suite.slice(0, 2).map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-3">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] text-white"
                    style={{ backgroundColor: color }}
                  >
                    {index + 1}
                  </span>
                  <span className="opacity-75">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
