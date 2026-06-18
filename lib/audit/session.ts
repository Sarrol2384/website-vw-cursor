export type UtmParams = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

const UTM_STORAGE_KEY = "audit_utm";

export function captureUtmFromSearchParams(
  searchParams: URLSearchParams,
): UtmParams {
  return {
    utmSource: searchParams.get("utm_source") ?? undefined,
    utmMedium: searchParams.get("utm_medium") ?? undefined,
    utmCampaign: searchParams.get("utm_campaign") ?? undefined,
  };
}

export function storeUtmParams(params: UtmParams): void {
  if (typeof window === "undefined") return;
  const hasAny = params.utmSource || params.utmMedium || params.utmCampaign;
  if (!hasAny) return;
  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}

export const AUDIT_ANSWERS_KEY = "audit_answers";
export const AUDIT_RESULT_KEY = "audit_result";

export function storeAuditAnswers(answers: Record<string, string>): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUDIT_ANSWERS_KEY, JSON.stringify(answers));
}

export function storeAuditResult(result: unknown): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUDIT_RESULT_KEY, JSON.stringify(result));
}

export function getStoredAuditResult(): unknown | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(AUDIT_RESULT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getStoredAuditAnswers(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(AUDIT_ANSWERS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return null;
  }
}

export function clearAuditAnswers(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUDIT_ANSWERS_KEY);
}

export function clearAuditSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUDIT_ANSWERS_KEY);
  sessionStorage.removeItem(AUDIT_RESULT_KEY);
}
