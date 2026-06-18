"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AuditAnswers } from "@/lib/audit/types";
import { clearAuditAnswers, getStoredUtmParams, storeAuditResult } from "@/lib/audit/session";
import type { AuditPublicResult } from "@/lib/audit/types";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Phone number is required"),
  consent: z.boolean().refine((v) => v === true, {
    message: "POPIA consent is required",
  }),
});

type FormData = z.infer<typeof schema>;

type AuditLeadGateProps = {
  answers: AuditAnswers;
  previewScore: number;
  previewTierLabel: string;
  onBack: () => void;
  onComplete: (submissionId: string) => void;
};

export function AuditLeadGate({
  answers,
  previewScore,
  previewTierLabel,
  onBack,
  onComplete,
}: AuditLeadGateProps) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: undefined },
  });

  const consent = watch("consent");

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      const utm = getStoredUtmParams();
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          businessName: data.businessName,
          email: data.email,
          phone: data.phone,
          answers,
          consent: true,
          utmSource: utm.utmSource,
          utmMedium: utm.utmMedium,
          utmCampaign: utm.utmCampaign,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to submit assessment");
      }

      const body = (await res.json()) as {
        id: string;
        result?: AuditPublicResult;
      };

      if (body.result) {
        storeAuditResult({
          ...body.result,
          id: body.id,
          name: data.name,
          businessName: data.businessName,
        });
      }

      clearAuditAnswers();
      toast.success("Report sent — check your inbox.");
      onComplete(body.id);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="rounded-xl bg-accent/10 p-5 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Your AI Readiness Score
          </p>
          <p className="mt-1 font-heading text-5xl text-accent">{previewScore}/100</p>
          <p className="mt-2 text-lg font-semibold">{previewTierLabel}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Enter your details below to unlock your full savings breakdown and
            recommended solutions.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="audit-name">Name *</Label>
            <Input id="audit-name" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="audit-business">Business name *</Label>
            <Input id="audit-business" {...register("businessName")} />
            {errors.businessName && (
              <p className="text-xs text-destructive">
                {errors.businessName.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="audit-email">Email *</Label>
              <Input id="audit-email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="audit-phone">Phone *</Label>
              <Input id="audit-phone" {...register("phone")} />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="audit-consent"
              checked={consent === true}
              onCheckedChange={(checked) =>
                setValue(
                  "consent",
                  checked === true ? true : (undefined as never),
                )
              }
            />
            <Label
              htmlFor="audit-consent"
              className="text-sm font-normal leading-snug"
            >
              I consent to VonWillingh Online processing my personal information
              to send my AI Readiness Report and follow up, in line with POPIA.
            </Label>
          </div>
          {errors.consent && (
            <p className="text-xs text-destructive">{errors.consent.message}</p>
          )}

          <div className="flex items-center justify-between gap-4 pt-2">
            <Button type="button" variant="ghost" onClick={onBack}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Sending…" : "Email my report"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
