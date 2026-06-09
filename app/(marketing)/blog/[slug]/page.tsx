import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/marketing/MarkdownContent";
import { CTABand } from "@/components/marketing/CTABand";
import { LinkButton } from "@/components/ui/link-button";
import { getBlogPostBySlug, getSiteSettings } from "@/lib/cms/queries";
import { formatDate } from "@/lib/format";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) notFound();

  return (
    <>
      <article className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <LinkButton
            href="/blog"
            variant="ghost"
            size="sm"
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            All posts
          </LinkButton>

          <p className="text-sm text-muted-foreground">
            {formatDate(post.published_at)}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          )}

          <div className="mt-10">
            <MarkdownContent content={post.body} />
          </div>
        </div>
      </article>
      <CTABand settings={settings} />
    </>
  );
}
