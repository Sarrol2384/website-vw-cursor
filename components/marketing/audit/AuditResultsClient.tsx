"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuditResults } from "@/components/marketing/audit/AuditResults";
import type { AuditPublicResult } from "@/lib/audit/types";
import { getStoredAuditResult } from "@/lib/audit/session";

type AuditResultsPageProps = {
  whatsappPhone?: string;
};

export function AuditResultsClient({ whatsappPhone }: AuditResultsPageProps) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [result, setResult] = useState<AuditPublicResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("No report found. Please complete the assessment first.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/api/audit/${id}`);
        if (res.ok) {
          const data = (await res.json()) as AuditPublicResult;
          setResult(data);
          return;
        }

        const cached = getStoredAuditResult() as AuditPublicResult | null;
        if (cached && cached.id === id) {
          setResult(cached);
          return;
        }

        throw new Error("Report not found");
      } catch {
        setError("We couldn't load your report. Please try again or contact us.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-muted-foreground">Loading your report…</p>
    );
  }

  if (error || !result) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
        <p className="text-muted-foreground">{error ?? "Report not found."}</p>
        <a
          href="/ai-audit/assessment"
          className="mt-4 inline-block text-accent hover:underline"
        >
          Start the assessment
        </a>
      </div>
    );
  }

  return <AuditResults result={result} whatsappPhone={whatsappPhone} />;
}
