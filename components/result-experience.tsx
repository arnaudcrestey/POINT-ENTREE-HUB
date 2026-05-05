"use client";

import { useEffect, useMemo, useState } from "react";
import { Signature } from "@/components/signature";
import { VectorRadar } from "@/components/vector-radar";
import { AiResultAnalysis } from "@/components/ai-result-analysis";
import type { AxisKey, VectorScore } from "@/lib/scoring";

type Meta = {
  name: string;
  entity: string;
  gradient: string;
  color: string;
  intro: string;
  reflex: string;
  role: string;
  actions: string[];
};

type Props = {
  rawScore: VectorScore;
  normalizedScore: VectorScore;
  dominant: AxisKey;
  hybrid: AxisKey[];
  meta: Meta;
};

const axisLabels: Record<AxisKey, string> = {
  structuration: "Structuration",
  comprehension: "Compréhension",
  valorisation: "Valorisation",
};

const analysisSteps = [
  "Lecture des réponses et pondération des axes",
  "Identification de la logique dominante",
  "Croisement avec les axes secondaires",
  "Construction d’une lecture exploitable",
  "Préparation d’une projection dans l’écosystème",
];

function toDisplayPercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  if (value <= 1) return Math.round(value * 100);
  return Math.round(value);
}

export function ResultExperience({
  rawScore,
  normalizedScore,
  dominant,
  hybrid,
  meta,
}: Props) {
  const [phase, setPhase] = useState<"analysis" | "reveal">("analysis");
  const [activeStep, setActiveStep] = useState(0);
  const isDark = dominant === "valorisation";

  const dominantPercent = useMemo(() => {
    return toDisplayPercent(normalizedScore[dominant]);
  }, [dominant, normalizedScore]);

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setActiveStep((current) =>
        current < analysisSteps.length - 1 ? current + 1 : current
      );
    }, 620);

    const revealTimer = window.setTimeout(() => {
      setPhase("reveal");
      window.clearInterval(stepTimer);
    }, 3600);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${meta.gradient} px-4 py-8 sm:px-6 md:px-12 md:py-12 ${
        isDark ? "text-white" : "text-ink"
      }`}
    >
      <style>{`
        @keyframes floatGlow {
          0%, 100% { transform: translate3d(0,0,0) scale(1); opacity: .55; }
          50% { transform: translate3d(24px,-18px,0) scale(1.08); opacity: .85; }
        }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(18px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes rotateRing {
          to { transform: rotate(360deg); }
        }

        @keyframes pulseDot {
          0%, 100% { opacity: .45; transform: scale(.88); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        @keyframes scanLine {
          0% { transform: translateY(-120%); opacity: 0; }
          20% { opacity: .55; }
          100% { transform: translateY(420%); opacity: 0; }
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        .premium-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(44px);
          animation: floatGlow 8s ease-in-out infinite;
          pointer-events: none;
        }

        .analysis-card {
          animation: revealUp .75s ease-out both;
        }

        .reveal-1 { animation: revealUp .75s ease-out both; animation-delay: .05s; }
        .reveal-2 { animation: revealUp .75s ease-out both; animation-delay: .25s; }
        .reveal-3 { animation: revealUp .75s ease-out both; animation-delay: .45s; }
        .reveal-4 { animation: revealUp .75s ease-out both; animation-delay: .65s; }
        .reveal-5 { animation: revealUp .75s ease-out both; animation-delay: .85s; }

        .analysis-ring {
          position: relative;
          width: 96px;
          height: 96px;
          border-radius: 9999px;
          background:
            conic-gradient(from 0deg, ${meta.color}, transparent 28%, ${meta.color}, transparent 62%, ${meta.color});
          animation: rotateRing 1.8s linear infinite;
          box-shadow: 0 0 50px ${meta.color}33;
        }

        .analysis-ring::after {
          content: "";
          position: absolute;
          inset: 9px;
          border-radius: 9999px;
          background: rgba(255,255,255,.9);
          box-shadow: inset 0 0 34px rgba(49,95,140,.14);
        }

        .analysis-core {
          position: absolute;
          inset: 32px;
          z-index: 2;
          border-radius: 9999px;
          background: ${meta.color};
          box-shadow: 0 0 34px ${meta.color};
          animation: pulseDot 1.35s ease-in-out infinite;
        }

        .scan-panel {
          position: relative;
          overflow: hidden;
        }

        .scan-panel::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 34%;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,.48), transparent);
          animation: scanLine 3.2s ease-in-out infinite;
          pointer-events: none;
        }

        .progress-fill {
          animation: progressFill 3.2s ease-out both;
        }
      `}</style>

      <div className="premium-orb left-[-120px] top-[120px] h-72 w-72 bg-[#315f8c]/20" />
      <div className="premium-orb right-[-100px] top-[40px] h-80 w-80 bg-white/50" />
      <div className="premium-orb bottom-[120px] right-[10%] h-72 w-72 bg-[#d9c7aa]/30" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {phase === "analysis" ? (
          <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div
              className={`analysis-card w-full max-w-2xl rounded-[32px] border p-6 shadow-[0_34px_110px_rgba(15,23,42,0.16)] backdrop-blur-xl md:p-10 ${
                isDark
                  ? "border-white/10 bg-white/10"
                  : "border-white/75 bg-white/88"
              }`}
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="relative mx-auto shrink-0 md:mx-0">
                  <div className="analysis-ring">
                    <div className="analysis-core" />
                  </div>
                </div>

                <div className="flex-1">
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.32em]"
                    style={{ color: meta.color }}
                  >
                    Analyse du système en cours
                  </p>

                  <h1 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
                    Analyse de votre positionnement
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-7 opacity-70">
                    Nous analysons vos réponses pour identifier la logique
                    d’intervention dans laquelle vous êtes le plus naturellement
                    fiable.
                  </p>

                  <div className="mt-6 flex items-center justify-between text-xs opacity-70">
                    <span>Progression</span>
                    <span>{Math.min(100, 20 + activeStep * 20)}%</span>
                  </div>

                  <div
                    className={`mt-2 h-[4px] overflow-hidden rounded-full ${
                      isDark ? "bg-white/15" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className="progress-fill h-full rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                  </div>

                  <div className="mt-7 space-y-4">
                    {analysisSteps.map((step, index) => {
                      const done = index < activeStep;
                      const active = index === activeStep;

                      return (
                        <div
                          key={step}
                          className={`flex items-start gap-3 text-sm transition-all duration-500 ${
                            done || active ? "opacity-100" : "opacity-35"
                          }`}
                        >
                          <span
                            className="mt-1 flex h-3 w-3 shrink-0 items-center justify-center rounded-full"
                            style={{
                              backgroundColor:
                                done || active ? meta.color : "#cbd5e1",
                            }}
                          >
                            {done && (
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            )}
                          </span>

                          <span>
                            {step}
                            {active && (
                              <span className="ml-1 opacity-60">...</span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="space-y-8">
            <div className="reveal-1 flex items-center justify-between gap-4">
              <Signature />

              <div
                className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.28em] shadow-sm ${
                  isDark
                    ? "border-white/20 bg-white/10"
                    : "border-black/10 bg-white/70"
                }`}
              >
                Lecture professionnelle
              </div>
            </div>

            <section
              className={`reveal-1 overflow-hidden rounded-[34px] border p-6 shadow-[0_34px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-10 ${
                isDark
                  ? "border-white/10 bg-white/10"
                  : "border-white/70 bg-white/82"
              }`}
            >
              <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
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
                    className={`mt-6 rounded-2xl border p-4 text-sm leading-6 shadow-inner ${
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
                        ? hybrid.map((axis) => axisLabels[axis]).join(" / ")
                        : meta.name}
                    </p>
                    <p>Signal dominant : {dominantPercent}%</p>
                  </div>

                  <a
                    href="#collaboration"
                    className="mt-6 inline-flex rounded-full px-6 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(49,95,140,0.25)] transition hover:-translate-y-0.5"
                    style={{ backgroundColor: meta.color }}
                  >
                    Vérifier une collaboration possible
                  </a>
                </div>

                <div
                  className={`scan-panel relative rounded-[30px] border p-5 shadow-[0_28px_90px_rgba(15,23,42,0.18)] ${
                    isDark
                      ? "border-white/10 bg-black/25"
                      : "border-black/5 bg-[#f7f9fc]"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-transparent" />
                  <VectorRadar score={normalizedScore} color={meta.color} />
                </div>
              </div>
            </section>

            <div className="reveal-2">
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

            <section
              className={`reveal-3 rounded-[32px] border p-6 shadow-[0_30px_90px_rgba(15,23,42,0.10)] md:p-10 ${
                isDark
                  ? "border-white/10 bg-white/10"
                  : "border-white/70 bg-white/85"
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
              className={`reveal-4 rounded-[32px] border p-6 shadow-[0_30px_90px_rgba(15,23,42,0.10)] md:p-10 ${
                isDark
                  ? "border-white/10 bg-white/10"
                  : "border-white/70 bg-white/85"
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
              id="collaboration"
              className={`reveal-5 rounded-[34px] border p-6 shadow-[0_34px_100px_rgba(15,23,42,0.14)] md:p-10 ${
                isDark
                  ? "border-white/10 bg-white/10"
                  : "border-white/70 bg-white/88"
              }`}
            >
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] opacity-50">
                    Étape suivante
                  </p>

                  <h2 className="mt-3 font-serif text-3xl leading-tight">
                    Vérifier si ce rôle peut devenir une activité
                  </h2>

                  <p className="mt-5 text-sm leading-7 opacity-75">
                    Si ce résultat vous parle, l’étape utile consiste à regarder
                    votre situation réelle : votre parcours, vos réflexes de
                    travail, vos supports actuels et votre capacité à intervenir
                    concrètement dans l’un des univers développés autour de
                    arnaudcrestey.com.
                  </p>

                  <div className="mt-6 space-y-3 text-sm leading-6">
                    {[
                      "Comprendre votre situation actuelle.",
                      "Vérifier votre compatibilité avec l’univers concerné.",
                      "Identifier si une collaboration structurée peut avoir du sens.",
                    ].map((item, index) => (
                      <div key={item} className="flex gap-3">
                        <span
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs text-white"
                          style={{ backgroundColor: meta.color }}
                        >
                          {index + 1}
                        </span>
                        <span className="opacity-75">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <form
                  action="/api/result-lead"
                  method="POST"
                  className={`rounded-[26px] border p-5 shadow-[0_24px_70px_rgba(15,23,42,0.14)] md:p-6 ${
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
                    Envoyer ma situation
                  </button>

                  <p className="mt-3 text-center text-xs opacity-60">
                    Lecture rapide de votre situation et de votre capacité à
                    intervenir concrètement.
                  </p>
                </form>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
