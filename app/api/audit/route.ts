import { NextResponse } from "next/server";
import { z } from "zod";
import { computeAuditResult, validateAuditAnswers } from "@/lib/audit/score";
import {
  sendAuditNotification,
  sendAuditReportToLead,
} from "@/lib/email";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

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
    let submissionId = crypto.randomUUID();
    let savedToDatabase = false;

    if (isSupabaseConfigured()) {
      try {
        const supabase = createSupabaseServiceClient();
        const { data: rows, error } = await supabase
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
          .select("id");

        if (error) {
          console.error("Audit insert error:", error.message, error.code, error.details);
        } else if (rows?.[0]?.id) {
          submissionId = rows[0].id;
          savedToDatabase = true;
        }
      } catch (dbErr) {
        console.error("Audit database error:", dbErr);
      }
    }

    if (!savedToDatabase) {
      console.warn(
        "Audit submission not saved to database — continuing with email delivery.",
      );
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

    return NextResponse.json({
      ok: true,
      id: submissionId,
      result,
      savedToDatabase,
    });
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
