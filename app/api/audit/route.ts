import { NextResponse } from "next/server";
import { z } from "zod";
import { computeAuditResult, validateAuditAnswers } from "@/lib/audit/score";
import {
  sendAuditNotification,
  sendAuditReportToLead,
} from "@/lib/email";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import type { AuditResult } from "@/lib/audit/types";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  businessName: z.string().min(2),
  answers: z.record(z.string(), z.string()),
  consent: z.literal(true),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    if (!validateAuditAnswers(data.answers)) {
      return NextResponse.json(
        { error: "Invalid or incomplete assessment answers" },
        { status: 400 },
      );
    }

    const result = computeAuditResult(data.answers);
    let submissionId: string | null = null;

    if (isSupabaseConfigured()) {
      const supabase = createSupabaseServiceClient();
      const { data: row, error } = await supabase
        .from("audit_submissions")
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            business_name: data.businessName,
            score: result.score,
            tier: result.tier,
            answers: data.answers,
            results: result as unknown as Record<string, unknown>,
            utm_source: data.utmSource ?? null,
            utm_medium: data.utmMedium ?? null,
            utm_campaign: data.utmCampaign ?? null,
            consent: true,
          },
        ])
        .select("id")
        .single();

      if (error) {
        console.error("Audit insert error:", error);
        return NextResponse.json(
          { error: "Failed to save submission" },
          { status: 500 },
        );
      }

      submissionId = row.id;
    } else {
      submissionId = crypto.randomUUID();
    }

    const emailPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      businessName: data.businessName,
      result,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
    };

    await Promise.all([
      sendAuditReportToLead(emailPayload),
      sendAuditNotification(emailPayload),
    ]);

    return NextResponse.json({ ok: true, id: submissionId, result });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    console.error("Audit API error:", err);
    return NextResponse.json(
      { error: "Failed to submit assessment" },
      { status: 500 },
    );
  }
}
