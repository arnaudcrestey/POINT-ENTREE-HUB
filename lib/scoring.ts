export type AxisKey = "structuration" | "comprehension" | "valorisation";

export type VectorScore = Record<AxisKey, number>;

export type Answer = {
  id: string;
  label: string;
  delta: Partial<VectorScore>;
};

export type Question = {
  id: string;
  prompt: string;
  detail?: string;
  answers: Answer[];
};

export const INITIAL_SCORE: VectorScore = {
  structuration: 0,
  comprehension: 0,
  valorisation: 0,
};

export function applyDelta(score: VectorScore, delta: Partial<VectorScore>): VectorScore {
  return {
    structuration: score.structuration + (delta.structuration ?? 0),
    comprehension: score.comprehension + (delta.comprehension ?? 0),
    valorisation: score.valorisation + (delta.valorisation ?? 0),
  };
}

export function computeDominantAxis(score: VectorScore): AxisKey {
  const ranked: [AxisKey, number][] = [
    ["structuration", score.structuration],
    ["comprehension", score.comprehension],
    ["valorisation", score.valorisation],
  ];

  ranked.sort((a, b) => b[1] - a[1]);

  if (ranked[0][1] === ranked[1][1]) {
    const includesStructuration = ranked[0][0] === "structuration" || ranked[1][0] === "structuration";
    if (includesStructuration) return "structuration";
  }

  return ranked[0][0];
}

export function getHybridAxes(score: VectorScore): AxisKey[] {
  const values = Object.values(score);
  const highest = Math.max(...values);
  return (Object.keys(score) as AxisKey[]).filter((axis) => score[axis] === highest);
}

export function normalizeScore(score: VectorScore): VectorScore {
  const max = Math.max(score.structuration, score.comprehension, score.valorisation, 1);
  return {
    structuration: Number((score.structuration / max).toFixed(2)),
    comprehension: Number((score.comprehension / max).toFixed(2)),
    valorisation: Number((score.valorisation / max).toFixed(2)),
  };
}
