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

    // 🧠 PROMPT SIMPLE (on optimise après)
    const prompt = `
Analyse ce profil professionnel.

Scores :
- Structuration : ${structuration}
- Compréhension : ${comprehension}
- Valorisation : ${valorisation}

Axe dominant : ${dominant}

Réponds STRICTEMENT en JSON avec ce format :

{
  "lecture": "analyse claire",
  "projection": "rôle concret",
  "attention": ["point 1", "point 2"],
  "suite": ["action 1", "action 2"]
}
`;

    // 🔥 APPEL OPENAI
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
              "Tu es un expert en positionnement professionnel. Réponse claire, concrète, sans blabla.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    // ❌ SI ERREUR OPENAI → ON LOG
    if (!openaiRes.ok) {
      const errorText = await openaiRes.text();
      console.error("❌ OpenAI ERROR:", errorText);

      return NextResponse.json({
        lecture: "Analyse indisponible pour le moment.",
        projection: "Le positionnement reste néanmoins exploitable.",
        attention: ["Erreur technique lors de la génération."],
        suite: ["Réessayer plus tard."],
      });
    }

    // ✅ RÉCUPÉRATION
    const data = await openaiRes.json();

    console.log("✅ RAW OPENAI:", JSON.stringify(data, null, 2));

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("❌ PAS DE CONTENU");

      return NextResponse.json({
        lecture: "Analyse indisponible pour le moment.",
        projection: "Le positionnement reste néanmoins exploitable.",
        attention: ["Réponse vide du moteur IA."],
        suite: ["Réessayer plus tard."],
      });
    }

    // 🔥 PARSE JSON
    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("❌ JSON PARSE ERROR:", content);

      return NextResponse.json({
        lecture: "Analyse partiellement indisponible.",
        projection: "Le positionnement reste lisible.",
        attention: ["Format de réponse invalide."],
        suite: ["Optimisation en cours."],
      });
    }

    // ✅ RETOUR FINAL
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("❌ GLOBAL ERROR:", error);

    return NextResponse.json({
      lecture: "Analyse indisponible.",
      projection: "Le positionnement reste exploitable.",
      attention: ["Erreur serveur."],
      suite: ["Réessayer plus tard."],
    });
  }
}
