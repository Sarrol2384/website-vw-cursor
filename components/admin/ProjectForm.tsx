"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { deleteProject, upsertProject } from "@/lib/actions/admin";
import type { Project } from "@/lib/supabase/types";

type ProjectFormProps = {
  project?: Project;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    client: project?.client ?? "",
    category: project?.category ?? "",
    industry: project?.industry ?? "",
    summary: project?.summary ?? "",
    body: project?.body ?? "",
    problem: project?.problem ?? "",
    solution: project?.solution ?? "",
    outcome: project?.outcome ?? "",
    stack: (project?.stack ?? []).join(", "),
    features: (project?.features ?? []).join("\n"),
    demo_url: project?.demo_url ?? "",
    featured: project?.featured ?? false,
    published: project?.published ?? false,
    sort_order: project?.sort_order ?? 0,
  });

  function update(field: string, value: string | boolean | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setLoading(true);
    const result = await upsertProject({
      id: project?.id,
      title: form.title,
      slug: form.slug || undefined,
      client: form.client || null,
      category: form.category || null,
      industry: form.industry || null,
      summary: form.summary || null,
      body: form.body || null,
      problem: form.problem || null,
      solution: form.solution || null,
      outcome: form.outcome || null,
      stack: form.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      features: form.features
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      demo_url: form.demo_url || null,
      featured: form.featured,
      published: form.published,
      sort_order: Number(form.sort_order),
    });
    setLoading(false);
    if (result.ok) {
      toast.success("Project saved");
      router.push("/admin/projects");
      router.refresh();
    } else {
      toast.error(result.error ?? "Save failed");
    }
  }

  async function handleDelete() {
    if (!project?.id || !confirm("Delete this project?")) return;
    const result = await deleteProject(project.id);
    if (result.ok) {
      toast.success("Deleted");
      router.push("/admin/projects");
      router.refresh();
    } else {
      toast.error(result.error ?? "Delete failed");
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Title *</Label>
          <Input value={form.title} onChange={(e) => update("title", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="auto-generated" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Client</Label>
          <Input value={form.client} onChange={(e) => update("client", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Input value={form.category} onChange={(e) => update("category", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Industry</Label>
        <Input value={form.industry} onChange={(e) => update("industry", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Summary</Label>
        <Textarea value={form.summary} onChange={(e) => update("summary", e.target.value)} rows={2} />
      </div>
      <div className="space-y-2">
        <Label>Body (markdown)</Label>
        <Textarea value={form.body} onChange={(e) => update("body", e.target.value)} rows={4} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Problem</Label>
          <Textarea value={form.problem} onChange={(e) => update("problem", e.target.value)} rows={3} />
        </div>
        <div className="space-y-2">
          <Label>Solution</Label>
          <Textarea value={form.solution} onChange={(e) => update("solution", e.target.value)} rows={3} />
        </div>
        <div className="space-y-2">
          <Label>Outcome</Label>
          <Textarea value={form.outcome} onChange={(e) => update("outcome", e.target.value)} rows={3} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Stack (comma-separated)</Label>
        <Input value={form.stack} onChange={(e) => update("stack", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Features (one per line)</Label>
        <Textarea value={form.features} onChange={(e) => update("features", e.target.value)} rows={4} />
      </div>
      <div className="space-y-2">
        <Label>Demo URL</Label>
        <Input value={form.demo_url} onChange={(e) => update("demo_url", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Sort order</Label>
        <Input type="number" value={form.sort_order} onChange={(e) => update("sort_order", e.target.value)} />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={form.featured} onCheckedChange={(c) => update("featured", c === true)} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={form.published} onCheckedChange={(c) => update("published", c === true)} />
          Published
        </label>
      </div>
      <div className="flex gap-2 pt-4">
        <Button onClick={handleSave} disabled={loading || !form.title}>
          {loading ? "Saving…" : "Save project"}
        </Button>
        {project?.id && (
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
