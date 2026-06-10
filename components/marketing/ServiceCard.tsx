import {
  Building2,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Service } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  smartphone: Smartphone,
  "building-2": Building2,
  "graduation-cap": GraduationCap,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
};

type ServiceCardProps = {
  service: Service;
  featured?: boolean;
};

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const Icon = iconMap[service.icon ?? ""] ?? LayoutDashboard;

  return (
    <Card
      className={cn(
        "h-full rounded-2xl border-0 transition-all hover:-translate-y-1",
        featured
          ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30"
          : "bg-card shadow-sm hover:shadow-lg",
      )}
    >
      <CardHeader>
        <div
          className={cn(
            "mb-3 flex h-12 w-12 items-center justify-center rounded-xl",
            featured
              ? "bg-white/20 text-white"
              : "bg-accent/15 text-accent",
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className={cn("text-lg", featured && "text-white")}>
          {service.title}
        </CardTitle>
        <CardDescription
          className={cn(featured ? "text-white/85" : "text-muted-foreground")}
        >
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent />
    </Card>
  );
}
