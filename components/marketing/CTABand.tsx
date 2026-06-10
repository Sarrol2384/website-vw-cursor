import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/format";
import type { SiteSettings } from "@/lib/supabase/types";

type CTABandProps = {
  settings: SiteSettings;
};

export function CTABand({ settings }: CTABandProps) {
  const wa = settings.whatsapp ?? settings.contact_phone?.replace(/\D/g, "");

  return (
    <section className="relative overflow-hidden bg-primary px-6 py-20 text-primary-foreground sm:px-8">
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-accent/10" />

      <div className="relative mx-auto max-w-3xl rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-10 text-center backdrop-blur-sm sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
          Let&apos;s work together
        </p>
        <h2 className="mt-3 font-heading text-3xl sm:text-4xl">
          Ready to build your next web application?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
          Tell us about your business and we&apos;ll propose a clear path from
          idea to go-live.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton href="/contact" size="lg" variant="accent">
            Get a free quote
          </LinkButton>
          {wa && (
            <a
              href={whatsappUrl(
                wa,
                "Hi Sarrol, I'd like to discuss a web application project.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10",
              )}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
