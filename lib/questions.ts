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
    context: "Structurer une activité et rendre les choses réellement opérationnelles.",
    followUps: [
      {
        id: "s1",
        prompt: "Quand une activité ne fonctionne pas, votre premier réflexe est :",
        answers: [
          { id: "s1a", label: "Identifier précisément ce qui bloque et poser un cadre", delta: { structuration: 3 } },
          { id: "s1b", label: "Comprendre les causes profondes", delta: { comprehension: 2 } },
          { id: "s1c", label: "Améliorer la présentation", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s2",
        prompt: "Face à un projet flou :",
        answers: [
          { id: "s2a", label: "Vous structurez immédiatement les étapes", delta: { structuration: 3 } },
          { id: "s2b", label: "Vous cherchez à comprendre", delta: { comprehension: 2 } },
          { id: "s2c", label: "Vous attendez plus de clarté", delta: { valorisation: 1 } }
        ]
      },
      {
        id: "s3",
        prompt: "Avez-vous déjà mis en place un système concret ?",
        answers: [
          { id: "s3a", label: "Oui, plusieurs fois", delta: { structuration: 3 } },
          { id: "s3b", label: "Une ou deux fois", delta: { structuration: 2 } },
          { id: "s3c", label: "Non", delta: { valorisation: 1 } }
        ]
      },
      {
        id: "s4",
        prompt: "Quand vous utilisez ChatGPT :",
        answers: [
          { id: "s4a", label: "Vous construisez des systèmes", delta: { structuration: 3 } },
          { id: "s4b", label: "Vous analysez", delta: { comprehension: 2 } },
          { id: "s4c", label: "Vous créez du contenu", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s5",
        prompt: "Sur GitHub / n8n / Vercel :",
        answers: [
          { id: "s5a", label: "À l’aise ou prêt à apprendre concrètement", delta: { structuration: 3 } },
          { id: "s5b", label: "Curieux", delta: { comprehension: 1 } },
          { id: "s5c", label: "Peu concerné", delta: { valorisation: 1 } }
        ]
      },
      {
        id: "s6",
        prompt: "Dans un projet, vous êtes celui qui :",
        answers: [
          { id: "s6a", label: "Rend les choses opérationnelles", delta: { structuration: 3 } },
          { id: "s6b", label: "Clarifie la situation", delta: { comprehension: 2 } },
          { id: "s6c", label: "Améliore l’image", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s7",
        prompt: "Face à une opportunité :",
        answers: [
          { id: "s7a", label: "Vous structurez une offre claire", delta: { structuration: 3 } },
          { id: "s7b", label: "Vous analysez le besoin", delta: { comprehension: 2 } },
          { id: "s7c", label: "Vous travaillez la présentation", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s8",
        prompt: "Votre valeur principale :",
        answers: [
          { id: "s8a", label: "Créer de la structure", delta: { structuration: 3 } },
          { id: "s8b", label: "Comprendre", delta: { comprehension: 2 } },
          { id: "s8c", label: "Valoriser", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s9",
        prompt: "Vous préférez :",
        answers: [
          { id: "s9a", label: "Construire un système solide", delta: { structuration: 3 } },
          { id: "s9b", label: "Analyser en profondeur", delta: { comprehension: 2 } },
          { id: "s9c", label: "Créer de l’impact", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s10",
        prompt: "Quand tout est désorganisé :",
        answers: [
          { id: "s10a", label: "Vous reprenez le contrôle", delta: { structuration: 3 } },
          { id: "s10b", label: "Vous cherchez à comprendre", delta: { comprehension: 2 } },
          { id: "s10c", label: "Vous améliorez la perception", delta: { valorisation: 2 } }
        ]
      }
    ]
  },

  {
    id: "comprehension",
    title: "Compréhension",
    subtitle: "Cabinet Astraé",
    context: "Analyser une situation et comprendre en profondeur.",
    followUps: [
      {
        id: "c1",
        prompt: "Quand quelqu’un vous parle d’un problème :",
        answers: [
          { id: "c1a", label: "Vous écoutez avant de répondre", delta: { comprehension: 3 } },
          { id: "c1b", label: "Vous proposez une solution", delta: { structuration: 2 } },
          { id: "c1c", label: "Vous donnez votre avis", delta: { valorisation: 1 } }
        ]
      },
      {
        id: "c2",
        prompt: "Face à une situation complexe :",
        answers: [
          { id: "c2a", label: "Vous cherchez les mécanismes", delta: { comprehension: 3 } },
          { id: "c2b", label: "Vous structurez", delta: { structuration: 2 } },
          { id: "c2c", label: "Vous améliorez le rendu", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c3",
        prompt: "Vous êtes à l’aise avec :",
        answers: [
          { id: "c3a", label: "L’écoute profonde", delta: { comprehension: 3 } },
          { id: "c3b", label: "L’action", delta: { structuration: 2 } },
          { id: "c3c", label: "Le visuel", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c4",
        prompt: "Votre rapport à l’astrologie :",
        answers: [
          { id: "c4a", label: "Ouvert et intéressé", delta: { comprehension: 3 } },
          { id: "c4b", label: "Curieux", delta: { comprehension: 2 } },
          { id: "c4c", label: "Peu réceptif", delta: { structuration: 1 } }
        ]
      },
      {
        id: "c5",
        prompt: "Avez-vous déjà accompagné quelqu’un :",
        answers: [
          { id: "c5a", label: "Oui régulièrement", delta: { comprehension: 3 } },
          { id: "c5b", label: "Parfois", delta: { comprehension: 2 } },
          { id: "c5c", label: "Non", delta: { valorisation: 1 } }
        ]
      },
      {
        id: "c6",
        prompt: "Dans une discussion :",
        answers: [
          { id: "c6a", label: "Vous reformulez", delta: { comprehension: 3 } },
          { id: "c6b", label: "Vous dirigez", delta: { structuration: 2 } },
          { id: "c6c", label: "Vous dynamisez", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c7",
        prompt: "Votre force :",
        answers: [
          { id: "c7a", label: "Comprendre profondément", delta: { comprehension: 3 } },
          { id: "c7b", label: "Organiser", delta: { structuration: 2 } },
          { id: "c7c", label: "Valoriser", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c8",
        prompt: "Quand vous utilisez ChatGPT :",
        answers: [
          { id: "c8a", label: "Vous analysez", delta: { comprehension: 3 } },
          { id: "c8b", label: "Vous structurez", delta: { structuration: 2 } },
          { id: "c8c", label: "Vous créez", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c9",
        prompt: "Vous préférez :",
        answers: [
          { id: "c9a", label: "Comprendre une personne", delta: { comprehension: 3 } },
          { id: "c9b", label: "Construire un système", delta: { structuration: 2 } },
          { id: "c9c", label: "Créer de l’impact", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c10",
        prompt: "Face à une difficulté humaine :",
        answers: [
          { id: "c10a", label: "Vous écoutez", delta: { comprehension: 3 } },
          { id: "c10b", label: "Vous proposez une solution", delta: { structuration: 2 } },
          { id: "c10c", label: "Vous motivez", delta: { valorisation: 2 } }
        ]
      }
    ]
  },

  {
    id: "valorisation",
    title: "Valorisation",
    subtitle: "QLYK",
    context: "Améliorer la perception et l’impact visuel.",
    followUps: [
      {
        id: "v1",
        prompt: "Quand vous voyez une mauvaise photo :",
        answers: [
          { id: "v1a", label: "Vous voyez immédiatement comment améliorer", delta: { valorisation: 3 } },
          { id: "v1b", label: "Vous analysez", delta: { comprehension: 2 } },
          { id: "v1c", label: "Vous structurez", delta: { structuration: 2 } }
        ]
      },
      {
        id: "v2",
        prompt: "Avez-vous déjà amélioré des visuels :",
        answers: [
          { id: "v2a", label: "Oui régulièrement", delta: { valorisation: 3 } },
          { id: "v2b", label: "Parfois", delta: { valorisation: 2 } },
          { id: "v2c", label: "Non", delta: { structuration: 1 } }
        ]
      },
      {
        id: "v3",
        prompt: "Sur Canva / IA image :",
        answers: [
          { id: "v3a", label: "À l’aise", delta: { valorisation: 3 } },
          { id: "v3b", label: "Débutant", delta: { valorisation: 2 } },
          { id: "v3c", label: "Pas intéressé", delta: { structuration: 1 } }
        ]
      },
      {
        id: "v4",
        prompt: "Face à un produit mal présenté :",
        answers: [
          { id: "v4a", label: "Vous le valorisez", delta: { valorisation: 3 } },
          { id: "v4b", label: "Vous analysez", delta: { comprehension: 2 } },
          { id: "v4c", label: "Vous structurez", delta: { structuration: 2 } }
        ]
      },
      {
        id: "v5",
        prompt: "Vous aimez :",
        answers: [
          { id: "v5a", label: "L’image et l’impact", delta: { valorisation: 3 } },
          { id: "v5b", label: "Les systèmes", delta: { structuration: 2 } },
          { id: "v5c", label: "Les échanges humains", delta: { comprehension: 2 } }
        ]
      },
      {
        id: "v6",
        prompt: "Dans une vente :",
        answers: [
          { id: "v6a", label: "Vous améliorez la présentation", delta: { valorisation: 3 } },
          { id: "v6b", label: "Vous structurez", delta: { structuration: 2 } },
          { id: "v6c", label: "Vous comprenez", delta: { comprehension: 2 } }
        ]
      },
      {
        id: "v7",
        prompt: "Votre force :",
        answers: [
          { id: "v7a", label: "Créer de l’impact", delta: { valorisation: 3 } },
          { id: "v7b", label: "Structurer", delta: { structuration: 2 } },
          { id: "v7c", label: "Comprendre", delta: { comprehension: 2 } }
        ]
      },
      {
        id: "v8",
        prompt: "Quand vous utilisez ChatGPT :",
        answers: [
          { id: "v8a", label: "Créer et améliorer", delta: { valorisation: 3 } },
          { id: "v8b", label: "Structurer", delta: { structuration: 2 } },
          { id: "v8c", label: "Analyser", delta: { comprehension: 2 } }
        ]
      },
      {
        id: "v9",
        prompt: "Face à une voiture :",
        answers: [
          { id: "v9a", label: "Vous voyez son potentiel visuel", delta: { valorisation: 3 } },
          { id: "v9b", label: "Vous analysez", delta: { comprehension: 2 } },
          { id: "v9c", label: "Vous structurez", delta: { structuration: 2 } }
        ]
      },
      {
        id: "v10",
        prompt: "Vous préférez :",
        answers: [
          { id: "v10a", label: "Valoriser un produit", delta: { valorisation: 3 } },
          { id: "v10b", label: "Structurer", delta: { structuration: 2 } },
          { id: "v10c", label: "Comprendre", delta: { comprehension: 2 } }
        ]
      }
    ]
  }
];
