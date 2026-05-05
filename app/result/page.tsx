"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
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
    gradient: "from-[#f7f9ff] via-[#edf3ff] to-[#f6efe6]",
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
      "Votre réflexe est de chercher ce qui se joue derrière les apparences, avant de proposer une direction.",
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
    gradient: "from-[#111827] via-[#172033] to-[#eef3ff]",
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

function parseScore(searchParams: URLSearchParams): VectorScore {
  const parse = (key: string) => Number(searchParams.get(key)) || 0;

  return {
    structuration: parse("s"),
    comprehension: parse("c"),
    valorisation: parse("v"),
  };
}

export default function ResultPage() {
  const searchParams = useSearchParams();

  const rawScore = useMemo(() => parseScore(searchParams), [searchParams]);
  const dominant = computeDominantAxis(rawScore);
  const hybrid = getHybridAxes(rawScore);
  const norm = normalizeScore(rawScore);
  const meta = axisMeta[dominant];
  const isDark = dominant === "valorisation";

  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => setStep(3), 2400),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main
      className={`min-h-screen bg-gradient-to-br ${meta.gradient} px-4 py-8 sm:px-6 md:px-12 md:py-12 ${
        isDark ? "text-white" : "text-ink"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <Signature />

          <div
            className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.28em] ${
              isDark
                ? "border-white/20 bg-white/10"
                : "border-black/10 bg-white/70"
            }`}
          >
            Lecture professionnelle
          </div>
        </div>

        <section
          className={`overflow-hidden rounded-[32px] border p-6 shadow-[0_30px_90px_rgba(15,23,42,0.10)] backdrop-blur md:p-10 ${
            isDark
              ? "border-white/10 bg-white/10"
              : "border-black/5 bg-white/90"
          }`}
        >
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] opacity-60">
                Résultat du positionnement
              </p>

              <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
                Votre manière d’agir dominante :
                <br />
                <span style={{ color: meta.color }}>{meta.name}</span>
              </h1>

              <p className="mt-4 text-sm opacity-70">
                Orientation privilégiée : {meta.entity}
              </p>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed opacity-90">
                {meta.intro}
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 opacity-75">
                {meta.reflex}
              </p>

              <div
                className={`mt-6 rounded-2xl border p-4 text-sm leading-6 ${
                  isDark
                    ? "border-white/10 bg-white/10"
                    : "border-black/5 bg-[#f4f7fb]"
                }`}
              >
                <p className="mb-2 font-medium">Lecture rapide</p>
                <p>Dominant : {meta.name}</p>
                <p>
                  Profil :{" "}
                  {hybrid.length > 1
                    ? hybrid.map((axis) => axisMeta[axis].name).join(" / ")
                    : meta.name}
                </p>
                <p>Axe à observer : ce qui reste moins naturel dans votre réponse.</p>
              </div>
            </div>

            <div
              className={`relative overflow-hidden rounded-[28px] border p-5 shadow-[0_24px_70px_rgba(0,0,0,0.12)] ${
                isDark
                  ? "border-white/10 bg-black/20"
                  : "border-black/5 bg-[#f7f9fc]"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
              <VectorRadar score={norm} color={meta.color} />
            </div>
          </div>
        </section>

        <section
          className={`rounded-[28px] border p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ${
            isDark
              ? "border-white/10 bg-white/10"
              : "border-black/5 bg-white/90"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.28em] opacity-50">
            Analyse du système
          </p>

          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: meta.color }}
              />
              <span className={step >= 1 ? "opacity-90" : "opacity-45"}>
                Lecture des réponses et pondération des axes
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  step >= 2 ? "" : "animate-pulse"
                }`}
                style={{ backgroundColor: step >= 2 ? meta.color : "#cbd5e1" }}
              />
              <span className={step >= 2 ? "opacity-90" : "opacity-45"}>
                Croisement du score dominant avec les axes secondaires
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  step < 3 ? "animate-pulse" : ""
                }`}
                style={{ backgroundColor: step >= 3 ? meta.color : "#cbd5e1" }}
              />
              <span className={step >= 3 ? "opacity-90" : "opacity-45"}>
                Génération d’une lecture personnalisée
              </span>
            </div>
          </div>
        </section>

        {step < 3 ? (
          <div
            className={`rounded-[28px] border p-8 text-center text-sm shadow-[0_24px_70px_rgba(15,23,42,0.08)] ${
              isDark
                ? "border-white/10 bg-white/10"
                : "border-black/5 bg-white/80"
            }`}
          >
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent opacity-60" />
            <p className="opacity-75">
              Analyse en cours de votre positionnement…
            </p>
          </div>
        ) : (
          <div className="animate-[fadeIn_0.6s_ease-out]">
            <AiResultAnalysis
              dominant={dominant}
              entity={meta.entity}
              structuration={rawScore.structuration}
              comprehension={rawScore.comprehension}
              valorisation={rawScore.valorisation}
              color={meta.color}
              isDark={isDark}
            />
          </div>
        )}

        {step >= 3 && (
          <>
            <section
              className={`rounded-[32px] border p-6 shadow-[0_30px_90px_rgba(15,23,42,0.10)] md:p-10 ${
                isDark
                  ? "border-white/10 bg-white/10"
                  : "border-black/5 bg-white/90"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.28em] opacity-50">
                Projection concrète
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-tight">
                Rôle dans lequel vous pouvez être utile immédiatement
              </h2>

              <p className="mt-4 font-medium">{meta.role}</p>

              <ul className="mt-5 space-y-2 text-sm leading-6 opacity-80">
                {meta.actions.map((action) => (
                  <li key={action}>• {action}</li>
                ))}
              </ul>

              <p className="mt-5 text-sm leading-7 opacity-70">
                Ce positionnement ne sert pas seulement à vous décrire. Il sert
                à vérifier si cette manière d’agir peut devenir une contribution
                concrète dans un cadre professionnel structuré.
              </p>
            </section>

            <section
              className={`rounded-[32px] border p-6 shadow-[0_30px_90px_rgba(15,23,42,0.10)] md:p-10 ${
                isDark
                  ? "border-white/10 bg-white/10"
                  : "border-black/5 bg-white/90"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.28em] opacity-50">
                Ouverture possible
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-tight">
                Ce que ce positionnement peut devenir
              </h2>

              <p className="mt-5 text-sm leading-7 opacity-80">
                Ce résultat correspond à un rôle réel.
              </p>

              <p className="mt-2 text-sm leading-7 opacity-70">
                Certaines personnes utilisent cette capacité ponctuellement.
                D’autres peuvent en faire une activité structurée, avec des
                méthodes, un cadre et des supports existants.
              </p>

              <p className="mt-2 text-sm leading-7 opacity-70">
                C’est ce type de collaboration qui est en train d’être développé
                autour de arnaudcrestey.com.
              </p>
            </section>

            <section
              className={`rounded-[32px] border p-6 shadow-[0_30px_90px_rgba(15,23,42,0.10)] md:p-10 ${
                isDark
                  ? "border-white/10 bg-white/10"
                  : "border-black/5 bg-white/90"
              }`}
            >
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] opacity-50">
                    Étape suivante
                  </p>

                  <h2 className="mt-3 font-serif text-3xl leading-tight">
                    Voir si ce rôle peut devenir une activité
                  </h2>

                  <p className="mt-5 text-sm leading-7 opacity-75">
                    Si ce résultat vous parle, l’étape utile consiste à regarder
                    votre situation réelle : votre parcours, vos réflexes de
                    travail, vos supports actuels et votre capacité à intervenir
                    concrètement.
                  </p>

                  <div className="mt-6 space-y-3 text-sm leading-6">
                    <div className="flex gap-3">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs text-white"
                        style={{ backgroundColor: meta.color }}
                      >
                        1
                      </span>
                      <span className="opacity-75">
                        Comprendre votre situation actuelle.
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs text-white"
                        style={{ backgroundColor: meta.color }}
                      >
                        2
                      </span>
                      <span className="opacity-75">
                        Vérifier votre compatibilité avec l’univers concerné.
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs text-white"
                        style={{ backgroundColor: meta.color }}
                      >
                        3
                      </span>
                      <span className="opacity-75">
                        Identifier si une collaboration structurée peut avoir du
                        sens.
                      </span>
                    </div>
                  </div>
                </div>

                <form
                  action="/api/result-lead"
                  method="POST"
                  className={`rounded-[26px] border p-5 shadow-[0_22px_60px_rgba(15,23,42,0.12)] md:p-6 ${
                    isDark
                      ? "border-white/10 bg-black/20"
                      : "border-black/5 bg-[#f8fafc]"
                  }`}
                >
                  <input type="hidden" name="dominant" value={dominant} />
                  <input type="hidden" name="entity" value={meta.entity} />
                  <input
                    type="hidden"
                    name="structuration"
                    value={rawScore.structuration}
                  />
                  <input
                    type="hidden"
                    name="comprehension"
                    value={rawScore.comprehension}
                  />
                  <input
                    type="hidden"
                    name="valorisation"
                    value={rawScore.valorisation}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-xs">
                      <span className="opacity-70">Prénom</span>
                      <input
                        required
                        name="firstName"
                        placeholder="Votre prénom"
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#315f8c]"
                      />
                    </label>

                    <label className="space-y-2 text-xs">
                      <span className="opacity-70">Email</span>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="vous@exemple.com"
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#315f8c]"
                      />
                    </label>

                    <label className="space-y-2 text-xs">
                      <span className="opacity-70">Activité actuelle</span>
                      <input
                        required
                        name="activity"
                        placeholder="Votre métier, activité ou projet"
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#315f8c]"
                      />
                    </label>

                    <label className="space-y-2 text-xs">
                      <span className="opacity-70">Lien utile</span>
                      <input
                        name="website"
                        placeholder="LinkedIn, site ou page principale"
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#315f8c]"
                      />
                    </label>
                  </div>

                  <label className="mt-4 block space-y-2 text-xs">
                    <span className="opacity-70">
                      Votre situation en quelques lignes
                    </span>

                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Expliquez brièvement ce qui vous intéresse, votre situation actuelle, ou pourquoi ce résultat vous parle."
                      className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#315f8c]"
                    />
                  </label>

                  <button
                    type="submit"
                    className="mt-5 w-full rounded-full px-6 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(49,95,140,0.25)]"
                    style={{ backgroundColor: meta.color }}
                  >
                    Voir si ce rôle peut devenir une activité
                  </button>

                  <p className="mt-3 text-center text-xs opacity-60">
                    Analyse rapide de votre situation et de votre capacité à
                    intervenir concrètement.
                  </p>
                </form>
              </div>
            </section>
          </>
        )}

        <div className="flex justify-center gap-3 pb-8">
          <Link
            href="/start"
            className={`rounded-full border px-5 py-2.5 text-sm ${
              isDark ? "border-white/20" : "border-black/10 bg-white/60"
            }`}
          >
            Refaire le test
          </Link>

          <a
            href="https://arnaudcrestey.com"
            className={`rounded-full border px-5 py-2.5 text-sm ${
              isDark ? "border-white/20" : "border-black/10 bg-white/60"
            }`}
          >
            Approfondir ce résultat
          </a>
        </div>
      </div>
    </main>
  );
}
