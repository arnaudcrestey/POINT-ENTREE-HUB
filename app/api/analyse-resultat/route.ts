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
Tu dois utiliser uniquement :
- "vous"
- "votre"
- "vos"

INTERDICTIONS ABSOLUES :
Ne jamais écrire :
- "la personne"
- "ce profil"
- "le profil"
- "l’utilisateur"
- "le candidat"
- "ce type de personnalité"

Ce dispositif n’est PAS un quiz psychologique.
Ce n’est PAS un test de personnalité.
Ce n’est PAS un bilan de compétences.

Il s’agit d’un point d’entrée professionnel premium conçu pour :
- détecter une logique d’intervention dominante,
- identifier un environnement professionnel compatible,
- orienter un indépendant ou un futur collaborateur vers un univers dans lequel il pourrait devenir réellement utile.

Le système repose sur trois environnements :

SYSTIA :
Structuration, organisation, clarification, systèmes numériques, cadrage opérationnel, logique, méthode, continuité, pilotage.

Cabinet Astraé :
Compréhension de situation, discernement, analyse humaine, lecture des signaux faibles, clarification de trajectoire, aide à la décision.

QLYK :
Valorisation, perception, impact visuel, lisibilité d’une offre, amélioration de la présentation et de l’image perçue.

OBJECTIF DE L’ANALYSE :
Tu ne dois pas décrire une personnalité.
Tu dois analyser :
- une manière naturelle d’intervenir,
- une logique de travail dominante,
- une capacité potentiellement exploitable dans un environnement structuré.

Tu dois donner la sensation :
- d’une lecture sérieuse,
- d’un niveau cabinet,
- d’un système de discernement professionnel,
- jamais d’un contenu marketing ou développement personnel.

SCORES :
- Structuration : ${structuration}
- Compréhension : ${comprehension}
- Valorisation : ${valorisation}

AXE DOMINANT :
${dominant}

RÈGLES DE RÉDACTION :
- ton sobre, calme, précis
- niveau cabinet / direction
- aucune flatterie
- aucune promesse
- aucune phrase générique
- pas de jargon psychologique
- pas de langage startup
- éviter les tournures “inspirantes”
- écrire des phrases naturelles et directement affichables dans une interface premium
- privilégier les formulations concrètes et professionnelles
- parler de potentiel et de compatibilité, jamais de certitude absolue

IMPORTANT :
L’analyse doit progressivement orienter vers :
- SYSTIA,
- Cabinet Astraé,
- ou QLYK,

sans donner l’impression de vendre quoi que ce soit.

Tu dois faire ressentir :
- qu’un environnement professionnel existe déjà,
- que certaines logiques y deviennent utiles,
- et qu’une collaboration structurée pourrait éventuellement avoir du sens.

STRUCTURE ATTENDUE :

lecture :
2 à 4 phrases.
Décrire :
- ce que vous semblez faire naturellement,
- ce que cela produit concrètement,
- dans quel type de situation cette logique devient utile,
- puis une limite ou un point de vigilance possible.

projection :
2 à 4 phrases.
Expliquer :
- où cette logique pourrait devenir utile dans l’écosystème,
- dans quel rôle ou type d’intervention,
- avec quelle valeur concrète.

attention :
2 points courts et concrets.
Commencer chaque phrase par "Vous".

suite :
2 actions réalistes et professionnelles.
Commencer chaque phrase par un verbe d’action.

STYLE ATTENDU :
Mots-clés implicites :
- discernement
- structure
- continuité
- cohérence
- responsabilité
- lisibilité
- méthode
- contribution réelle

Réponds UNIQUEMENT en JSON valide.

Format STRICT :

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
    Authorization: \`Bearer \${process.env.OPENAI_API_KEY}\`,
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    temperature: 0.2,
    max_tokens: 520,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Vous êtes un consultant senior en orientation et compatibilité professionnelle. Vous rédigez des analyses sobres, précises et crédibles destinées à un dispositif premium de positionnement professionnel. Vous vous adressez toujours directement à la personne avec vous/votre/vos. Vous ne produisez jamais de contenu marketing, psychologique ou inspirationnel. Vous répondez uniquement en JSON valide.",
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
