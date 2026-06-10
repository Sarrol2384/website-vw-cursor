import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/supabase/types";

type FooterProps = {
  settings: SiteSettings;
};

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/brand/logo.png"
            alt={settings.site_name}
            width={56}
            height={56}
            className="mb-5 h-14 w-14"
          />
          <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            {settings.tagline ??
              "Custom web applications for South African businesses"}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm text-primary-foreground/80">
            <li>
              <Link href="/projects" className="hover:text-primary-foreground">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary-foreground">
                Services
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-primary-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary-foreground">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
            Contact
          </h3>
          <ul className="space-y-2.5 text-sm text-primary-foreground/80">
            {settings.contact_email && (
              <li>
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="hover:text-primary-foreground"
                >
                  {settings.contact_email}
                </a>
              </li>
            )}
            {settings.contact_phone && (
              <li>
                <a
                  href={`tel:${settings.contact_phone.replace(/\s/g, "")}`}
                  className="hover:text-primary-foreground"
                >
                  {settings.contact_phone}
                </a>
              </li>
            )}
            {settings.address && <li>{settings.address}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/50">
        © {year} {settings.site_name} — Sarrol Von Willingh. All rights
        reserved.
      </div>
    </footer>
  );
}
