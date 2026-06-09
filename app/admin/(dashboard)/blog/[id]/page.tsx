import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/BlogForm";
import { getAllBlogPostsAdmin } from "@/lib/cms/queries";

type EditBlogPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const posts = await getAllBlogPostsAdmin();
  const post = posts.find((p) => p.id === id);

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit blog post</h1>
      <BlogForm post={post} />
    </div>
  );
}
