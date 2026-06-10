import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/marketing/PageBanner";
import { PricingCard } from "@/components/marketing/PricingCard";
import { CTABand } from "@/components/marketing/CTABand";
import { getPricingPackages, getSiteSettings } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent starting prices for digital cards, custom web apps, and enterprise platforms. All prices in ZAR.",
};

export default async function PricingPage() {
  const [settings, packages] = await Promise.all([
    getSiteSettings(),
    getPricingPackages(),
  ]);

  return (
    <>
      <PageBanner
        eyebrow="Transparent pricing"
        title="Pricing"
        description="Starting prices in South African Rand. Every project is scoped to your needs."
      />
      <section className="bg-brand-cream px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Need a detailed breakdown?{" "}
            <Link href="/contact" className="font-medium text-accent hover:underline">
              Request a custom quote
            </Link>
            .
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Prices exclusive of VAT unless otherwise stated. Optional add-ons
            (data migration, extra training, custom modules) quoted separately.
          </p>
        </div>
      </section>
      <CTABand settings={settings} />
    </>
  );
}
