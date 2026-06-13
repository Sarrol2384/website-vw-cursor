import { ArrowRight, Search, Hammer, Rocket, HeadphonesIcon } from "lucide-react";
import { HeroOffer } from "@/components/marketing/HeroOffer";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { CTABand } from "@/components/marketing/CTABand";
import { LinkButton } from "@/components/ui/link-button";
import {
  getFeaturedProjects,
  getPublishedServices,
  getSiteSettings,
} from "@/lib/cms/queries";

export default async function HomePage() {
  const [settings, featured, services] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getPublishedServices(),
  ]);

  const stats = [
    { value: `${settings.stats_projects ?? 10}+`, label: "Projects delivered" },
    { value: `${settings.stats_industries ?? 6}`, label: "Industries served" },
    { value: `${settings.stats_years ?? 5}+`, label: "Years building" },
  ];

  const process = [
    {
      icon: Search,
      title: "Discover",
      desc: "We learn your daily workflow, pain points, and goals.",
    },
    {
      icon: Hammer,
      title: "Build",
      desc: "Modern web app on Next.js, Supabase, and Vercel.",
    },
    {
      icon: Rocket,
      title: "Launch",
      desc: "Training, staff logins, and a live cloud URL.",
    },
    {
      icon: HeadphonesIcon,
      title: "Support",
      desc: "Monthly care plan for hosting, updates, and fixes.",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-8 pt-12 sm:px-8 sm:pb-12 sm:pt-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="mb-4 inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              Websites for local businesses
            </span>
            <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Your business online — from only{" "}
              <span className="text-accent">R1,999</span>
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <span className="text-lg text-muted-foreground line-through decoration-2">
                Normal price R4,999
              </span>
              <span className="rounded-md bg-accent/15 px-2.5 py-1 text-sm font-semibold text-accent">
                Save R3,000 — intro offer
              </span>
            </div>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A professional, mobile-friendly website for your salon, shop, clinic,
              or trades business — built with modern tech, not WordPress templates
              or drag-and-drop page builders. Fast on Vercel, secure HTTPS, and
              ready to win local customers on Google.
            </p>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              We also build full custom web apps when you outgrow a brochure site.
              This offer is for a quality starter website with your branding,
              contact details, and lead capture.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinkButton href="/contact" size="lg" variant="accent">
                Claim the R1,999 offer
                <ArrowRight className="ml-2 h-4 w-4" />
              </LinkButton>
              <LinkButton href="/projects" size="lg" variant="outline">
                See our work
              </LinkButton>
            </div>
          </div>

          <HeroOffer />
        </div>
      </section>

      <section className="relative z-10 px-6 sm:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border-0 bg-card shadow-lg sm:px-10">
          <div className="h-1.5 bg-accent" />
          <div className="grid grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-3 sm:gap-6 sm:text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-4xl text-accent">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Case studies"
                title="Featured projects"
                description="Real systems built for South African businesses"
              />
              <LinkButton href="/projects" variant="outline" className="shrink-0">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </LinkButton>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featured.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured={index === 1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-brand-cream px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Our services"
            title="What we build"
            description="From digital cards to full business platforms"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                featured={index % 3 === 1}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <LinkButton href="/services" variant="outline">
              All services
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Our process"
            title="How we work"
            description="A clear path from discovery to long-term support"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="group relative rounded-2xl border-0 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="font-heading text-4xl text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand settings={settings} />
    </>
  );
}
