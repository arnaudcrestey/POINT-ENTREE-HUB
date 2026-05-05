import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      dominant,
      entity,
      structuration,
      comprehension,
      valorisation,
    } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Clé OpenAI manquante." },
        { status: 500 }
      );
    }

    const prompt = `
Tu es un analyste professionnel pour arnaudcrestey.com.

Contexte :
Ce dispositif n'est pas un quiz psychologique.
C'est un point d'entrée professionnel destiné à orienter des profils LinkedIn vers un rôle potentiel dans l'écosystème :
- Structuration : SYSTIA
- Compréhension : Cabinet Astraé
- Valorisation : QLYK

Résultat :
- Axe dominant : ${dominant}
- Entité orientée : ${entity}
- Score structuration : ${structuration}
- Score compréhension : ${comprehension}
- Score valorisation : ${valorisation}

Rédige une analyse courte, premium, sobre, humaine et professionnelle.

Format strict :
1. "lecture" : 5 à 7 lignes, analyse fine du profil.
2. "projection" : 3 à 4 lignes, rôle possible dans l'écosystème.
3. "attention" : 3 points de vigilance.
4. "suite" : 3 prochaines étapes pour vérifier la compatibilité.

Ne parle jamais de test psychologique.
Ne fais pas de flatterie excessive.
Ne sois pas commercial.
Réponds uniquement en JSON valide.
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
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Erreur OpenAI", details: errorText },
        { status: 500 }
      );
    }

    const data = await response.json();

    const text =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "";

    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur génération analyse." },
      { status: 500 }
    );
  }
}
