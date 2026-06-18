import { getOptionPoints, getQuestionById } from "./questions";
import type {
  AuditAnswers,
  AuditQuestionId,
  AuditRecommendation,
  AuditResult,
  AuditTier,
} from "./types";

const TIER_LABELS: Record<AuditTier, string> = {
  beginner: "Getting Started",
  developing: "Developing",
  ai_ready: "AI Ready Business",
  high_potential: "High Automation Potential",
};

const ADMIN_HOURS_WEEKLY: Record<string, number> = {
  "less-5": 3,
  "5-10": 7.5,
  "10-20": 15,
  "20+": 25,
};

const RESPONSE_IMPROVEMENT: Record<string, string> = {
  immediate: "Already strong — AI can maintain consistency 24/7",
  "few-hours": "Up to 50% faster with automated first responses",
  "same-day": "Up to 65% faster with AI-assisted replies",
  "next-day": "Up to 80% faster with instant AI triage",
};

const CHALLENGE_LABELS: Record<string, string> = {
  customers: "Getting more customers",
  service: "Customer service",
  admin: "Administration",
  productivity: "Staff productivity",
  leads: "Managing leads",
  marketing: "Marketing",
};

const ALL_RECOMMENDATIONS: Record<string, AuditRecommendation> = {
  ai_receptionist: {
    id: "ai_receptionist",
    title: "AI Receptionist",
    description:
      "Handle calls and enquiries automatically, route urgent issues, and capture lead details around the clock.",
  },
  whatsapp_bot: {
    id: "whatsapp_bot",
    title: "WhatsApp Customer Support Bot",
    description:
      "Answer common questions instantly on WhatsApp and escalate complex cases to your team.",
  },
  follow_up: {
    id: "follow_up",
    title: "Automated Follow-up System",
    description:
      "Send timely follow-ups to leads who haven't responded, so opportunities don't slip through.",
  },
  lead_dashboard: {
    id: "lead_dashboard",
    title: "Lead Management Dashboard",
    description:
      "Track every enquiry in one place with status, notes, and automated reminders.",
  },
  reporting: {
    id: "reporting",
    title: "AI Reporting Assistant",
    description:
      "Generate weekly summaries and insights from your business data without manual spreadsheet work.",
  },
  online_booking: {
    id: "online_booking",
    title: "Online Booking System",
    description:
      "Let customers book appointments online and reduce phone tag and diary admin.",
  },
  marketing_automation: {
    id: "marketing_automation",
    title: "Marketing Automation",
    description:
      "Automate email and WhatsApp campaigns to nurture leads and bring customers back.",
  },
  workflow_automation: {
    id: "workflow_automation",
    title: "Workflow Automation",
    description:
      "Connect your tools so repetitive tasks run automatically between systems.",
  },
};

function getTier(score: number): AuditTier {
  if (score <= 30) return "beginner";
  if (score <= 60) return "developing";
  if (score <= 80) return "ai_ready";
  return "high_potential";
}

function computeSavings(answers: AuditAnswers) {
  const adminWeekly = ADMIN_HOURS_WEEKLY[answers.admin_hours] ?? 5;
  const automationFactor = answers.repetitive_tasks === "many-daily" ? 0.4 : 0.35;
  const baseSaved = adminWeekly * automationFactor * 4.33;
  const teamBoost =
    answers.employees === "50+"
      ? 1.3
      : answers.employees === "21-50"
        ? 1.15
        : 1;
  const enquiryBoost =
    answers.enquiries === "100+"
      ? 1.2
      : answers.enquiries === "50-100"
        ? 1.1
        : 1;

  const midpoint = Math.min(Math.round(baseSaved * teamBoost * enquiryBoost), 80);
  const adminHoursSavedMin = Math.max(5, Math.round(midpoint * 0.75));
  const adminHoursSavedMax = Math.min(80, Math.round(midpoint * 1.25));

  const labourSavingsMinZar = adminHoursSavedMin * 150;
  const labourSavingsMaxZar = adminHoursSavedMax * 200;

  return {
    adminHoursSavedMin,
    adminHoursSavedMax,
    labourSavingsMinZar,
    labourSavingsMaxZar,
    leadResponseImprovement:
      RESPONSE_IMPROVEMENT[answers.response_time] ??
      "Significant improvement possible with AI-assisted responses",
  };
}

function buildRecommendations(answers: AuditAnswers): AuditRecommendation[] {
  const picks = new Map<string, AuditRecommendation>();

  function add(id: keyof typeof ALL_RECOMMENDATIONS) {
    picks.set(id, ALL_RECOMMENDATIONS[id]);
  }

  const challenge = answers.biggest_challenge;
  if (challenge === "leads") {
    add("lead_dashboard");
    add("follow_up");
    add("ai_receptionist");
  } else if (challenge === "customers" || challenge === "marketing") {
    add("marketing_automation");
    add("follow_up");
  } else if (challenge === "service") {
    add("whatsapp_bot");
    add("ai_receptionist");
  } else if (challenge === "admin") {
    add("reporting");
    add("workflow_automation");
  } else if (challenge === "productivity") {
    add("workflow_automation");
    add("reporting");
  }

  if (
    answers.contact_channels === "whatsapp" ||
    answers.contact_channels === "multiple"
  ) {
    add("whatsapp_bot");
  }

  if (
    answers.bookings === "paper" ||
    answers.bookings === "phone" ||
    answers.bookings === "excel"
  ) {
    add("online_booking");
    add("ai_receptionist");
  }

  if (answers.lead_followup === "no" || answers.lead_followup === "sometimes") {
    add("follow_up");
  }

  if (
    answers.admin_hours === "10-20" ||
    answers.admin_hours === "20+" ||
    answers.repetitive_tasks === "daily" ||
    answers.repetitive_tasks === "many-daily"
  ) {
    add("reporting");
    add("workflow_automation");
  }

  if (answers.response_time === "same-day" || answers.response_time === "next-day") {
    add("ai_receptionist");
    if (!picks.has("whatsapp_bot")) add("whatsapp_bot");
  }

  if (picks.size < 3) {
    add("ai_receptionist");
    add("follow_up");
  }

  return Array.from(picks.values()).slice(0, 5);
}

export function computeAuditScore(answers: AuditAnswers): number {
  let total = 0;
  for (const [questionId, value] of Object.entries(answers)) {
    total += getOptionPoints(questionId as AuditQuestionId, value);
  }
  return Math.min(100, total);
}

export function computeAuditResult(answers: AuditAnswers): AuditResult {
  const score = computeAuditScore(answers);
  const tier = getTier(score);
  const biggestChallenge =
    CHALLENGE_LABELS[answers.biggest_challenge] ?? answers.biggest_challenge;

  return {
    score,
    tier,
    tierLabel: TIER_LABELS[tier],
    savings: computeSavings(answers),
    recommendations: buildRecommendations(answers),
    biggestChallenge,
    disclaimer:
      "Estimates are illustrative based on your answers and typical SME outcomes. Actual savings depend on your processes, team, and implementation scope.",
  };
}

export function validateAuditAnswers(
  answers: Record<string, string>,
): answers is AuditAnswers {
  const requiredIds: AuditQuestionId[] = [
    "employees",
    "enquiries",
    "contact_channels",
    "admin_hours",
    "software",
    "repetitive_tasks",
    "bookings",
    "response_time",
    "lead_followup",
    "biggest_challenge",
  ];

  for (const id of requiredIds) {
    const value = answers[id];
    if (!value) return false;
    const question = getQuestionById(id);
    if (!question.options.some((o) => o.value === value)) return false;
  }

  return true;
}
