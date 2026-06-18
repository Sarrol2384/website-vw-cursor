import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import type { AuditResult } from "@/lib/audit/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid submission id" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("audit_submissions")
    .select("id, name, business_name, score, tier, results")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const results = data.results as AuditResult;

  return NextResponse.json({
    id: data.id,
    name: data.name,
    businessName: data.business_name,
    score: data.score,
    tier: data.tier,
    tierLabel: results.tierLabel,
    savings: results.savings,
    recommendations: results.recommendations,
    biggestChallenge: results.biggestChallenge,
    disclaimer: results.disclaimer,
  });
}
