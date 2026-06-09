import type {
  BlogPost,
  FaqItem,
  PricingPackage,
  ProjectWithImages,
  Service,
  SiteSettings,
} from "@/lib/supabase/types";

const now = new Date().toISOString();

export const fallbackSettings: SiteSettings = {
  id: "00000000-0000-0000-0000-000000000001",
  site_name: "VonWillingh Online",
  tagline: "Custom web applications for South African businesses",
  hero_title: "We build web apps that run your business",
  hero_subtitle:
    "From mortuary registers to property platforms and learning systems — modern, secure, cloud-hosted software built for South African SMEs.",
  contact_email: "sarrol@vonwillingh.co.za",
  contact_phone: "081 216 3629",
  whatsapp: "27812163629",
  address: "177 Magdouw Street, Russel's Rest, Eerste River, 7100",
  stats_projects: 10,
  stats_industries: 6,
  stats_years: 5,
  about_bio:
    "Sarrol Von Willingh is the founder of VonWillingh Online, building custom web applications for South African businesses — from funeral services and property agencies to education institutes and professional services.",
  about_story:
    "VonWillingh Online started with a simple goal: replace outdated desktop software and scattered spreadsheets with modern web apps that staff can use from any device. Every project is designed around real daily workflows, hosted securely in the cloud, and supported long after go-live.",
  social_linkedin: "",
  social_github: "",
  updated_at: now,
};

