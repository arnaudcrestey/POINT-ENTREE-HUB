import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const firstName = String(formData.get("firstName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const activity = String(formData.get("activity") || "").trim();
  const website = String(formData.get("website") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const dominant = String(formData.get("dominant") || "").trim();
  const entity = String(formData.get("entity") || "").trim();

  const structuration = String(formData.get("structuration") || "0");
  const comprehension = String(formData.get("comprehension") || "0");
  const valorisation = String(formData.get("valorisation") || "0");

  if (!firstName || !email || !activity || !message) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants." },
      { status: 400 }
    );
  }

  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.MAIL_FROM ||
    !process.env.MAIL_TO
  ) {
    return NextResponse.json(
      { error: "Configuration email incomplète." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: `Nouvelle demande — ${dominant} / ${entity}`,
    text: `
Nouvelle demande depuis la page résultat arnaudcrestey.com

PRÉNOM
${firstName}

EMAIL
${email}

ACTIVITÉ
${activity}

LIEN
${website || "Non renseigné"}

AXE DOMINANT
${dominant}

ENTITÉ ORIENTÉE
${entity}

SCORES
Structuration : ${structuration}
Compréhension : ${comprehension}
Valorisation : ${valorisation}

MESSAGE
${message}
    `,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;background:#f6f7fb;padding:32px;">
        <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #e5e7eb;">
          <p style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#315f8c;margin:0 0 12px;">
            arnaudcrestey.com
          </p>

          <h1 style="font-size:24px;margin:0 0 24px;color:#111827;">
            Nouvelle demande depuis la page résultat
          </h1>

          <h2 style="font-size:16px;margin:24px 0 8px;">Contact</h2>
          <p><strong>Prénom :</strong> ${escapeHtml(firstName)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Activité :</strong> ${escapeHtml(activity)}</p>
          <p><strong>Lien :</strong> ${escapeHtml(website || "Non renseigné")}</p>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

          <h2 style="font-size:16px;margin:24px 0 8px;">Résultat</h2>
          <p><strong>Axe dominant :</strong> ${escapeHtml(dominant)}</p>
          <p><strong>Entité orientée :</strong> ${escapeHtml(entity)}</p>

          <p>
            <strong>Scores :</strong><br />
            Structuration : ${escapeHtml(structuration)}<br />
            Compréhension : ${escapeHtml(comprehension)}<br />
            Valorisation : ${escapeHtml(valorisation)}
          </p>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

          <h2 style="font-size:16px;margin:24px 0 8px;">Message</h2>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      </div>
    `,
  });

  return NextResponse.redirect(new URL("/merci", request.url), 303);
}
