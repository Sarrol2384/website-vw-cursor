-- AI Audit lead submissions

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

CREATE POLICY "Anyone can submit audit" ON audit_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin read audit" ON audit_submissions
  FOR SELECT USING (is_admin());
