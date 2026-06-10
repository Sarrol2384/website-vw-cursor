type Star = {
  top: string;
  left?: string;
  right?: string;
  size: string;
  twinkle: string;
  float: string;
  delay: string;
};

const stars: Star[] = [
  { top: "6%", right: "18%", size: "h-2 w-2", twinkle: "4s", float: "18s", delay: "0s" },
  { top: "14%", right: "28%", size: "h-1.5 w-1.5", twinkle: "3.2s", float: "22s", delay: "0.8s" },
  { top: "22%", right: "12%", size: "h-1 w-1", twinkle: "5s", float: "26s", delay: "1.4s" },
  { top: "10%", right: "42%", size: "h-1.5 w-1.5", twinkle: "3.8s", float: "20s", delay: "0.3s" },
  { top: "32%", right: "35%", size: "h-1 w-1", twinkle: "4.5s", float: "24s", delay: "2s" },
  { top: "18%", right: "55%", size: "h-2 w-2", twinkle: "3.5s", float: "19s", delay: "1.1s" },
  { top: "8%", right: "68%", size: "h-1 w-1", twinkle: "5.5s", float: "28s", delay: "2.6s" },
  { top: "38%", right: "48%", size: "h-1.5 w-1.5", twinkle: "4.2s", float: "21s", delay: "0.6s" },
  { top: "28%", right: "72%", size: "h-1 w-1", twinkle: "6s", float: "30s", delay: "3s" },
  { top: "45%", right: "22%", size: "h-1 w-1", twinkle: "4.8s", float: "25s", delay: "1.8s" },
  { top: "52%", right: "58%", size: "h-1.5 w-1.5", twinkle: "3.6s", float: "23s", delay: "0.9s" },
  { top: "62%", right: "38%", size: "h-1 w-1", twinkle: "5.2s", float: "27s", delay: "2.2s" },
  { top: "70%", right: "15%", size: "h-1.5 w-1.5", twinkle: "4s", float: "20s", delay: "1.5s" },
  { top: "75%", right: "65%", size: "h-1 w-1", twinkle: "5.8s", float: "29s", delay: "3.4s" },
  { top: "55%", left: "72%", size: "h-1 w-1", twinkle: "6.2s", float: "32s", delay: "4s" },
  { top: "12%", left: "58%", size: "h-1.5 w-1.5", twinkle: "4.4s", float: "24s", delay: "2.8s" },
];

export function SpaceFx() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="space-nebula space-nebula-a absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
      <div className="space-nebula space-nebula-b absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-accent/15 blur-2xl" />
      <div className="space-nebula space-nebula-c absolute right-1/3 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-primary-foreground/5 blur-3xl" />

      {stars.map((star, index) => (
        <span
          key={index}
          className={`space-star-float absolute ${star.size}`}
          style={{
            top: star.top,
            right: star.right,
            left: star.left,
            animationDuration: star.float,
            animationDelay: star.delay,
          }}
        >
          <span
            className="block h-full w-full rounded-full bg-accent space-star-twinkle"
            style={{
              animationDuration: star.twinkle,
              animationDelay: star.delay,
            }}
          />
        </span>
      ))}

      <span className="space-shooting-star absolute right-[20%] top-[15%] h-px w-12 bg-gradient-to-l from-accent to-transparent" />
    </div>
  );
}
