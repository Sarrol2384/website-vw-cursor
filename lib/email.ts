import "server-only";
import { BrevoClient } from "@getbrevo/brevo";

type ContactEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  message: string;
};

let cachedClient: BrevoClient | null = null;

function getBrevoClient(): BrevoClient | null {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return null;
  if (!cachedClient) {
    cachedClient = new BrevoClient({ apiKey });
  }
  return cachedClient;
}

export async function sendContactNotification(
  payload: ContactEmailPayload,
): Promise<void> {
  const client = getBrevoClient();
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "sarrol@vonwillingh.co.za";

  if (!client) {
    console.warn("BREVO_API_KEY not set — skipping contact email notification");
    return;
  }

  const html = `
    <h2>New contact form submission — VonWillingh Online</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    ${payload.phone ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>` : ""}
    ${payload.company ? `<p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>` : ""}
    ${payload.projectType ? `<p><strong>Project type:</strong> ${escapeHtml(payload.projectType)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
  `;

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: "VonWillingh Online", email: toEmail },
    to: [{ email: toEmail, name: "Sarrol Von Willingh" }],
    replyTo: { email: payload.email, name: payload.name },
    subject: `New enquiry from ${payload.name}`,
    htmlContent: html,
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
