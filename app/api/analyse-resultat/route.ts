import { NextResponse } from "next/server";

type AxisKey = "structuration" | "comprehension" | "valorisation";

type SubSignalKey =
  | "clarte"
  | "methode"
  | "pilotage"
  | "discernement"
  | "ecoute"
  | "lecture"
  | "perception"
  | "impact"
  | "lisibilite";

type SubSignals = Partial<Record<SubSignalKey, number>>;

type AnalysisResult = {
  lecture: string;
  projection: string;
  attention: string[];
  suite: string[];
};

const fallback: AnalysisResult = {
  lecture:
    "La lecture reste exploitable, mais l’analyse personnalisée n’a pas pu être produite avec assez de précision.",
  projection:
    "Une situation concrète permettra de vérifier la pertinence de cette orientation dans un cadre réel.",
  attention: [
    "Vous devez confronter cette lecture à un cas concret.",
    "Vous gagnez à préciser votre contexte d’intervention.",
  ],
  suite: [
    "Transmettre une situation professionnelle actuelle.",
    "Décrire les enjeux, contraintes et objectifs.",
  ],
};

function isAxisKey(value: unknown): value is AxisKey {
  return (
    value === "structuration" ||
    value === "comprehension" ||
    value === "valorisation"
  );
}

function safeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function normalizeSubSignalsInput(value: unknown): SubSignals {
  if (!value || typeof value !== "object") return {};

  const input = value as Record<string, unknown>;

  return {
    clarte: safeNumber(input.clarte),
    methode: safeNumber(input.methode),
    pilotage: safeNumber(input.pilotage),

    discernement: safeNumber(input.discernement),
    ecoute: safeNumber(input.ecoute),
    lecture: safeNumber(input.lecture),

    perception: safeNumber(input.perception),
    impact: safeNumber(input.impact),
    lisibilite: safeNumber(input.lisibilite),
  };
}

function getAxisContext(dominant: AxisKey) {
  const contexts: Record<
    AxisKey,
    {
      universe: string;
      intention: string;
      field: string;
      value: string;
      tension: string;
      avoid: string;
      vocabulary: string;
      signals: SubSignalKey[];
    }
  > = {
    structuration: {
      universe: "SYSTIA",
      intention:
        "Observer une capacité à clarifier, cadrer et rendre une organisation plus lisible.",
      field:
        "Activités dispersées, systèmes flous, priorités instables, projets difficiles à rendre exécutables.",
      value:
        "Créer de la continuité, poser une méthode, transformer une intention en fonctionnement.",
      tension:
        "Le pilotage collectif peut rester en retrait si la structure prend trop de place.",
      avoid:
        "Ne jamais réduire cette logique à de l’administration ou à une simple rigueur.",
      vocabulary:
        "structure, méthode, cadrage, continuité, pilotage, organisation, fiabilité, système, exécution, clarification",
      signals: ["clarte", "methode", "pilotage"],
    },

    comprehension: {
      universe: "Cabinet Astraé",
      intention:
        "Observer une capacité à relire une situation, distinguer les signaux utiles et éviter les réponses trop rapides.",
      field:
        "Situations bloquées, trajectoires incertaines, dynamiques humaines complexes, décisions sensibles.",
      value:
        "Apporter du recul, de la nuance et une clarification avant l’action.",
      tension:
        "La lecture peut perdre en portée si elle reste trop intérieure ou trop prudente.",
      avoid:
        "Ne jamais basculer dans le psychologique, le spirituel ou le développement personnel.",
      vocabulary:
        "discernement, compréhension, recul, clarification, signaux faibles, situation, trajectoire, nuance, décision, lecture",
      signals: ["discernement", "ecoute", "lecture"],
    },

    valorisation: {
      universe: "QLYK Studio",
      intention:
        "Observer une capacité à rendre une valeur plus visible, plus lisible et mieux perçue.",
      field:
        "Offres mal comprises, contenus peu visibles, présentations faibles, valeur réelle insuffisamment transmise.",
      value:
        "Renforcer la présence, clarifier l’image et améliorer l’impact perçu.",
      tension:
        "L’impact peut prendre le dessus si la structure de fond reste fragile.",
      avoid:
        "Ne jamais présenter cette logique comme de l’effet visuel ou de l’esthétique superficielle.",
      vocabulary:
        "perception, lisibilité, impact, valorisation, présence, clarté visuelle, image, transmission, attention, mise en valeur",
      signals: ["perception", "impact", "lisibilite"],
    },
  };

  return contexts[dominant];
}

function describeSignals(
  subSignals: SubSignals,
  keys: SubSignalKey[]
): string {
  const values = keys.map((key) => ({
    key,
    value: safeNumber(subSignals[key]),
  }));

  const sorted = [...values].sort((a, b) => b.value - a.value);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  return `
Signaux secondaires :
${values.map((item) => `- ${item.key} : ${item.value}`).join("\n")}

Nuance attendue :
- Signal le plus présent : ${strongest.key}
- Signal le plus discret : ${weakest.key}
- Ne jamais citer les chiffres.
- Ne pas énumérer les signaux.
- Faire sentir la nuance dans l'observation.
- Le signal faible doit apparaître comme une vigilance, jamais comme un défaut.
`;
}

function cleanSentence(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/la personne/gi, "vous")
    .replace(/ce profil/gi, "votre résultat")
    .replace(/le profil/gi, "votre résultat")
    .replace(/l’utilisateur/gi, "vous")
    .replace(/l'utilisateur/gi, "vous")
    .replace(/le candidat/gi, "vous")
    .trim();
}

