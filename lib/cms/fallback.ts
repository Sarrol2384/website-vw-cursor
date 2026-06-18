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
  tagline: "Websites for local businesses",
  hero_title: "Your business online — from only R1,999",
  hero_subtitle:
    "Professional starter websites for South African SMEs — hand-built with Next.js and Vercel, not WordPress. Normal price R4,999; intro offer R1,999 once-off.",
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
    id: "p-k1",
    slug: "k1-solutions",
    title: "K1 Solutions",
    client: "K1 Solutions",
    category: "Business Websites",
    industry: "Professional Services",
    summary:
      "Modern business website for a South African solutions company — services, credibility, and lead capture built with Next.js, not WordPress.",
    body: "A clean, fast marketing site that positions K1 Solutions as a trusted local partner — mobile-friendly pages, contact enquiries, and professional branding hosted on Vercel with HTTPS.",
    problem:
      "K1 Solutions needed a credible online presence that reflected quality work and made it easy for prospects to get in touch.",
    solution:
      "A hand-coded Next.js website with responsive layout, fast Vercel hosting, and a POPIA-aware contact flow — no template clutter or plugin bloat.",
    outcome:
      "A professional web presence that supports new business enquiries and matches the quality of their services.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    features: [
      "Mobile-first responsive design",
      "Services and about pages",
      "Contact form with email alerts",
      "Fast HTTPS hosting on Vercel",
      "Easy content updates",
    ],
    demo_url: null,
    cover_url: "/projects/k1-solutions-cover.png",
    featured: true,
    sort_order: 1,
    published: true,
    created_at: now,
    updated_at: now,
    project_images: [
      {
        id: "pi-k1-1",
        project_id: "p-k1",
        url: "/projects/k1-solutions-cover.png",
        alt: "K1 Solutions website on laptop",
        sort_order: 0,
      },
    ],
  },
  {
    id: "p-barber",
    slug: "vonwillingh-barbershop",
    title: "VonWillingh Barbershop",
    client: "VonWillingh Barbershop",
    category: "Local Business",
    industry: "Barber & Grooming",
    summary:
      "Mobile-first barbershop website with services, gallery, and one-tap WhatsApp booking — built for local walk-in and appointment clients.",
    body: "A sharp, modern site for a neighbourhood barbershop: showcase cuts and pricing, share location and hours, and let customers message or book via WhatsApp from any phone.",
    problem:
      "The barbershop relied on word of mouth and social DMs — no single link to share services, prices, and location professionally.",
    solution:
      "A lightweight Next.js site with service listings, photo gallery, Google Maps link, and prominent WhatsApp CTA — fast on mobile data.",
    outcome:
      "One shareable URL for the shop — customers see services and contact the barber in seconds.",
    stack: ["Next.js", "Tailwind", "Vercel"],
    features: [
      "Service menu and pricing",
      "Photo gallery",
      "WhatsApp and call buttons",
      "Opening hours and location",
      "Mobile-optimised layout",
    ],
    demo_url: null,
    cover_url: "/projects/vonwillingh-barbershop-cover.png",
    featured: true,
    sort_order: 2,
    published: true,
    created_at: now,
    updated_at: now,
    project_images: [
      {
        id: "pi-barber-1",
        project_id: "p-barber",
        url: "/projects/vonwillingh-barbershop-cover.png",
        alt: "VonWillingh Barbershop website on mobile and desktop",
        sort_order: 0,
      },
    ],
  },
  {
    id: "p-connies",
    slug: "connies-travel",
    title: "Connie's Travel & Tours",
    client: "Connie's Travel & Tours",
    category: "Travel & Tourism",
    industry: "Cruise & Holidays",
    summary:
      "Vacation and cruise booking website for South African travellers — MSC Opera packages, cabin pricing, and trip details for the Durban to Cape Town route.",
    body: "A full travel marketing site promoting Connie's packaged cruise experiences: hero trip promotion, detailed itinerary, cabin price tiers, contact and booking CTAs, and a polished brand for South African holidaymakers.",
    problem:
      "Connie needed a professional site to market cruise packages and capture enquiries without juggling scattered WhatsApp messages and PDF brochures.",
    solution:
      "A Next.js travel site with trip landing pages, pricing tables, contact forms, and mobile-friendly layout — live on their own subdomain with fast Vercel hosting.",
    outcome:
      "Live site promoting the March 2026 MSC Opera cruise with clear pricing paths and booking calls-to-action.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    features: [
      "Trip details and itinerary pages",
      "Cabin pricing overview",
      "Contact and booking CTAs",
      "Mobile-first travel layout",
      "Brand-led hero sections",
    ],
    demo_url: "https://conniestravel.vonwillingh.co.za",
    cover_url: "/projects/connies-travel-cover.png",
    featured: true,
    sort_order: 3,
    published: true,
    created_at: now,
    updated_at: now,
    project_images: [
      {
        id: "pi-connies-1",
        project_id: "p-connies",
        url: "/projects/connies-travel-cover.png",
        alt: "Connie's Travel cruise website",
        sort_order: 0,
      },
    ],
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
    demo_url:
      "https://pbk-lms-cursor-git-main-sarrol2384s-projects.vercel.app",
    cover_url: "/projects/pbk-lms-cover.png",
    featured: true,
    sort_order: 4,
    published: true,
    created_at: now,
    updated_at: now,
    project_images: [
      {
        id: "pi-pbk-1",
        project_id: "p3",
        url: "/projects/pbk-lms-cover.png",
        alt: "PBK Learning Management System website",
        sort_order: 0,
      },
    ],
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

