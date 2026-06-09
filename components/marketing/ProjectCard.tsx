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

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-2">
          {project.category && (
            <Badge variant="secondary">{project.category}</Badge>
          )}
          {project.industry && (
            <Badge variant="outline">{project.industry}</Badge>
          )}
        </div>
        <CardTitle className="text-lg">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 hover:text-primary"
          >
            {project.title}
            <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </CardTitle>
        {project.client && (
          <p className="text-xs text-muted-foreground">{project.client}</p>
        )}
        <CardDescription className="line-clamp-3">
          {project.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs font-normal">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
