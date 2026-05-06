import { ResultExperience } from "@/components/result-experience";

import {
  computeDominantAxis,
  getHybridAxes,
  normalizeScore,

  type AxisKey,
  type VectorScore,
  type SubSignals,
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
    gradient:
      "from-[#eef4ff] via-[#f6f8fc] to-[#efe7da]",

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

    gradient:
      "from-[#fff7f5] via-[#f8eee8] to-[#eef3ff]",

    color: "#b46b7d",

    intro:
      "Vous intervenez naturellement là où une situation doit être comprise, clarifiée ou relue avec discernement.",

    reflex:
      "Votre réflexe est de chercher ce qui se joue derrière les apparences, avant de proposer une direction.",

    role:
      "Cabinet Astraé — Compréhension",

    actions: [
      "analyser une situation complexe",
      "repérer les signaux faibles",
      "formuler une lecture claire et utile",
    ],
  },

  valorisation: {
    name: "Valorisation",
    entity: "QLYK Studio",

    gradient:
      "from-[#101827] via-[#172033] to-[#eef3ff]",

    color: "#7f8bff",

    intro:
      "Vous intervenez naturellement sur la perception, la lisibilité et l’impact d’un projet.",

    reflex:
      "Votre réflexe est d’améliorer ce qui est vu, compris et ressenti.",

    role: "QLYK Studio — Valorisation",

    actions: [
      "améliorer la perception d’une offre",
      "rendre un contenu plus lisible",
      "renforcer l’impact d’un produit ou d’un service",
    ],
  },
};

function parseScore(
  searchParams: Record<
    string,
    string | string[] | undefined
  >
): VectorScore {
  const parse = (
    value: string | string[] | undefined
  ) =>
    Number(
      Array.isArray(value)
        ? value[0]
        : value
    ) || 0;

  return {
    structuration: parse(searchParams.s),

    comprehension: parse(searchParams.c),

    valorisation: parse(searchParams.v),
  };
}

function parseSubSignals(
  searchParams: Record<
    string,
    string | string[] | undefined
  >
): SubSignals {
  const parse = (
    value: string | string[] | undefined
  ) =>
    Number(
      Array.isArray(value)
        ? value[0]
        : value
    ) || 0;

  return {
    clarte: parse(searchParams.clarte),

    methode: parse(searchParams.methode),

    pilotage: parse(searchParams.pilotage),

    discernement: parse(
      searchParams.discernement
    ),

    ecoute: parse(searchParams.ecoute),

    lecture: parse(searchParams.lecture),

    perception: parse(searchParams.perception),

    impact: parse(searchParams.impact),

    lisibilite: parse(
      searchParams.lisibilite
    ),
  };
}

function getLockedAxis(
  searchParams: Record<
    string,
    string | string[] | undefined
  >
): AxisKey | null {
  const axisParam = Array.isArray(
    searchParams.axis
  )
    ? searchParams.axis[0]
    : searchParams.axis;

  if (
    axisParam === "structuration" ||
    axisParam === "comprehension" ||
    axisParam === "valorisation"
  ) {
    return axisParam;
  }

  return null;
}

export default function ResultPage({
  searchParams,
}: {
  searchParams: Record<
    string,
    string | string[] | undefined
  >;
}) {
  const rawScore = parseScore(searchParams);

  const subSignals =
    parseSubSignals(searchParams);

  const lockedAxis =
    getLockedAxis(searchParams);

  const dominant: AxisKey =
    lockedAxis ??
    computeDominantAxis(rawScore);

  const hybrid =
    getHybridAxes(rawScore);

  const norm =
    normalizeScore(rawScore);

  const meta = axisMeta[dominant];

  return (
    <ResultExperience
      rawScore={rawScore}
      normalizedScore={norm}
      dominant={dominant}
      hybrid={hybrid}
      meta={meta}
      subSignals={subSignals}
    />
  );
}
