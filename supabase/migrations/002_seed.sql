-- Seed VonWillingh Online CMS content
-- Run after creating your admin user in Supabase Auth, then:
-- INSERT INTO admin_users (user_id) VALUES ('your-auth-user-uuid');

INSERT INTO site_settings (
  site_name, tagline, hero_title, hero_subtitle,
  contact_email, contact_phone, whatsapp, address,
  stats_projects, stats_industries, stats_years,
  about_bio, about_story
) VALUES (
  'VonWillingh Online',
  'Custom web applications for South African businesses',
  'We build web apps that run your business',
  'From mortuary registers to property platforms and learning systems — modern, secure, cloud-hosted software built for South African SMEs.',
  'sarrol@vonwillingh.co.za',
  '081 216 3629',
  '27812163629',
  '177 Magdouw Street, Russel''s Rest, Eerste River, 7100',
  10, 6, 5,
  'Sarrol Von Willingh is the founder of VonWillingh Online, building custom web applications for South African businesses — from funeral services and property agencies to education institutes and professional services.',
  'VonWillingh Online started with a simple goal: replace outdated desktop software and scattered spreadsheets with modern web apps that staff can use from any device. Every project is designed around real daily workflows, hosted securely in the cloud, and supported long after go-live.'
) ON CONFLICT DO NOTHING;

INSERT INTO projects (slug, title, client, category, industry, summary, body, problem, solution, outcome, stack, features, demo_url, featured, sort_order, published) VALUES
('sweet-victory-mortuary-register', 'Sweet Victory Mortuary Register', 'Sweet Victory Funeral Services', 'Business Systems', 'Funeral Services',
 'Cloud-based mortuary register replacing legacy MORFUS / Microsoft Access.',
 'A full vertical system for daily mortuary operations.', 'Legacy Microsoft Access system required local installs and Access licences.', 'Modern Next.js web app with Supabase and Vercel hosting.', 'Complete replacement for day-to-day mortuary work.',
 ARRAY['Next.js','TypeScript','Supabase','Prisma','Tailwind','Vercel'],
 ARRAY['Dashboard with KPI cards','Mortuary register','Capture and edit records','Book-out and paid status','Reports and permission letters','Staff login'],
 NULL, true, 1, true),
('eyethu-property-sales-marketing', 'Eyethu Property Sales & Marketing', 'Eyethu Property Group', 'Property Tech', 'Real Estate',
 'AI-powered property listing and lead generation platform.',
 'Public property grid with AI-generated copy and agent portal.', 'Needed modern property marketing with POPIA-compliant lead capture.', 'Full marketing platform with Claude AI and Brevo.', 'Live property marketing site with lead notifications.',
 ARRAY['Next.js','Supabase','Claude AI','Brevo','Tailwind','Vercel'],
 ARRAY['Property listings','AI copy generation','Bond calculator','Lead capture','Admin and agent dashboards'],
 'https://eyethu-sales-marketing.vercel.app', true, 2, true),
('pbk-lms', 'PBK Learning Management System', 'PBK Memorial Management and Leadership Institute', 'Education', 'Higher Education',
 'Full LMS with NQF-aligned qualifications, payments, and certificates.',
 'Complete online learning platform with assessments and certificates.', 'Needed accredited online qualification delivery.', 'Next.js LMS with Supabase, S3, and jsPDF certificates.', 'End-to-end education delivery platform.',
 ARRAY['Next.js','Supabase','AWS S3','Brevo','jsPDF'],
 ARRAY['Course management','Student and lecturer portals','Assessments','Payments','PDF certificates'],
 NULL, true, 3, true),
('digital-business-cards', 'Digital Business Cards', 'Eyethu, KrisKa, VonWillingh Barbershop', 'Digital Cards', 'Multi-industry',
 'Mobile-first link-in-bio digital business cards with admin dashboard.',
 'Productized digital card platform for agents and small businesses.', 'Needed professional mobile presence without full website build.', 'Templated Next.js cards with Supabase admin.', 'Deployed for multiple clients quickly.',
 ARRAY['Next.js','Supabase','Tailwind','Vercel'],
 ARRAY['Link-in-bio layout','WhatsApp and contact links','Admin CMS','Multi-agent support'],
 'https://eyethu-digital-card.vercel.app/nomonde-blandile', false, 4, true),
