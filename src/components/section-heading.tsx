export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-2">
      <h2 className="font-display text-[28px] font-bold leading-8 tracking-[-0.02em] sm:text-4xl sm:leading-10 sm:tracking-[-0.03em]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-6 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
