// app/api/send/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, recaptchaToken } = body;

    // Vérification ReCAPTCHA
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" },
    );

    const recaptchaJson = await recaptchaRes.json();

    if (!recaptchaJson.success) {
      return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
    }

    // Envoi de l'email avec Resend
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "mahefanant@gmail.com",
      subject: `Nouveau message de ${name}`,
      replyTo: email,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563EB, #1E3A8A); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #2563EB; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 5px; border: 1px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📬 Nouveau message de contact</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nom</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">💬 Message</div>
                <div class="value">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <div class="footer">
              <p>Envoyé depuis votre portfolio • Répondre à: ${email}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erreur d'envoi:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 },
    );
  }
}
