import { readFileSync } from "fs";
import { join } from "path";

function readMigration(filename: string): string {
  return readFileSync(
    join(process.cwd(), "supabase", "migrations", filename),
    "utf-8",
  );
}

export const ADMIN_USER_SQL = `INSERT INTO admin_users (user_id) VALUES ('your-auth-user-uuid');`;

export function getSetupMigrations() {
  return [
    {
      id: "001_schema",
      title: "001 — Schema",
      description:
        "Run first in Supabase SQL Editor. Creates tables, RLS policies, and storage bucket.",
      sql: readMigration("001_schema.sql"),
    },
    {
      id: "002_seed",
      title: "002 — Seed data",
      description:
        "Run second. Populates site settings, projects, services, pricing, FAQ, and blog posts.",
      sql: readMigration("002_seed.sql"),
    },
    {
      id: "admin_user",
      title: "003 — Admin user",
      description:
        "Run after creating your user in Supabase Authentication. Replace the UUID with your user ID.",
      sql: ADMIN_USER_SQL,
    },
  ];
}
