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
3. In **Senders & Domains**, verify the address you will send from → `BREVO_SENDER_EMAIL` (e.g. `vonwillinghc@gmail.com`)
4. Set who receives alerts → `CONTACT_TO_EMAIL` (comma-separated for multiple inboxes, e.g. `sarrol@vonwillingh.co.za,vonwillinghc@gmail.com`)

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
| `BREVO_SENDER_EMAIL` | Verified Brevo sender (e.g. `vonwillinghc@gmail.com`) |
| `CONTACT_TO_EMAIL` | Alert recipient(s), comma-separated |

3. Deploy. Build command: `next build` (default).

---

## 6. Custom domain (vonwillingh.co.za + www)

Use Vercel project **`website-vw-cursor-q9qk`** (the one with env vars). Do not attach domains to the empty `website-vw-cursor` project.

### 6a. Add domains in Vercel

1. Open [Vercel → website-vw-cursor-q9qk → Settings → Domains](https://vercel.com).
2. Add `vonwillingh.co.za` and `www.vonwillingh.co.za`.
3. Set **`vonwillingh.co.za`** as the primary domain and redirect `www` to apex (Vercel Domains UI, or via `vercel.json` redirect in this repo).

### 6b. DNS at your registrar

Add these records (confirm exact values in the Vercel Domains UI):

| Host | Type | Value |
|------|------|-------|
| `@` (apex) | `A` | `76.76.21.21` |
| `www` | `CNAME` | `cname.vercel-dns.com` |

Remove any old `A` / `CNAME` records pointing elsewhere (e.g. legacy hosting at `102.206.25.74`). Propagation can take 5–60 minutes (sometimes up to 48 hours for `.co.za`).

### 6c. Environment variable

In Vercel → **Settings → Environment Variables**:

- `NEXT_PUBLIC_SITE_URL` = `https://vonwillingh.co.za`

Redeploy once after saving.

### 6d. Supabase auth URLs

In Supabase → **Authentication → URL Configuration**:

- **Site URL:** `https://vonwillingh.co.za`
- **Redirect URLs:** `https://vonwillingh.co.za/**` and `https://www.vonwillingh.co.za/**`

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
