import { NextResponse } from "next/server";

type AnalysisResult = {
  lecture: string;
  projection: string;
  attention: string[];
  suite: string[];
};

const fallback: AnalysisResult = {
  lecture:
    "Analyse indisponible pour le moment. Le résultat reste néanmoins exploitable.",
  projection:
    "Votre positionnement suggère une orientation possible dans l’écosystème.",
  attention: ["Réponse IA non exploitable"],
  suite: ["Réessayer dans quelques instants"],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { dominant, structuration, comprehension, valorisation } = body;

    const prompt = `
Tu analyses un résultat de positionnement professionnel.

Ce dispositif n'est pas un quiz.
C'est un point d'entrée destiné à orienter un profil vers un rôle réel.

Écosystème :
- Structuration : SYSTIA
- Compréhension : Cabinet Astraé
- Valorisation : QLYK

Scores :
- Structuration : ${structuration}
- Compréhension : ${comprehension}
- Valorisation : ${valorisation}

Axe dominant : ${dominant}

Règles :
- ton sobre, professionnel
- pas de marketing
- pas de flatterie
- pas de phrases génériques
- parler de potentiel et de rôle concret

Structure :

lecture :
Décrire ce que la personne fait naturellement + une limite

projection :
Expliquer où elle peut être utile dans l’écosystème

attention :
2 points concrets

suite :
2 actions concrètes

Réponds uniquement en JSON valide :

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
          temperature: 0.35,
          max_tokens: 350,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "Tu es un consultant senior. Tu réponds uniquement en JSON valide.",
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

    let parsed: AnalysisResult;

    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(fallback);
    }

    return NextResponse.json(parsed);
  } catch (e) {
    console.error(e);
    return NextResponse.json(fallback);
  }
}
