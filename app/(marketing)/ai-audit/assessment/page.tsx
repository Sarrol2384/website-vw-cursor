"use client";

import { useRouter } from "next/navigation";
import { AuditWizard } from "@/components/marketing/audit/AuditWizard";

export default function AiAuditAssessmentPage() {
  const router = useRouter();

  function handleComplete(submissionId: string) {
    router.push(`/ai-audit/results?id=${submissionId}`);
  }

  return (
    <section className="bg-brand-cream px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            AI Readiness Assessment
          </p>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl">
            Tell us about your business
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Each answer helps us estimate your automation potential and recommend
            the right AI solutions.
          </p>
        </div>
        <AuditWizard onComplete={handleComplete} />
      </div>
    </section>
  );
}
