-- Refresh portfolio: remove legacy projects, add K1 Solutions, VonWillingh Barbershop, Connie's Travel

DELETE FROM projects
WHERE slug IN (
  'sweet-victory-mortuary-register',
  'eyethu-property-sales-marketing',
  'digital-business-cards',
  'propreport',
  'eyethu-property-crm'
);

INSERT INTO projects (
  slug, title, client, category, industry, summary, body, problem, solution, outcome,
  stack, features, demo_url, cover_url, featured, sort_order, published
) VALUES
(
  'k1-solutions',
  'K1 Solutions',
  'K1 Solutions',
  'Business Websites',
  'Professional Services',
  'Modern business website for a South African solutions company — services, credibility, and lead capture built with Next.js, not WordPress.',
  'A clean, fast marketing site that positions K1 Solutions as a trusted local partner.',
  'K1 Solutions needed a credible online presence that reflected quality work and made it easy for prospects to get in touch.',
  'A hand-coded Next.js website with responsive layout, fast Vercel hosting, and a POPIA-aware contact flow.',
  'A professional web presence that supports new business enquiries.',
  ARRAY['Next.js','TypeScript','Tailwind','Vercel'],
  ARRAY['Mobile-first responsive design','Services and about pages','Contact form with email alerts','Fast HTTPS hosting','Easy content updates'],
  NULL,
  '/projects/k1-solutions-cover.png',
  true,
  1,
  true
),
(
  'vonwillingh-barbershop',
  'VonWillingh Barbershop',
  'VonWillingh Barbershop',
  'Local Business',
  'Barber & Grooming',
  'Mobile-first barbershop website with services, gallery, and one-tap WhatsApp booking.',
  'A sharp, modern site for a neighbourhood barbershop with services, gallery, and WhatsApp CTA.',
  'The barbershop relied on word of mouth and social DMs — no single professional link to share.',
  'A lightweight Next.js site with service listings, gallery, and prominent WhatsApp CTA.',
  'One shareable URL — customers see services and contact the barber in seconds.',
  ARRAY['Next.js','Tailwind','Vercel'],
  ARRAY['Service menu and pricing','Photo gallery','WhatsApp and call buttons','Opening hours and location','Mobile-optimised layout'],
  NULL,
  '/projects/vonwillingh-barbershop-cover.png',
  true,
  2,
  true
),
(
  'connies-travel',
  'Connie''s Travel & Tours',
  'Connie''s Travel & Tours',
  'Travel & Tourism',
  'Cruise & Holidays',
  'Vacation and cruise booking website for South African travellers — MSC Opera packages and trip details.',
  'A full travel marketing site promoting packaged cruise experiences with pricing and booking CTAs.',
  'Connie needed a professional site to market cruise packages and capture enquiries.',
  'A Next.js travel site with trip pages, pricing tables, and mobile-friendly layout on Vercel.',
  'Live site promoting the MSC Opera Durban to Cape Town cruise experience.',
  ARRAY['Next.js','TypeScript','Tailwind','Vercel'],
  ARRAY['Trip details and itinerary pages','Cabin pricing overview','Contact and booking CTAs','Mobile-first layout','Brand-led hero sections'],
  'https://conniestravel.vonwillingh.co.za',
  '/projects/connies-travel-cover.png',
  true,
  3,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  client = EXCLUDED.client,
  category = EXCLUDED.category,
  industry = EXCLUDED.industry,
  summary = EXCLUDED.summary,
  body = EXCLUDED.body,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  outcome = EXCLUDED.outcome,
  stack = EXCLUDED.stack,
  features = EXCLUDED.features,
  demo_url = EXCLUDED.demo_url,
  cover_url = EXCLUDED.cover_url,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order,
  published = EXCLUDED.published,
  updated_at = now();

UPDATE projects
SET
  demo_url = 'https://pbk-lms-cursor-git-main-sarrol2384s-projects.vercel.app',
  cover_url = '/projects/pbk-lms-cover.png',
  featured = true,
  sort_order = 4,
  published = true,
  updated_at = now()
WHERE slug = 'pbk-lms';

DELETE FROM project_images
WHERE project_id IN (
  SELECT id FROM projects
  WHERE slug IN ('k1-solutions', 'vonwillingh-barbershop', 'connies-travel')
);

INSERT INTO project_images (project_id, url, alt, sort_order)
SELECT p.id, '/projects/k1-solutions-cover.png', 'K1 Solutions website on laptop', 0
FROM projects p WHERE p.slug = 'k1-solutions';

INSERT INTO project_images (project_id, url, alt, sort_order)
SELECT p.id, '/projects/vonwillingh-barbershop-cover.png', 'VonWillingh Barbershop website', 0
FROM projects p WHERE p.slug = 'vonwillingh-barbershop';

INSERT INTO project_images (project_id, url, alt, sort_order)
SELECT p.id, '/projects/connies-travel-cover.png', 'Connie''s Travel cruise website', 0
FROM projects p WHERE p.slug = 'connies-travel';

DELETE FROM project_images
WHERE project_id IN (SELECT id FROM projects WHERE slug = 'pbk-lms');

INSERT INTO project_images (project_id, url, alt, sort_order)
SELECT p.id, '/projects/pbk-lms-cover.png', 'PBK Learning Management System website', 0
FROM projects p WHERE p.slug = 'pbk-lms';
