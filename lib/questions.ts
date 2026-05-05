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
        prompt: "Quand une activité ne produit pas de résultats, votre première action concrète est :",
        answers: [
          { id: "s1a", label: "Isoler précisément le blocage et poser une structure claire", delta: { structuration: 3 } },
          { id: "s1b", label: "Chercher à comprendre les causes globales", delta: { comprehension: 2 } },
          { id: "s1c", label: "Améliorer la manière dont c’est présenté", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s2",
        prompt: "On vous confie un projet flou. Dans l’heure, vous :",
        answers: [
          { id: "s2a", label: "Définissez un cadre, des étapes et un plan d’action", delta: { structuration: 3 } },
          { id: "s2b", label: "Posez des questions pour comprendre", delta: { comprehension: 2 } },
          { id: "s2c", label: "Attendez des éléments plus précis", delta: { valorisation: 1 } }
        ]
      },
      {
        id: "s3",
        prompt: "Votre valeur devient évidente quand :",
        answers: [
          { id: "s3a", label: "Une situation floue devient claire et exploitable", delta: { structuration: 3 } },
          { id: "s3b", label: "Une situation est mieux comprise", delta: { comprehension: 2 } },
          { id: "s3c", label: "Le rendu devient plus impactant", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s4",
        prompt: "Quand vous utilisez des outils comme ChatGPT :",
        answers: [
          { id: "s4a", label: "Vous construisez des systèmes et automatisez", delta: { structuration: 3 } },
          { id: "s4b", label: "Vous analysez des situations", delta: { comprehension: 2 } },
          { id: "s4c", label: "Vous créez ou améliorez du contenu", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s5",
        prompt: "Face à une activité désorganisée :",
        answers: [
          { id: "s5a", label: "Vous reprenez le contrôle avec un fonctionnement clair", delta: { structuration: 3 } },
          { id: "s5b", label: "Vous cherchez à comprendre pourquoi ça bloque", delta: { comprehension: 2 } },
          { id: "s5c", label: "Vous améliorez la perception", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s6",
        prompt: "Votre rapport aux outils techniques (GitHub, n8n, Vercel) :",
        answers: [
          { id: "s6a", label: "Je les utilise ou je suis prêt à les maîtriser", delta: { structuration: 3 } },
          { id: "s6b", label: "Je m’y intéresse pour comprendre", delta: { comprehension: 1 } },
          { id: "s6c", label: "Ce n’est pas mon sujet principal", delta: { valorisation: 1 } }
        ]
      },
      {
        id: "s7",
        prompt: "Quand une opportunité apparaît :",
        answers: [
          { id: "s7a", label: "Vous construisez une offre claire et exploitable", delta: { structuration: 3 } },
          { id: "s7b", label: "Vous analysez sa pertinence", delta: { comprehension: 2 } },
          { id: "s7c", label: "Vous travaillez sa présentation", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s8",
        prompt: "Dans une équipe, vous êtes celui qui :",
        answers: [
          { id: "s8a", label: "Rend les choses concrètes et exécutables", delta: { structuration: 3 } },
          { id: "s8b", label: "Apporte de la compréhension", delta: { comprehension: 2 } },
          { id: "s8c", label: "Améliore l’image", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s9",
        prompt: "Vous préférez travailler sur :",
        answers: [
          { id: "s9a", label: "Un système fiable et reproductible", delta: { structuration: 3 } },
          { id: "s9b", label: "Une situation complexe à analyser", delta: { comprehension: 2 } },
          { id: "s9c", label: "Un rendu à améliorer", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "s10",
        prompt: "Quand tout devient confus :",
        answers: [
          { id: "s10a", label: "Vous clarifiez et redonnez une direction", delta: { structuration: 3 } },
          { id: "s10b", label: "Vous cherchez à comprendre", delta: { comprehension: 2 } },
          { id: "s10c", label: "Vous travaillez la perception", delta: { valorisation: 2 } }
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
        prompt: "Quand quelqu’un expose un problème, votre réflexe est :",
        answers: [
          { id: "c1a", label: "Écouter, reformuler et creuser", delta: { comprehension: 3 } },
          { id: "c1b", label: "Proposer rapidement une solution", delta: { structuration: 2 } },
          { id: "c1c", label: "Donner un point de vue", delta: { valorisation: 1 } }
        ]
      },
      {
        id: "c2",
        prompt: "Face à une situation complexe :",
        answers: [
          { id: "c2a", label: "Vous cherchez les mécanismes profonds", delta: { comprehension: 3 } },
          { id: "c2b", label: "Vous structurez une réponse", delta: { structuration: 2 } },
          { id: "c2c", label: "Vous améliorez la perception", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c3",
        prompt: "Votre valeur apparaît quand :",
        answers: [
          { id: "c3a", label: "Une personne comprend enfin sa situation", delta: { comprehension: 3 } },
          { id: "c3b", label: "Une solution est mise en place", delta: { structuration: 2 } },
          { id: "c3c", label: "L’image devient plus impactante", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c4",
        prompt: "Dans un échange :",
        answers: [
          { id: "c4a", label: "Vous reformulez et clarifiez", delta: { comprehension: 3 } },
          { id: "c4b", label: "Vous dirigez", delta: { structuration: 2 } },
          { id: "c4c", label: "Vous dynamisez", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c5",
        prompt: "Avez-vous déjà accompagné quelqu’un sur une situation :",
        answers: [
          { id: "c5a", label: "Oui régulièrement avec méthode", delta: { comprehension: 3 } },
          { id: "c5b", label: "Oui de manière informelle", delta: { comprehension: 2 } },
          { id: "c5c", label: "Non", delta: { valorisation: 1 } }
        ]
      },
      {
        id: "c6",
        prompt: "Votre posture naturelle :",
        answers: [
          { id: "c6a", label: "Comprendre avant d’agir", delta: { comprehension: 3 } },
          { id: "c6b", label: "Agir rapidement", delta: { structuration: 2 } },
          { id: "c6c", label: "Créer de l’impact", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c7",
        prompt: "Quand vous utilisez ChatGPT :",
        answers: [
          { id: "c7a", label: "Vous analysez en profondeur", delta: { comprehension: 3 } },
          { id: "c7b", label: "Vous structurez des réponses", delta: { structuration: 2 } },
          { id: "c7c", label: "Vous produisez du contenu", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c8",
        prompt: "Vous êtes reconnu pour :",
        answers: [
          { id: "c8a", label: "Votre capacité à comprendre les situations", delta: { comprehension: 3 } },
          { id: "c8b", label: "Votre efficacité", delta: { structuration: 2 } },
          { id: "c8c", label: "Votre sens de l’image", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c9",
        prompt: "Vous préférez travailler sur :",
        answers: [
          { id: "c9a", label: "Une situation humaine à analyser", delta: { comprehension: 3 } },
          { id: "c9b", label: "Un système à construire", delta: { structuration: 2 } },
          { id: "c9c", label: "Un rendu à améliorer", delta: { valorisation: 2 } }
        ]
      },
      {
        id: "c10",
        prompt: "Face à une difficulté humaine :",
        answers: [
          { id: "c10a", label: "Vous écoutez et clarifiez", delta: { comprehension: 3 } },
          { id: "c10b", label: "Vous proposez une solution", delta: { structuration: 2 } },
          { id: "c10c", label: "Vous stimulez", delta: { valorisation: 2 } }
        ]
      }
    ]
  },

  {
    id: "valorisation",
    title: "Valorisation",
    subtitle: "QLYK",
    context: "Améliorer la perception et l’impact.",
    followUps: [
      {
        id: "v1",
        prompt: "Quand un produit est mal présenté :",
        answers: [
          { id: "v1a", label: "Vous voyez immédiatement comment le valoriser", delta: { valorisation: 3 } },
          { id: "v1b", label: "Vous analysez le problème", delta: { comprehension: 2 } },
          { id: "v1c", label: "Vous structurez une offre", delta: { structuration: 2 } }
        ]
      },
      {
        id: "v2",
        prompt: "Votre valeur apparaît quand :",
        answers: [
          { id: "v2a", label: "Un produit devient désirable", delta: { valorisation: 3 } },
          { id: "v2b", label: "Une situation est clarifiée", delta: { comprehension: 2 } },
          { id: "v2c", label: "Une structure est mise en place", delta: { structuration: 2 } }
        ]
      },
      {
        id: "v3",
        prompt: "Avez-vous déjà amélioré des visuels ou des présentations :",
        answers: [
          { id: "v3a", label: "Oui régulièrement avec impact", delta: { valorisation: 3 } },
          { id: "v3b", label: "Oui parfois", delta: { valorisation: 2 } },
          { id: "v3c", label: "Non", delta: { structuration: 1 } }
        ]
      },
      {
        id: "v4",
        prompt: "Votre approche naturelle :",
        answers: [
          { id: "v4a", label: "Créer de l’impact visuel", delta: { valorisation: 3 } },
          { id: "v4b", label: "Comprendre", delta: { comprehension: 2 } },
          { id: "v4c", label: "Structurer", delta: { structuration: 2 } }
        ]
      },
      {
        id: "v5",
        prompt: "Dans une vente :",
        answers: [
          { id: "v5a", label: "Vous améliorez la perception", delta: { valorisation: 3 } },
          { id: "v5b", label: "Vous structurez", delta: { structuration: 2 } },
          { id: "v5c", label: "Vous analysez", delta: { comprehension: 2 } }
        ]
      },
      {
        id: "v6",
        prompt: "Quand vous utilisez ChatGPT :",
        answers: [
          { id: "v6a", label: "Vous créez et améliorez des rendus", delta: { valorisation: 3 } },
          { id: "v6b", label: "Vous structurez", delta: { structuration: 2 } },
          { id: "v6c", label: "Vous analysez", delta: { comprehension: 2 } }
        ]
      },
      {
        id: "v7",
        prompt: "Votre force principale :",
        answers: [
          { id: "v7a", label: "Créer de l’impact et de la désirabilité", delta: { valorisation: 3 } },
          { id: "v7b", label: "Organiser", delta: { structuration: 2 } },
          { id: "v7c", label: "Comprendre", delta: { comprehension: 2 } }
        ]
      },
      {
        id: "v8",
        prompt: "Quand un rendu manque d’impact, votre premier réflexe est :",
        answers: [
          { id: "v8a", label: "Repenser immédiatement la perception pour le rendre plus désirable", delta: { valorisation: 3 } },
          { id: "v8b", label: "Structurer le contenu pour le rendre plus clair", delta: { structuration: 2 } },
          { id: "v8c", label: "Analyser ce qui ne fonctionne pas", delta: { comprehension: 2 } }
        ]
      },
      {
        id: "v9",
        prompt: "Face à un produit ou une offre :",
        answers: [
          { id: "v9a", label: "Vous voyez son potentiel visuel immédiatement", delta: { valorisation: 3 } },
          { id: "v9b", label: "Vous analysez", delta: { comprehension: 2 } },
          { id: "v9c", label: "Vous structurez", delta: { structuration: 2 } }
        ]
      },
      {
        id: "v10",
        prompt: "Vous préférez :",
        answers: [
          { id: "v10a", label: "Valoriser un produit ou une image", delta: { valorisation: 3 } },
          { id: "v10b", label: "Structurer", delta: { structuration: 2 } },
          { id: "v10c", label: "Comprendre", delta: { comprehension: 2 } }
        ]
      }
    ]
  }
];
