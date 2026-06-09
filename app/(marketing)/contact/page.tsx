import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/marketing/ContactForm";
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

  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold">Contact us</h1>
          <p className="mt-3 text-muted-foreground">
            Tell us about your project and we&apos;ll get back to you within one
            business day.
          </p>

          <ul className="mt-8 space-y-4">
            {settings.contact_email && (
              <li className="flex gap-3 text-sm">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="hover:text-primary"
                >
                  {settings.contact_email}
                </a>
              </li>
            )}
            {settings.contact_phone && (
              <li className="flex gap-3 text-sm">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`tel:${settings.contact_phone.replace(/\s/g, "")}`}
                  className="hover:text-primary"
                >
                  {settings.contact_phone}
                </a>
              </li>
            )}
            {wa && (
              <li className="flex gap-3 text-sm">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href={whatsappUrl(
                    wa,
                    "Hi Sarrol, I'd like to discuss a project.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {settings.address && (
              <li className="flex gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {settings.address}
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
