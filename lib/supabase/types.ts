export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          user_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          created_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          site_name: string;
          tagline: string | null;
          hero_title: string | null;
          hero_subtitle: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          whatsapp: string | null;
          address: string | null;
          stats_projects: number | null;
          stats_industries: number | null;
          stats_years: number | null;
          about_bio: string | null;
          about_story: string | null;
          social_linkedin: string | null;
          social_github: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          site_name?: string;
          tagline?: string | null;
          hero_title?: string | null;
          hero_subtitle?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          whatsapp?: string | null;
          address?: string | null;
          stats_projects?: number | null;
          stats_industries?: number | null;
          stats_years?: number | null;
          about_bio?: string | null;
          about_story?: string | null;
          social_linkedin?: string | null;
          social_github?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          site_name?: string;
          tagline?: string | null;
          hero_title?: string | null;
          hero_subtitle?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          whatsapp?: string | null;
          address?: string | null;
          stats_projects?: number | null;
          stats_industries?: number | null;
          stats_years?: number | null;
          about_bio?: string | null;
          about_story?: string | null;
          social_linkedin?: string | null;
          social_github?: string | null;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          client: string | null;
          category: string | null;
          industry: string | null;
          summary: string | null;
          body: string | null;
          problem: string | null;
          solution: string | null;
          outcome: string | null;
          stack: string[];
          features: string[];
          demo_url: string | null;
          cover_url: string | null;
          featured: boolean;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          client?: string | null;
          category?: string | null;
          industry?: string | null;
          summary?: string | null;
          body?: string | null;
          problem?: string | null;
          solution?: string | null;
          outcome?: string | null;
          stack?: string[];
          features?: string[];
          demo_url?: string | null;
          cover_url?: string | null;
          featured?: boolean;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          client?: string | null;
          category?: string | null;
          industry?: string | null;
          summary?: string | null;
          body?: string | null;
          problem?: string | null;
          solution?: string | null;
          outcome?: string | null;
          stack?: string[];
          features?: string[];
          demo_url?: string | null;
          cover_url?: string | null;
          featured?: boolean;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          url: string;
          alt: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          project_id: string;
          url: string;
          alt?: string | null;
          sort_order?: number;
        };
        Update: {
          id?: string;
          project_id?: string;
          url?: string;
          alt?: string | null;
          sort_order?: number;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          icon: string | null;
          sort_order: number;
          published: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
          published?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
          published?: boolean;
        };
      };
      pricing_packages: {
        Row: {
          id: string;
          name: string;
          price_from_zar: number | null;
          price_note: string | null;
          features: string[];
          recommended: boolean;
          sort_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          price_from_zar?: number | null;
          price_note?: string | null;
          features?: string[];
          recommended?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          price_from_zar?: number | null;
          price_note?: string | null;
          features?: string[];
          recommended?: boolean;
          sort_order?: number;
        };
      };
      faq_items: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          category?: string | null;
          sort_order?: number;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          category?: string | null;
          sort_order?: number;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          body: string;
          cover_url: string | null;
          status: string;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          body?: string;
          cover_url?: string | null;
          status?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          body?: string;
          cover_url?: string | null;
          status?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          project_type: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          project_type?: string | null;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          project_type?: string | null;
          message?: string;
          created_at?: string;
        };
      };
      audit_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          business_name: string | null;
          score: number;
          tier: string;
          answers: Record<string, unknown>;
          results: Record<string, unknown>;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          consent: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          business_name?: string | null;
          score: number;
          tier: string;
          answers: Record<string, unknown>;
          results: Record<string, unknown>;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          consent?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          business_name?: string | null;
          score?: number;
          tier?: string;
          answers?: Record<string, unknown>;
          results?: Record<string, unknown>;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          consent?: boolean;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectImage = Database["public"]["Tables"]["project_images"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type PricingPackage =
  Database["public"]["Tables"]["pricing_packages"]["Row"];
export type FaqItem = Database["public"]["Tables"]["faq_items"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type ContactSubmission =
  Database["public"]["Tables"]["contact_submissions"]["Row"];
export type AuditSubmission =
  Database["public"]["Tables"]["audit_submissions"]["Row"];

export type ProjectWithImages = Project & { project_images: ProjectImage[] };
