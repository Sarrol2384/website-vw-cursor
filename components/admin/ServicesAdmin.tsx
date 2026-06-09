"use client";

import { SimpleCrudTable } from "@/components/admin/SimpleCrudTable";
import { deleteService, saveServiceAction } from "@/lib/actions/crud";
import type { Service } from "@/lib/supabase/types";

type ServicesAdminProps = {
  items: Service[];
};

export function ServicesAdmin({ items }: ServicesAdminProps) {
  return (
    <SimpleCrudTable
      title="Services"
      items={items}
      fields={[
        { key: "title", label: "Title" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "icon", label: "Icon (lucide name)" },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "published", label: "Published", type: "checkbox" },
      ]}
      getDefault={() => ({
        title: "",
        description: "",
        icon: "layout-dashboard",
        sort_order: 0,
        published: true,
      })}
      onSave={saveServiceAction}
      onDelete={deleteService}
    />
  );
}
