import type { Metadata } from "next";
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
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold">About VonWillingh Online</h1>
          <p className="mt-4 text-lg text-muted-foreground">{settings.tagline}</p>

          <div className="mt-10 space-y-6 text-muted-foreground">
            {settings.about_bio && (
              <p className="text-foreground">{settings.about_bio}</p>
            )}
            {settings.about_story && <p>{settings.about_story}</p>}
          </div>

          <div className="mt-12 rounded-xl border bg-muted/30 p-6">
            <h2 className="font-semibold">Sarrol Von Willingh</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Founder, VonWillingh Online
            </p>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              {settings.contact_email && (
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="text-primary hover:underline"
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

          <div className="mt-12">
            <h2 className="text-xl font-semibold">How we build</h2>
            <p className="mt-2 text-muted-foreground">
              We use a modern, proven stack that is fast to develop, secure to
              host, and affordable for South African SMEs to maintain.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border bg-background px-3 py-1 text-sm"
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
