import { Plus } from "lucide-react";
import { getAllProjectsAdmin } from "@/lib/cms/queries";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <LinkButton href="/admin/projects/new" size="sm">
          <Plus className="mr-1 h-4 w-4" />
          New project
        </LinkButton>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>
                  {p.published ? (
                    <Badge>Published</Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                  {p.featured && (
                    <Badge variant="secondary" className="ml-1">
                      Featured
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <LinkButton
                    href={`/admin/projects/${p.id}`}
                    variant="ghost"
                    size="sm"
                  >
                    Edit
                  </LinkButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
