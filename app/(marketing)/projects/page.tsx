import type { Metadata } from "next";
import { PageBanner } from "@/components/marketing/PageBanner";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { CTABand } from "@/components/marketing/CTABand";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  getProjectCategories,
  getPublishedProjects,
  getSiteSettings,
} from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of web applications built by VonWillingh Online for South African businesses.",
};

type ProjectsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getPublishedProjects(),
  ]);

  const categories = getProjectCategories(projects);
  const activeCategory = params.category;
  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  return (
    <>
      <PageBanner
        eyebrow="Portfolio"
        title="Projects"
        description="Custom web applications we've built for real South African businesses."
      />
      <section className="bg-brand-cream px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {categories.length > 0 && (
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              <a href="/projects">
                <Badge
                  className={cn(
                    !activeCategory
                      ? "bg-accent text-accent-foreground hover:bg-accent"
                      : "bg-white text-foreground hover:bg-white",
                  )}
                >
                  All
                </Badge>
              </a>
              {categories.map((cat) => (
                <a key={cat} href={`/projects?category=${encodeURIComponent(cat)}`}>
                  <Badge
                    className={cn(
                      activeCategory === cat
                        ? "bg-accent text-accent-foreground hover:bg-accent"
                        : "bg-white text-foreground hover:bg-white",
                    )}
                  >
                    {cat}
                  </Badge>
                </a>
              ))}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={index % 4 === 1}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>
      <CTABand settings={settings} />
    </>
  );
}
