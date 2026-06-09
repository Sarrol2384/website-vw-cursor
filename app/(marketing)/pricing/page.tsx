import type { Metadata } from "next";
import Link from "next/link";
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
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold">Pricing</h1>
            <p className="mt-3 text-muted-foreground">
              Starting prices in South African Rand. Every project is scoped to
              your needs —{" "}
              <Link href="/contact" className="text-primary hover:underline">
                request a detailed quote
              </Link>
              .
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
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
