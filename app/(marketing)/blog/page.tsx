import type { Metadata } from "next";
import Link from "next/link";
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
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="mt-3 text-muted-foreground">
            Thoughts on building modern web applications for South African
            businesses.
          </p>

          <div className="mt-10 space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="transition-shadow hover:shadow-sm">
                <CardHeader>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.published_at)}
                  </p>
                  <CardTitle>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary"
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
          </div>

          {posts.length === 0 && (
            <p className="mt-10 text-muted-foreground">No posts yet.</p>
          )}
        </div>
      </section>
      <CTABand settings={settings} />
    </>
  );
}
