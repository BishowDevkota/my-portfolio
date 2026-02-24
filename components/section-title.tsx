export function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8 space-y-3">
      <p className="text-sm uppercase tracking-[0.3em] text-foreground/60 font-medium">{subtitle}</p>
      <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
    </div>
  );
}
