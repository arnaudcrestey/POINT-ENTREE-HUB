import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    lecture: "TEST OK : l’API fonctionne.",
    projection: "Si tu vois ce message, le problème vient d’OpenAI.",
    attention: ["Test technique validé"],
    suite: ["On peut corriger l’IA maintenant"],
  });
}
