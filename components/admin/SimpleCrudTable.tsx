"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "lines";
};

type SimpleCrudTableProps<T extends { id: string }> = {
  title: string;
  items: T[];
  fields: Field[];
  onSave: (data: Record<string, unknown> & { id?: string }) => Promise<{ ok: boolean; error?: string }>;
  onDelete: (id: string) => Promise<{ ok: boolean; error?: string }>;
  getDefault?: () => Record<string, unknown>;
};

export function SimpleCrudTable<T extends { id: string }>({
  title,
  items,
  fields,
  onSave,
  onDelete,
  getDefault,
}: SimpleCrudTableProps<T>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  function openNew() {
    setEditing(getDefault?.() ?? {});
    setOpen(true);
  }

  function openEdit(item: T) {
    setEditing({ ...item } as Record<string, unknown>);
    setOpen(true);
  }

  async function handleSave() {
    if (!editing) return;
    setLoading(true);
    const result = await onSave(editing);
    setLoading(false);
    if (result.ok) {
      toast.success("Saved");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result.error ?? "Save failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    const result = await onDelete(id);
    if (result.ok) {
      toast.success("Deleted");
      router.refresh();
    } else {
      toast.error(result.error ?? "Delete failed");
    }
  }

  function displayValue(item: T, field: Field): string {
    const val = (item as Record<string, unknown>)[field.key];
    if (Array.isArray(val)) return val.join(", ");
    if (typeof val === "boolean") return val ? "Yes" : "No";
    return String(val ?? "");
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={openNew} size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {fields.slice(0, 3).map((f) => (
                <TableHead key={f.key}>{f.label}</TableHead>
              ))}
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                {fields.slice(0, 3).map((f) => (
                  <TableCell key={f.key} className="max-w-xs truncate">
                    {displayValue(item, f)}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit" : "Add"} {title.slice(0, -1)}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <Label>{field.label}</Label>
                  {field.type === "textarea" || field.type === "lines" ? (
                    <Textarea
                      value={String(editing[field.key] ?? (field.type === "lines" ? "" : ""))}
                      onChange={(e) => {
                        const val =
                          field.type === "lines"
                            ? e.target.value.split("\n").filter(Boolean)
                            : e.target.value;
                        setEditing({ ...editing, [field.key]: val });
                      }}
                      rows={field.type === "lines" ? 4 : 3}
                    />
                  ) : field.type === "checkbox" ? (
                    <Checkbox
                      checked={Boolean(editing[field.key])}
                      onCheckedChange={(c) =>
                        setEditing({ ...editing, [field.key]: c === true })
                      }
                    />
                  ) : field.type === "number" ? (
                    <Input
                      type="number"
                      value={String(editing[field.key] ?? "")}
                      onChange={(e) =>
                        setEditing({ ...editing, [field.key]: Number(e.target.value) })
                      }
                    />
                  ) : (
                    <Input
                      value={String(editing[field.key] ?? "")}
                      onChange={(e) =>
                        setEditing({ ...editing, [field.key]: e.target.value })
                      }
                    />
                  )}
                </div>
              ))}
              <Button onClick={handleSave} disabled={loading} className="w-full">
                {loading ? "Saving…" : "Save"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
