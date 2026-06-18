import type { AuditQuestionId } from "./types";

export type AuditOption = {
  value: string;
  label: string;
  points: number;
};

export type AuditQuestion = {
  id: AuditQuestionId;
  question: string;
  hint: string;
  options: AuditOption[];
};

export const AUDIT_QUESTIONS: AuditQuestion[] = [
  {
    id: "employees",
    question: "How many employees does your business have?",
    hint: "Larger teams generally benefit more from automation.",
    options: [
      { value: "1-5", label: "1–5", points: 2 },
      { value: "6-20", label: "6–20", points: 5 },
      { value: "21-50", label: "21–50", points: 8 },
      { value: "50+", label: "50+", points: 10 },
    ],
  },
  {
    id: "enquiries",
    question: "How many customer enquiries do you receive per week?",
    hint: "Measures chatbot and AI assistant opportunities.",
    options: [
      { value: "less-20", label: "Less than 20", points: 2 },
      { value: "20-50", label: "20–50", points: 5 },
      { value: "50-100", label: "50–100", points: 8 },
      { value: "100+", label: "100+", points: 10 },
    ],
  },
  {
    id: "contact_channels",
    question: "How do customers currently contact you?",
    hint: "More channels = more automation opportunities.",
    options: [
      { value: "phone", label: "Phone only", points: 2 },
      { value: "whatsapp", label: "WhatsApp", points: 5 },
      { value: "email", label: "Email", points: 4 },
      { value: "website", label: "Website forms", points: 6 },
      { value: "multiple", label: "Multiple channels", points: 10 },
    ],
  },
  {
    id: "admin_hours",
    question: "How many hours per week are spent on administrative work?",
    hint: "Measures potential savings.",
    options: [
      { value: "less-5", label: "Less than 5", points: 2 },
      { value: "5-10", label: "5–10", points: 5 },
      { value: "10-20", label: "10–20", points: 8 },
      { value: "20+", label: "20+", points: 10 },
    ],
  },
  {
    id: "software",
    question: "Do you currently use any business software?",
    hint: "Shows digital maturity.",
    options: [
      { value: "none", label: "None", points: 1 },
      { value: "excel", label: "Excel only", points: 3 },
      { value: "accounting", label: "Accounting software", points: 6 },
      { value: "crm", label: "CRM", points: 8 },
      { value: "multiple", label: "Multiple systems", points: 10 },
    ],
  },
  {
    id: "repetitive_tasks",
    question: "How often do staff perform repetitive tasks?",
    hint: "One of the strongest indicators for automation.",
    options: [
      { value: "rarely", label: "Rarely", points: 2 },
      { value: "sometimes", label: "Sometimes", points: 5 },
      { value: "daily", label: "Daily", points: 8 },
      { value: "many-daily", label: "Many times per day", points: 10 },
    ],
  },
  {
    id: "bookings",
    question: "How are appointments or bookings managed?",
    hint: "Great opportunity for automation.",
    options: [
      { value: "paper", label: "Paper diary", points: 10 },
      { value: "phone", label: "Phone calls", points: 8 },
      { value: "excel", label: "Excel", points: 6 },
      { value: "online", label: "Online booking system", points: 2 },
    ],
  },
  {
    id: "response_time",
    question: "How quickly do you respond to customer enquiries?",
    hint: "Slow responses often indicate lost revenue.",
    options: [
      { value: "immediate", label: "Immediately", points: 2 },
      { value: "few-hours", label: "Within a few hours", points: 5 },
      { value: "same-day", label: "Same day", points: 8 },
      { value: "next-day", label: "Next day or later", points: 10 },
    ],
  },
  {
    id: "lead_followup",
    question: "Do you actively follow up on leads?",
    hint: "AI follow-up systems can dramatically improve sales.",
    options: [
      { value: "no", label: "No", points: 10 },
      { value: "sometimes", label: "Sometimes", points: 7 },
      { value: "usually", label: "Usually", points: 4 },
      { value: "always", label: "Always", points: 2 },
    ],
  },
  {
    id: "biggest_challenge",
    question: "What is your biggest challenge?",
    hint: "This determines which AI solutions we recommend.",
    options: [
      { value: "customers", label: "Getting more customers", points: 6 },
      { value: "service", label: "Customer service", points: 8 },
      { value: "admin", label: "Administration", points: 9 },
      { value: "productivity", label: "Staff productivity", points: 8 },
      { value: "leads", label: "Managing leads", points: 10 },
      { value: "marketing", label: "Marketing", points: 7 },
    ],
  },
];

export const AUDIT_QUESTION_IDS = AUDIT_QUESTIONS.map((q) => q.id);

export function getQuestionById(id: AuditQuestionId): AuditQuestion {
  const question = AUDIT_QUESTIONS.find((q) => q.id === id);
  if (!question) throw new Error(`Unknown question: ${id}`);
  return question;
}

export function getOptionPoints(
  questionId: AuditQuestionId,
  value: string,
): number {
  const question = getQuestionById(questionId);
  return question.options.find((o) => o.value === value)?.points ?? 0;
}
