"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateSiteSettings } from "@/lib/actions/admin";
import type { SiteSettings } from "@/lib/supabase/types";

type SettingsFormProps = {
  settings: SiteSettings;
};

export function SettingsForm({ settings }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    site_name: settings.site_name,
    tagline: settings.tagline ?? "",
    hero_title: settings.hero_title ?? "",
    hero_subtitle: settings.hero_subtitle ?? "",
    contact_email: settings.contact_email ?? "",
    contact_phone: settings.contact_phone ?? "",
    whatsapp: settings.whatsapp ?? "",
    address: settings.address ?? "",
    stats_projects: settings.stats_projects ?? 10,
    stats_industries: settings.stats_industries ?? 6,
    stats_years: settings.stats_years ?? 5,
    about_bio: settings.about_bio ?? "",
    about_story: settings.about_story ?? "",
    social_linkedin: settings.social_linkedin ?? "",
    social_github: settings.social_github ?? "",
  });

  function update(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setLoading(true);
    const result = await updateSiteSettings({
      ...form,
      stats_projects: Number(form.stats_projects),
      stats_industries: Number(form.stats_industries),
      stats_years: Number(form.stats_years),
    });
    setLoading(false);
    if (result.ok) toast.success("Settings saved");
    else toast.error(result.error ?? "Save failed");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section className="space-y-4">
        <h2 className="font-semibold">General</h2>
        <div className="space-y-2">
          <Label>Site name</Label>
          <Input value={form.site_name} onChange={(e) => update("site_name", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Tagline</Label>
          <Input value={form.tagline} onChange={(e) => update("tagline", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Hero title</Label>
          <Input value={form.hero_title} onChange={(e) => update("hero_title", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Hero subtitle</Label>
          <Textarea value={form.hero_subtitle} onChange={(e) => update("hero_subtitle", e.target.value)} rows={2} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold">Contact</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={form.contact_email} onChange={(e) => update("contact_email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={form.contact_phone} onChange={(e) => update("contact_phone", e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>WhatsApp (digits only, e.g. 27812163629)</Label>
          <Input value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Address</Label>
          <Textarea value={form.address} onChange={(e) => update("address", e.target.value)} rows={2} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold">Stats (homepage)</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Projects</Label>
            <Input type="number" value={form.stats_projects} onChange={(e) => update("stats_projects", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Industries</Label>
            <Input type="number" value={form.stats_industries} onChange={(e) => update("stats_industries", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Years</Label>
            <Input type="number" value={form.stats_years} onChange={(e) => update("stats_years", e.target.value)} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold">About</h2>
        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea value={form.about_bio} onChange={(e) => update("about_bio", e.target.value)} rows={3} />
        </div>
        <div className="space-y-2">
          <Label>Story</Label>
          <Textarea value={form.about_story} onChange={(e) => update("about_story", e.target.value)} rows={4} />
        </div>
      </section>

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving…" : "Save settings"}
      </Button>
    </div>
  );
}
