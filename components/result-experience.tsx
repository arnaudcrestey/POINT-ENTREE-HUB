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

const analysisSteps = [
  "Lecture de votre logique d’intervention",
  "Repérage de l’axe professionnel dominant",
  "Croisement avec les signaux secondaires",
  "Évaluation de la compatibilité avec l’écosystème",
  "Préparation de votre orientation professionnelle",
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

  const secondarySignals = useMemo(() => {
    return hybrid.filter((axis) => axis !== dominant).length;
  }, [hybrid, dominant]);

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setActiveStep((current) =>
        current < analysisSteps.length - 1 ? current + 1 : current
      );
    }, 950);

    const revealTimer = window.setTimeout(() => {
      setPhase("reveal");
      window.clearInterval(stepTimer);
    }, 5200);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${meta.gradient} px-4 py-7 sm:px-6 md:px-12 md:py-12 ${
        isDark ? "text-white" : "text-ink"
      }`}
    >
      <style>{`
        @keyframes floatGlow {
          0%, 100% { transform: translate3d(0,0,0) scale(1); opacity: .48; }
          50% { transform: translate3d(20px,-14px,0) scale(1.05); opacity: .72; }
        }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(18px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes rotateRing {
          to { transform: rotate(360deg); }
        }

        @keyframes slowBreath {
          0%, 100% { opacity: .62; transform: scale(.94); }
          50% { opacity: 1; transform: scale(1.06); }
        }

        @keyframes scanLine {
          0% { transform: translateY(-120%); opacity: 0; }
          20% { opacity: .38; }
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
          animation: floatGlow 9s ease-in-out infinite;
          pointer-events: none;
        }

        .analysis-card {
          animation: revealUp .85s ease-out both;
        }

        .reveal-1 { animation: revealUp .75s ease-out both; animation-delay: .05s; }
        .reveal-2 { animation: revealUp .75s ease-out both; animation-delay: .22s; }
        .reveal-3 { animation: revealUp .75s ease-out both; animation-delay: .40s; }

        .analysis-ring {
          position: relative;
          width: 92px;
          height: 92px;
          border-radius: 9999px;
          background:
            conic-gradient(
              from 110deg,
              transparent 0deg,
              transparent 34deg,
              ${meta.color} 72deg,
              rgba(255,255,255,.92) 104deg,
              transparent 148deg,
              transparent 214deg,
              ${meta.color} 262deg,
              rgba(255,255,255,.86) 294deg,
              transparent 342deg
            );
          animation: rotateRing 5.4s linear infinite;
          box-shadow:
            0 0 28px ${meta.color}34,
            0 18px 44px rgba(15,23,42,.12);
        }

        .analysis-ring::before {
          content: "";
          position: absolute;
          inset: 7px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,.58);
          background:
            radial-gradient(circle at 38% 32%, rgba(255,255,255,.92), rgba(255,255,255,.42) 34%, transparent 62%),
            radial-gradient(circle at 50% 50%, ${meta.color}22, transparent 68%);
          box-shadow:
            inset 0 0 18px rgba(255,255,255,.34),
            inset 0 0 32px ${meta.color}18;
        }

        .analysis-ring::after {
          content: "";
          position: absolute;
          inset: 23px;
          border-radius: 9999px;
          background:
            radial-gradient(circle at 35% 30%, rgba(255,255,255,.96), ${meta.color}42 46%, ${meta.color} 100%);
          box-shadow:
            0 0 20px ${meta.color}62,
            inset 0 0 12px rgba(255,255,255,.72);
          animation: slowBreath 4.2s ease-in-out infinite;
        }

        .analysis-core {
          position: absolute;
          inset: 37px;
          z-index: 2;
          border-radius: 9999px;
          background: rgba(255,255,255,.82);
          box-shadow:
            0 0 14px rgba(255,255,255,.72),
            0 0 24px ${meta.color}50;
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
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,.34), transparent);
          animation: scanLine 4.8s ease-in-out infinite;
          pointer-events: none;
        }

        .progress-fill {
          animation: progressFill 5s cubic-bezier(.22,1,.36,1) both;
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
                    Lecture de compatibilité en cours
                  </p>

                  <h1 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
                    Analyse de votre logique professionnelle
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-7 opacity-70">
                    Nous croisons vos réponses pour identifier l’environnement
                    dans lequel votre manière d’agir peut devenir réellement
                    utile.
                  </p>

                  <div className="mt-6 flex items-center justify-between text-xs opacity-70">
                    <span>Progression de lecture</span>
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
                          className={`flex items-start gap-3 text-sm transition-all duration-700 ${
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
          <div className="space-y-7 md:space-y-8">
            <div className="reveal-1 flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between md:text-left">
              <Signature />

              <div
                className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.28em] shadow-sm ${
                  isDark
                    ? "border-white/20 bg-white/10"
                    : "border-black/10 bg-white/70"
                }`}
              >
                Lecture de positionnement
              </div>
            </div>

            <section
              className={`reveal-1 overflow-hidden rounded-[34px] border p-6 shadow-[0_34px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-10 ${
                isDark
                  ? "border-white/10 bg-white/10"
                  : "border-white/70 bg-white/82"
              }`}
            >
              <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] opacity-60">
                    Résultat de compatibilité
                  </p>

                  <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
                    Logique dominante
                    <br />
                    <span style={{ color: meta.color }}>{meta.name}</span>
                  </h1>

                  <p className="mt-4 text-sm opacity-70">
                    Environnement associé&nbsp;: {meta.entity}
                  </p>

                  <p className="mt-8 max-w-3xl text-lg leading-relaxed opacity-90">
                    {meta.intro}
                  </p>

                  <p className="mt-4 max-w-3xl text-sm leading-7 opacity-75">
                    {meta.reflex}
                  </p>

                  <div
                    className={`mt-7 grid gap-3 rounded-2xl border p-4 text-sm leading-6 shadow-inner sm:grid-cols-3 ${
                      isDark
                        ? "border-white/10 bg-white/10"
                        : "border-black/5 bg-[#f4f7fb]"
                    }`}
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-45">
                        Univers
                      </p>
                      <p className="mt-1 font-medium">{meta.entity}</p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-45">
                        Signal
                      </p>
                      <p className="mt-1 font-medium">{dominantPercent}%</p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-45">
                        Lecture
                      </p>
                      <p className="mt-1 font-medium">
                        {secondarySignals > 0 ? "hybride" : "dominante"}
                      </p>
                    </div>
                  </div>

                  <a
                    href="#collaboration"
                    className="mt-7 inline-flex rounded-full px-6 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(49,95,140,0.25)] transition hover:-translate-y-0.5"
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
                  <VectorRadar axis={dominant} color={meta.color} />
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
  id="collaboration"
  className={`reveal-3 overflow-hidden rounded-[34px] border shadow-[0_34px_100px_rgba(15,23,42,0.12)] ${
    isDark
      ? "border-white/10 bg-white/10"
      : "border-white/70 bg-white/88"
  }`}
