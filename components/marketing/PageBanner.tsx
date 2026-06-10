import { SpaceFx } from "@/components/marketing/SpaceFx";

type PageBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageBanner({ eyebrow, title, description }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-primary px-6 py-14 text-primary-foreground sm:px-8 sm:py-16">
      <SpaceFx />

      <div className="relative mx-auto max-w-6xl">
        {eyebrow && (
          <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 font-heading text-4xl tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
