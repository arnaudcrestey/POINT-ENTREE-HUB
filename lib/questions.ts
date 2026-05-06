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

            label:
              "Isoler précisément le blocage et poser une structure claire",

            delta: {
              structuration: 3,
            },

            subSignals: {
              clarte: 2,
              methode: 1,
              pilotage: 1,
            },
          },

          {
            id: "s1b",

            label:
              "Chercher à comprendre les causes globales",

            delta: {
              comprehension: 2,
            },

            subSignals: {
              discernement: 2,
              lecture: 1,
            },
          },

          {
            id: "s1c",

            label:
              "Améliorer la manière dont c’est présenté",

            delta: {
              valorisation: 2,
            },

            subSignals: {
              perception: 2,
              impact: 1,
            },
          },
        ],
      },

      {
        id: "s2",

        prompt:
          "On vous confie un projet flou. Dans l’heure, vous :",

        answers: [
          {
            id: "s2a",

            label:
              "Définissez un cadre, des étapes et un plan d’action",

            delta: {
              structuration: 3,
            },

            subSignals: {
              methode: 2,
              pilotage: 2,
              clarte: 1,
            },
          },

          {
            id: "s2b",

            label:
              "Posez des questions pour comprendre",

            delta: {
              comprehension: 2,
            },

            subSignals: {
              discernement: 1,
              ecoute: 2,
              lecture: 1,
            },
          },

          {
            id: "s2c",

            label:
              "Attendez des éléments plus précis",

            delta: {
              valorisation: 1,
            },

            subSignals: {
              lisibilite: 1,
              perception: 1,
            },
          },
        ],
      },

      {
        id: "s3",

        prompt:
          "Votre valeur devient évidente quand :",

        answers: [
          {
            id: "s3a",

            label:
              "Une situation floue devient claire et exploitable",

            delta: {
              structuration: 3,
            },

            subSignals: {
              clarte: 2,
              methode: 1,
            },
          },

          {
            id: "s3b",

            label:
              "Une situation est mieux comprise",

            delta: {
              comprehension: 2,
            },

            subSignals: {
              discernement: 2,
              lecture: 1,
            },
          },

          {
            id: "s3c",

            label:
              "Le rendu devient plus impactant",

            delta: {
              valorisation: 2,
            },

            subSignals: {
              impact: 2,
              perception: 1,
            },
          },
        ],
      },

      {
        id: "s4",

        prompt:
          "Quand vous utilisez des outils comme ChatGPT :",

        answers: [
          {
            id: "s4a",

            label:
              "Vous construisez des systèmes et automatisez",

            delta: {
              structuration: 3,
            },

            subSignals: {
              pilotage: 2,
              methode: 2,
            },
          },

          {
            id: "s4b",

            label:
              "Vous analysez des situations",

            delta: {
              comprehension: 2,
            },

            subSignals: {
              lecture: 2,
              discernement: 1,
            },
          },

          {
            id: "s4c",

            label:
              "Vous créez ou améliorez du contenu",

            delta: {
              valorisation: 2,
            },

            subSignals: {
              impact: 1,
              lisibilite: 2,
            },
          },
        ],
      },

      {
        id: "s5",

        prompt:
          "Face à une activité désorganisée :",

        answers: [
          {
            id: "s5a",

            label:
              "Vous reprenez le contrôle avec un fonctionnement clair",

            delta: {
              structuration: 3,
            },

            subSignals: {
              pilotage: 2,
              clarte: 2,
            },
          },

          {
            id: "s5b",

            label:
              "Vous cherchez à comprendre pourquoi ça bloque",

            delta: {
              comprehension: 2,
            },

            subSignals: {
              discernement: 2,
              ecoute: 1,
            },
          },

          {
            id: "s5c",

            label:
              "Vous améliorez la perception",

            delta: {
              valorisation: 2,
            },

            subSignals: {
              perception: 2,
              impact: 1,
            },
          },
        ],
      },

      {
        id: "s6",

        prompt:
          "Votre rapport aux outils techniques (GitHub, n8n, Vercel) :",

        answers: [
          {
            id: "s6a",

            label:
              "Je les utilise ou je suis prêt à les maîtriser",

            delta: {
              structuration: 3,
            },

            subSignals: {
              methode: 2,
              pilotage: 1,
            },
          },

          {
            id: "s6b",

            label:
              "Je m’y intéresse pour comprendre",

            delta: {
              comprehension: 1,
            },

            subSignals: {
              lecture: 1,
              discernement: 1,
            },
          },

          {
            id: "s6c",

            label:
              "Ce n’est pas mon sujet principal",

            delta: {
              valorisation: 1,
            },

            subSignals: {
              perception: 1,
            },
          },
        ],
      },
    ],
  },
];
