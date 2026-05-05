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

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",

        // 🔥 ON FORCE LE FORMAT JSON
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "analysis",
            schema: {
              type: "object",
              properties: {
                lecture: { type: "string" },
                projection: { type: "string" },
                attention: {
                  type: "array",
                  items: { type: "string" },
                },
                suite: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["lecture", "projection", "attention", "suite"],
              additionalProperties: false,
            },
          },
        },

        input: `
Analyse ce profil professionnel.

Structuration : ${structuration}
Compréhension : ${comprehension}
Valorisation : ${valorisation}

Axe dominant : ${dominant}

Ton :
- sobre
- crédible
- niveau cabinet
- pas de marketing

Objectif :
- lecture claire
- projection concrète
- utile pour un rôle réel
`,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("❌ OPENAI ERROR:", err);
      throw new Error("OpenAI failed");
    }

    const data = await response.json();

    console.log("FULL:", JSON.stringify(data, null, 2));

    // 🔥 ICI : plus de parsing manuel
    const result = data.output?.[0]?.content?.[0]?.json;

    if (!result) {
      throw new Error("No JSON returned");
    }

    return NextResponse.json(result);

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
