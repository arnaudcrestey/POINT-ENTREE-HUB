import type { AxisKey, Question } from "@/lib/scoring";

export type PrimaryOption = {
  id: AxisKey;
  title: string;
  subtitle: string;
  context: string;
  followUps: Question[];
};

export const QUESTIONS_PER_SESSION = 6;

export const primaryOptions: PrimaryOption[] = [
  {
    id: "structuration",
    title: "Structuration",
    subtitle: "SYSTIA",
    context:
      "Structurer une activité et rendre les choses réellement opérationnelles.",
    followUps: [
      {
        id: "s1",
        prompt:
          "Quand une activité ne produit pas de résultats, votre première action concrète est :",
        answers: [
          {
            id: "s1a",
            label: "Isoler précisément le blocage et poser une structure claire",
            delta: { structuration: 3 },
            subSignals: { clarte: 2, methode: 1, pilotage: 1 },
          },
          {
            id: "s1b",
            label: "Chercher à comprendre les causes globales",
            delta: { comprehension: 2 },
            subSignals: { discernement: 2, lecture: 1 },
          },
          {
            id: "s1c",
            label: "Améliorer la manière dont c’est présenté",
            delta: { valorisation: 2 },
            subSignals: { perception: 2, impact: 1 },
          },
        ],
      },
      {
        id: "s2",
        prompt: "On vous confie un projet flou. Dans l’heure, vous :",
        answers: [
          {
            id: "s2a",
            label: "Définissez un cadre, des étapes et un plan d’action",
            delta: { structuration: 3 },
            subSignals: { methode: 2, pilotage: 2, clarte: 1 },
          },
          {
            id: "s2b",
            label: "Posez des questions pour comprendre",
            delta: { comprehension: 2 },
            subSignals: { discernement: 1, ecoute: 2, lecture: 1 },
          },
          {
            id: "s2c",
            label: "Attendez des éléments plus précis",
            delta: { valorisation: 1 },
            subSignals: { lisibilite: 1, perception: 1 },
          },
        ],
      },
      {
        id: "s3",
        prompt: "Votre valeur devient évidente quand :",
        answers: [
          {
            id: "s3a",
            label: "Une situation floue devient claire et exploitable",
            delta: { structuration: 3 },
            subSignals: { clarte: 2, methode: 1 },
          },
          {
            id: "s3b",
            label: "Une situation est mieux comprise",
            delta: { comprehension: 2 },
            subSignals: { discernement: 2, lecture: 1 },
          },
          {
            id: "s3c",
            label: "Le rendu devient plus impactant",
            delta: { valorisation: 2 },
            subSignals: { impact: 2, perception: 1 },
          },
        ],
      },
      {
        id: "s4",
        prompt: "Quand vous utilisez des outils comme ChatGPT :",
        answers: [
          {
            id: "s4a",
            label: "Vous construisez des systèmes et automatisez",
            delta: { structuration: 3 },
            subSignals: { pilotage: 2, methode: 2 },
          },
          {
            id: "s4b",
            label: "Vous analysez des situations",
            delta: { comprehension: 2 },
            subSignals: { lecture: 2, discernement: 1 },
          },
          {
            id: "s4c",
            label: "Vous créez ou améliorez du contenu",
            delta: { valorisation: 2 },
            subSignals: { impact: 1, lisibilite: 2 },
          },
        ],
      },
      {
        id: "s5",
        prompt: "Face à une activité désorganisée :",
        answers: [
          {
            id: "s5a",
            label: "Vous reprenez le contrôle avec un fonctionnement clair",
            delta: { structuration: 3 },
            subSignals: { pilotage: 2, clarte: 2 },
          },
          {
            id: "s5b",
            label: "Vous cherchez à comprendre pourquoi ça bloque",
            delta: { comprehension: 2 },
            subSignals: { discernement: 2, ecoute: 1 },
          },
          {
            id: "s5c",
            label: "Vous améliorez la perception",
            delta: { valorisation: 2 },
            subSignals: { perception: 2, impact: 1 },
          },
        ],
      },
      {
        id: "s6",
        prompt: "Votre rapport aux outils techniques (GitHub, n8n, Vercel) :",
        answers: [
          {
            id: "s6a",
            label: "Je les utilise ou je suis prêt à les maîtriser",
            delta: { structuration: 3 },
            subSignals: { methode: 2, pilotage: 1 },
          },
          {
            id: "s6b",
            label: "Je m’y intéresse pour comprendre",
            delta: { comprehension: 1 },
            subSignals: { lecture: 1, discernement: 1 },
          },
          {
            id: "s6c",
            label: "Ce n’est pas mon sujet principal",
            delta: { valorisation: 1 },
            subSignals: { perception: 1 },
          },
        ],
      },
    ],
  },

  {
    id: "comprehension",
    title: "Compréhension",
    subtitle: "Cabinet Astraé",
    context:
      "Lire une situation, comprendre les mécanismes et formuler une analyse utile.",
    followUps: [
      {
        id: "c1",
        prompt: "Quand une situation paraît confuse, votre premier réflexe est :",
        answers: [
          {
            id: "c1a",
            label: "Identifier ce qui se joue derrière les faits apparents",
            delta: { comprehension: 3 },
            subSignals: { discernement: 2, lecture: 2 },
          },
          {
            id: "c1b",
            label: "Remettre de l’ordre dans les priorités",
            delta: { structuration: 2 },
            subSignals: { clarte: 2, methode: 1 },
          },
          {
            id: "c1c",
            label: "Rendre la situation plus lisible pour les autres",
            delta: { valorisation: 2 },
            subSignals: { lisibilite: 2, perception: 1 },
          },
        ],
      },
      {
        id: "c2",
        prompt: "Avant de proposer une direction, vous avez besoin de :",
        answers: [
          {
            id: "c2a",
            label: "Comprendre le contexte, les tensions et les non-dits",
            delta: { comprehension: 3 },
            subSignals: { ecoute: 2, discernement: 2 },
          },
          {
            id: "c2b",
            label: "Définir un cadre d’action clair",
            delta: { structuration: 2 },
            subSignals: { methode: 2, pilotage: 1 },
          },
          {
            id: "c2c",
            label: "Voir comment le sujet sera perçu",
            delta: { valorisation: 2 },
            subSignals: { perception: 2, impact: 1 },
          },
        ],
      },
      {
        id: "c3",
        prompt: "Votre contribution devient utile quand :",
        answers: [
          {
            id: "c3a",
            label: "Vous aidez à comprendre ce qui bloque vraiment",
            delta: { comprehension: 3 },
            subSignals: { discernement: 2, lecture: 1 },
          },
          {
            id: "c3b",
            label: "Vous transformez l’analyse en méthode",
            delta: { structuration: 2 },
            subSignals: { clarte: 1, methode: 2 },
          },
          {
            id: "c3c",
            label: "Vous améliorez la formulation du sujet",
            delta: { valorisation: 2 },
            subSignals: { lisibilite: 2, impact: 1 },
          },
        ],
      },
      {
        id: "c4",
        prompt: "Face à une personne qui exprime un besoin flou, vous :",
        answers: [
          {
            id: "c4a",
            label: "Écoutez, reformulez et cherchez la logique profonde",
            delta: { comprehension: 3 },
            subSignals: { ecoute: 2, lecture: 2 },
          },
          {
            id: "c4b",
            label: "Cadrez rapidement les prochaines étapes",
            delta: { structuration: 2 },
            subSignals: { pilotage: 2, methode: 1 },
          },
          {
            id: "c4c",
            label: "Aidez à rendre son message plus clair",
            delta: { valorisation: 2 },
            subSignals: { lisibilite: 2, perception: 1 },
          },
        ],
      },
      {
        id: "c5",
        prompt: "Dans un échange professionnel sensible, vous êtes surtout attentif à :",
        answers: [
          {
            id: "c5a",
            label: "Ce qui est dit, ce qui ne l’est pas, et ce que cela révèle",
            delta: { comprehension: 3 },
            subSignals: { discernement: 2, ecoute: 2 },
          },
          {
            id: "c5b",
            label: "Ce qui doit être décidé concrètement",
            delta: { structuration: 2 },
            subSignals: { clarte: 1, pilotage: 2 },
          },
          {
            id: "c5c",
            label: "L’impact du message sur la personne en face",
            delta: { valorisation: 2 },
            subSignals: { impact: 2, perception: 1 },
          },
        ],
      },
      {
        id: "c6",
        prompt: "Votre manière naturelle d’aider consiste plutôt à :",
        answers: [
          {
            id: "c6a",
            label: "Produire une lecture juste et exploitable de la situation",
            delta: { comprehension: 3 },
            subSignals: { lecture: 2, discernement: 2 },
          },
          {
            id: "c6b",
            label: "Transformer le sujet en plan clair",
            delta: { structuration: 2 },
            subSignals: { methode: 2, clarte: 1 },
          },
          {
            id: "c6c",
            label: "Rendre la présentation plus convaincante",
            delta: { valorisation: 2 },
            subSignals: { impact: 2, lisibilite: 1 },
          },
        ],
      },
    ],
  },

  {
    id: "valorisation",
    title: "Valorisation",
    subtitle: "QLYK",
    context:
      "Améliorer la perception, la lisibilité et l’impact d’une offre, d’un contenu ou d’un produit.",
    followUps: [
      {
        id: "v1",
        prompt: "Quand un projet est bon mais peu visible, votre premier réflexe est :",
        answers: [
          {
            id: "v1a",
            label: "Améliorer ce qui est perçu en premier",
            delta: { valorisation: 3 },
            subSignals: { perception: 2, impact: 2 },
          },
          {
            id: "v1b",
            label: "Comprendre pourquoi il n’est pas compris",
            delta: { comprehension: 2 },
            subSignals: { discernement: 2, lecture: 1 },
          },
          {
            id: "v1c",
            label: "Structurer son fonctionnement avant de le montrer",
            delta: { structuration: 2 },
            subSignals: { methode: 2, clarte: 1 },
          },
        ],
      },
      {
        id: "v2",
        prompt: "Votre valeur apparaît surtout quand :",
        answers: [
          {
            id: "v2a",
            label: "Une offre devient plus lisible, plus claire et plus désirable",
            delta: { valorisation: 3 },
            subSignals: { lisibilite: 2, perception: 2 },
          },
          {
            id: "v2b",
            label: "Une situation devient mieux comprise",
            delta: { comprehension: 2 },
            subSignals: { lecture: 2, ecoute: 1 },
          },
          {
            id: "v2c",
            label: "Une activité devient mieux organisée",
            delta: { structuration: 2 },
            subSignals: { pilotage: 2, methode: 1 },
          },
        ],
      },
      {
        id: "v3",
        prompt: "Face à un contenu faible, vous commencez par :",
        answers: [
          {
            id: "v3a",
            label: "Renforcer le message, la forme et l’impact perçu",
            delta: { valorisation: 3 },
            subSignals: { impact: 2, lisibilite: 2 },
          },
          {
            id: "v3b",
            label: "Analyser ce que le contenu cherche vraiment à dire",
            delta: { comprehension: 2 },
            subSignals: { lecture: 2, discernement: 1 },
          },
          {
            id: "v3c",
            label: "Reprendre sa structure logique",
            delta: { structuration: 2 },
            subSignals: { clarte: 2, methode: 1 },
          },
        ],
      },
      {
        id: "v4",
        prompt: "Quand vous regardez une page, une offre ou une image, vous voyez vite :",
        answers: [
          {
            id: "v4a",
            label: "Ce qui manque d’impact, de lisibilité ou de présence",
            delta: { valorisation: 3 },
            subSignals: { perception: 2, impact: 2 },
          },
          {
            id: "v4b",
            label: "Ce que cela révèle de l’intention initiale",
            delta: { comprehension: 2 },
            subSignals: { discernement: 2, lecture: 1 },
          },
          {
            id: "v4c",
            label: "Ce qui devrait être mieux organisé",
            delta: { structuration: 2 },
            subSignals: { methode: 2, pilotage: 1 },
          },
        ],
      },
      {
        id: "v5",
        prompt: "Pour améliorer un projet, vous cherchez d’abord à :",
        answers: [
          {
            id: "v5a",
            label: "Rendre sa valeur plus visible et plus immédiatement compréhensible",
            delta: { valorisation: 3 },
            subSignals: { lisibilite: 2, perception: 2 },
          },
          {
            id: "v5b",
            label: "Comprendre la logique de la personne qui l’a créé",
            delta: { comprehension: 2 },
            subSignals: { ecoute: 2, discernement: 1 },
          },
          {
            id: "v5c",
            label: "Remettre le projet dans une méthode claire",
            delta: { structuration: 2 },
            subSignals: { clarte: 1, methode: 2 },
          },
        ],
      },
      {
        id: "v6",
        prompt: "Votre intervention est réussie quand :",
        answers: [
          {
            id: "v6a",
            label: "Le projet est mieux perçu, plus clair et plus fort",
            delta: { valorisation: 3 },
            subSignals: { impact: 2, lisibilite: 2 },
          },
          {
            id: "v6b",
            label: "La personne comprend mieux sa propre situation",
            delta: { comprehension: 2 },
            subSignals: { lecture: 2, discernement: 1 },
          },
          {
            id: "v6c",
            label: "Le projet devient plus cadré et plus pilotable",
            delta: { structuration: 2 },
            subSignals: { pilotage: 2, methode: 1 },
          },
        ],
      },
    ],
  },
];
