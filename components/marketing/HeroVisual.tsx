import Image from "next/image";

export function HeroVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md"
      aria-hidden
    >
      <div className="absolute inset-6 rounded-full bg-primary/8" />
      <div className="absolute -right-2 top-4 h-40 w-40 rounded-full bg-accent/30" />
      <div className="absolute bottom-6 left-0 h-28 w-28 rounded-full border-4 border-accent/40 bg-background shadow-md" />
      <div className="absolute right-8 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-primary/15" />
      <div className="absolute inset-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/15 via-accent/20 to-accent/10 p-10 shadow-inner">
        <Image
          src="/brand/logo.png"
          alt=""
          width={240}
          height={240}
          className="h-full w-full object-contain"
          priority
        />
      </div>
    </div>
  );
}
