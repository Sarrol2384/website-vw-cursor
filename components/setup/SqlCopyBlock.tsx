"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SqlCopyBlockProps = {
  id?: string;
  title: string;
  description?: string;
  sql: string;
  className?: string;
};

export function SqlCopyBlock({
  id,
  title,
  description,
  sql,
  className,
}: SqlCopyBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = sql;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <section id={id} className={cn("rounded-xl border bg-card scroll-mt-20", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b px-4 py-3">
        <div>
          <h2 className="font-semibold">{title}</h2>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="mr-1.5 h-4 w-4 text-green-600" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-1.5 h-4 w-4" />
              Copy SQL
            </>
          )}
        </Button>
      </div>
      <pre className="max-h-[32rem] overflow-auto p-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        <code>{sql}</code>
      </pre>
    </section>
  );
}
