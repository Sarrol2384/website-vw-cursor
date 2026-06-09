import type { Metadata } from "next";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { CTABand } from "@/components/marketing/CTABand";
import { getFaqItems, getSiteSettings } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about VonWillingh Online projects, pricing, hosting, and POPIA.",
};

export default async function FAQPage() {
  const [settings, faq] = await Promise.all([
    getSiteSettings(),
    getFaqItems(),
  ]);

  return (
    <>
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold">Frequently asked questions</h1>
          <p className="mt-3 text-muted-foreground">
            Common questions about how we work, what you get, and what to expect.
          </p>
          <div className="mt-10">
            <FAQAccordion items={faq} />
          </div>
        </div>
      </section>
      <CTABand settings={settings} />
    </>
  );
}
