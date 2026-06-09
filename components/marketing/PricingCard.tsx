import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatZar } from "@/lib/format";
import type { PricingPackage } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  pkg: PricingPackage;
};

export function PricingCard({ pkg }: PricingCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col",
        pkg.recommended && "border-primary shadow-md ring-1 ring-primary/20",
      )}
    >
      <CardHeader>
        {pkg.recommended && (
          <Badge className="w-fit">Recommended</Badge>
        )}
        <CardTitle>{pkg.name}</CardTitle>
        <CardDescription>
          <span className="text-2xl font-bold text-foreground">
            from {formatZar(pkg.price_from_zar)}
          </span>
          {pkg.price_note && (
            <span className="mt-1 block text-sm">{pkg.price_note}</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <LinkButton
          href="/contact"
          className="w-full"
          variant={pkg.recommended ? "default" : "outline"}
        >
          Request a quote
        </LinkButton>
      </CardFooter>
    </Card>
  );
}
