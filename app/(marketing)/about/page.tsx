import type { Metadata } from "next";
import { PageBanner } from "@/components/marketing/PageBanner";
import { CTABand } from "@/components/marketing/CTABand";
import { getSiteSettings } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Sarrol Von Willingh and VonWillingh Online — custom web applications for South African businesses.",
};

const techStack = [
  "Next.js & React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Vercel",
  "Claude AI",
  "Brevo Email",
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageBanner
        eyebrow="Who we are"
        title="About VonWillingh Online"
        description={settings.tagline ?? undefined}
      />
      <section className="bg-brand-cream px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6 text-muted-foreground">
            {settings.about_bio && (
              <p className="text-lg text-foreground">{settings.about_bio}</p>
            )}
            {settings.about_story && <p>{settings.about_story}</p>}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border-0 bg-primary text-primary-foreground shadow-lg">
            <div className="h-1.5 bg-accent" />
            <div className="p-8">
              <h2 className="font-heading text-2xl">Sarrol Von Willingh</h2>
              <p className="mt-2 text-sm text-primary-foreground/70">
                Founder, VonWillingh Online
              </p>
              <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
                {settings.contact_email && (
                  <li>
                    Email:{" "}
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {settings.contact_email}
                    </a>
                  </li>
                )}
                {settings.contact_phone && (
                  <li>Phone: {settings.contact_phone}</li>
                )}
                {settings.address && <li>{settings.address}</li>}
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-heading text-2xl">How we build</h2>
            <p className="mt-2 text-muted-foreground">
              We use a modern, proven stack that is fast to develop, secure to
              host, and affordable for South African SMEs to maintain.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border-0 bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTABand settings={settings} />
    </>
  );
}