>
  <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
    <div className="p-6 md:p-10 lg:p-12">
      <p className="text-xs uppercase tracking-[0.32em] opacity-45">
        Analyse de contexte
      </p>

      <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
        Déposer une situation professionnelle
      </h2>

      <div className="mt-8 space-y-6 text-sm leading-8 opacity-75">
        <p>
          Cette seconde étape permet d’approfondir la lecture initiale à partir
          d’une situation concrète.
        </p>

        <p>
          Elle concerne principalement des indépendants, des profils
          opérationnels ou des personnes amenées à intervenir dans un
          environnement structuré.
        </p>

        <p>
          L’objectif n’est pas d’évaluer un parcours, mais de comprendre votre
          manière d’intervenir, votre niveau d’autonomie, votre rapport aux
          outils et votre capacité à porter une situation réelle.
        </p>
      </div>

      <div className="mt-10 space-y-5 text-sm leading-6">
        {[
          "Vous transmettez une situation professionnelle réelle.",
          "Une seconde lecture permet d’évaluer la cohérence opérationnelle du profil.",
          "Une compatibilité peut ensuite ouvrir vers un échange complémentaire.",
        ].map((item, index) => (
          <div key={item} className="flex gap-4">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] text-white shadow-sm"
              style={{ backgroundColor: meta.color }}
            >
              {index + 1}
            </span>

            <span className="pt-[2px] opacity-75">{item}</span>
          </div>
        ))}
      </div>
    </div>

    <div
      className={`border-t p-4 sm:p-6 lg:border-l lg:border-t-0 lg:p-8 ${
        isDark ? "border-white/10" : "border-black/5"
      }`}
    >
      <form
        action="/api/result-lead"
        method="POST"
        className={`rounded-[34px] border p-5 shadow-[0_26px_80px_rgba(15,23,42,0.14)] sm:p-7 md:p-8 ${
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

        <div className="mb-8">
          <p
            className="text-xs font-medium uppercase tracking-[0.28em]"
            style={{ color: meta.color }}
          >
            Transmission du contexte
          </p>

          <p className="mt-3 max-w-xl text-sm leading-7 opacity-65">
            Les éléments transmis permettent une lecture complémentaire plus
            précise de votre situation professionnelle.
          </p>
        </div>

        <label className="block space-y-3 text-xs">
          <span className="opacity-60">
            Situation professionnelle
          </span>

          <textarea
            required
            name="message"
            rows={12}
            placeholder="Décrivez votre activité actuelle, votre manière de travailler, votre niveau d’autonomie, votre rapport aux outils, les situations que vous gérez concrètement et les raisons pour lesquelles cette lecture vous semble cohérente avec votre contexte professionnel."
            className="min-h-[320px] w-full resize-y rounded-[26px] border border-black/10 bg-white px-5 py-5 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#315f8c]"
          />
        </label>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-xs">
            <span className="opacity-60">Prénom</span>

            <input
              required
              name="firstName"
              placeholder="Votre prénom"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#315f8c]"
            />
          </label>

          <label className="space-y-2 text-xs">
            <span className="opacity-60">Email</span>

            <input
              required
              type="email"
              name="email"
              placeholder="vous@exemple.com"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#315f8c]"
            />
          </label>

          <label className="space-y-2 text-xs">
            <span className="opacity-60">Activité actuelle</span>

            <input
              required
              name="activity"
              placeholder="Métier, activité ou projet"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#315f8c]"
            />
          </label>

          <label className="space-y-2 text-xs">
            <span className="opacity-60">Lien utile</span>

            <input
              name="website"
              placeholder="LinkedIn, site ou page principale"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#315f8c]"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-full px-6 py-4 text-sm font-medium text-white shadow-[0_18px_40px_rgba(49,95,140,0.25)] transition hover:-translate-y-0.5"
          style={{ backgroundColor: meta.color }}
        >
          Transmettre ma situation
        </button>

        <p className="mx-auto mt-5 max-w-lg text-center text-xs leading-6 opacity-55">
          Cette étape permet uniquement une lecture complémentaire de
          compatibilité professionnelle. Elle ne constitue ni une sélection
          automatique ni un engagement mutuel.
        </p>
      </form>
    </div>
  </div>
</section>
          </div>
        )}
      </div>
    </main>
  );
}
