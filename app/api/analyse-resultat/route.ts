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

      return NextResponse.json({
        debug: true,
        error: "OpenAI request failed",
        raw: err,
      });
    }

    const data = await response.json();

    console.log("RAW FULL >>>>>>>", JSON.stringify(data, null, 2));

    // 🔥 EXTRACTION ROBUSTE
    let text = "";

    if (data.output && Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item.content) {
          for (const content of item.content) {
            if (content.type === "output_text") {
              text += content.text;
            }
          }
        }
      }
    }

    console.log("TEXT EXTRACTED >>>>>>>", text);

    // 🔴 MODE DEBUG FRONT
    return NextResponse.json({
      debug: true,
      raw: text,
      full: data,
    });

  } catch (error) {
    console.error("GLOBAL ERROR:", error);

    return NextResponse.json({
      debug: true,
      error: "Global error",
    });
  }
}
