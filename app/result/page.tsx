import Link from "next/link";
import { Signature } from "@/components/signature";
import { VectorRadar } from "@/components/vector-radar";
import { AiResultAnalysis } from "@/components/ai-result-analysis";
import {
  computeDominantAxis,
  getHybridAxes,
  normalizeScore,
  type AxisKey,
  type VectorScore,
} from "@/lib/scoring";

const axisMeta: Record<
  AxisKey,
  {
    name: string;
    entity: string;
    gradient: string;
    color: string;
    intro: string;
    reflex: string;
    role: string;
    actions: string[];
  }
> = {
  structuration: {
    name: "Structuration",
    entity: "SYSTIA",
    gradient: "from-[#eef4ff] via-[#f6f8fc] to-[#efe7da]",
    color: "#315f8c",
    intro:
      "Vous intervenez naturellement là où un système doit être clarifié, structuré ou rendu opérationnel.",
    reflex:
      "Votre réflexe est de poser un cadre, d’organiser les priorités et de transformer le flou en méthode.",
    role: "SYSTIA — Structuration",
    actions: [
      "clarifier une activité ou une offre",
      "organiser un parcours, un outil ou une méthode",
      "rendre un système plus fiable et plus lisible",
    ],
  },
  comprehension: {
    name: "Compréhension",
    entity: "Cabinet Astraé",
    gradient: "from-[#fff7f5] via-[#f8eee8] to-[#eef3ff]",
    color: "#b46b7d",
    intro:
      "Vous intervenez naturellement là où une situation doit être comprise, clarifiée ou relue avec discernement.",
    reflex:
      "Votre réflexe est de chercher ce qui se joue derrière les apparences.",
    role: "Cabinet Astraé — Compréhension",
    actions: [
      "analyser une situation complexe",
      "repérer les signaux faibles",
      "formuler une lecture claire et utile",
    ],
  },
  valorisation: {
    name: "Valorisation",
    entity: "QLYK",
    gradient: "from-[#101827] via-[#172033] to-[#eef3ff]",
    color: "#7f8bff",
    intro:
      "Vous intervenez naturellement sur la perception, la lisibilité et l’impact d’un projet.",
    reflex:
      "Votre réflexe est d’améliorer ce qui est vu, compris et ressenti.",
    role: "QLYK — Valorisation",
    actions: [
      "améliorer la perception d’une offre",
      "rendre un contenu plus lisible",
      "renforcer l’impact d’un produit ou d’un service",
    ],
  },
};

function parseScore(
  searchParams: Record<string, string | string[] | undefined>
): VectorScore {
  const parse = (value: string | string[] | undefined) =>
    Number(Array.isArray(value) ? value[0] : value) || 0;

  return {
    structuration: parse(searchParams.s),
    comprehension: parse(searchParams.c),
    valorisation: parse(searchParams.v),
  };
}

export default function ResultPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const rawScore = parseScore(searchParams);
  const dominant = computeDominantAxis(rawScore);
  const hybrid = getHybridAxes(rawScore);
  const norm = normalizeScore(rawScore);
  const meta = axisMeta[dominant];
  const isDark = dominant === "valorisation";

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${meta.gradient} px-4 py-8 sm:px-6 md:px-12 md:py-12 ${
        isDark ? "text-white" : "text-ink"
      }`}
    >
      <style>{`
        @keyframes rotateRing { to { transform: rotate(360deg); } }
        @keyframes pulseDot { 0%,100%{opacity:.4} 50%{opacity:1} }

        .analysis-ring {
          width: 90px;
          height: 90px;
          border-radius: 9999px;
          border: 3px solid transparent;
          border-top-color: ${meta.color};
          animation: rotateRing 1.2s linear infinite;
        }

        .analysis-dot {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: ${meta.color};
          animation: pulseDot 1.6s infinite;
        }

        .scan-panel::after {
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(
            to bottom,
            transparent,
            rgba(255,255,255,.3),
            transparent
          );
          animation: rotateRing 3s linear infinite;
        }
      `}</style>

      <div className="mx-auto max-w-6xl space-y-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <Signature />
          <div className="text-xs uppercase tracking-[0.3em] opacity-60">
            Lecture professionnelle
          </div>
        </div>

        {/* ANALYSE (CLÉ) */}
        <section className="rounded-3xl border bg-white/80 p-6 backdrop-blur">
          <div className="flex items-center gap-6">
            <div className="analysis-ring" />
            <div>
              <p className="text-xs uppercase opacity-50">
                Analyse du système
              </p>
              <p className="mt-1 font-serif text-xl">
                Traitement des réponses
              </p>
              <p className="mt-2 text-sm opacity-60">
                Croisement des axes, pondération et génération d’une lecture exploitable.
              </p>
            </div>
          </div>
        </section>

        {/* RESULTAT */}
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight">
              Votre manière d’agir dominante :
              <br />
              <span style={{ color: meta.color }}>{meta.name}</span>
            </h1>

            <p className="mt-4 opacity-70">
              Orientation : {meta.entity}
            </p>

            <p className="mt-6">{meta.intro}</p>
            <p className="mt-3 text-sm opacity-70">{meta.reflex}</p>
          </div>

          <div className="relative rounded-3xl bg-white/90 p-6 shadow-xl">
            <VectorRadar score={norm} color={meta.color} />
          </div>
        </section>

        <AiResultAnalysis
          dominant={dominant}
          entity={meta.entity}
          structuration={rawScore.structuration}
          comprehension={rawScore.comprehension}
          valorisation={rawScore.valorisation}
          color={meta.color}
          isDark={isDark}
        />

        {/* PROJECTION */}
        <section>
          <h2 className="font-serif text-2xl">
            Rôle possible
          </h2>

          <p className="mt-2 font-medium">{meta.role}</p>

          <ul className="mt-4 space-y-2 text-sm">
            {meta.actions.map((a) => (
              <li key={a}>• {a}</li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="flex justify-center gap-3 pt-6">
          <Link href="/start" className="rounded-full border px-4 py-2">
            Refaire le test
          </Link>

          <a
            href="https://arnaudcrestey.com"
            className="rounded-full border px-4 py-2"
          >
            Approfondir ce résultat
          </a>
        </div>

      </div>
    </main>
  );
}
