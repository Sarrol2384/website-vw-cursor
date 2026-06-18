-- Create audit_submissions (if missing) and ensure API access.
-- Safe to run even if 006 was never applied.

CREATE TABLE IF NOT EXISTS audit_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  score INTEGER NOT NULL,
  tier TEXT NOT NULL,
  answers JSONB NOT NULL,
  results JSONB NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  consent BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_submissions_created_at
  ON audit_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_submissions_score
  ON audit_submissions(score DESC);

ALTER TABLE audit_submissions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'audit_submissions'
      AND policyname = 'Anyone can submit audit'
  ) THEN
    CREATE POLICY "Anyone can submit audit" ON audit_submissions
      FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'audit_submissions'
      AND policyname = 'Admin read audit'
  ) THEN
    CREATE POLICY "Admin read audit" ON audit_submissions
      FOR SELECT USING (is_admin());
  END IF;
END $$;

GRANT ALL ON TABLE public.audit_submissions TO service_role;
GRANT INSERT ON TABLE public.audit_submissions TO anon, authenticated;
GRANT SELECT ON TABLE public.audit_submissions TO service_role;

NOTIFY pgrst, 'reload schema';
