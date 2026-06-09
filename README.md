# VonWillingh Online — Agency Website

Marketing site and CMS for **VonWillingh Online** — custom web applications for South African businesses.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Supabase · Brevo · Vercel

---

## Features

- **Public site:** Home, About, Services, Projects, Pricing, FAQ, Blog, Contact
- **Portfolio:** 6 curated case studies with filterable grid and detail pages
- **Admin CMS:** Manage all content at `/admin` (Supabase Auth)
- **Contact form:** Saves to Supabase + Brevo email notification
- **Fallback content:** Works locally without Supabase (seed data in code)

---

## Quick start

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open **http://localhost:3015**

For production setup, see **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

**Supabase SQL:** use **`/setup`** on your deployed site (or locally) — one-click **Copy SQL** buttons for schema, seed, and admin user scripts.

---

## Project layout

```
app/(marketing)/     # Public pages
app/admin/           # CMS (auth required)
app/api/contact/     # Contact form handler
components/marketing/
components/admin/
lib/cms/             # Queries + fallback seed data
lib/supabase/        # Supabase clients
supabase/migrations/ # Database schema + seed SQL
```

---

## Contact

**Sarrol Von Willingh** — VonWillingh Online  
sarrol@vonwillingh.co.za · 081 216 3629
