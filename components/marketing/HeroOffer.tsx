import Image from "next/image";
import { Check } from "lucide-react";

const techStack = ["Next.js", "TypeScript", "Vercel CDN", "Mobile-first"];

const qualityPoints = [
  "Hand-coded — not WordPress or page-builder templates",
  "Fast, secure hosting with HTTPS included",
  "Contact form + WhatsApp — POPIA consent built in",
  "Your logo, colours, and copy — ready to go live",
];

export function HeroOffer() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -right-4 -top-4 z-10 rounded-2xl border border-accent/30 bg-accent px-4 py-3 shadow-lg">
        <p className="text-xs font-medium uppercase tracking-wide text-accent-foreground/80">
          Intro offer
        </p>
        <p className="font-heading text-2xl leading-none text-accent-foreground">
          R1,999
        </p>
        <p className="mt-1 text-xs text-accent-foreground/75">once-off setup</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src="/marketing/hero-local-business-owner.png"
            alt="Local business owner giving a thumbs up with their new website on screen"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 512px"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent px-4 pb-4 pt-16">
            <p className="text-sm font-medium text-primary-foreground">
              Real sites for real local businesses
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t border-border/50 bg-brand-cream/50 px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {techStack.map((item) => (
              <span
                key={item}
                className="rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {item}
              </span>
            ))}
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
              Not WordPress
            </span>
          </div>
          <ul className="space-y-1.5">
            {qualityPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
