import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/supabase/types";

type FooterProps = {
  settings: SiteSettings;
};

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/brand/logo.svg"
            alt={settings.site_name}
            width={160}
            height={32}
            className="mb-4 h-8 w-auto"
          />
          <p className="max-w-sm text-sm text-muted-foreground">
            {settings.tagline ??
              "Custom web applications for South African businesses"}
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/projects" className="hover:text-foreground">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-foreground">
                Services
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Contact</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {settings.contact_email && (
              <li>
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="hover:text-foreground"
                >
                  {settings.contact_email}
                </a>
              </li>
            )}
            {settings.contact_phone && (
              <li>
                <a
                  href={`tel:${settings.contact_phone.replace(/\s/g, "")}`}
                  className="hover:text-foreground"
                >
                  {settings.contact_phone}
                </a>
              </li>
            )}
            {settings.address && <li>{settings.address}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {year} {settings.site_name} — Sarrol Von Willingh. All rights
        reserved.
      </div>
    </footer>
  );
}
