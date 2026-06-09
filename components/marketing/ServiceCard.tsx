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
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon ?? ""] ?? LayoutDashboard;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg">{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent />
    </Card>
  );
}
