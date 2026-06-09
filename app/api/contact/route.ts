import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { sendContactNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10),
  consent: z.literal(true),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    if (isSupabaseConfigured()) {
      const supabase = createSupabaseServiceClient();
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone ?? null,
          company: data.company ?? null,
          project_type: data.projectType ?? null,
          message: data.message,
        },
      ]);
      if (error) {
        console.error("Contact insert error:", error);
        return NextResponse.json(
          { error: "Failed to save submission" },
          { status: 500 },
        );
      }
    }

    await sendContactNotification({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      projectType: data.projectType,
      message: data.message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
