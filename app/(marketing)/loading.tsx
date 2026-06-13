export default function MarketingLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-accent" />
      <p className="text-sm text-muted-foreground">Loading VonWillingh Online…</p>
    </div>
  );
}
