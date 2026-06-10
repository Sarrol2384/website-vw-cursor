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

function getRecipientEmails(): string[] {
  const raw =
    process.env.CONTACT_TO_EMAIL ?? "sarrol@vonwillingh.co.za,vonwillinghc@gmail.com";
  return raw
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function getSenderEmail(): string {
  // Must be a sender verified in your Brevo account (Senders & Domains).
  return (
    process.env.BREVO_SENDER_EMAIL?.trim() || "vonwillinghc@gmail.com"
  );
}

export async function sendContactNotification(
  payload: ContactEmailPayload,
): Promise<void> {
  const client = getBrevoClient();
  const toEmails = getRecipientEmails();
  const senderEmail = getSenderEmail();

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

  const text = [
    "New contact form submission — VonWillingh Online",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : "",
    payload.company ? `Company: ${payload.company}` : "",
    payload.projectType ? `Project type: ${payload.projectType}` : "",
    "",
    "Message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await client.transactionalEmails.sendTransacEmail({
    sender: { name: "VonWillingh Online", email: senderEmail },
    to: toEmails.map((email) => ({ email, name: "Sarrol Von Willingh" })),
    replyTo: { email: payload.email, name: payload.name },
    subject: `New enquiry from ${payload.name}`,
    htmlContent: html,
    textContent: text,
  });

  console.info(
    "Contact notification sent via Brevo",
    response.messageId ?? "ok",
    "to:",
    toEmails.join(", "),
    "from:",
    senderEmail,
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
