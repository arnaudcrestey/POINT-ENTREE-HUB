import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      dominant,
      entity,
      structuration,
      comprehension,
      valorisation,
    } = body;

    if (!dominant) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      );
    }

    const prompt = `
Tu es un consultant en structuration professionnelle.

Tu analyses un profil pour l’orienter dans un rôle réel au sein d’un écosystème professionnel.

Données :

- Structuration : ${structuration}
- Compréhension : ${comprehension}
- Valorisation : ${valorisation}
- Axe dominant : ${dominant}
- Entité associée : ${entity}

Tu dois produire une analyse claire, professionnelle, exploitable.

Réponds STRICTEMENT en JSON, sans texte autour :

{
  "lecture": "Analyse claire du fonctionnement et des capacités réelles",
  "projection": "Projection concrète dans un rôle réel",
  "attention": ["Point de vigilance 1", "Point de vigilance 2"],
  "suite": ["Action concrète 1", "Action concrète 2"]
}

Contraintes :

- Ton sobre, niveau cabinet
- Pas de psychologie floue
- Pas de phrases vagues
- Utile immédiatement
`;

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    const data = await openaiRes.json();

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content from OpenAI");
    }

    // 🔥 Extraction sécurisée du JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    let parsed;

    try {
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    } catch {
      // fallback intelligent (jamais vide)
      return NextResponse.json({
        lecture: content,
        projection:
          "Votre positionnement reste exploitable malgré une réponse non structurée.",
        attention: [
          "Vérifier la cohérence entre ce résultat et votre situation réelle.",
        ],
        suite: [
          "Transmettre votre situation pour obtenir une lecture plus précise.",
        ],
      });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("AI ERROR:", error);

    return NextResponse.json({
      lecture:
        "L’analyse n’a pas pu être générée correctement pour le moment.",
      projection:
        "Votre résultat reste néanmoins exploitable dans une logique de positionnement.",
      attention: [
        "Une erreur technique a empêché la génération complète de l’analyse.",
      ],
      suite: [
        "Vous pouvez transmettre votre situation pour recevoir une lecture adaptée.",
      ],
    });
  }
}
