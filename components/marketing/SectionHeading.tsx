type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading text-3xl font-normal tracking-tight sm:text-4xl ${light ? "text-primary-foreground" : ""}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
