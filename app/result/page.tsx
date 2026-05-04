import Link from "next/link";
import { Signature } from "@/components/signature";
import { VectorRadar } from "@/components/vector-radar";
import { computeDominantAxis, getHybridAxes, normalizeScore, type AxisKey, type VectorScore } from "@/lib/scoring";

const axisMeta: Record<AxisKey, { name: string; entity: string; palette: string; color: string; blurb: string }> = {
  structuration: {
    name: "Structuration",
    entity: "SYSTIA",
    palette: "from-blue-50 to-blue-100/70",
    color: "#2F5FFF",
    blurb: "Votre trajectoire gagne à être cadrée : architecture d'offre, séquençage des priorités et décisions stabilisées.",
  },
  comprehension: {
    name: "Compréhension",
    entity: "Cabinet Astraé",
    palette: "from-rose-50 to-amber-50",
    color: "#C06A87",
    blurb: "Votre situation demande d'abord une lecture fine : distinguer les signaux, clarifier les causes et orienter lucidement les choix.",
  },
  valorisation: {
    name: "Valorisation",
    entity: "QLYK",
    palette: "from-zinc-900 to-slate-800",
    color: "#7F8BFF",
    blurb: "L'enjeu principal est perceptif : amplifier votre présence, renforcer la cohérence visuelle et accroître l'impact ressenti.",
  },
};

function parseScore(searchParams: Record<string, string | string[] | undefined>): VectorScore {
  const parse = (v: string | string[] | undefined) => Number(Array.isArray(v) ? v[0] : v) || 0;
  return { structuration: parse(searchParams.s), comprehension: parse(searchParams.c), valorisation: parse(searchParams.v) };
}

export default function ResultPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const rawScore = parseScore(searchParams);
  const dominant = computeDominantAxis(rawScore);
  const hybrid = getHybridAxes(rawScore);
  const norm = normalizeScore(rawScore);
  const meta = axisMeta[dominant];

  return (
    <main className={`min-h-screen bg-gradient-to-br ${meta.palette} px-6 py-12 md:px-12 ${dominant === "valorisation" ? "text-white" : "text-ink"}`}>
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <Signature />
        <section className="surface p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">Axe dominant</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">{meta.name}</h1>
          <p className="mt-2 text-sm opacity-75">Orientation privilégiée : {meta.entity}</p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed opacity-90">{meta.blurb}</p>
          {hybrid.length > 1 ? (
            <p className="mt-4 text-sm opacity-75">
              Profil hybride détecté : {hybrid.map((axis) => axisMeta[axis].name).join(" / ")}. La priorité opérationnelle reste donnée à Structuration en cas d'équilibre.
            </p>
          ) : null}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <VectorRadar score={norm} color={meta.color} />
            <div className="space-y-3 text-sm">
              <p>Structuration : {rawScore.structuration}</p>
              <p>Compréhension : {rawScore.comprehension}</p>
              <p>Valorisation : {rawScore.valorisation}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://arnaudcrestey.com" className="rounded-full bg-ink px-5 py-2.5 text-sm text-white">Continuer vers arnaudcrestey.com</a>
            <Link href="/start" className="rounded-full border border-black/20 px-5 py-2.5 text-sm">Recommencer</Link>
            <a href="https://arnaudcrestey.com" className="rounded-full border border-black/20 px-5 py-2.5 text-sm">Découvrir {meta.entity}</a>
          </div>
        </section>
      </div>
    </main>
  );
}
