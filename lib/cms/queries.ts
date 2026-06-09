import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  BlogPost,
  ContactSubmission,
  FaqItem,
  PricingPackage,
  ProjectWithImages,
  Service,
  SiteSettings,
} from "@/lib/supabase/types";
import {
  fallbackBlogPosts,
  fallbackFaq,
  fallbackPricing,
  fallbackProjects,
  fallbackServices,
  fallbackSettings,
} from "./fallback";

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) return fallbackSettings;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  return data ?? fallbackSettings;
}

export async function getPublishedProjects(): Promise<ProjectWithImages[]> {
  if (!isSupabaseConfigured()) {
    return fallbackProjects.filter((p) => p.published);
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (data as ProjectWithImages[]) ?? fallbackProjects;
}

export async function getFeaturedProjects(): Promise<ProjectWithImages[]> {
  const projects = await getPublishedProjects();
  return projects.filter((p) => p.featured).slice(0, 3);
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectWithImages | null> {
  if (!isSupabaseConfigured()) {
    return fallbackProjects.find((p) => p.slug === slug && p.published) ?? null;
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  return data as ProjectWithImages | null;
}

export async function getPublishedServices(): Promise<Service[]> {
  if (!isSupabaseConfigured()) {
    return fallbackServices.filter((s) => s.published);
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return data ?? fallbackServices;
}

export async function getPricingPackages(): Promise<PricingPackage[]> {
  if (!isSupabaseConfigured()) {
    return fallbackPricing;
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("pricing_packages")
    .select("*")
    .order("sort_order", { ascending: true });

  return data ?? fallbackPricing;
}

export async function getFaqItems(): Promise<FaqItem[]> {
  if (!isSupabaseConfigured()) {
    return fallbackFaq;
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("faq_items")
    .select("*")
    .order("sort_order", { ascending: true });

  return data ?? fallbackFaq;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    return fallbackBlogPosts.filter((p) => p.status === "published");
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return data ?? fallbackBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    return (
      fallbackBlogPosts.find(
        (p) => p.slug === slug && p.status === "published",
      ) ?? null
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  return data;
}

export async function getAllProjectsAdmin(): Promise<ProjectWithImages[]> {
  if (!isSupabaseConfigured()) return fallbackProjects;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .order("sort_order", { ascending: true });

  return (data as ProjectWithImages[]) ?? [];
}

export async function getAllServicesAdmin(): Promise<Service[]> {
  if (!isSupabaseConfigured()) return fallbackServices;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  return data ?? [];
}

export async function getAllPricingAdmin(): Promise<PricingPackage[]> {
  if (!isSupabaseConfigured()) return fallbackPricing;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("pricing_packages")
    .select("*")
    .order("sort_order", { ascending: true });

  return data ?? [];
}

export async function getAllFaqAdmin(): Promise<FaqItem[]> {
  if (!isSupabaseConfigured()) return fallbackFaq;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("faq_items")
    .select("*")
    .order("sort_order", { ascending: true });

  return data ?? [];
}

export async function getAllBlogPostsAdmin(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return fallbackBlogPosts;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getContactSubmissionsAdmin(): Promise<
  ContactSubmission[]
> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export function getProjectCategories(
  projects: ProjectWithImages[],
): string[] {
  const cats = new Set(
    projects.map((p) => p.category).filter(Boolean) as string[],
  );
  return Array.from(cats).sort();
}
