import { NextResponse } from "next/server";

type AxisKey = "structuration" | "comprehension" | "valorisation";

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

function getAxisContext(dominant: AxisKey) {
  const contexts: Record<
    AxisKey,
    {
      universe: string;
      readingLogic: string;
      usefulWhen: string;
      avoid: string;
      vocabulary: string;
    }
  > = {
    structuration: {
      universe: "SYSTIA",
      readingLogic:
        "Lire une capacité à clarifier, organiser, transformer le flou en méthode, structurer des systèmes et maintenir une continuité opérationnelle.",
      usefulWhen:
        "Cette logique devient utile lorsqu’une activité manque de cadre, lorsqu’un projet doit être rendu plus lisible, ou lorsqu’un fonctionnement doit passer d’une intention à une méthode exploitable.",
      avoid:
        "Ne jamais présenter cette orientation comme une simple rigueur administrative. Il s’agit d’une capacité de structuration, de pilotage et de mise en système.",
      vocabulary:
        "structure, méthode, cadrage, continuité, pilotage, organisation, fiabilité, système, exécution, clarification",
    },

    comprehension: {
      universe: "Cabinet Astraé",
      readingLogic:
        "Lire une capacité à comprendre une situation complexe, discerner les éléments importants, repérer les signaux faibles et clarifier une trajectoire sans réduire la situation à une réponse simpliste.",
      usefulWhen:
        "Cette logique devient utile lorsqu’une personne, une activité ou une décision nécessite une lecture plus fine, une prise de recul ou une clarification avant d’agir.",
      avoid:
        "Ne jamais basculer dans le spirituel, le psychologique ou le développement personnel. La lecture doit rester professionnelle, sobre et orientée discernement.",
      vocabulary:
        "discernement, compréhension, recul, clarification, signaux faibles, situation, trajectoire, nuance, décision, lecture",
    },

    valorisation: {
      universe: "QLYK",
      readingLogic:
        "Lire une capacité à améliorer la perception d’une offre, d’un contenu ou d’un produit, à rendre une chose plus lisible, plus claire, plus visible et plus impactante.",
      usefulWhen:
        "Cette logique devient utile lorsqu’un projet possède déjà une valeur mais manque de lisibilité, de présence, de perception ou de force dans sa présentation.",
      avoid:
        "Ne jamais présenter cette orientation comme une recherche d’effet ou d’esthétique superficielle. Il s’agit de rendre une valeur plus perceptible et mieux transmise.",
      vocabulary:
        "perception, lisibilité, impact, valorisation, présence, clarté visuelle, image, transmission, attention, mise en valeur",
    },
  };

  return contexts[dominant];
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

    const { dominant, structuration, comprehension, valorisation } = body;

    if (!isAxisKey(dominant)) {
      return NextResponse.json(fallback);
    }

    const axisContext = getAxisContext(dominant);

    const prompt = `
Tu analyses un résultat de compatibilité professionnelle.

IMPORTANT :
Tu t’adresses directement à la personne.
Tu dois utiliser uniquement :
- "vous"
- "votre"
- "vos"

INTERDICTIONS ABSOLUES :
Ne jamais écrire :
- "la personne"
- "ce profil"
- "le profil"
- "l’utilisateur"
- "le candidat"
- "ce type de personnalité"

Ce dispositif n’est PAS :
- un quiz psychologique,
- un test de personnalité,
- un bilan de compétences,
- un tunnel marketing,
- un contenu de coaching.

Il s’agit d’un dispositif de discernement professionnel progressif conçu pour :
- détecter une logique d’intervention dominante,
- identifier un environnement professionnel compatible,
- évaluer une capacité potentiellement utile dans un cadre structuré,
- préparer une éventuelle vérification opérationnelle.

ÉCOSYSTÈME GLOBAL :

SYSTIA :
Structuration, organisation, clarification, systèmes numériques, cadrage opérationnel, méthode, continuité, pilotage.

Cabinet Astraé :
Compréhension de situation, discernement, analyse humaine, lecture des signaux faibles, clarification de trajectoire, aide à la décision.

QLYK :
Valorisation, perception, impact visuel, lisibilité d’une offre, amélioration de la présentation et de l’image perçue.

AXE DOMINANT :
${dominant}

ENVIRONNEMENT ASSOCIÉ :
${axisContext.universe}

GRILLE DE LECTURE SPÉCIFIQUE À CET AXE :
${axisContext.readingLogic}

SITUATIONS DANS LESQUELLES CETTE LOGIQUE DEVIENT UTILE :
${axisContext.usefulWhen}

POINT À ÉVITER ABSOLUMENT :
${axisContext.avoid}

VOCABULAIRE À PRIVILÉGIER :
${axisContext.vocabulary}

SCORES :
- Structuration : ${structuration}
- Compréhension : ${comprehension}
- Valorisation : ${valorisation}

OBJECTIF DE L’ANALYSE :
Tu ne dois pas décrire une personnalité.
Tu dois analyser :
- une manière naturelle d’intervenir,
- une logique de travail dominante,
- une capacité potentiellement exploitable dans un environnement structuré,
- une compatibilité possible avec l’univers associé.

Tu dois donner la sensation :
- d’une lecture sérieuse,
- d’un niveau cabinet,
- d’un système de discernement professionnel,
- d’une analyse sobre et exploitable.

Tu ne dois jamais donner la sensation :
- d’un contenu marketing,
- d’un test RH,
- d’une analyse psychologique,
- d’un discours inspirationnel,
- d’une promesse de collaboration.

RÈGLES DE RÉDACTION :
- ton sobre, calme, précis
- niveau cabinet / direction
- aucune flatterie
- aucune promesse
- aucune phrase générique
- pas de jargon psychologique
- pas de langage startup
- éviter les tournures inspirantes
- écrire des phrases naturelles et directement affichables dans une interface premium
- privilégier les formulations concrètes et professionnelles
- parler de potentiel, de logique d’intervention et de compatibilité possible
- ne jamais présenter le résultat comme une certitude absolue

IMPORTANT :
L’analyse doit orienter naturellement vers ${axisContext.universe}, sans vendre cet environnement.

Tu dois faire ressentir :
- qu’un environnement professionnel existe déjà,
- que certaines logiques y deviennent utiles,
- qu’une collaboration structurée pourrait éventuellement avoir du sens,
- mais qu’une vérification opérationnelle reste nécessaire.

STRUCTURE ATTENDUE :

lecture :
2 à 4 phrases.
Décrire :
- ce que vous semblez faire naturellement,
- ce que cela produit concrètement,
- dans quel type de situation cette logique devient utile,
- puis une limite ou un point de vigilance possible.

projection :
2 à 4 phrases.
Expliquer :
- où cette logique pourrait devenir utile dans ${axisContext.universe},
- dans quel type d’intervention,
- avec quelle valeur concrète,
- sans promettre de collaboration.

attention :
2 points courts et concrets.
Chaque phrase doit commencer par "Vous".

suite :
2 actions réalistes et professionnelles.
Chaque phrase doit commencer par un verbe d’action.

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
          model: "gpt-4o-mini",
          temperature: 0.18,
          max_tokens: 560,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "Vous êtes un consultant senior en compatibilité professionnelle et structuration d’écosystèmes. Vous rédigez des analyses sobres, précises et crédibles destinées à un dispositif premium de discernement professionnel. Vous vous adressez toujours directement à la personne avec vous/votre/vos. Vous ne produisez jamais de contenu marketing, psychologique, RH ou inspirationnel. Vous répondez uniquement en JSON valide.",
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
      const normalized = normalizeResult(parsed);

      return NextResponse.json(normalized);
    } catch (error) {
      console.error(error);
      return NextResponse.json(fallback);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(fallback);
  }
}
