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

async function withSupabaseFallback<T>(
  fallback: T,
  query: () => Promise<T>,
): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    return await query();
  } catch (error) {
    console.error("Supabase query failed, using fallback content:", error);
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return withSupabaseFallback(fallbackSettings, async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data ?? fallbackSettings;
  });
}

export async function getPublishedProjects(): Promise<ProjectWithImages[]> {
  const fallback = fallbackProjects.filter((p) => p.published);
  return withSupabaseFallback(fallback, async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(*)")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data as ProjectWithImages[]) ?? fallback;
  });
}

export async function getFeaturedProjects(): Promise<ProjectWithImages[]> {
  const projects = await getPublishedProjects();
  return projects.filter((p) => p.featured).slice(0, 3);
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectWithImages | null> {
  const fallback =
    fallbackProjects.find((p) => p.slug === slug && p.published) ?? null;
  return withSupabaseFallback(fallback, async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(*)")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw error;
    return data as ProjectWithImages | null;
  });
}

export async function getPublishedServices(): Promise<Service[]> {
  const fallback = fallbackServices.filter((s) => s.published);
  return withSupabaseFallback(fallback, async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? fallback;
  });
}

export async function getPricingPackages(): Promise<PricingPackage[]> {
  return withSupabaseFallback(fallbackPricing, async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("pricing_packages")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? fallbackPricing;
  });
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return withSupabaseFallback(fallbackFaq, async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("faq_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? fallbackFaq;
  });
}

function mergePublishedBlogPosts(dbPosts: BlogPost[]): BlogPost[] {
  const fallback = fallbackBlogPosts.filter((p) => p.status === "published");
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const missing = fallback.filter((p) => !dbSlugs.has(p.slug));
  return [...dbPosts, ...missing].sort(
    (a, b) =>
      new Date(b.published_at ?? 0).getTime() -
      new Date(a.published_at ?? 0).getTime(),
  );
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const fallback = fallbackBlogPosts.filter((p) => p.status === "published");
  return withSupabaseFallback(fallback, async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error) throw error;
    return mergePublishedBlogPosts(data ?? []);
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const fallback =
    fallbackBlogPosts.find((p) => p.slug === slug && p.status === "published") ??
    null;
  return withSupabaseFallback(fallback, async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    return data ?? fallback;
  });
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
