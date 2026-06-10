import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/marketing/PageBanner";
import { CTABand } from "@/components/marketing/CTABand";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPublishedBlogPosts, getSiteSettings } from "@/lib/cms/queries";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on web development, digital products, and technology for South African businesses.",
};

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([
    getSiteSettings(),
    getPublishedBlogPosts(),
  ]);

  return (
    <>
      <PageBanner
        eyebrow="Insights"
        title="Blog"
        description="Thoughts on building modern web applications for South African businesses."
      />
      <section className="bg-brand-cream px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden rounded-2xl border-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="h-1 bg-accent" />
              <CardHeader>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {formatDate(post.published_at)}
                </p>
                <CardTitle>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                {post.excerpt && (
                  <CardDescription>{post.excerpt}</CardDescription>
                )}
              </CardHeader>
            </Card>
          ))}

          {posts.length === 0 && (
            <p className="text-center text-muted-foreground">
              No posts published yet.
            </p>
          )}
        </div>
      </section>
      <CTABand settings={settings} />
    </>
  );
}
