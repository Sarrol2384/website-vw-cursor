-- Fix audit_submissions API access and refresh PostgREST schema cache.
-- Run this if audit form submissions fail with "Failed to save submission".

GRANT ALL ON TABLE public.audit_submissions TO service_role;
GRANT INSERT ON TABLE public.audit_submissions TO anon, authenticated;
GRANT SELECT ON TABLE public.audit_submissions TO service_role;

NOTIFY pgrst, 'reload schema';