export const fallbackProjects: ProjectWithImages[] = [
  {
    id: "p1",
    slug: "sweet-victory-mortuary-register",
    title: "Sweet Victory Mortuary Register",
    client: "Sweet Victory Funeral Services",
    category: "Business Systems",
    industry: "Funeral Services",
    summary:
      "Cloud-based mortuary register replacing legacy MORFUS / Microsoft Access — staff workflows from intake to book-out and reports.",
    body: "A full vertical system for daily mortuary operations: capture deceased records, fridge register, book-out, paid status, movements, reports, and permission letters — all from a browser on any device.",
    problem:
      "Sweet Victory relied on a legacy Microsoft Access mortuary system (MORFUS) that required local installs, Access licences, and was difficult to maintain.",
    solution:
      "A modern Next.js web application with Supabase authentication, PostgreSQL database, and Vercel hosting — giving staff secure access from PC, tablet, or phone.",
    outcome:
      "Complete replacement for day-to-day mortuary work with dashboard KPIs, searchable register, audit trails, and print-ready permission letters.",
    stack: ["Next.js", "TypeScript", "Supabase", "Prisma", "Tailwind", "Vercel"],
    features: [
      "Dashboard with KPI cards",
      "Mortuary register with search and filters",
      "Capture and edit deceased records",
      "Book-out and paid status",
      "Reports and permission letters",
      "Staff login and settings",
    ],
    demo_url: null,
    cover_url: null,
    featured: true,
    sort_order: 1,
    published: true,
    created_at: now,
    updated_at: now,
    project_images: [],
  },
  {
    id: "p2",
    slug: "eyethu-property-sales-marketing",
    title: "Eyethu Property Sales & Marketing",
    client: "Eyethu Property Group",
    category: "Property Tech",
    industry: "Real Estate",
    summary:
      "AI-powered property listing and lead generation platform with bond calculator, POPIA consent, and agent portal.",
    body: "Public property grid with per-listing landing pages, AI-generated copy via Claude, lead capture, admin dashboard, and agent portal for Cape Town real estate.",
    problem:
      "Eyethu needed a modern way to market affordable homes in the Western Cape and capture leads with POPIA-compliant consent.",
    solution:
      "A full marketing platform with AI content generation, bond calculator (SA prime, FLISP), Brevo email integration, and role-based admin and agent portals.",
    outcome:
      "Live property marketing site with automated lead notifications and agent self-service for listing management.",
    stack: ["Next.js", "Supabase", "Claude AI", "Brevo", "Tailwind", "Vercel"],
    features: [
      "Property listings and landing pages",
      "AI-generated marketing copy",
      "Bond calculator",
      "Lead capture with POPIA consent",
      "Admin and agent dashboards",
    ],
    demo_url: "https://eyethu-sales-marketing.vercel.app",
    cover_url: null,
    featured: true,
    sort_order: 2,
    published: true,
    created_at: now,
    updated_at: now,
    project_images: [],
  },
  {
    id: "p3",
    slug: "pbk-lms",
    title: "PBK Learning Management System",
    client: "PBK Memorial Management and Leadership Institute",
    category: "Education",
    industry: "Higher Education",
    summary:
      "Full LMS with NQF-aligned qualifications, student and lecturer portals, payments, and PDF certificates.",
    body: "A complete online learning platform with course structure (modules, units, assessments), student enrollment, proof-of-payment workflow, lecturer grading, and certificate generation.",
    problem:
      "PBK needed a platform to deliver accredited qualifications online with structured learning paths and certificate issuance.",
    solution:
      "Next.js LMS with Supabase backend, AWS S3 file uploads, Brevo email notifications, and jsPDF certificate generation — plus a full public marketing site.",
    outcome:
      "End-to-end education delivery from application and payment through to assessment completion and certified qualifications.",
    stack: ["Next.js", "Supabase", "AWS S3", "Brevo", "jsPDF", "Tailwind"],
    features: [
      "Course and module management",
      "Student and lecturer portals",
      "Assessment submission and grading",
      "Payment and enrollment workflow",
      "PDF certificate generation",
      "Public marketing site",
    ],
    demo_url: null,
    cover_url: null,
    featured: true,
    sort_order: 3,
    published: true,
    created_at: now,
    updated_at: now,
    project_images: [],
  },
  {
    id: "p4",
    slug: "digital-business-cards",
    title: "Digital Business Cards",
    client: "Eyethu, KrisKa Solutions, VonWillingh Barbershop",
    category: "Digital Cards",
    industry: "Multi-industry",
    summary:
      "Mobile-first link-in-bio digital business cards with admin dashboard — a repeatable product for agents and small businesses.",
    body: "A productized digital card platform: one URL per person or business with contact links, services, gallery, and password-protected admin to update content without code.",
    problem:
      "Agents and small businesses needed a professional mobile presence without building a full website from scratch.",
    solution:
      "A templated Next.js digital card with Supabase-backed multi-agent support, image pipeline, and VonWillingh Online footer credit.",
    outcome:
      "Deployed for multiple clients with fast turnaround — each card live on its own URL within days.",
    stack: ["Next.js", "Supabase", "Tailwind", "Vercel"],
    features: [
      "Mobile-first link-in-bio layout",
      "Contact, WhatsApp, and social links",
      "Services and gallery sections",
      "Admin content management",
      "Multi-agent scaffold",
    ],
    demo_url: "https://eyethu-digital-card.vercel.app/nomonde-blandile",
    cover_url: null,
    featured: false,
    sort_order: 4,
    published: true,
    created_at: now,
    updated_at: now,
    project_images: [],
  },
  {
    id: "p5",
    slug: "propreport",
    title: "PropReport",
    client: "Eyethu Property Group",
    category: "Property Tech",
    industry: "Real Estate",
    summary:
      "Real estate performance reporting SaaS with commission splits, PDF reports, WhatsApp summaries, and Stripe billing.",
    body: "PropReport helps property agencies track performance, generate commission split reports, export PDFs, and send WhatsApp summaries to stakeholders.",
    problem:
      "Manual commission tracking and report generation was time-consuming and error-prone for property agencies.",
    solution:
      "A dedicated reporting SaaS with Claude-assisted insights, PDF generation, WhatsApp integration, and Stripe subscription billing.",
    outcome:
      "Automated performance reporting branded as PropReport by VonWillingh Online.",
    stack: ["Next.js", "Supabase", "Claude AI", "Stripe", "Brevo", "Tailwind"],
    features: [
      "Commission split tracking",
      "PDF report generation",
      "WhatsApp summary delivery",
      "Stripe subscription billing",
      "Agency dashboard",
    ],
    demo_url: null,
    cover_url: null,
    featured: false,
    sort_order: 5,
    published: true,
    created_at: now,
    updated_at: now,
    project_images: [],
  },
  {
    id: "p6",
    slug: "eyethu-property-crm",
    title: "Eyethu Property CRM",
    client: "Eyethu Property Group",
    category: "Property Tech",
    industry: "Real Estate",
    summary:
      "Transaction CRM for real estate mandates with buyer/seller portals and super-admin reporting.",
    body: "A property transaction management system covering mandates, buyer and seller portals, super-admin dashboard, and performance reports.",
    problem:
      "Eyethu needed a central system to manage property transactions beyond marketing and listings.",
    solution:
      "A full CRM built on Next.js and Supabase with role-based portals, mandate tracking, and integrated reporting.",
    outcome:
      "Demonstrates depth of client partnership — marketing, cards, CRM, and reporting under one agency relationship.",
    stack: ["Next.js", "Supabase", "shadcn/ui", "TanStack Query", "Recharts"],
    features: [
      "Mandate management",
      "Buyer and seller portals",
      "Super-admin dashboard",
      "Transaction reports",
      "Role-based access",
    ],
    demo_url: null,
    cover_url: null,
    featured: false,
    sort_order: 6,
    published: true,
    created_at: now,
    updated_at: now,
    project_images: [],
  },
];

