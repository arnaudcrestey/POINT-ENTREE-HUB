import { NextResponse } from "next/server";

function extractJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      dominant,
      structuration,
      comprehension,
      valorisation,
    } = body;

    // 🔍 DEBUG CLÉ
    console.log("👉 OPENAI KEY:", process.env.OPENAI_API_KEY);

    const prompt = `
Analyse ce profil professionnel.

Scores :
- Structuration : ${structuration}
- Compréhension : ${comprehension}
- Valorisation : ${valorisation}

Axe dominant : ${dominant}

Réponds uniquement en JSON :

{
  "lecture": "analyse claire",
  "projection": "rôle concret",
  "attention": ["point 1", "point 2"],
  "suite": ["action 1", "action 2"]
}
`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Tu es un expert en positionnement professionnel. Réponds uniquement en JSON valide.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      }),
    });

    // 🔴 SI ERREUR HTTP
    if (!openaiRes.ok) {
      const errorText = await openaiRes.text();
      console.error("❌ OPENAI HTTP ERROR:", errorText);

      throw new Error("OpenAI request failed");
    }

    const data = await openaiRes.json();

    // 🔍 DEBUG RÉPONSE
    console.log("👉 OPENAI RAW RESPONSE:", JSON.stringify(data, null, 2));

    const content = data.choices?.[0]?.message?.content;

    console.log("👉 CONTENT:", content);

    if (!content) {
      throw new Error("No content from OpenAI");
    }

    const parsed = extractJSON(content);

    if (!parsed) {
      console.error("❌ JSON PARSE FAILED:", content);

      return NextResponse.json({
        lecture: "Analyse indisponible pour le moment.",
        projection: "Le positionnement reste exploitable.",
        attention: ["Réponse IA non exploitable"],
        suite: ["Réessayer dans quelques instants"],
      });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("❌ GLOBAL ERROR:", error);

    return NextResponse.json({
      lecture: "Analyse indisponible pour le moment.",
      projection: "Le positionnement reste exploitable.",
      attention: ["Erreur technique"],
      suite: ["Réessayer plus tard"],
    });
  }
}
