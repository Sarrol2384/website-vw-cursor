import { cn } from "@/lib/utils";

type AuditProgressProps = {
  current: number;
  total: number;
};

export function AuditProgress({ current, total }: AuditProgressProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-muted-foreground">
          Question {current} of {total}
        </span>
        <span className="text-muted-foreground">{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full bg-accent transition-all duration-300")}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
