import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { MarkdownContent } from "@/components/marketing/MarkdownContent";
import { CTABand } from "@/components/marketing/CTABand";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";
import {
  getProjectBySlug,
  getPublishedProjects,
  getSiteSettings,
} from "@/lib/cms/queries";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary ?? undefined,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, settings, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
    getPublishedProjects(),
  ]);

  if (!project) notFound();

  const related = allProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <article className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <LinkButton
            href="/projects"
            variant="ghost"
            size="sm"
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            All projects
          </LinkButton>

          <div className="flex flex-wrap gap-2">
            {project.category && (
              <Badge variant="secondary">{project.category}</Badge>
            )}
            {project.industry && (
              <Badge variant="outline">{project.industry}</Badge>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold">{project.title}</h1>
          {project.client && (
            <p className="mt-2 text-muted-foreground">{project.client}</p>
          )}

          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-4",
              )}
            >
              View live demo
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          )}

          {project.summary && (
            <p className="mt-6 text-lg text-muted-foreground">
              {project.summary}
            </p>
          )}

          {(project.problem || project.solution || project.outcome) && (
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {project.problem && (
                <div className="rounded-lg border p-4">
                  <h2 className="text-sm font-semibold text-primary">
                    Problem
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="rounded-lg border p-4">
                  <h2 className="text-sm font-semibold text-primary">
                    Solution
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.solution}
                  </p>
                </div>
              )}
              {project.outcome && (
                <div className="rounded-lg border p-4">
                  <h2 className="text-sm font-semibold text-primary">
                    Outcome
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.outcome}
                  </p>
                </div>
              )}
            </div>
          )}

          {project.body && (
            <div className="mt-10">
              <MarkdownContent content={project.body} />
            </div>
          )}

          {project.features.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold">Key features</h2>
              <ul className="mt-3 list-inside list-disc space-y-1 text-muted-foreground">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {project.stack.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Tech stack</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {project.project_images && project.project_images.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.project_images.map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.alt ?? project.title}
                  className="rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t bg-muted/30 px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-xl font-semibold">Similar projects</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand settings={settings} />
    </>
  );
}
