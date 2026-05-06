import { NextResponse } from "next/server";

type AxisKey =
  | "structuration"
  | "comprehension"
  | "valorisation";

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
    "Votre résultat reste exploitable, mais l’analyse personnalisée n’a pas pu être générée pour le moment.",
  projection:
    "Votre positionnement indique une orientation possible dans l’écosystème, à préciser par une lecture plus fine.",
  attention: [
    "Vous devez vérifier la cohérence entre ce résultat et votre situation réelle.",
    "Vous pouvez avoir besoin d’un regard complémentaire avant toute projection.",
  ],
  suite: [
    "Présenter votre situation actuelle avec des exemples concrets.",
    "Préciser le type d’environnement dans lequel vous intervenez aujourd’hui.",
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
      readingLogic: string;
      usefulWhen: string;
      avoid: string;
      vocabulary: string;
      concreteSituations: string;
      signals: SubSignalKey[];
    }
  > = {
    structuration: {
      universe: "SYSTIA",
      readingLogic:
        "Lire une capacité à clarifier, organiser, transformer le flou en méthode, structurer des systèmes et maintenir une continuité opérationnelle.",
      usefulWhen:
        "Cette logique devient utile lorsqu’une activité devient dispersée, lorsqu’un projet perd en lisibilité ou lorsqu’un fonctionnement doit être stabilisé.",
      avoid:
        "Ne jamais présenter cette orientation comme une simple rigueur administrative. Il s’agit d’une capacité de structuration, de pilotage et de mise en système.",
      vocabulary:
        "structure, méthode, cadrage, continuité, pilotage, organisation, fiabilité, système, exécution, clarification",
      concreteSituations:
        "Reprendre une activité désorganisée, remettre de l’ordre dans des process flous, structurer un environnement numérique, clarifier des priorités, rendre un projet exécutable.",
      signals: ["clarte", "methode", "pilotage"],
    },

    comprehension: {
      universe: "Cabinet Astraé",
      readingLogic:
        "Lire une capacité à comprendre une situation complexe, discerner les éléments importants, repérer les signaux faibles et clarifier une trajectoire sans réduire la situation à une réponse simpliste.",
      usefulWhen:
        "Cette logique devient utile lorsqu’une situation nécessite du recul, de la nuance ou une lecture plus fine avant une décision.",
      avoid:
        "Ne jamais basculer dans le spirituel, le psychologique ou le développement personnel. La lecture doit rester professionnelle, sobre et orientée discernement.",
      vocabulary:
        "discernement, compréhension, recul, clarification, signaux faibles, situation, trajectoire, nuance, décision, lecture",
      concreteSituations:
        "Clarifier une situation bloquée, analyser une dynamique humaine complexe, relire une trajectoire professionnelle, identifier des incohérences ou préparer une décision importante.",
      signals: ["discernement", "ecoute", "lecture"],
    },

    valorisation: {
      universe: "QLYK Studio",
      readingLogic:
        "Lire une capacité à améliorer la perception d’une offre, d’un contenu ou d’un produit, à rendre une chose plus lisible, plus claire, plus visible et plus impactante.",
      usefulWhen:
        "Cette logique devient utile lorsqu’une activité possède déjà une valeur réelle mais peine à être perçue correctement.",
      avoid:
        "Ne jamais présenter cette orientation comme une recherche d’effet ou d’esthétique superficielle. Il s’agit de rendre une valeur plus perceptible et mieux transmise.",
      vocabulary:
        "perception, lisibilité, impact, valorisation, présence, clarté visuelle, image, transmission, attention, mise en valeur",
      concreteSituations:
        "Repositionner une offre, améliorer une présentation, renforcer la perception d’un service, rendre une activité plus lisible ou augmenter l’impact d’un contenu.",
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
Signaux secondaires de l’axe :
${values.map((item) => `- ${item.key} : ${item.value}`).join("\n")}

Lecture attendue des signaux :
- Le signal le plus marqué semble être : ${strongest.key}
- Le signal le plus discret semble être : ${weakest.key}
- Tu dois t’en servir pour nuancer l’analyse.
- Ne cite pas les chiffres.
- Ne nomme pas forcément tous les signaux.
- Fais sentir la nuance dans le texte.
`;
}

function normalizeResult(data: unknown): AnalysisResult {
  if (!data || typeof data !== "object") return fallback;

  const result = data as Partial<AnalysisResult>;

  return {
    lecture:
      typeof result.lecture === "string" && result.lecture.trim().length > 0
        ? result.lecture
        : fallback.lecture,

    projection:
      typeof result.projection === "string" &&
      result.projection.trim().length > 0
        ? result.projection
        : fallback.projection,

    attention:
      Array.isArray(result.attention) && result.attention.length > 0
        ? result.attention
            .filter((item): item is string => typeof item === "string")
            .slice(0, 2)
        : fallback.attention,

    suite:
      Array.isArray(result.suite) && result.suite.length > 0
        ? result.suite
            .filter((item): item is string => typeof item === "string")
            .slice(0, 2)
        : fallback.suite,
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
Tu analyses un résultat de compatibilité professionnelle.

IMPORTANT :
Tu t’adresses directement à la personne.
Tu dois utiliser uniquement :
- vous
- votre
- vos

INTERDICTIONS ABSOLUES :
Ne jamais écrire :
- la personne
- ce profil
- le profil
- l’utilisateur
- le candidat
- ce type de personnalité

Ce dispositif n’est PAS :
- un quiz psychologique
- un test RH
- un bilan de personnalité
- un tunnel marketing
- un contenu de coaching

Il s’agit d’un dispositif de discernement professionnel destiné à identifier une logique d’intervention compatible avec un environnement réel.

AXE DOMINANT :
${dominant}

ENVIRONNEMENT ASSOCIÉ :
${axisContext.universe}

GRILLE DE LECTURE :
${axisContext.readingLogic}

SITUATIONS CONCRÈTES ASSOCIÉES :
${axisContext.concreteSituations}

POINT À ÉVITER :
${axisContext.avoid}

VOCABULAIRE À PRIVILÉGIER :
${axisContext.vocabulary}

SCORES PRINCIPAUX :
- Structuration : ${safeNumber(structuration)}
- Compréhension : ${safeNumber(comprehension)}
- Valorisation : ${safeNumber(valorisation)}

${signalReading}

OBJECTIF :
Tu ne décris pas une personnalité.

Tu analyses :
- une manière naturelle d’intervenir,
- une logique de travail,
- une capacité potentiellement utile,
- une compatibilité possible avec un environnement structuré.

Le texte doit sembler observé, jamais généré automatiquement.

STYLE ATTENDU :
- calme
- sobre
- dense
- précis
- niveau cabinet
- légèrement institutionnel
- naturel
- jamais spectaculaire
- jamais inspirationnel
- jamais startup
- jamais psychologique
- jamais RH

Éviter les formulations mécaniques :
- cette logique devient utile
- votre positionnement indique
- votre résultat montre
- une vérification opérationnelle serait nécessaire

Privilégier :
- des situations réelles
- des tensions opérationnelles
- des observations crédibles
- une nuance humaine
- des phrases courtes ou moyennes
- une impression de lecture professionnelle

Tu dois faire sentir les signaux secondaires dans l’analyse.
Exemple :
- si un signal est fort, il doit colorer la lecture.
- si un signal est plus faible, il doit apparaître comme un point de vigilance.
- ne jamais transformer cela en défaut personnel.
- ne jamais citer les scores ou les pourcentages.

STRUCTURE :

lecture :
2 phrases maximum.
Chaque phrase doit être courte, dense et directement utile.

Décrire :
- ce que vous semblez faire naturellement,
- ce que cela produit concrètement,
- puis une limite ou une tension possible.

projection :
2 phrases maximum.
Aucune phrase longue.
Ne pas expliquer. Observer.

Décrire :
- où cette logique pourrait être utile dans ${axisContext.universe},
- dans quel type de situation réelle,
- avec quelle valeur concrète,
- sans promesse.

attention :
2 phrases courtes maximum.
12 mots maximum par phrase.
Chaque phrase commence par "Vous".

suite :
2 actions professionnelles maximum.
10 mots maximum par phrase.
Chaque phrase commence par un verbe d’action.

LONGUEUR MAXIMALE :
- lecture : 55 mots maximum
- projection : 45 mots maximum
- attention : très court
- suite : très court

Le texte doit ressembler à :
- une note de lecture professionnelle,
- une observation concise,
- un retour de cabinet,
- jamais à un rapport explicatif.

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

      temperature: 0.24,

      max_tokens: 360,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",

          content:
            "Vous êtes un consultant senior spécialisé dans les logiques d’intervention professionnelles, la structuration d’écosystèmes et le discernement opérationnel. Vous rédigez des analyses sobres, humaines, crédibles et directement exploitables dans une interface premium. Vous évitez tout ton marketing, RH, psychologique ou inspirationnel. Vous écrivez comme une note de lecture professionnelle rédigée par un consultant expérimenté. Vous privilégiez les formulations courtes, denses et observatrices plutôt que les explications longues. Vous répondez uniquement en JSON valide.",
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
