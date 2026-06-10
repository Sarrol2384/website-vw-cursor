import type { Metadata } from "next";
import { PageBanner } from "@/components/marketing/PageBanner";
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
      <PageBanner
        eyebrow="Help centre"
        title="Frequently asked questions"
        description="Common questions about how we work, what you get, and what to expect."
      />
      <section className="bg-brand-cream px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl bg-card p-6 shadow-sm sm:p-8">
          <FAQAccordion items={faq} />
        </div>
      </section>
      <CTABand settings={settings} />
    </>
  );
}
