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
        "flex h-full flex-col rounded-2xl border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg",
        pkg.recommended &&
          "bg-accent text-accent-foreground shadow-lg shadow-accent/25 ring-2 ring-accent",
      )}
    >
      <CardHeader>
        {pkg.recommended && (
          <Badge className="w-fit bg-white/20 text-white hover:bg-white/20">
            Recommended
          </Badge>
        )}
        <CardTitle className={pkg.recommended ? "text-white" : ""}>
          {pkg.name}
        </CardTitle>
        <CardDescription>
          <span
            className={cn(
              "text-2xl font-bold",
              pkg.recommended ? "text-white" : "text-foreground",
            )}
          >
            from {formatZar(pkg.price_from_zar)}
          </span>
          {pkg.price_note && (
            <span
              className={cn(
                "mt-1 block text-sm",
                pkg.recommended ? "text-white/80" : "",
              )}
            >
              {pkg.price_note}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm">
              <Check
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  pkg.recommended ? "text-white" : "text-accent",
                )}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <LinkButton
          href="/contact"
          className="w-full"
          variant={pkg.recommended ? "secondary" : "accent"}
        >
          Request a quote
        </LinkButton>
      </CardFooter>
    </Card>
  );
}
