import type { Metadata } from "next";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { CTABand } from "@/components/marketing/CTABand";
import { Badge } from "@/components/ui/badge";
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
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="mt-3 text-muted-foreground">
              Custom web applications we&apos;ve built for real South African
              businesses.
            </p>
          </div>

          {categories.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <a href="/projects">
                <Badge variant={!activeCategory ? "default" : "outline"}>
                  All
                </Badge>
              </a>
              {categories.map((cat) => (
                <a key={cat} href={`/projects?category=${encodeURIComponent(cat)}`}>
                  <Badge variant={activeCategory === cat ? "default" : "outline"}>
                    {cat}
                  </Badge>
                </a>
              ))}
            </div>
          )}

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
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
