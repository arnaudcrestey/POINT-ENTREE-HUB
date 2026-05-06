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

function formatText(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function getAxisLabel(axis: string) {
  const labels: Record<string, string> = {
    structuration: "Structuration",
    comprehension: "Compréhension",
    valorisation: "Valorisation",
  };

  return labels[axis] || axis;
}

export async function POST(request: Request) {
  try {
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

    const axisLabel = getAxisLabel(dominant);
    const safeEntity = entity || "Non renseigné";

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
      subject: `Situation transmise — ${axisLabel} / ${safeEntity}`,
      text: `
NOUVELLE SITUATION PROFESSIONNELLE TRANSMISE

IDENTITÉ
Prénom : ${firstName}
Email : ${email}
Activité : ${activity}
Lien : ${website || "Non renseigné"}

LECTURE INITIALE
Axe dominant : ${axisLabel}
Environnement associé : ${safeEntity}

SCORES
Structuration : ${structuration}
Compréhension : ${comprehension}
Valorisation : ${valorisation}

SITUATION TRANSMISE
${message}
      `,
      html: `
        <div style="margin:0;padding:36px;background:#f3f4f0;font-family:Arial,Helvetica,sans-serif;color:#111827;">
          <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e1d8;border-radius:28px;overflow:hidden;">
            <div style="padding:34px 38px;border-bottom:1px solid #ebe7df;background:#fbfaf7;">
              <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#8a7557;">
                arnaudcrestey.com
              </p>

              <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:1.2;font-weight:400;color:#111827;">
                Situation professionnelle transmise
              </h1>

              <p style="margin:14px 0 0;font-size:14px;line-height:1.7;color:#6b7280;">
                Une nouvelle situation a été déposée à partir du point d’entrée de positionnement.
              </p>
            </div>

            <div style="padding:34px 38px;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#9ca3af;">
                Lecture initiale
              </p>

              <table style="width:100%;border-collapse:collapse;margin-bottom:30px;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;color:#6b7280;font-size:13px;">Axe dominant</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;text-align:right;font-size:13px;font-weight:600;">${escapeHtml(axisLabel)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;color:#6b7280;font-size:13px;">Environnement associé</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;text-align:right;font-size:13px;font-weight:600;">${escapeHtml(safeEntity)}</td>
                </tr>
              </table>

              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#9ca3af;">
                Contact
              </p>

              <table style="width:100%;border-collapse:collapse;margin-bottom:30px;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;color:#6b7280;font-size:13px;">Prénom</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;text-align:right;font-size:13px;font-weight:600;">${escapeHtml(firstName)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;color:#6b7280;font-size:13px;">Email</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;text-align:right;font-size:13px;font-weight:600;">${escapeHtml(email)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;color:#6b7280;font-size:13px;">Activité</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;text-align:right;font-size:13px;font-weight:600;">${escapeHtml(activity)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;color:#6b7280;font-size:13px;">Lien utile</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eef0f3;text-align:right;font-size:13px;font-weight:600;">${escapeHtml(website || "Non renseigné")}</td>
                </tr>
              </table>

              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#9ca3af;">
                Scores internes
              </p>

              <div style="margin-bottom:30px;padding:18px 20px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:18px;font-size:13px;line-height:1.8;color:#374151;">
                Structuration : <strong>${escapeHtml(structuration)}</strong><br />
                Compréhension : <strong>${escapeHtml(comprehension)}</strong><br />
                Valorisation : <strong>${escapeHtml(valorisation)}</strong>
              </div>

              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#9ca3af;">
                Situation transmise
              </p>

              <div style="padding:22px 24px;background:#fbfaf7;border:1px solid #e7e2d8;border-radius:20px;font-size:14px;line-height:1.8;color:#1f2937;">
                ${formatText(message)}
              </div>
            </div>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Situation bien transmise",
      text: `
Bonjour ${firstName},

Votre situation professionnelle a bien été transmise.

Elle sera relue à partir des éléments communiqués et de la première lecture réalisée lors du parcours de positionnement.

Cette étape ne constitue ni une sélection automatique, ni un engagement mutuel. Elle permet simplement d’évaluer si une cohérence professionnelle peut être approfondie.

Bien à vous,

Arnaud Crestey
      `,
      html: `
        <div style="margin:0;padding:36px;background:#f3f4f0;font-family:Arial,Helvetica,sans-serif;color:#111827;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e1d8;border-radius:28px;overflow:hidden;">
            <div style="padding:38px 42px 30px;border-bottom:1px solid #ebe7df;background:#fbfaf7;">
              <p style="margin:0 0 18px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#8a7557;">
                Confirmation
              </p>

              <h1 style="margin:0;font-family:Georgia,serif;font-size:30px;line-height:1.22;font-weight:400;color:#111827;">
                Situation bien transmise
              </h1>
            </div>

            <div style="padding:38px 42px 42px;">
              <p style="margin:0 0 22px;font-size:15px;line-height:1.85;color:#374151;">
                Bonjour ${escapeHtml(firstName)},
              </p>

              <p style="margin:0 0 22px;font-size:15px;line-height:1.85;color:#374151;">
                Votre situation professionnelle a bien été transmise.
              </p>

              <p style="margin:0 0 28px;font-size:15px;line-height:1.85;color:#374151;">
                Elle sera relue à partir des éléments communiqués et de la première lecture réalisée lors du parcours de positionnement.
              </p>

              <div style="margin:30px 0 38px;padding:22px 24px;background:#fbfaf7;border:1px solid #e7e2d8;border-radius:18px;">
                <p style="margin:0;font-size:13px;line-height:1.85;color:#6b7280;">
                  Cette étape ne constitue ni une sélection automatique, ni un engagement mutuel. Elle permet simplement d’évaluer si une cohérence professionnelle peut être approfondie.
                </p>
              </div>

              <div style="margin-top:36px;padding-top:28px;border-top:1px solid #ebe7df;">
                <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:#374151;">
                  Bien à vous,
                </p>

                <p style="margin:0;font-family:Georgia,serif;font-size:21px;line-height:1.4;color:#111827;">
                  Arnaud Crestey
                </p>

                <div style="width:42px;height:1px;background:#c9a86a;margin:14px 0 0;"></div>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    return Response.redirect(new URL("/merci", request.url), 302);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Une erreur est survenue pendant l’envoi." },
      { status: 500 }
    );
  }
}
