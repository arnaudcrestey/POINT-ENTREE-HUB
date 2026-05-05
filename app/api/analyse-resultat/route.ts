import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      dominant,
      structuration,
      comprehension,
      valorisation,
    } = body;

    const prompt = `
Analyse ce profil professionnel.

Structuration : ${structuration}
Compréhension : ${comprehension}
Valorisation : ${valorisation}

Axe dominant : ${dominant}

IMPORTANT :
Réponds uniquement en JSON valide, sans texte autour.

Format attendu :
{
  "lecture": "...",
  "projection": "...",
  "attention": ["...", "..."],
  "suite": ["...", "..."]
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 🔥 fiable
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "Tu es un consultant stratégique. Tu réponds uniquement en JSON valide.",
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
      throw new Error("OpenAI failed");
    }

    const data = await response.json();

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content returned");
    }

    // 🔥 nettoyage si jamais le modèle triche
    const clean = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error("PARSE ERROR:", clean);

      return NextResponse.json({
        lecture: "Analyse indisponible pour le moment.",
        projection: "Le positionnement reste exploitable.",
        attention: ["Réponse IA non exploitable"],
        suite: ["Réessayer dans quelques instants"],
      });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("GLOBAL ERROR:", error);

    return NextResponse.json({
      lecture: "Analyse indisponible pour le moment.",
      projection: "Le positionnement reste exploitable.",
      attention: ["Erreur technique"],
      suite: ["Réessayer plus tard"],
    });
  }
}
