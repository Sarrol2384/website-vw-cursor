import type { Metadata } from "next";
import { PageBanner } from "@/components/marketing/PageBanner";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { CTABand } from "@/components/marketing/CTABand";
import { LinkButton } from "@/components/ui/link-button";
import { getPublishedServices, getSiteSettings } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom web apps, digital business cards, property platforms, LMS, AI integrations, and hosting care plans.",
};

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
  ]);

  return (
    <>
      <PageBanner
        eyebrow="What we offer"
        title="Services"
        description="End-to-end web application development for South African businesses — from first prototype to long-term support."
      />
      <section className="bg-brand-cream px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                featured={index % 3 === 1}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <LinkButton href="/contact" variant="accent" size="lg">
              Discuss your project
            </LinkButton>
          </div>
        </div>
      </section>
      <CTABand settings={settings} />
    </>
  );
}
