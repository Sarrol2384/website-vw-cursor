-- VonWillingh Online CMS schema

CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'VonWillingh Online',
  tagline TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  whatsapp TEXT,
  address TEXT,
  stats_projects INTEGER DEFAULT 10,
  stats_industries INTEGER DEFAULT 6,
  stats_years INTEGER DEFAULT 5,
  about_bio TEXT,
  about_story TEXT,
  social_linkedin TEXT,
  social_github TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client TEXT,
  category TEXT,
  industry TEXT,
  summary TEXT,
  body TEXT,
  problem TEXT,
  solution TEXT,
  outcome TEXT,
  stack TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}',
  demo_url TEXT,
  cover_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS pricing_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price_from_zar INTEGER,
  price_note TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  recommended BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT NOT NULL DEFAULT '',
  cover_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_type TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published, sort_order);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status, published_at DESC);

-- RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Public read policies
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read published projects" ON projects FOR SELECT USING (published = true OR is_admin());
CREATE POLICY "Public read project_images" ON project_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM projects p WHERE p.id = project_id AND (p.published = true OR is_admin()))
);
CREATE POLICY "Public read published services" ON services FOR SELECT USING (published = true OR is_admin());
CREATE POLICY "Public read pricing" ON pricing_packages FOR SELECT USING (true);
CREATE POLICY "Public read faq" ON faq_items FOR SELECT USING (true);
CREATE POLICY "Public read published blog" ON blog_posts FOR SELECT USING (status = 'published' OR is_admin());

-- Contact form insert (anon)
CREATE POLICY "Anyone can submit contact" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read contact" ON contact_submissions FOR SELECT USING (is_admin());

-- Admin write policies
CREATE POLICY "Admin manage admin_users" ON admin_users FOR ALL USING (is_admin());
CREATE POLICY "Admin write site_settings" ON site_settings FOR ALL USING (is_admin());
CREATE POLICY "Admin write projects" ON projects FOR ALL USING (is_admin());
CREATE POLICY "Admin write project_images" ON project_images FOR ALL USING (is_admin());
CREATE POLICY "Admin write services" ON services FOR ALL USING (is_admin());
CREATE POLICY "Admin write pricing" ON pricing_packages FOR ALL USING (is_admin());
CREATE POLICY "Admin write faq" ON faq_items FOR ALL USING (is_admin());
CREATE POLICY "Admin write blog" ON blog_posts FOR ALL USING (is_admin());

-- Storage bucket for CMS images
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms', 'cms', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read cms images" ON storage.objects
  FOR SELECT USING (bucket_id = 'cms');

CREATE POLICY "Admin upload cms images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'cms' AND is_admin());

CREATE POLICY "Admin update cms images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'cms' AND is_admin());

CREATE POLICY "Admin delete cms images" ON storage.objects
  FOR DELETE USING (bucket_id = 'cms' AND is_admin());