const blogPublishedAt = new Date().toISOString();

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "b3",
    slug: "benefits-of-custom-apps-by-industry",
    title: "The benefits of a custom app for your business — by industry",
    excerpt:
      "How funeral services, property agencies, education institutes, and other South African businesses gain from software built around their daily work — not generic off-the-shelf tools.",
    body: `## Why a custom app beats spreadsheets and legacy desktop software

Many South African SMEs still run on **Microsoft Access databases**, shared Excel files, paper registers, or software that only works on one office PC. A custom web app replaces that with one secure system your team can use from anywhere — phone, tablet, or desktop — with data backed up in the cloud.

The benefits are similar across industries, but the *impact* shows up in different ways. Here is how custom software helps real business types we work with.

---

## Funeral services & mortuary operations

Paper mortuary registers and old desktop systems (like legacy MORFUS setups) create risk: lost records, no audit trail, and staff locked to a single machine.

**Benefits of a custom mortuary app:**

- **Digital register** — search, filter, and update deceased records from any device
- **Fridge and book-out workflows** — clear status for intake, storage, release, and paid/unpaid
- **Reports and permission letters** — print-ready documents without retyping data
- **Staff logins** — each user sees only what they are allowed to access
- **Audit trail** — who changed what, and when

*Example: [Connie's Travel & Tours](/projects/connies-travel) — a cruise package site live for South African travellers.*

---

## Property & real estate

Agents juggle listings across WhatsApp, email, and spreadsheets. Leads get missed. Listing copy is inconsistent.

**Benefits of a custom property platform:**

- **One listing hub** — photos, pricing, and descriptions in a single admin panel
- **Lead capture with POPIA consent** — enquiries stored securely, not lost in a personal inbox
- **Bond calculators and landing pages** — each listing can have its own shareable URL
- **Agent portals** — teams update stock without calling the office
- **AI-assisted descriptions** — faster, consistent marketing copy (where you choose to use it)

*Example: [K1 Solutions](/projects/k1-solutions) — a professional business website built with Next.js.*

---

## Education & training institutes

Courses, enrolments, assignments, and certificates scattered across email and folders do not scale.

**Benefits of a custom learning management system (LMS):**

- **Student and course management** — enrolments, modules, and progress in one place
- **Content delivery** — notes, videos, and assessments online
- **Staff dashboards** — lecturers see their classes without IT support tickets
- **Certificates and reporting** — completion records for compliance and marketing
- **Secure hosting** — students access materials via login, not public links

*Example: [PBK Learning Management System](/projects/pbk-lms).*

---

## Professional services & local businesses

Law firms, consultants, barbers, travel agents, and tradespeople often need a **professional presence** and simple tools — not a full ERP.

**Benefits of digital business cards and light custom apps:**

- **One link for WhatsApp, email, and social** — always up to date
- **Tap-to-call and directions** — customers act in one tap on mobile
- **Booking and enquiry forms** — leads go to your inbox or CRM, not a lost DM
- **Brand consistency** — every team member shares the same quality experience
- **Fast to launch** — live in days, not months

Ideal when you need credibility and lead capture before investing in a larger platform.

---

## Retail, logistics, and operations-heavy SMEs

If your team repeats the same data entry across systems, or relies on one person who "knows where the file is," a custom ops app pays off quickly.

**Typical benefits:**

- **Single source of truth** — inventory, jobs, deliveries, or appointments in one database
- **Role-based access** — warehouse, admin, and management see what they need
- **Mobile-friendly** — drivers and floor staff use phones on site
- **Fewer errors** — validation rules and dropdowns instead of free-text chaos
- **Scalable hosting** — grow users and data without buying new server licences

---

## Cross-cutting benefits (every industry)

Whatever your sector, well-built custom software usually delivers:

| Benefit | What it means for you |
|--------|------------------------|
| **Work from anywhere** | Cloud URL + staff logins — not tied to one PC |
| **POPIA-aware design** | Consent on forms, HTTPS, access control on sensitive data |
| **Lower long-term cost** | No per-seat Access licences or ageing hardware dependencies |
| **Easier support** | One codebase we can update without visiting your office |
| **Your workflow** | Screens match how your team actually works — not a generic product |

---

## Is a custom app right for you?

A custom app makes sense when:

- Off-the-shelf software forces awkward workarounds
- You are outgrowing Excel or a legacy database
- Multiple staff need access at the same time
- You need reports, audit trails, or compliance records
- Your reputation depends on fast, professional client-facing tools

It may be overkill if you only need a simple brochure website with no login or data — a digital card or marketing site might be enough to start.

---

## Next steps

We scope every project around **your** daily workflow — mortuary registers, property listings, student enrolments, or something entirely different.

**[Tell us about your business](/contact)** and we will propose a clear path from discovery to go-live, including training and optional monthly support.`,
    cover_url: null,
    status: "published",
    published_at: blogPublishedAt,
    created_at: blogPublishedAt,
    updated_at: blogPublishedAt,
  },
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
