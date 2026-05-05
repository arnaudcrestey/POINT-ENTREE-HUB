import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { dominant, entity, structuration, comprehension, valorisation } = body;

    if (!dominant) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const prompt = `
Tu es un consultant en structuration professionnelle.

Analyse un profil basé sur ces scores :
- Structuration: ${structuration}
- Compréhension: ${comprehension}
- Valorisation: ${valorisation}
- Axe dominant: ${dominant}
- Entité associée: ${entity}

Ta réponse DOIT être un JSON strict, sans texte autour :

{
  "lecture": "...",
  "projection": "...",
  "attention": ["...", "..."],
  "suite": ["...", "..."]
}

Contraintes :
- Ton professionnel, sobre
- Pas de psychologie floue
- Utile et exploitable
`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
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
    });

    const data = await openaiRes.json();

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content from OpenAI");
    }

    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch {
      // fallback si JSON cassé
      return NextResponse.json({
        lecture: content,
        projection: "Projection non structurée disponible.",
        attention: ["Vérifier la cohérence du résultat."],
        suite: ["Compléter votre situation pour affiner."],
      });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("AI ERROR:", error);

    return NextResponse.json({
      lecture: "Analyse indisponible pour le moment.",
      projection: "Votre positionnement reste exploitable.",
      attention: ["Une erreur technique est survenue."],
      suite: ["Vous pouvez transmettre votre situation pour affiner."],
    });
  }
}
