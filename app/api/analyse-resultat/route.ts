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

Scores :
- Structuration : ${structuration}
- Compréhension : ${comprehension}
- Valorisation : ${valorisation}

Axe dominant : ${dominant}

Réponds en JSON STRICT :

{
  "lecture": "...",
  "projection": "...",
  "attention": ["...", "..."],
  "suite": ["...", "..."]
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
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Tu es un expert en positionnement professionnel. Réponse concrète, structurée, sans marketing.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
      }),
    });

    // 🔴 gestion erreur API
    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      console.error("OPENAI ERROR:", err);

      throw new Error("OpenAI failed");
    }

    const data = await openaiRes.json();

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content from OpenAI");
    }

    // 🟢 PARSE SÉCURISÉ
    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("JSON ERROR:", content);

      // 👉 fallback intelligent (pas moche)
      return NextResponse.json({
        lecture:
          "Votre profil montre une orientation exploitable malgré une analyse partielle.",
        projection:
          "Une implication progressive dans cet axe permettrait de confirmer votre positionnement.",
        attention: [
          "Analyse technique partiellement indisponible",
        ],
        suite: [
          "Approfondir ce positionnement",
          "Valider par mise en situation",
        ],
      });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("GLOBAL ERROR:", error);

    return NextResponse.json({
      lecture:
        "Votre profil reste lisible malgré une indisponibilité temporaire de l’analyse.",
      projection:
        "Une orientation peut néanmoins être envisagée sur la base des scores.",
      attention: ["Erreur technique temporaire"],
      suite: ["Réessayer dans quelques instants"],
    });
  }
}
