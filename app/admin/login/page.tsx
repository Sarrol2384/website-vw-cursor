"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const error = searchParams.get("error");

  const supabaseConfigured = isSupabaseConfigured();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseConfigured) {
      toast.error(
        "Supabase is not configured. Edit .env.local with your real keys, then restart npm run dev.",
      );
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;

      const redirectTo = searchParams.get("redirectTo") ?? "/admin";
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Invalid email or password";
      if (message === "Failed to fetch") {
        toast.error(
          "Cannot reach Supabase. Check NEXT_PUBLIC_SUPABASE_URL in .env.local and restart the dev server.",
        );
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin sign in</CardTitle>
          <CardDescription>VonWillingh Online CMS</CardDescription>
        </CardHeader>
        <CardContent>
          {(error === "supabase_not_configured" || !supabaseConfigured) && (
            <p className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              Supabase is not configured. Open <code className="text-xs">.env.local</code>,
              replace the placeholder URL and keys with values from Supabase →
              Project Settings → API, then restart <code className="text-xs">npm run dev</code>.
            </p>
          )}
          {error === "not_admin" && (
            <p className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              Your account is not in admin_users. Run{" "}
              <code className="text-xs">
                INSERT INTO admin_users (user_id) VALUES (&apos;your-uuid&apos;);
              </code>{" "}
              in Supabase SQL Editor.
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Back to site
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
