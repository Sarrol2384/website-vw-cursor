import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/supabase/types";

type TopBarProps = {
  settings: SiteSettings;
};

export function TopBar({ settings }: TopBarProps) {
  return (
    <div className="hidden border-b border-primary-foreground/10 bg-primary text-sm text-primary-foreground sm:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2.5 sm:px-8">
        <p className="text-primary-foreground/80">
          Ready to modernise your business software?{" "}
          <Link
            href="/contact"
            className="font-semibold text-accent hover:underline"
          >
            Contact us today
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-5 text-primary-foreground/75">
          {settings.contact_email && (
            <a
              href={`mailto:${settings.contact_email}`}
              className="inline-flex items-center gap-1.5 hover:text-accent"
            >
              <Mail className="h-3.5 w-3.5 text-accent" />
              {settings.contact_email}
            </a>
          )}
          {settings.contact_phone && (
            <a
              href={`tel:${settings.contact_phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              {settings.contact_phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
