export type AxisKey =
  | "structuration"
  | "comprehension"
  | "valorisation";

export type VectorScore = Record<AxisKey, number>;

/* =========================
   SOUS-SIGNAUX
========================= */

export type SubSignalKey =
  | "clarte"
  | "methode"
  | "pilotage"
  | "discernement"
  | "ecoute"
  | "lecture"
  | "perception"
  | "impact"
  | "lisibilite";

export type SubSignals = Record<SubSignalKey, number>;

export const INITIAL_SUBSIGNALS: SubSignals = {
  clarte: 0,
  methode: 0,
  pilotage: 0,

  discernement: 0,
  ecoute: 0,
  lecture: 0,

  perception: 0,
  impact: 0,
  lisibilite: 0,
};

/* =========================
   ANSWERS / QUESTIONS
========================= */

export type Answer = {
  id: string;
  label: string;

  delta: Partial<VectorScore>;

  subSignals?: Partial<SubSignals>;
};

export type Question = {
  id: string;
  prompt: string;
  detail?: string;
  answers: Answer[];
};

/* =========================
   SCORES
========================= */

export const INITIAL_SCORE: VectorScore = {
  structuration: 0,
  comprehension: 0,
  valorisation: 0,
};

export function applyDelta(
  score: VectorScore,
  delta: Partial<VectorScore>
): VectorScore {
  return {
    structuration:
      score.structuration + (delta.structuration ?? 0),

    comprehension:
      score.comprehension + (delta.comprehension ?? 0),

    valorisation:
      score.valorisation + (delta.valorisation ?? 0),
  };
}

/* =========================
   SUB SIGNALS
========================= */

export function applySubSignals(
  current: SubSignals,
  incoming?: Partial<SubSignals>
): SubSignals {
  if (!incoming) {
    return current;
  }

  return {
    clarte:
      current.clarte + (incoming.clarte ?? 0),

    methode:
      current.methode + (incoming.methode ?? 0),

    pilotage:
      current.pilotage + (incoming.pilotage ?? 0),

    discernement:
      current.discernement +
      (incoming.discernement ?? 0),

    ecoute:
      current.ecoute + (incoming.ecoute ?? 0),

    lecture:
      current.lecture + (incoming.lecture ?? 0),

    perception:
      current.perception +
      (incoming.perception ?? 0),

    impact:
      current.impact + (incoming.impact ?? 0),

    lisibilite:
      current.lisibilite +
      (incoming.lisibilite ?? 0),
  };
}

/* =========================
   DOMINANT AXIS
========================= */

export function computeDominantAxis(
  score: VectorScore
): AxisKey {
  const ranked: [AxisKey, number][] = [
    ["structuration", score.structuration],

    ["comprehension", score.comprehension],

    ["valorisation", score.valorisation],
  ];

  ranked.sort((a, b) => b[1] - a[1]);

  if (ranked[0][1] === ranked[1][1]) {
    const includesStructuration =
      ranked[0][0] === "structuration" ||
      ranked[1][0] === "structuration";

    if (includesStructuration) {
      return "structuration";
    }
  }

  return ranked[0][0];
}

export function getHybridAxes(
  score: VectorScore
): AxisKey[] {
  const values = Object.values(score);

  const highest = Math.max(...values);

  return (Object.keys(score) as AxisKey[]).filter(
    (axis) => score[axis] === highest
  );
}

/* =========================
   NORMALIZE MAIN SCORE
========================= */

export function normalizeScore(
  score: VectorScore
): VectorScore {
  const max = Math.max(
    score.structuration,
    score.comprehension,
    score.valorisation,
    1
  );

  return {
    structuration: Number(
      (score.structuration / max).toFixed(2)
    ),

    comprehension: Number(
      (score.comprehension / max).toFixed(2)
    ),

    valorisation: Number(
      (score.valorisation / max).toFixed(2)
    ),
  };
}

/* =========================
   PREMIUM RADAR NORMALIZATION
========================= */

export function normalizeRadarValue(
  value: number,
  max: number
): number {
  if (max <= 0) {
    return 52;
  }

  const ratio = value / max;

  /*
    Compression premium :
    - évite les 0%
    - évite les 100%
    - garde des écarts crédibles
    - produit une sensation humaine
  */

  const normalized =
    42 + ratio * 46;

  /*
    Petit amortisseur
    pour éviter les triangles trop agressifs
  */

  return Math.round(
    Math.min(92, Math.max(42, normalized))
  );
}

/* =========================
   NORMALIZE SUB SIGNALS
========================= */

export function normalizeSubSignals(
  signals: Partial<SubSignals>,
  keys: SubSignalKey[]
) {
  const values = keys.map(
    (key) => signals[key] ?? 0
  );

  const max = Math.max(...values, 1);

  return keys.map((key) => {
    const raw = signals[key] ?? 0;

    const normalized =
      normalizeRadarValue(raw, max);

    return {
      key,

      /*
        valeur 0-1 pour le radar SVG
      */
      value: Number(
        (normalized / 100).toFixed(2)
      ),

      /*
        valeur affichable UI
      */
      percent: normalized,
    };
  });
}
