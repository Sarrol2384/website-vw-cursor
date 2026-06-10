import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border-0 transition-all hover:-translate-y-1",
        featured
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl"
          : "bg-card shadow-sm hover:shadow-lg",
      )}
    >
      <div
        className={cn(
          "h-1.5 w-full",
          featured ? "bg-accent" : "bg-accent/80",
        )}
      />
      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-2">
          {project.category && (
            <Badge
              className={cn(
                featured
                  ? "bg-accent text-accent-foreground"
                  : "bg-accent/15 text-accent hover:bg-accent/15",
              )}
            >
              {project.category}
            </Badge>
          )}
          {project.industry && (
            <Badge
              variant="outline"
              className={cn(
                featured
                  ? "border-primary-foreground/30 text-primary-foreground/90"
                  : "border-primary/20 text-primary",
              )}
            >
              {project.industry}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg">
          <Link
            href={`/projects/${project.slug}`}
            className={cn(
              "inline-flex items-center gap-1",
              featured ? "hover:text-accent" : "hover:text-accent",
            )}
          >
            {project.title}
            <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </CardTitle>
        {project.client && (
          <p
            className={cn(
              "text-xs",
              featured ? "text-primary-foreground/70" : "text-muted-foreground",
            )}
          >
            {project.client}
          </p>
        )}
        <CardDescription
          className={cn(
            "line-clamp-3",
            featured ? "text-primary-foreground/80" : "",
          )}
        >
          {project.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className={cn(
                "text-xs font-normal",
                featured
                  ? "border-primary-foreground/25 text-primary-foreground/90"
                  : "border-border",
              )}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