function limitWords(value: string, maxWords: number): string {
  const words = cleanSentence(value).split(" ").filter(Boolean);

  if (words.length <= maxWords) return words.join(" ");

  return `${words.slice(0, maxWords).join(" ").replace(/[.,;:!?]+$/, "")}.`;
}

function normalizeList(
  value: unknown,
  fallbackValue: string[],
  maxItems: number,
  maxWords: number
): string[] {
  if (!Array.isArray(value)) return fallbackValue;

  const cleaned = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => limitWords(item, maxWords))
    .filter((item) => item.length > 0)
    .slice(0, maxItems);

  return cleaned.length > 0 ? cleaned : fallbackValue;
}

function normalizeResult(data: unknown): AnalysisResult {
  if (!data || typeof data !== "object") return fallback;

  const result = data as Partial<AnalysisResult>;

  return {
    lecture:
      typeof result.lecture === "string" && result.lecture.trim().length > 0
        ? limitWords(result.lecture, 48)
        : fallback.lecture,

    projection:
      typeof result.projection === "string" &&
      result.projection.trim().length > 0
        ? limitWords(result.projection, 38)
        : fallback.projection,

    attention: normalizeList(result.attention, fallback.attention, 2, 12),

    suite: normalizeList(result.suite, fallback.suite, 2, 10),
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      dominant,
      structuration,
      comprehension,
      valorisation,
      subSignals,
    } = body;

    if (!isAxisKey(dominant)) {
      return NextResponse.json(fallback);
    }

    const axisContext = getAxisContext(dominant);
    const cleanSubSignals = normalizeSubSignalsInput(subSignals);

    const signalReading = describeSignals(
      cleanSubSignals,
      axisContext.signals
    );

    const prompt = `
Tu rédiges une note de lecture professionnelle.

Ce dispositif n'est pas un quiz.
Ce n'est pas un test RH.
Ce n'est pas un bilan psychologique.
Ce n'est pas du coaching.
Ce n'est pas un tunnel marketing.

Il s'agit d'un point d'entrée professionnel destiné à repérer une logique d'intervention compatible avec un environnement réel.

ADRESSE :
Tu t'adresses directement à la personne.

Utiliser uniquement :
- vous
- votre
- vos

Ne jamais écrire :
- la personne
- ce profil
- le profil
- l'utilisateur
- le candidat
- ce type de personnalité

AXE DOMINANT :
${dominant}

ENVIRONNEMENT ASSOCIÉ :
${axisContext.universe}

INTENTION DE LECTURE :
${axisContext.intention}

TERRAIN D'UTILITÉ :
${axisContext.field}

VALEUR POSSIBLE :
${axisContext.value}

TENSION À FAIRE SENTIR :
${axisContext.tension}

POINT À ÉVITER :
${axisContext.avoid}

VOCABULAIRE DISPONIBLE :
${axisContext.vocabulary}

SCORES PRINCIPAUX :
- Structuration : ${safeNumber(structuration)}
- Compréhension : ${safeNumber(comprehension)}
- Valorisation : ${safeNumber(valorisation)}

${signalReading}

STYLE :
- sobre
- calme
- dense
- observateur
- niveau cabinet
- légèrement institutionnel
- jamais enthousiaste
- jamais flatteur
- jamais explicatif
- jamais inspirationnel
- jamais startup
- jamais RH
- jamais psychologique

RYTHME :
Écrire comme une note courte.
Pas comme une analyse générée.
Pas de longues explications.
Pas de phrases mécaniques.
Pas de promesse.
Pas de conclusion commerciale.

ÉVITER :
- votre résultat montre
- votre positionnement indique
- cette logique devient utile
- vous êtes naturellement
- il serait pertinent
- une vérification opérationnelle
- votre profil
- vos forces
- vos faiblesses

PRIVILÉGIER :
- La lecture fait apparaître...
- L'ensemble suggère...
- Un point se dégage...
- La dynamique observée...
- Cette orientation peut prendre place...
- Le risque serait...
- Dans un cadre réel...

STRUCTURE ATTENDUE :

lecture :
2 phrases maximum.
48 mots maximum au total.
Observer une manière d'intervenir.
Nommer un effet concret.
Faire sentir une limite possible.

projection :
2 phrases maximum.
38 mots maximum au total.
Situer l'utilité possible dans ${axisContext.universe}.
Évoquer une situation réelle.
Ne pas expliquer.

attention :
2 phrases maximum.
12 mots maximum par phrase.
Chaque phrase commence par "Vous".
Aucun ton négatif.

suite :
2 actions maximum.
10 mots maximum par phrase.
Chaque phrase commence par un verbe d'action.
Action concrète, professionnelle, sobre.

FORMAT STRICT :
Réponds uniquement en JSON valide.
Aucun texte avant.
Aucun texte après.

{
  "lecture": "...",
  "projection": "...",
  "attention": ["...", "..."],
  "suite": ["...", "..."]
}
`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },

        body: JSON.stringify({
          model: "gpt-4.1",
          temperature: 0.18,
          max_tokens: 280,

          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",
              content:
                "Vous rédigez des notes de lecture professionnelles pour un dispositif institutionnel de discernement. Votre style est bref, sobre, précis et humain. Vous ne faites ni marketing, ni coaching, ni psychologie, ni RH. Vous écrivez comme un consultant senior qui observe une logique d'intervention dans un cadre réel. Vous répondez uniquement en JSON valide.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error(await response.text());
      return NextResponse.json(fallback);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(fallback);
    }

    try {
      const parsed = JSON.parse(content);
      return NextResponse.json(normalizeResult(parsed));
    } catch (error) {
      console.error(error);
      return NextResponse.json(fallback);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(fallback);
  }
}
