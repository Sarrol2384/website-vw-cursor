import type { Metadata } from "next";
import Link from "next/link";
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
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold">Services</h1>
            <p className="mt-3 text-muted-foreground">
              End-to-end web application development for South African
              businesses — from first prototype to long-term support.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <LinkButton href="/contact">Discuss your project</LinkButton>
          </div>
        </div>
      </section>
      <CTABand settings={settings} />
    </>
  );
}
