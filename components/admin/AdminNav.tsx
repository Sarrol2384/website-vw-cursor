"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Layers,
  LogOut,
  Newspaper,
  Settings,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Layers },
  { href: "/admin/services", label: "Services", icon: FileText },
  { href: "/admin/pricing", label: "Pricing", icon: Tag },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r bg-muted/30">
      <div className="border-b p-4">
        <Link href="/admin" className="font-semibold text-sm">
          VonWillingh CMS
        </Link>
        <Link
          href="/"
          className="mt-1 block text-xs text-muted-foreground hover:text-foreground"
        >
          View site →
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 p-2">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-background font-medium shadow-sm"
                  : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
