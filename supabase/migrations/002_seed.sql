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

INSERT INTO projects (slug, title, client, category, industry, summary, body, problem, solution, outcome, stack, features, demo_url, cover_url, featured, sort_order, published) VALUES
('k1-solutions', 'K1 Solutions', 'K1 Solutions', 'Business Websites', 'Professional Services',
 'Modern business website for a South African solutions company — built with Next.js, not WordPress.',
 'A clean, fast marketing site for a trusted local partner.', 'Needed a credible online presence and easy lead capture.', 'Hand-coded Next.js site on Vercel with POPIA-aware contact flow.', 'Professional web presence supporting new enquiries.',
 ARRAY['Next.js','TypeScript','Tailwind','Vercel'],
 ARRAY['Mobile-first design','Services pages','Contact form','HTTPS hosting','Easy updates'],
 NULL, '/projects/k1-solutions-cover.png', true, 1, true),
('vonwillingh-barbershop', 'VonWillingh Barbershop', 'VonWillingh Barbershop', 'Local Business', 'Barber & Grooming',
 'Mobile-first barbershop website with services, gallery, and WhatsApp booking.',
 'Modern barbershop site with services, gallery, and one-tap WhatsApp.', 'Relied on word of mouth with no professional link to share.', 'Lightweight Next.js site with WhatsApp CTA.', 'One shareable URL for the shop.',
 ARRAY['Next.js','Tailwind','Vercel'],
 ARRAY['Service menu','Photo gallery','WhatsApp buttons','Hours and location','Mobile layout'],
 NULL, '/projects/vonwillingh-barbershop-cover.png', true, 2, true),
('connies-travel', 'Connie''s Travel & Tours', 'Connie''s Travel & Tours', 'Travel & Tourism', 'Cruise & Holidays',
 'Cruise and vacation booking website for South African travellers.',
 'Travel site promoting MSC Opera packages with pricing and booking CTAs.', 'Needed a professional site to market cruise packages.', 'Next.js travel site on Vercel.', 'Live cruise marketing site.',
 ARRAY['Next.js','TypeScript','Tailwind','Vercel'],
 ARRAY['Trip details','Cabin pricing','Booking CTAs','Mobile layout','Hero sections'],
 'https://conniestravel.vonwillingh.co.za', '/projects/connies-travel-cover.png', true, 3, true),
('pbk-lms', 'PBK Learning Management System', 'PBK Memorial Management and Leadership Institute', 'Education', 'Higher Education',
 'Full LMS with NQF-aligned qualifications, payments, and certificates.',
 'Complete online learning platform with assessments and certificates.', 'Needed accredited online qualification delivery.', 'Next.js LMS with Supabase, S3, and jsPDF certificates.', 'End-to-end education delivery platform.',
 ARRAY['Next.js','Supabase','AWS S3','Brevo','jsPDF'],
 ARRAY['Course management','Student and lecturer portals','Assessments','Payments','PDF certificates'],
 'https://pbk-lms-cursor-git-main-sarrol2384s-projects.vercel.app', '/projects/pbk-lms-cover.png', true, 4, true)
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
