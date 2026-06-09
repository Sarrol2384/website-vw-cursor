"use client";

import { SimpleCrudTable } from "@/components/admin/SimpleCrudTable";
import { deletePricing, savePricingAction } from "@/lib/actions/crud";
import type { PricingPackage } from "@/lib/supabase/types";

type PricingAdminProps = {
  items: PricingPackage[];
};

export function PricingAdmin({ items }: PricingAdminProps) {
  return (
    <SimpleCrudTable
      title="Pricing packages"
      items={items}
      fields={[
        { key: "name", label: "Name" },
        { key: "price_from_zar", label: "Price from (ZAR)", type: "number" },
        { key: "price_note", label: "Price note" },
        { key: "features", label: "Features (one per line)", type: "lines" },
        { key: "recommended", label: "Recommended", type: "checkbox" },
        { key: "sort_order", label: "Sort order", type: "number" },
      ]}
      getDefault={() => ({
        name: "",
        price_from_zar: 0,
        price_note: "",
        features: [],
        recommended: false,
        sort_order: 0,
      })}
      onSave={savePricingAction}
      onDelete={deletePricing}
    />
  );
}
