import type { AxisKey, Question } from "@/lib/scoring";

export type PrimaryOption = {
  id: AxisKey;
  title: string;
  subtitle: string;
  context: string;
  followUps: Question[];
};

export const primaryOptions: PrimaryOption[] = [
  {
    id: "structuration",
    title: "Structuration",
    subtitle: "SYSTIA",
    context: "Structurer une activité et clarifier une offre sans dispersion.",
    followUps: [
      {
        id: "s1",
        prompt: "Quel point bloque votre progression aujourd'hui ?",
        answers: [
          { id: "s1a", label: "Une offre peu lisible", delta: { structuration: 2 } },
          { id: "s1b", label: "Un positionnement flou", delta: { comprehension: 1, structuration: 1 } },
          { id: "s1c", label: "Une communication incohérente", delta: { valorisation: 1, structuration: 1 } }
        ]
      },
      {
        id: "s2",
        prompt: "Votre priorité à 90 jours ?",
        answers: [
          { id: "s2a", label: "Un cadre décisionnel stable", delta: { structuration: 2 } },
          { id: "s2b", label: "Un diagnostic plus fin", delta: { comprehension: 1 } },
          { id: "s2c", label: "Une présence plus crédible", delta: { valorisation: 1 } }
        ]
      }
    ]
  },
  {
    id: "comprehension",
    title: "Compréhension",
    subtitle: "Cabinet Astraé",
    context: "Analyser une situation, poser un cadre clair et reprendre du recul.",
    followUps: [
      {
        id: "c1",
        prompt: "Ce que vous cherchez avant tout ?",
        answers: [
          { id: "c1a", label: "Clarifier les causes réelles", delta: { comprehension: 2 } },
          { id: "c1b", label: "Formaliser un modèle opérant", delta: { structuration: 1, comprehension: 1 } },
          { id: "c1c", label: "Mieux exprimer la valeur", delta: { valorisation: 1, comprehension: 1 } }
        ]
      },
      {
        id: "c2",
        prompt: "Quand décidez-vous mieux ?",
        answers: [
          { id: "c2a", label: "Quand l'analyse est objectivée", delta: { comprehension: 2 } },
          { id: "c2b", label: "Quand les priorités sont ordonnées", delta: { structuration: 1 } },
          { id: "c2c", label: "Quand le message est aligné", delta: { valorisation: 1 } }
        ]
      }
    ]
  },
  {
    id: "valorisation",
    title: "Valorisation",
    subtitle: "QLYK",
    context: "Renforcer la perception et augmenter l'impact des points forts existants.",
    followUps: [
      {
        id: "v1",
        prompt: "Quelle perception souhaitez-vous transformer ?",
        answers: [
          { id: "v1a", label: "Une image trop neutre", delta: { valorisation: 2 } },
          { id: "v1b", label: "Un récit trop technique", delta: { comprehension: 1, valorisation: 1 } },
          { id: "v1c", label: "Une offre insuffisamment incarnée", delta: { structuration: 1, valorisation: 1 } }
        ]
      },
      {
        id: "v2",
        prompt: "Quel résultat attendez-vous ?",
        answers: [
          { id: "v2a", label: "Plus d'impact immédiat", delta: { valorisation: 2 } },
          { id: "v2b", label: "Plus de cohérence stratégique", delta: { structuration: 1 } },
          { id: "v2c", label: "Plus de justesse d'analyse", delta: { comprehension: 1 } }
        ]
      }
    ]
  }
];
