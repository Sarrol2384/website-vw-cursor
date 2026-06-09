import { getContactSubmissionsAdmin } from "@/lib/cms/queries";
import { formatDate } from "@/lib/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminLeadsPage() {
  const leads = await getContactSubmissionsAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold">Contact leads</h1>
      <p className="mt-1 text-muted-foreground">
        Submissions from the contact form.
      </p>

      {leads.length === 0 ? (
        <p className="mt-8 text-muted-foreground">
          No leads yet. Leads are saved when Supabase is configured.
        </p>
      ) : (
        <div className="mt-6 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-primary hover:underline"
                    >
                      {lead.email}
                    </a>
                  </TableCell>
                  <TableCell>{lead.project_type ?? "—"}</TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {lead.message}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
