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

Réponds STRICTEMENT en JSON :

{
  "lecture": "...",
  "projection": "...",
  "attention": ["...", "..."],
  "suite": ["...", "..."]
}
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("❌ OPENAI ERROR:", err);
      throw new Error("OpenAI failed");
    }

    const data = await response.json();

    console.log("RAW:", data);

    // 🔥 FIX ICI
    const text =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      data.choices?.[0]?.message?.content;

    console.log("TEXT:", text);

    if (!text) {
      throw new Error("No text returned");
    }

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("PARSE ERROR:", text);

      return NextResponse.json({
        lecture: "Analyse indisponible pour le moment.",
        projection: "Le positionnement reste exploitable.",
        attention: ["Réponse IA non structurée"],
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
