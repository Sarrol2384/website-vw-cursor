# VonWillingh Online — Deployment Guide

Deploy the agency website to **Supabase** (database + auth) and **Vercel** (hosting).

---

## 1. Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run migrations in order:
   - [`supabase/migrations/001_schema.sql`](../supabase/migrations/001_schema.sql)
   - [`supabase/migrations/002_seed.sql`](../supabase/migrations/002_seed.sql)

   Tip: In Cursor, open each file → Ctrl+A → Ctrl+C → paste in Supabase SQL Editor.
3. In **Authentication → Users**, create your admin user (email + password).
4. Copy the user's UUID from the users table, then run:

```sql
INSERT INTO admin_users (user_id) VALUES ('your-auth-user-uuid');
```

5. From **Project Settings → API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret)

---

## 2. Brevo (contact form email)

1. Create an account at [brevo.com](https://www.brevo.com).
2. Create an API key → `BREVO_API_KEY`
3. Set `CONTACT_TO_EMAIL=sarrol@vonwillingh.co.za`

---

## 3. Local development

```bash
cp .env.local.example .env.local
# Fill in Supabase and Brevo keys

npm install
npm run dev
```

- **Public site:** http://localhost:3015
- **Admin CMS:** http://localhost:3015/admin/login

Without Supabase env vars, the site runs with built-in fallback content (read-only public pages).

---

## 4. GitHub

```bash
git add .
git commit -m "VonWillingh Online agency site"
git remote add origin git@github.com:YOUR_USER/vonwillingh-online.git
git push -u origin main
```

Use a **private** repository.

---

## 5. Vercel

1. Import the GitHub repo at [vercel.com](https://vercel.com).
2. Set environment variables:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
| `BREVO_API_KEY` | Brevo API key |
| `CONTACT_TO_EMAIL` | sarrol@vonwillingh.co.za |

3. Deploy. Build command: `next build` (default).

---

## 6. Custom domain

1. In Vercel → **Settings → Domains**, add `vonwillingh.co.za`.
2. Update DNS at your registrar per Vercel instructions.
3. Update `NEXT_PUBLIC_SITE_URL` to `https://vonwillingh.co.za` and redeploy.

---

## 7. Post-deploy checklist

- [ ] Sign in at `/admin/login` with your Supabase user
- [ ] Review seeded projects, services, pricing, FAQ, blog
- [ ] Upload your logo to `public/brand/` (replace `logo.svg`)
- [ ] Test contact form — check Brevo email and `/admin/leads`
- [ ] Confirm live demo links on projects are correct

---

## Admin CMS sections

| Path | Purpose |
|------|---------|
| `/admin` | Dashboard |
| `/admin/projects` | Portfolio case studies |
| `/admin/services` | Service offerings |
| `/admin/pricing` | Pricing packages |
| `/admin/faq` | FAQ items |
| `/admin/blog` | Blog posts (markdown) |
| `/admin/leads` | Contact form submissions |
| `/admin/settings` | Site name, hero, contact info, stats |
