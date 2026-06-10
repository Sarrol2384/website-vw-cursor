import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/marketing/ContactForm";
import { ContactMap } from "@/components/marketing/ContactMap";
import { PageBanner } from "@/components/marketing/PageBanner";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { getSiteSettings } from "@/lib/cms/queries";
import { whatsappUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with VonWillingh Online for a quote on your next web application.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const wa = settings.whatsapp ?? settings.contact_phone?.replace(/\D/g, "");

  const contactItems = [
    settings.contact_email && {
      icon: Mail,
      label: "Email",
      value: settings.contact_email,
      href: `mailto:${settings.contact_email}`,
    },
    settings.contact_phone && {
      icon: Phone,
      label: "Phone",
      value: settings.contact_phone,
      href: `tel:${settings.contact_phone.replace(/\s/g, "")}`,
    },
    wa && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: whatsappUrl(wa, "Hi Sarrol, I'd like to discuss a project."),
      external: true,
    },
    settings.address && {
      icon: MapPin,
      label: "Office",
      value: settings.address,
    },
  ].filter(Boolean) as Array<{
    icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
  }>;

  return (
    <>
      <PageBanner
        eyebrow="Get in touch"
        title="Contact us"
        description="Tell us about your project and we'll get back to you within one business day."
      />

      <section className="bg-brand-cream px-6 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex h-full gap-4 rounded-2xl border-0 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="block hover:text-accent"
                    >
                      {content}
                    </a>
                  );
                }

                return <div key={item.label}>{content}</div>;
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border-0 bg-card shadow-sm lg:col-span-3">
            <div className="h-1.5 bg-accent" />
            <div className="p-6 lg:p-8">
              <h2 className="font-heading text-2xl">Send us a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Share a few details and we&apos;ll follow up with a clear proposal.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {settings.address && (
        <section className="px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Location"
              title="Find us"
              description={settings.address}
            />
            <div className="mt-8">
              <ContactMap address={settings.address} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
