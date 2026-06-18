export type AuditQuestionId =
  | "employees"
  | "enquiries"
  | "contact_channels"
  | "admin_hours"
  | "software"
  | "repetitive_tasks"
  | "bookings"
  | "response_time"
  | "lead_followup"
  | "biggest_challenge";

export type AuditAnswers = Record<AuditQuestionId, string>;

export type AuditTier =
  | "beginner"
  | "developing"
  | "ai_ready"
  | "high_potential";

export type AuditRecommendation = {
  id: string;
  title: string;
  description: string;
};

export type AuditSavings = {
  adminHoursSavedMin: number;
  adminHoursSavedMax: number;
  labourSavingsMinZar: number;
  labourSavingsMaxZar: number;
  leadResponseImprovement: string;
};

export type AuditResult = {
  score: number;
  tier: AuditTier;
  tierLabel: string;
  savings: AuditSavings;
  recommendations: AuditRecommendation[];
  biggestChallenge: string;
  disclaimer: string;
};

export type AuditSubmissionPayload = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  answers: AuditAnswers;
  consent: true;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type AuditPublicResult = AuditResult & {
  id: string;
  businessName: string;
  name: string;
};
