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
    priorities: string[];
  }
> = {
  structuration: {
    name: "Structuration",
    entity: "SYSTIA",
    gradient: "from-[#f7f9ff] via-[#edf3ff] to-[#f6efe6]",
    color: "#315f8c",
    priorities: [
      "Clarifier le périmètre du rôle",
      "Identifier où votre organisation crée de la valeur",
      "Évaluer votre capacité à piloter sans complexifier",
    ],
  },
  comprehension: {
    name: "Compréhension",
    entity: "Cabinet Astraé",
    gradient: "from-[#fff7f5] via-[#f8eee8] to-[#eef3ff]",
    color: "#b46b7d",
    priorities: [
      "Lire correctement une situation complexe",
      "Formuler une synthèse utile",
      "Valider votre posture d’analyse",
    ],
  },
  valorisation: {
    name: "Valorisation",
    entity: "QLYK",
    gradient: "from-[#111827] via-[#172033] to-[#eef3ff]",
    color: "#7f8bff",
    priorities: [
      "Comprendre votre rapport à la perception",
      "Identifier où votre œil crée de la valeur",
      "Tester votre impact sur des supports concrets",
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
      className={`min-h-screen bg-gradient-to-br ${meta.gradient} px-4 py-8 ${
        isDark ? "text-white" : "text-ink"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <Signature />
          <div className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.28em] ${
            isDark ? "border-white/20 bg-white/10" : "border-black/10 bg-white/70"
          }`}>
            Lecture professionnelle
          </div>
        </div>

        {/* RESULT */}
        <section className={`rounded-[32px] border p-6 md:p-10 ${
          isDark ? "border-white/10 bg-white/10" : "border-black/5 bg-white/90"
        }`}>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">

            {/* TEXTE */}
            <div>
              <p className="text-xs uppercase tracking-[0.32em] opacity-60">
                Résultat du positionnement
              </p>

              <h1 className="mt-4 font-serif text-4xl md:text-6xl">
                Votre manière d’agir dominante :
                <br />
                <span style={{ color: meta.color }}>{meta.name}</span>
              </h1>

              <p className="mt-6 text-lg opacity-90">
                Vous intervenez naturellement sur la perception, la lisibilité et l’impact d’un projet.
              </p>

              <p className="mt-3 text-sm opacity-70">
                Votre réflexe est d’améliorer ce qui est vu, compris et ressenti.
              </p>

              {/* Lecture rapide */}
              <div className="mt-6 rounded-xl border border-white/10 p-4 text-sm opacity-80">
                <p className="font-medium mb-2">Lecture rapide :</p>
                <p>Dominant : {meta.name}</p>
                <p>Secondaire : axe complémentaire présent</p>
                <p>À renforcer : axe moins sollicité</p>
              </div>

              {hybrid.length > 1 && (
                <div className="mt-4 text-sm opacity-70">
                  Profil hybride :{" "}
                  <strong>
                    {hybrid.map((axis) => axisMeta[axis].name).join(" / ")}
                  </strong>
                </div>
              )}
            </div>

            {/* RADAR */}
            <div className={`rounded-[28px] border p-5 ${
              isDark ? "border-white/10 bg-black/20" : "border-black/5 bg-[#f7f9fc]"
            }`}>
              <VectorRadar score={norm} color={meta.color} />
            </div>
          </div>
        </section>

        {/* ANALYSE IA */}
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
        <section className={`rounded-[32px] border p-6 md:p-10 ${
          isDark ? "border-white/10 bg-white/10" : "border-black/5 bg-white/90"
        }`}>
          <h3 className="font-serif text-2xl">
            Rôle dans lequel vous pouvez être utile immédiatement :
          </h3>

          <p className="mt-3 font-medium">
            {meta.entity} — {meta.name}
          </p>

          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>• améliorer la perception d’une offre</li>
            <li>• rendre un contenu plus lisible</li>
            <li>• renforcer l’impact d’un projet</li>
          </ul>

          <p className="mt-4 text-sm opacity-70">
            Votre valeur se situe dans la transformation de la perception.
          </p>
        </section>

        {/* TRANSITION BUSINESS */}
        <section className={`rounded-[32px] border p-6 md:p-10 ${
          isDark ? "border-white/10 bg-white/10" : "border-black/5 bg-white/90"
        }`}>
          <h3 className="font-serif text-2xl">
            Ce que ce positionnement peut devenir
          </h3>

          <p className="mt-4 text-sm opacity-80">
            Ce résultat correspond à un rôle réel.
          </p>

          <p className="mt-2 text-sm opacity-70">
            Certaines personnes utilisent cette capacité ponctuellement.
            D’autres en font une activité structurée avec des méthodes,
            un cadre et des supports existants.
          </p>

          <p className="mt-2 text-sm opacity-70">
            C’est ce type d’activité qui est en train d’être développé ici.
          </p>
        </section>

        {/* FORMULAIRE */}
        <form
          action="/api/result-lead"
          method="POST"
          className={`rounded-[28px] border p-6 ${
            isDark ? "border-white/10 bg-black/20" : "border-black/5 bg-white"
          }`}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="firstName" placeholder="Prénom" required className="input" />
            <input name="email" placeholder="Email" required className="input" />
            <input name="activity" placeholder="Activité" required className="input" />
            <input name="website" placeholder="Lien utile" className="input" />
          </div>

          <textarea
            name="message"
            required
            rows={4}
            placeholder="Votre situation"
            className="input mt-4"
          />

          <button
            type="submit"
            className="mt-5 w-full rounded-full py-3 text-sm text-white"
            style={{ backgroundColor: meta.color }}
          >
            Voir si ce rôle peut devenir une activité
          </button>

          <p className="mt-2 text-center text-xs opacity-60">
            Analyse rapide de votre situation.
          </p>
        </form>

        {/* FOOTER */}
        <div className="flex justify-center gap-3">
          <Link href="/start" className="btn">
            Refaire le test
          </Link>

          <a href="https://arnaudcrestey.com" className="btn">
            Approfondir ce résultat
          </a>
        </div>
      </div>
    </main>
  );
}
