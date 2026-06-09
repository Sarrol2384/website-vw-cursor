import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getAllProjectsAdmin } from "@/lib/cms/queries";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const projects = await getAllProjectsAdmin();
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
