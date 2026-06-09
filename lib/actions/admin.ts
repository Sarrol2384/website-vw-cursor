"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/format";
import type {
  BlogPost,
  FaqItem,
  PricingPackage,
  Project,
  Service,
  SiteSettings,
} from "@/lib/supabase/types";

function revalidateAll() {
  revalidatePath("/", "layout");
  revalidatePath("/admin");
}

export async function updateSiteSettings(
  data: Partial<SiteSettings>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    const payload = { ...data, updated_at: new Date().toISOString() };

    if (existing) {
      const { error } = await supabase
        .from("site_settings")
        .update(payload)
        .eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("site_settings").insert(payload);
      if (error) throw error;
    }

    revalidateAll();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Update failed" };
  }
}

export async function upsertProject(
  data: Partial<Project> & { title: string; slug?: string },
): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    const slug = data.slug || slugify(data.title);
    const payload = {
      ...data,
      slug,
      updated_at: new Date().toISOString(),
    };

    if (data.id) {
      const { error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", data.id);
      if (error) throw error;
      revalidateAll();
      return { ok: true, id: data.id };
    }

    const { data: created, error } = await supabase
      .from("projects")
      .insert({ ...payload, slug })
      .select("id")
      .single();
    if (error) throw error;
    revalidateAll();
    return { ok: true, id: created.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteProject(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function upsertService(
  data: Partial<Service> & { title: string },
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    if (data.id) {
      const { error } = await supabase
        .from("services")
        .update(data)
        .eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("services").insert(data);
      if (error) throw error;
    }
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteService(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function upsertPricing(
  data: Partial<PricingPackage> & { name: string },
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    if (data.id) {
      const { error } = await supabase
        .from("pricing_packages")
        .update(data)
        .eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("pricing_packages").insert(data);
      if (error) throw error;
    }
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deletePricing(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase
      .from("pricing_packages")
      .delete()
      .eq("id", id);
    if (error) throw error;
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function upsertFaq(
  data: Partial<FaqItem> & { question: string; answer: string },
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    if (data.id) {
      const { error } = await supabase
        .from("faq_items")
        .update(data)
        .eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("faq_items").insert(data);
      if (error) throw error;
    }
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteFaq(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("faq_items").delete().eq("id", id);
    if (error) throw error;
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function upsertBlogPost(
  data: Partial<BlogPost> & { title: string; slug?: string },
): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    const slug = data.slug || slugify(data.title);
    const payload = {
      ...data,
      slug,
      updated_at: new Date().toISOString(),
      published_at:
        data.status === "published"
          ? data.published_at ?? new Date().toISOString()
          : data.published_at ?? null,
    };

    if (data.id) {
      const { error } = await supabase
        .from("blog_posts")
        .update(payload)
        .eq("id", data.id);
      if (error) throw error;
      revalidateAll();
      return { ok: true, id: data.id };
    }

    const { data: created, error } = await supabase
      .from("blog_posts")
      .insert({ ...payload, slug, body: data.body ?? "" })
      .select("id")
      .single();
    if (error) throw error;
    revalidateAll();
    return { ok: true, id: created.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteBlogPost(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function signOutAdmin(): Promise<void> {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
}
