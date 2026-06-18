import "server-only";
import { BrevoClient } from "@getbrevo/brevo";
import type { AuditResult } from "@/lib/audit/types";
import { formatZar } from "@/lib/format";

type ContactEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  message: string;
};

type AuditEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  result: AuditResult;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
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

function formatAuditReportHtml(payload: AuditEmailPayload): string {
  const { result } = payload;
  const recs = result.recommendations
    .map(
      (r) =>
        `<li><strong>${escapeHtml(r.title)}</strong> — ${escapeHtml(r.description)}</li>`,
    )
    .join("");

  return `
    <h2>Your AI Readiness Report</h2>
    <p>Hi ${escapeHtml(payload.name)},</p>
    <p>Thank you for completing the AI audit${payload.businessName ? ` for <strong>${escapeHtml(payload.businessName)}</strong>` : ""}. Here is your personalized summary.</p>

    <h3>Your AI Readiness Score</h3>
    <p style="font-size: 28px; font-weight: bold; margin: 0;">${result.score}/100</p>
    <p><strong>${escapeHtml(result.tierLabel)}</strong></p>

    <h3>Potential Monthly Savings (estimated)</h3>
    <ul>
      <li>Admin hours saved: ${result.savings.adminHoursSavedMin}–${result.savings.adminHoursSavedMax} hrs/month</li>
      <li>Estimated labour savings: ${formatZar(result.savings.labourSavingsMinZar)}–${formatZar(result.savings.labourSavingsMaxZar)}/month</li>
      <li>Lead response: ${escapeHtml(result.savings.leadResponseImprovement)}</li>
    </ul>

    <h3>Recommended Solutions</h3>
    <ul>${recs}</ul>

    <p><strong>Biggest challenge identified:</strong> ${escapeHtml(result.biggestChallenge)}</p>

    <p style="font-size: 12px; color: #666;">${escapeHtml(result.disclaimer)}</p>

    <p>Ready to discuss next steps? Reply to this email or message us on WhatsApp to book your free 30-minute AI strategy session.</p>
    <p>— Sarrol Von Willingh<br>VonWillingh Online</p>
  `;
}

function formatAuditReportText(payload: AuditEmailPayload): string {
  const { result } = payload;
  const recs = result.recommendations
    .map((r) => `- ${r.title}: ${r.description}`)
    .join("\n");

  return [
    "Your AI Readiness Report",
    "",
    `Hi ${payload.name},`,
    "",
    `Score: ${result.score}/100 — ${result.tierLabel}`,
    "",
    "Potential monthly savings (estimated):",
    `Admin hours saved: ${result.savings.adminHoursSavedMin}–${result.savings.adminHoursSavedMax} hrs/month`,
    `Labour savings: ${formatZar(result.savings.labourSavingsMinZar)}–${formatZar(result.savings.labourSavingsMaxZar)}/month`,
    `Lead response: ${result.savings.leadResponseImprovement}`,
    "",
    "Recommended solutions:",
    recs,
    "",
    `Biggest challenge: ${result.biggestChallenge}`,
    "",
    result.disclaimer,
    "",
    "Reply to book your free 30-minute AI strategy session.",
    "— Sarrol Von Willingh, VonWillingh Online",
  ].join("\n");
}

export async function sendAuditReportToLead(
  payload: AuditEmailPayload,
): Promise<void> {
  const client = getBrevoClient();
  const senderEmail = getSenderEmail();

  if (!client) {
    console.warn("BREVO_API_KEY not set — skipping audit report email to lead");
    return;
  }

  const business = payload.businessName ? ` — ${payload.businessName}` : "";

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: "VonWillingh Online", email: senderEmail },
    to: [{ email: payload.email, name: payload.name }],
    replyTo: { email: senderEmail, name: "Sarrol Von Willingh" },
    subject: `Your AI Readiness Report${business} (${payload.result.score}/100)`,
    htmlContent: formatAuditReportHtml(payload),
    textContent: formatAuditReportText(payload),
  });
}

export async function sendAuditNotification(
  payload: AuditEmailPayload,
): Promise<void> {
  const client = getBrevoClient();
  const toEmails = getRecipientEmails();
  const senderEmail = getSenderEmail();

  if (!client) {
    console.warn("BREVO_API_KEY not set — skipping audit admin notification");
    return;
  }

  const utmParts = [
    payload.utmSource && `source: ${payload.utmSource}`,
    payload.utmMedium && `medium: ${payload.utmMedium}`,
    payload.utmCampaign && `campaign: ${payload.utmCampaign}`,
  ].filter(Boolean);

  const html = `
    <h2>New AI Audit lead — VonWillingh Online</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    ${payload.phone ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>` : ""}
    ${payload.businessName ? `<p><strong>Business:</strong> ${escapeHtml(payload.businessName)}</p>` : ""}
    <p><strong>Score:</strong> ${payload.result.score}/100 (${escapeHtml(payload.result.tierLabel)})</p>
    <p><strong>Biggest challenge:</strong> ${escapeHtml(payload.result.biggestChallenge)}</p>
    ${utmParts.length ? `<p><strong>UTM:</strong> ${escapeHtml(utmParts.join(", "))}</p>` : ""}
    <h3>Recommendations</h3>
    <ul>${payload.result.recommendations.map((r) => `<li>${escapeHtml(r.title)}</li>`).join("")}</ul>
    <p><strong>Estimated savings:</strong> ${payload.result.savings.adminHoursSavedMin}–${payload.result.savings.adminHoursSavedMax} admin hrs/month, ${formatZar(payload.result.savings.labourSavingsMinZar)}–${formatZar(payload.result.savings.labourSavingsMaxZar)}/month</p>
  `;

  const text = [
    "New AI Audit lead — VonWillingh Online",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : "",
    payload.businessName ? `Business: ${payload.businessName}` : "",
    `Score: ${payload.result.score}/100 (${payload.result.tierLabel})`,
    `Challenge: ${payload.result.biggestChallenge}`,
    utmParts.length ? `UTM: ${utmParts.join(", ")}` : "",
    "",
    "Recommendations:",
    ...payload.result.recommendations.map((r) => `- ${r.title}`),
  ]
    .filter(Boolean)
    .join("\n");

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: "VonWillingh Online", email: senderEmail },
    to: toEmails.map((email) => ({ email, name: "Sarrol Von Willingh" })),
    replyTo: { email: payload.email, name: payload.name },
    subject: `AI Audit lead: ${payload.name} (${payload.result.score}/100)`,
    htmlContent: html,
    textContent: text,
  });
}
