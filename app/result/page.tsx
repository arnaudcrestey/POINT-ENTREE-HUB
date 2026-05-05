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
    promise: string;
    reading: string;
    priorities: string[];
    ctaTitle: string;
  }
> = {
  structuration: {
    name: "Structuration",
    entity: "SYSTIA",
    gradient: "from-[#f7f9ff] via-[#edf3ff] to-[#f6efe6]",
    color: "#315f8c",
    promise:
      "Vous êtes naturellement orienté vers la mise en ordre, la clarification et la construction de systèmes fiables.",
    reading:
      "Votre résultat indique une capacité à repérer ce qui manque de cadre, ce qui se disperse et ce qui doit être transformé en méthode.",
    priorities: [
      "Clarifier le périmètre exact du rôle.",
      "Identifier les situations où votre sens de l’organisation crée de la valeur.",
      "Évaluer votre capacité à piloter un système sans l’alourdir.",
    ],
    ctaTitle: "Allons plus loin dans votre capacité à structurer",
  },
  comprehension: {
    name: "Compréhension",
    entity: "Cabinet Astraé",
    gradient: "from-[#fff7f5] via-[#f8eee8] to-[#eef3ff]",
    color: "#b46b7d",
    promise:
      "Vous êtes naturellement orienté vers l’analyse, la lecture des situations et la clarification des signaux faibles.",
    reading:
      "Votre résultat montre une capacité à comprendre ce qui se joue derrière une situation apparente, avec nuance et discernement.",
    priorities: [
      "Identifier votre manière de lire une situation complexe.",
      "Évaluer votre capacité à formuler une synthèse utile.",
      "Voir si votre posture correspond à l’univers Cabinet Astraé.",
    ],
    ctaTitle: "Approfondissons votre capacité d’analyse",
  },
  valorisation: {
    name: "Valorisation",
    entity: "QLYK",
    gradient: "from-[#111827] via-[#172033] to-[#eef3ff]",
    color: "#7f8bff",
    promise:
      "Vous êtes naturellement orienté vers l’impact perçu, la présentation et la valeur ressentie.",
    reading:
      "Votre résultat indique une sensibilité forte à la manière dont une chose est vue, comprise et ressentie.",
    priorities: [
      "Comprendre votre rapport à la perception et à l’image.",
      "Identifier les supports où votre œil crée immédiatement de la valeur.",
      "Évaluer votre compatibilité avec l’univers QLYK.",
    ],
    ctaTitle: "Explorons votre capacité à valoriser",
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
      className={`min-h-screen bg-gradient-to-br ${meta.gradient} px-4 py-8 sm:px-6 md:px-12 md:py-12 ${
        isDark ? "text-white" : "text-ink"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
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
              : "border-black/5 bg-white/85"
          }`}
        >
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] opacity-60">
                Résultat du positionnement
              </p>

              <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
                Votre axe naturel : <br />
                <span style={{ color: meta.color }}>{meta.name}</span>
              </h1>

              <p className="mt-4 text-sm opacity-70">
                Orientation privilégiée : {meta.entity}
              </p>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed opacity-90">
                {meta.promise}
              </p>

              <p className="mt-5 max-w-3xl text-sm leading-7 opacity-75">
                {meta.reading}
              </p>

              {hybrid.length > 1 && (
                <div
                  className={`mt-6 rounded-2xl border p-4 text-sm leading-6 ${
                    isDark
                      ? "border-white/10 bg-white/10"
                      : "border-black/5 bg-[#f4f7fb]"
                  }`}
                >
                  Profil hybride détecté :{" "}
                  <strong>
                    {hybrid.map((axis) => axisMeta[axis].name).join(" / ")}
                  </strong>
                  . L’axe dominant indique simplement le meilleur point d’entrée
                  pour commencer.
                </div>
              )}
            </div>

            <div
              className={`rounded-[28px] border p-5 ${
                isDark
                  ? "border-white/10 bg-black/20"
                  : "border-black/5 bg-[#f7f9fc]"
              }`}
            >
              <VectorRadar score={norm} color={meta.color} />

              <div className="mt-6 space-y-3 text-sm">
                {Object.entries(rawScore).map(([key, value]) => {
                  const axis = key as AxisKey;

                  return (
                    <div key={axis}>
                      <div className="mb-1 flex justify-between gap-4">
                        <span>{axisMeta[axis].name}</span>
                        <span className="opacity-60">{value}</span>
                      </div>

                      <div
                        className={`h-2 rounded-full ${
                          isDark ? "bg-white/10" : "bg-black/5"
                        }`}
                      >
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${Math.min(
  100,
  Math.max(0, norm[axis] * 100)
)}%`,
                            backgroundColor: meta.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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

        <section
          className={`rounded-[32px] border p-6 shadow-[0_30px_90px_rgba(15,23,42,0.10)] md:p-10 ${
            isDark
              ? "border-white/10 bg-white/10"
              : "border-[#315f8c]/15 bg-white/90"
          }`}
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] opacity-50">
                Étape suivante
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight">
                {meta.ctaTitle}
              </h2>

              <p className="mt-5 text-sm leading-7 opacity-75">
                Votre résultat donne une première orientation. Pour savoir si ce
                rôle peut devenir une vraie piste de collaboration, il faut
                maintenant regarder votre situation réelle, votre parcours, vos
                réflexes de travail et votre manière d’agir.
              </p>

              <div className="mt-6 space-y-3 text-sm leading-6">
                {meta.priorities.map((item, index) => (
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
              className={`rounded-[26px] border p-5 md:p-6 ${
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
                Demander une lecture personnalisée
              </button>

              <p className="mt-3 text-center text-xs opacity-60">
                Réponse directe à votre demande, sans engagement.
              </p>
            </form>
          </div>
        </section>

        <div className="flex justify-center gap-3 pb-8">
          <Link
            href="/start"
            className={`rounded-full border px-5 py-2.5 text-sm ${
              isDark ? "border-white/20" : "border-black/10 bg-white/60"
            }`}
          >
            Refaire le positionnement
          </Link>

          <a
            href="https://arnaudcrestey.com"
            className={`rounded-full border px-5 py-2.5 text-sm ${
              isDark ? "border-white/20" : "border-black/10 bg-white/60"
            }`}
          >
            Retour Accueil
          </a>
        </div>
      </div>
    </main>
  );
}
