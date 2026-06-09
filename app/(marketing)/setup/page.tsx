import type { Metadata } from "next";
import Link from "next/link";
import { SqlCopyBlock } from "@/components/setup/SqlCopyBlock";
import { getSetupMigrations } from "@/lib/setup/migrations";

export const metadata: Metadata = {
  title: "Database setup",
  description:
    "Copy Supabase SQL migrations for VonWillingh Online — schema, seed data, and admin user.",
  robots: { index: false, follow: false },
};

export default function SetupPage() {
  const migrations = getSetupMigrations();

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Supabase SQL setup</h1>
        <p className="mt-3 text-muted-foreground">
          Open{" "}
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Supabase → SQL Editor
          </a>
          , then copy and run each script below <strong>in order</strong>.
        </p>

        <ol className="mt-6 list-inside list-decimal space-y-1 text-sm text-muted-foreground">
          <li>Run <strong>001 — Schema</strong></li>
          <li>Run <strong>002 — Seed data</strong></li>
          <li>Create your admin user in Authentication → Users</li>
          <li>Run <strong>003 — Admin user</strong> (replace the UUID)</li>
        </ol>

        <div className="mt-10 space-y-6">
          {migrations.map((migration) => (
            <SqlCopyBlock
              key={migration.id}
              id={migration.id}
              title={migration.title}
              description={migration.description}
              sql={migration.sql}
            />
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Full deployment steps:{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact Sarrol
          </Link>{" "}
          or see <code className="text-xs">docs/DEPLOYMENT.md</code> in the
          repo. After setup, sign in at{" "}
          <Link href="/admin/login" className="text-primary hover:underline">
            /admin/login
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