export const fallbackServices: Service[] = [
  {
    id: "s1",
    title: "Custom Business Web Apps",
    description:
      "Workflow systems with staff login, dashboards, reports, and daily operations — like replacing legacy desktop software with modern cloud apps.",
    icon: "layout-dashboard",
    sort_order: 1,
    published: true,
  },
  {
    id: "s2",
    title: "Digital Business Cards",
    description:
      "Mobile-first link-in-bio pages with admin dashboard. Fast to deploy, easy to update, perfect for agents and small businesses.",
    icon: "smartphone",
    sort_order: 2,
    published: true,
  },
  {
    id: "s3",
    title: "Property & Real Estate Platforms",
    description:
      "Listings, marketing sites, CRM, and reporting tools tailored for South African property agencies.",
    icon: "building-2",
    sort_order: 3,
    published: true,
  },
  {
    id: "s4",
    title: "Learning Management Systems",
    description:
      "Courses, assessments, enrollments, payments, and certificates for education providers and training institutes.",
    icon: "graduation-cap",
    sort_order: 4,
    published: true,
  },
  {
    id: "s5",
    title: "AI Integrations",
    description:
      "Claude-powered content generation, automated reporting, and intelligent workflows built into your business tools.",
    icon: "sparkles",
    sort_order: 5,
    published: true,
  },
  {
    id: "s6",
    title: "Hosting & Care Plans",
    description:
      "Ongoing cloud hosting, security updates, backup monitoring, and business-hours support after go-live.",
    icon: "shield-check",
    sort_order: 6,
    published: true,
  },
];

export const fallbackPricing: PricingPackage[] = [
  {
    id: "pr1",
    name: "Digital Business Card",
    price_from_zar: 3500,
    price_note: "Once-off setup",
    features: [
      "Mobile-first link-in-bio page",
      "Contact, WhatsApp, and social links",
      "Admin dashboard to update content",
      "Deployed on your URL",
      "30 days post-launch support",
    ],
    recommended: false,
    sort_order: 1,
  },
  {
    id: "pr2",
    name: "Custom App Go-Live",
    price_from_zar: 32000,
    price_note: "Once-off + monthly care from R1,200/mo",
    features: [
      "Custom web application deployment",
      "Database and authentication setup",
      "Up to 5 staff logins included",
      "2 × 1-hour training sessions",
      "30 days priority fixes after go-live",
      "Monthly hosting and care plan",
    ],
    recommended: true,
    sort_order: 2,
  },
  {
    id: "pr3",
    name: "Enterprise / Multi-Module",
    price_from_zar: 55000,
    price_note: "Scoped per project",
    features: [
      "Multi-module platforms (LMS, CRM, reporting)",
      "AI integrations and automation",
      "Custom reports and workflows",
      "Phased payment milestones",
      "Dedicated support and training",
      "Data migration from legacy systems",
    ],
    recommended: false,
    sort_order: 3,
  },
];

