"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo.png"
            alt=""
            width={80}
            height={80}
            priority
            className="h-16 w-16 sm:h-20 sm:w-20"
          />
          <span className="font-heading text-lg leading-tight text-primary sm:text-xl">
            VonWillingh Online
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                pathname === link.href
                  ? "text-accent"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <LinkButton href="/contact" size="sm" variant="accent" className="ml-2">
            Get a quote
          </LinkButton>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "md:hidden",
            )}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium",
                    pathname === link.href
                      ? "bg-accent/10 text-accent"
                      : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <LinkButton
                href="/contact"
                variant="accent"
                className="mt-4"
                onClick={() => setOpen(false)}
              >
                Get a quote
              </LinkButton>
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
}
