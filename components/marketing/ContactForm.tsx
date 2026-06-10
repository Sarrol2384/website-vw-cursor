"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const messageTemplates = [
  {
    id: "custom-app",
    label: "Custom web app quote",
    projectType: "custom-app",
    message:
      "I'd like a quote for a custom web application to replace our current spreadsheets or desktop software. Please let me know what information you need to scope the project.",
  },
  {
    id: "digital-card",
    label: "Digital business card",
    projectType: "digital-card",
    message:
      "I'm interested in a digital business card for my business. Please share pricing and how quickly we can go live.",
  },
  {
    id: "property",
    label: "Property platform",
    projectType: "property",
    message:
      "We need a property listing or sales platform with lead capture and admin tools. I'd like to discuss scope and pricing.",
  },
  {
    id: "lms",
    label: "Learning management system",
    projectType: "lms",
    message:
      "We're looking for a learning management system for courses, students, and staff. Please advise on the best approach and timeline.",
  },
  {
    id: "legacy",
    label: "Replace legacy software",
    projectType: "custom-app",
    message:
      "We still rely on old desktop software or Microsoft Access and need a modern cloud-based replacement. Can we book a discovery call?",
  },
  {
    id: "ai",
    label: "AI integration",
    projectType: "ai",
    message:
      "I'd like to explore AI features for our business (e.g. automated copy, lead handling, or workflow assistance). What would you recommend?",
  },
  {
    id: "hosting",
    label: "Hosting & support",
    projectType: "other",
    message:
      "We already have a web app and need reliable hosting, updates, and ongoing support. Please share your care plan options.",
  },
  {
    id: "general",
    label: "General enquiry",
    projectType: "other",
    message:
      "I'd like to discuss a project for my business. Please contact me to arrange a convenient time to talk.",
  },
] as const;

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, "Please tell us about your project"),
  consent: z.boolean().refine((v) => v === true, {
    message: "POPIA consent is required",
  }),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: undefined },
  });

  const consent = watch("consent");
  const projectType = watch("projectType");
  const messageField = register("message");

  function selectTemplate(template: (typeof messageTemplates)[number]) {
    setSelectedTemplate(template.id);
    setValue("message", template.message, { shouldValidate: true });
    setValue("projectType", template.projectType);
  }

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to send message");
      }
      toast.success("Message sent — we'll be in touch soon.");
      reset();
      setSelectedTemplate(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...register("company")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Project type</Label>
        <Select
          value={projectType}
          onValueChange={(v) => setValue("projectType", String(v ?? ""))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="digital-card">Digital business card</SelectItem>
            <SelectItem value="custom-app">Custom web application</SelectItem>
            <SelectItem value="lms">Learning management system</SelectItem>
            <SelectItem value="property">Property / real estate</SelectItem>
            <SelectItem value="ai">AI integration</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div>
          <Label>What can we help with?</Label>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a starting point below, then edit the message if you like.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {messageTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => selectTemplate(template)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-left text-sm transition-colors",
                selectedTemplate === template.id
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-background hover:border-accent/40 hover:bg-accent/5",
              )}
            >
              {template.label}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            rows={5}
            {...messageField}
            onChange={(e) => {
              messageField.onChange(e);
              setSelectedTemplate(null);
            }}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="consent"
          checked={consent === true}
          onCheckedChange={(checked) =>
            setValue("consent", checked === true ? true : (undefined as never))
          }
        />
        <Label htmlFor="consent" className="text-sm font-normal leading-snug">
          I consent to VonWillingh Online processing my personal information to
          respond to this enquiry, in line with POPIA.
        </Label>
      </div>
      {errors.consent && (
        <p className="text-xs text-destructive">{errors.consent.message}</p>
      )}

      <Button type="submit" variant="accent" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