export const fallbackFaq: FaqItem[] = [
  {
    id: "f1",
    question: "How long does a typical project take?",
    answer:
      "Digital cards can go live within 1–2 weeks. Custom business apps typically take 4–12 weeks depending on scope. We agree milestones upfront so you know what to expect.",
    category: "General",
    sort_order: 1,
  },
  {
    id: "f2",
    question: "Do you offer phased payments?",
    answer:
      "Yes. For larger projects we offer deposit, beta, and go-live milestones so cash flow is manageable. Details are agreed in your proposal before work starts.",
    category: "Pricing",
    sort_order: 2,
  },
  {
    id: "f3",
    question: "Who owns the code and data?",
    answer:
      "Your business data belongs to you. We host it securely and can provide exports on request. Code ownership and licensing terms are set out in your project agreement.",
    category: "Legal",
    sort_order: 3,
  },
  {
    id: "f4",
    question: "Is hosting included?",
    answer:
      "Go-live includes deployment to a secure cloud URL (HTTPS). Ongoing hosting, updates, and support are covered by the monthly care plan from go-live.",
    category: "Hosting",
    sort_order: 4,
  },
  {
    id: "f5",
    question: "Are you POPIA compliant?",
    answer:
      "We build with POPIA in mind — consent checkboxes on lead forms, secure HTTPS, encrypted database connections, and access restricted to authorised staff only.",
    category: "Legal",
    sort_order: 5,
  },
  {
    id: "f6",
    question: "Can you migrate data from old systems?",
    answer:
      "Yes, where feasible. Legacy imports (e.g. Microsoft Access databases) are scoped and quoted separately based on data quality and record count.",
    category: "Technical",
    sort_order: 6,
  },
  {
    id: "f7",
    question: "What tech stack do you use?",
    answer:
      "We primarily build with Next.js, TypeScript, Tailwind CSS, and Supabase — deployed on Vercel. This stack is fast, secure, and cost-effective for South African SMEs.",
    category: "Technical",
    sort_order: 7,
  },
  {
    id: "f8",
    question: "Do you provide training?",
    answer:
      "Yes. Custom app packages include training sessions (video or on-site in the Cape Town / Eerste River area). Extra sessions are available on request.",
    category: "Support",
    sort_order: 8,
  },
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "why-nextjs-supabase",
    title: "Why we build on Next.js and Supabase",
    excerpt:
      "A practical stack for South African SMEs — fast to build, secure to host, and affordable to maintain.",
    body: `## Modern tools, real business outcomes

At VonWillingh Online we choose technology based on what works for **South African small and medium businesses** — not hype.

### Next.js for the frontend
- Fast, responsive web apps that work on phone, tablet, and desktop
- SEO-friendly public pages for marketing and listings
- One codebase for your public site and staff dashboards

### Supabase for the backend
- PostgreSQL database with automatic backups
- Built-in staff authentication
- Secure row-level access so only authorised users see sensitive data

### Vercel for hosting
- HTTPS by default
- Automatic deployments when we ship updates
- No server maintenance on your side

This combination lets us deliver production-ready systems in weeks, not months — and keep monthly hosting costs predictable.

**Need a custom app for your business?** [Get in touch](/contact).`,
    cover_url: null,
    status: "published",
    published_at: now,
    created_at: now,
    updated_at: now,
  },
  {
    id: "b2",
    slug: "digital-cards-for-sa-businesses",
    title: "Digital business cards for South African businesses",
    excerpt:
      "A professional mobile presence in days — not weeks. Perfect for agents, freelancers, and local services.",
    body: `## Your business card, always up to date

Paper cards get lost. Static websites take too long to build. A **digital business card** is the sweet spot:

- One link you share on WhatsApp, email, and social media
- Tap-to-call, WhatsApp, and directions
- Services, gallery, and bio — updated anytime from an admin panel
- Live on your own URL within days

We've deployed digital cards for property agents, professional services, and local businesses across South Africa.

### Who is it for?
- Property practitioners who need a polished mobile presence
- Small businesses that want bookings via WhatsApp
- Teams where each member needs their own card

**Packages start from R3,500 once-off.** [View pricing](/pricing) or [request a quote](/contact).`,
    cover_url: null,
    status: "published",
    published_at: now,
    created_at: now,
    updated_at: now,
  },
];
