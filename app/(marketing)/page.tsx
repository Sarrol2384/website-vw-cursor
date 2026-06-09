import Link from "next/link";
import { ArrowRight, Search, Hammer, Rocket, HeadphonesIcon } from "lucide-react";
import { ProjectCard } from "@/components/marketing/ProjectCard";
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
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 px-4 py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium text-primary-foreground/70">
            {settings.tagline}
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            {settings.hero_title ?? "We build web apps that run your business"}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
            {settings.hero_subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/projects" size="lg" variant="secondary">
              View our work
              <ArrowRight className="ml-2 h-4 w-4" />
            </LinkButton>
            <LinkButton
              href="/contact"
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              Get a quote
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Featured projects</h2>
                <p className="mt-1 text-muted-foreground">
                  Real systems built for South African businesses
                </p>
              </div>
              <LinkButton href="/projects" variant="ghost">
                View all
              </LinkButton>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-muted/40 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">What we build</h2>
            <p className="mt-1 text-muted-foreground">
              From digital cards to full business platforms
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <LinkButton href="/services" variant="outline">
              All services
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-bold">How we work</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <div key={step.title} className="rounded-xl border bg-card p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand settings={settings} />
    </>
  );
}
