import {
  getAllBlogPostsAdmin,
  getContactSubmissionsAdmin,
  getAllProjectsAdmin,
} from "@/lib/cms/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";

export default async function AdminDashboardPage() {
  const [projects, posts, leads] = await Promise.all([
    getAllProjectsAdmin(),
    getAllBlogPostsAdmin(),
    getContactSubmissionsAdmin(),
  ]);

  const draftPosts = posts.filter((p) => p.status !== "published");

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        Manage your VonWillingh Online website content.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{projects.length}</p>
            <LinkButton href="/admin/projects" variant="link" className="mt-2 h-auto p-0">
              Manage →
            </LinkButton>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Draft posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{draftPosts.length}</p>
            <LinkButton href="/admin/blog" variant="link" className="mt-2 h-auto p-0">
              Manage →
            </LinkButton>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{leads.length}</p>
            <LinkButton href="/admin/leads" variant="link" className="mt-2 h-auto p-0">
              View →
            </LinkButton>
          </CardContent>
        </Card>
      </div>

      {leads.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-base">Recent leads</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <li key={lead.id} className="text-sm">
                  <span className="font-medium">{lead.name}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    — {lead.email}
                  </span>
                  <p className="text-muted-foreground line-clamp-1">
                    {lead.message}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
