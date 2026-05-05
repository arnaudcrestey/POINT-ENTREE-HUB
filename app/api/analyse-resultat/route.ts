import { NextResponse } from "next/server";

type AnalysisResult = {
  lecture: string;
  projection: string;
  attention: string[];
  suite: string[];
};

const fallbackResult: AnalysisResult = {
  lecture:
    "Analyse indisponible pour le moment. Le résultat reste exploitable et peut être transmis pour une lecture personnalisée.",
  projection:
    "Votre positionnement indique une orientation professionnelle identifiable, à préciser dans un échange plus qualitatif.",
  attention: [
    "Ne pas tirer de conclusion définitive à partir d’un seul résultat.",
    "Vérifier la cohérence entre le score, le parcours réel et les motivations profondes.",
  ],
  suite: [
    "Transmettre votre situation via le formulaire.",
    "Recevoir une lecture plus fine de votre positionnement possible dans l’écosystème.",
  ],
};

function cleanJsonContent(content: string) {
  return content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

function normalizeResult(data: Partial<AnalysisResult>): AnalysisResult {
  return {
    lecture:
      typeof data.lecture === "string" && data.lecture.trim()
        ? data.lecture.trim()
        : fallbackResult.lecture,

    projection:
      typeof data.projection === "string" && data.projection.trim()
        ? data.projection.trim()
        : fallbackResult.projection,

    attention:
      Array.isArray(data.attention) && data.attention.length > 0
        ? data.attention
            .filter((item) => typeof item === "string" && item.trim())
            .slice(0, 3)
        : fallbackResult.attention,

    suite:
      Array.isArray(data.suite) && data.suite.length > 0
        ? data.suite
            .filter((item) => typeof item === "string" && item.trim())
            .slice(0, 3)
        : fallbackResult.suite,
  };
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY missing");
      return NextResponse.json(fallbackResult);
    }

    const body = await req.json();

    const dominant = body.dominant;
    const structuration = Number(body.structuration ?? 0);
    const comprehension = Number(body.comprehension ?? 0);
    const valorisation = Number(body.valorisation ?? 0);

    const prompt = `
Tu analyses un résultat de positionnement professionnel.

Ce dispositif n'est pas un quiz grand public.
C'est un point d'entrée premium destiné à orienter un profil LinkedIn vers une place possible dans un écosystème professionnel.

Écosystème :
- Structuration : SYSTIA — clarifier, organiser, construire des systèmes numériques et opérationnels.
- Compréhension : Cabinet Astraé — analyser une situation, lire les signaux faibles, accompagner une clarification.
- Valorisation : QLYK — améliorer la perception, mettre en valeur un produit, une offre ou un contenu.

Scores :
- Structuration : ${structuration}
- Compréhension : ${comprehension}
- Valorisation : ${valorisation}

Axe dominant : ${dominant}

Règles de rédaction :
- ton sobre, humain, précis
- niveau cabinet
- aucune phrase marketing
- aucune flatterie excessive
- parler de potentiel, pas de vérité absolue
- analyse courte mais utile
- projection concrète vers un rôle réel
- phrases élégantes, professionnelles, directement affichables sur une page premium

Réponds uniquement en JSON valide.
Aucun markdown.
Aucun texte avant ou après.

Format strict :
{
  "lecture": "Une lecture fine du profil en 2 à 4 phrases.",
  "projection": "Une projection concrète dans l’écosystème en 2 à 4 phrases.",
  "attention": ["Point d’attention 1", "Point d’attention 2"],
  "suite": ["Suite logique 1", "Suite logique 2"]
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.35,
        max_tokens: 450,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Tu es un consultant senior en positionnement professionnel. Tu produis uniquement du JSON valide, sobre, précis et exploitable.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OPENAI ERROR:", err);
      return NextResponse.json(fallbackResult);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("No OpenAI content returned:", data);
      return NextResponse.json(fallbackResult);
    }

    try {
      const parsed = JSON.parse(cleanJsonContent(content));
      const result = normalizeResult(parsed);

      return NextResponse.json(result);
    } catch (error) {
      console.error("JSON PARSE ERROR:", content);
      return NextResponse.json(fallbackResult);
    }
  } catch (error) {
    console.error("GLOBAL ERROR:", error);
    return NextResponse.json(fallbackResult);
  }
}
