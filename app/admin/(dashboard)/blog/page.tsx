import { Plus } from "lucide-react";
import { getAllBlogPostsAdmin } from "@/lib/cms/queries";
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
import { formatDate } from "@/lib/format";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPostsAdmin();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog</h1>
        <LinkButton href="/admin/blog/new" size="sm">
          <Plus className="mr-1 h-4 w-4" />
          New post
        </LinkButton>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge variant={post.status === "published" ? "default" : "outline"}>
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatDate(post.published_at)}
                </TableCell>
                <TableCell>
                  <LinkButton
                    href={`/admin/blog/${post.id}`}
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
