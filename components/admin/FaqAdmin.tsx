"use client";

import { SimpleCrudTable } from "@/components/admin/SimpleCrudTable";
import { deleteFaq, saveFaqAction } from "@/lib/actions/crud";
import type { FaqItem } from "@/lib/supabase/types";

type FaqAdminProps = {
  items: FaqItem[];
};

export function FaqAdmin({ items }: FaqAdminProps) {
  return (
    <SimpleCrudTable
      title="FAQ"
      items={items}
      fields={[
        { key: "question", label: "Question" },
        { key: "answer", label: "Answer", type: "textarea" },
        { key: "category", label: "Category" },
        { key: "sort_order", label: "Sort order", type: "number" },
      ]}
      getDefault={() => ({
        question: "",
        answer: "",
        category: "General",
        sort_order: 0,
      })}
      onSave={saveFaqAction}
      onDelete={deleteFaq}
    />
  );
}
