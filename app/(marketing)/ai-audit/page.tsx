import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Sparkles, TrendingUp } from "lucide-react";
import { AuditUtmCapture } from "@/components/marketing/audit/AuditUtmCapture";
import { PageBanner } from "@/components/marketing/PageBanner";
import { LinkButton } from "@/components/ui/link-button";

export const metadata: Metadata = {
  title: "Free AI Audit",
  description:
    "Answer 10 simple questions and receive a free AI Readiness Report. Discover how much time and money AI could save your business.",
};

const highlights = [
  {
    icon: Clock,
    title: "3 minutes",
    description: "Ten quick questions about how your business runs today.",
  },
  {
    icon: TrendingUp,
    title: "Personalized score",
    description: "See your AI readiness score and estimated monthly savings.",
  },
  {
    icon: Sparkles,
    title: "Actionable recommendations",
    description: "Get tailored AI solutions for your biggest challenges.",
  },
];

export default function AiAuditLandingPage() {
  return (
    <>
      <Suspense fallback={null}>
        <AuditUtmCapture />
      </Suspense>

      <PageBanner
        eyebrow="Free AI audit"
        title="Discover how much time and money AI could save your business in 3 minutes"
        description="Answer 10 simple questions and receive a free AI Readiness Report with estimated savings and recommended solutions."
      />

      <section className="bg-brand-cream px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-card p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 font-heading text-xl">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <LinkButton href="/ai-audit/assessment" size="lg" variant="accent">
              Start assessment
            </LinkButton>
            <p className="mt-4 text-sm text-muted-foreground">
              Join Cape Town businesses exploring practical AI for everyday
              operations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
