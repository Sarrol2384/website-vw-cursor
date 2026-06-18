import { getAuditSubmissionsAdmin } from "@/lib/cms/queries";
import { formatDate } from "@/lib/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AuditResult } from "@/lib/audit/types";

const TIER_LABELS: Record<string, string> = {
  beginner: "Getting Started",
  developing: "Developing",
  ai_ready: "AI Ready",
  high_potential: "High Potential",
};

export default async function AdminAuditLeadsPage() {
  const leads = await getAuditSubmissionsAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold">AI Audit leads</h1>
      <p className="mt-1 text-muted-foreground">
        Submissions from the free AI Readiness Assessment.
      </p>

      {leads.length === 0 ? (
        <p className="mt-8 text-muted-foreground">
          No audit leads yet. Leads are saved when Supabase is configured.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Challenge</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => {
                const results = lead.results as AuditResult;
                const utm = [lead.utm_source, lead.utm_medium, lead.utm_campaign]
                  .filter(Boolean)
                  .join(" / ");

                return (
                  <TableRow key={lead.id}>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(lead.created_at)}
                    </TableCell>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.business_name ?? "—"}</TableCell>
                    <TableCell className="font-semibold">{lead.score}/100</TableCell>
                    <TableCell>
                      {TIER_LABELS[lead.tier] ?? lead.tier}
                    </TableCell>
                    <TableCell className="max-w-[140px] truncate text-sm">
                      {results?.biggestChallenge ?? "—"}
                    </TableCell>
                    <TableCell className="max-w-[120px] truncate text-sm text-muted-foreground">
                      {utm || "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm">
                      {lead.phone ?? "—"}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-primary hover:underline"
                      >
                        {lead.email}
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