('propreport', 'PropReport', 'Eyethu Property Group', 'Property Tech', 'Real Estate',
 'Real estate performance reporting SaaS with PDF and WhatsApp.',
 'Commission tracking and automated reporting for property agencies.', 'Manual commission tracking was time-consuming.', 'Reporting SaaS with Claude, PDF, WhatsApp, and Stripe.', 'Automated performance reporting.',
 ARRAY['Next.js','Supabase','Claude AI','Stripe','Brevo'],
 ARRAY['Commission splits','PDF reports','WhatsApp summaries','Stripe billing'],
 NULL, false, 5, true),
('eyethu-property-crm', 'Eyethu Property CRM', 'Eyethu Property Group', 'Property Tech', 'Real Estate',
 'Transaction CRM with buyer/seller portals and reporting.',
 'Property transaction management beyond marketing.', 'Needed central transaction management.', 'Full CRM on Next.js and Supabase.', 'Deep client partnership demonstrated.',
 ARRAY['Next.js','Supabase','shadcn/ui','TanStack Query'],
 ARRAY['Mandate management','Buyer/seller portals','Super-admin dashboard','Reports'],
 NULL, false, 6, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (title, description, icon, sort_order, published) VALUES
('Custom Business Web Apps', 'Workflow systems with staff login, dashboards, and reports.', 'layout-dashboard', 1, true),
('Digital Business Cards', 'Mobile-first link-in-bio pages with admin dashboard.', 'smartphone', 2, true),
('Property & Real Estate Platforms', 'Listings, marketing, CRM, and reporting for property agencies.', 'building-2', 3, true),
('Learning Management Systems', 'Courses, assessments, enrollments, and certificates.', 'graduation-cap', 4, true),
('AI Integrations', 'Claude-powered content and intelligent workflows.', 'sparkles', 5, true),
('Hosting & Care Plans', 'Ongoing hosting, updates, and business-hours support.', 'shield-check', 6, true);

INSERT INTO pricing_packages (name, price_from_zar, price_note, features, recommended, sort_order) VALUES
('Digital Business Card', 3500, 'Once-off setup',
 ARRAY['Mobile-first link-in-bio page','Admin dashboard','Deployed on your URL','30 days post-launch support'], false, 1),
('Custom App Go-Live', 32000, 'Once-off + monthly care from R1,200/mo',
 ARRAY['Custom web application','Database and auth setup','Up to 5 staff logins','2 training sessions','30 days priority fixes','Monthly care plan'], true, 2),
('Enterprise / Multi-Module', 55000, 'Scoped per project',
 ARRAY['Multi-module platforms','AI integrations','Custom workflows','Phased payments','Dedicated support','Legacy data migration'], false, 3);

INSERT INTO faq_items (question, answer, category, sort_order) VALUES
('How long does a typical project take?', 'Digital cards: 1–2 weeks. Custom apps: 4–12 weeks depending on scope.', 'General', 1),
('Do you offer phased payments?', 'Yes — deposit, beta, and go-live milestones for larger projects.', 'Pricing', 2),
('Who owns the code and data?', 'Your business data belongs to you. Terms are set in your project agreement.', 'Legal', 3),
('Is hosting included?', 'Go-live includes HTTPS cloud deployment. Ongoing hosting is in the monthly care plan.', 'Hosting', 4),
('Are you POPIA compliant?', 'We build with POPIA in mind — consent, HTTPS, encrypted DB, restricted staff access.', 'Legal', 5),
('Can you migrate legacy data?', 'Yes where feasible — scoped and quoted separately (e.g. Access .mdb imports).', 'Technical', 6),
('What tech stack do you use?', 'Next.js, TypeScript, Tailwind, Supabase, deployed on Vercel.', 'Technical', 7),
('Do you provide training?', 'Yes — included sessions in custom app packages; extra sessions on request.', 'Support', 8);

INSERT INTO blog_posts (slug, title, excerpt, body, status, published_at) VALUES
('why-nextjs-supabase', 'Why we build on Next.js and Supabase',
 'A practical stack for South African SMEs — fast to build, secure to host, and affordable to maintain.',
 E'## Modern tools, real business outcomes\n\nAt VonWillingh Online we choose technology based on what works for **South African SMEs**.\n\n### Next.js\nFast, responsive apps on any device.\n\n### Supabase\nPostgreSQL, auth, and secure access.\n\n### Vercel\nHTTPS hosting with automatic deployments.\n\n**Need a custom app?** Get in touch via our contact page.',
 'published', now()),
('digital-cards-for-sa-businesses', 'Digital business cards for South African businesses',
 'A professional mobile presence in days — perfect for agents and local services.',
 E'## Your business card, always up to date\n\nOne link for WhatsApp, email, and social. Updated anytime from admin.\n\n**Packages from R3,500 once-off.**',
 'published', now())
ON CONFLICT (slug) DO NOTHING;
