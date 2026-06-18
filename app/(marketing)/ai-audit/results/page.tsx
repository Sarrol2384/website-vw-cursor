import type { Metadata } from "next";
import { Suspense } from "react";
import { AuditResultsClient } from "@/components/marketing/audit/AuditResultsClient";
import { getSiteSettings } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Your AI Readiness Report",
  description: "View your personalized AI Readiness Report and recommended solutions.",
};

export default async function AiAuditResultsPage() {
  const settings = await getSiteSettings();
  const whatsappPhone =
    settings.whatsapp ?? settings.contact_phone?.replace(/\D/g, "");

  return (
    <section className="bg-brand-cream px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Your report
          </p>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl">
            AI Readiness Report
          </h1>
        </div>
        <Suspense
          fallback={
            <p className="text-center text-muted-foreground">
              Loading your report…
            </p>
          }
        >
          <AuditResultsClient whatsappPhone={whatsappPhone || undefined} />
        </Suspense>
      </div>
    </section>
  );
}
