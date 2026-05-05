import { NextResponse } from "next/server";

type AnalysisResult = {
  lecture: string;
  projection: string;
  attention: string[];
  suite: string[];
};

const fallback: AnalysisResult = {
  lecture:
    "Votre résultat reste exploitable, mais l’analyse personnalisée n’a pas pu être générée pour le moment.",
  projection:
    "Votre positionnement indique une orientation possible dans l’écosystème, à préciser par une lecture plus fine.",
  attention: ["Vérifier la cohérence entre le score et votre situation réelle."],
  suite: ["Transmettre votre situation pour recevoir une lecture personnalisée."],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { dominant, structuration, comprehension, valorisation } = body;

    const prompt = `
Tu analyses un résultat de positionnement professionnel.

IMPORTANT :
Tu t’adresses directement à la personne.
Tu dois utiliser uniquement "vous", "votre", "vos".
Tu ne dois jamais écrire : "la personne", "cette personne", "le profil", "l’utilisateur", "le candidat".

Ce dispositif n'est pas un quiz.
C'est un point d'entrée premium destiné à orienter un profil LinkedIn vers une place possible dans un écosystème professionnel.

Écosystème :
- Structuration : SYSTIA — clarifier, organiser, cadrer, construire des systèmes numériques et opérationnels.
- Compréhension : Cabinet Astraé — analyser une situation, lire les signaux faibles, éclairer une décision ou une trajectoire.
- Valorisation : QLYK — améliorer la perception, renforcer l’impact visuel, présenter une offre, un produit ou un contenu avec plus de force.

Scores :
- Structuration : ${structuration}
- Compréhension : ${comprehension}
- Valorisation : ${valorisation}

Axe dominant : ${dominant}

Règles :
- ton sobre, professionnel, niveau cabinet
- pas de marketing
- pas de flatterie
- pas de phrases génériques
- parler de potentiel, pas de vérité absolue
- relier clairement l’analyse à un rôle possible dans SYSTIA, Cabinet Astraé ou QLYK
- écrire en phrases naturelles et directement affichables

Structure attendue :

lecture :
2 à 4 phrases en "vous".
Décrire ce que vous semblez faire naturellement, ce que cela produit concrètement, puis une limite possible.

projection :
2 à 4 phrases en "vous".
Expliquer où vous pourriez être utile dans l’écosystème, avec une valeur concrète.

attention :
2 points concrets en "vous".

suite :
2 actions concrètes en "vous".

Réponds uniquement en JSON valide :

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
        model: "gpt-4o-mini",
        temperature: 0.25,
        max_tokens: 420,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Tu es un consultant senior en positionnement professionnel. Tu t’adresses toujours directement à la personne avec vous/votre/vos. Tu réponds uniquement en JSON valide.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(await response.text());
      return NextResponse.json(fallback);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(fallback);
    }

    try {
      const parsed = JSON.parse(content) as AnalysisResult;
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json(fallback);
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(fallback);
  }
}
