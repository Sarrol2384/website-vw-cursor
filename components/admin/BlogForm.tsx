"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteBlogPost, upsertBlogPost } from "@/lib/actions/admin";
import type { BlogPost } from "@/lib/supabase/types";

type BlogFormProps = {
  post?: BlogPost;
};

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    body: post?.body ?? "",
    status: post?.status ?? "draft",
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setLoading(true);
    const result = await upsertBlogPost({
      id: post?.id,
      title: form.title,
      slug: form.slug || undefined,
      excerpt: form.excerpt || null,
      body: form.body,
      status: form.status,
    });
    setLoading(false);
    if (result.ok) {
      toast.success("Post saved");
      router.push("/admin/blog");
      router.refresh();
    } else {
      toast.error(result.error ?? "Save failed");
    }
  }

  async function handleDelete() {
    if (!post?.id || !confirm("Delete this post?")) return;
    const result = await deleteBlogPost(post.id);
    if (result.ok) {
      toast.success("Deleted");
      router.push("/admin/blog");
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
          <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={form.status} onValueChange={(v) => v && update("status", v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Excerpt</Label>
        <Textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={2} />
      </div>
      <div className="space-y-2">
        <Label>Body (markdown) *</Label>
        <Textarea value={form.body} onChange={(e) => update("body", e.target.value)} rows={16} className="font-mono text-sm" />
      </div>
      <div className="flex gap-2 pt-4">
        <Button onClick={handleSave} disabled={loading || !form.title}>
          {loading ? "Saving…" : "Save post"}
        </Button>
        {post?.id && (
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
