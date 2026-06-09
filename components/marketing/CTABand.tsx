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
    <section className="bg-primary px-4 py-16 text-primary-foreground">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Ready to build your next web application?
        </h2>
        <p className="mt-3 text-primary-foreground/80">
          Tell us about your business and we&apos;ll propose a clear path from
          idea to go-live.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton href="/contact" size="lg" variant="secondary">
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
