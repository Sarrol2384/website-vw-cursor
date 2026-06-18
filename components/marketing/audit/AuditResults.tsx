"use client";

import { Check, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";
import { formatZar, whatsappUrl } from "@/lib/format";
import type { AuditPublicResult } from "@/lib/audit/types";

type AuditResultsProps = {
  result: AuditPublicResult;
  whatsappPhone?: string;
};

export function AuditResults({ result, whatsappPhone }: AuditResultsProps) {
  const waMessage = `Hi Sarrol, I completed the AI audit — score ${result.score}/100 (${result.tierLabel}). I'd like to book a free 30-minute strategy session.${result.businessName ? ` Business: ${result.businessName}.` : ""}`;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-medium text-muted-foreground">
          Your AI Readiness Score
        </p>
        <p className="mt-1 font-heading text-6xl text-accent">{result.score}/100</p>
        <p className="mt-2 text-xl font-semibold">{result.tierLabel}</p>
        {result.businessName && (
          <p className="mt-2 text-sm text-muted-foreground">
            {result.businessName}
          </p>
        )}
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="font-heading text-2xl">Potential monthly savings</h2>
        <p className="mt-1 text-sm text-muted-foreground">Estimated based on your answers</p>
        <dl className="mt-6 space-y-4">
          <div className="flex justify-between gap-4 border-b pb-4">
            <dt className="text-muted-foreground">Admin hours saved</dt>
            <dd className="font-semibold">
              {result.savings.adminHoursSavedMin}–{result.savings.adminHoursSavedMax}{" "}
              hrs/month
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-b pb-4">
            <dt className="text-muted-foreground">Estimated labour savings</dt>
            <dd className="font-semibold">
              {formatZar(result.savings.labourSavingsMinZar)}–
              {formatZar(result.savings.labourSavingsMaxZar)}/month
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Faster lead response</dt>
            <dd className="max-w-xs text-right font-semibold">
              {result.savings.leadResponseImprovement}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">{result.disclaimer}</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="font-heading text-2xl">Recommended solutions</h2>
        <ul className="mt-6 space-y-4">
          {result.recommendations.map((rec) => (
            <li key={rec.id} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold">{rec.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {rec.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center sm:p-8">
        <h2 className="font-heading text-2xl">Book a free 30-minute AI strategy session</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve emailed your full report to you. Ready to talk through your
          top opportunities?
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {whatsappPhone && (
            <a
              href={whatsappUrl(whatsappPhone, waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg", variant: "accent" }))}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Sarrol
            </a>
          )}
          <LinkButton href="/contact" size="lg" variant="outline">
            Contact us
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
