interface PortfolioSectionHeadingProps {
  eyebrow: string;
  title: string;
}

export function PortfolioSectionHeading({
  eyebrow,
  title,
}: PortfolioSectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-2.5 sm:mb-12">
      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
        {eyebrow}
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <div className="mt-1.5 h-0.5 w-20 bg-primary/40" />
    </div>
  );
}
