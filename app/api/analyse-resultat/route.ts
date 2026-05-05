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

    const prompt = `
Analyse ce profil professionnel.

Scores :
- Structuration : ${structuration}
- Compréhension : ${comprehension}
- Valorisation : ${valorisation}

Axe dominant : ${dominant}

IMPORTANT :
Réponds UNIQUEMENT avec un JSON valide.
Aucun texte avant ou après.

Format attendu :

{
  "lecture": "analyse claire et directe",
  "projection": "rôle concret et réaliste",
  "attention": ["point critique", "point à surveiller"],
  "suite": ["action concrète", "prochaine étape"]
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
              "Tu es un expert en positionnement professionnel. Tu réponds uniquement en JSON valide, sans texte autour.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      }),
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      console.error("❌ OPENAI ERROR:", err);

      throw new Error("OpenAI request failed");
    }

    const data = await openaiRes.json();

    console.log("✅ RAW OPENAI:", JSON.stringify(data, null, 2));

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content from OpenAI");
    }

    // 🔥 EXTRACTION ROBUSTE
    const parsed = extractJSON(content);

    if (!parsed) {
      console.error("❌ PARSE IMPOSSIBLE:", content);

      return NextResponse.json({
        lecture:
          "Votre profil présente une cohérence globale malgré une analyse partielle.",
        projection:
          "Une orientation progressive permettrait de confirmer ce positionnement.",
        attention: ["Analyse IA non structurée"],
        suite: ["Approfondir le positionnement", "Tester en situation réelle"],
      });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("❌ GLOBAL ERROR:", error);

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
