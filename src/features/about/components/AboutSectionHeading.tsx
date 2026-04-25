import type { ReactNode } from 'react';

export interface AboutSectionHeadingProps {
  icon: ReactNode;
  title: string;
}

export function AboutSectionHeading({ icon, title }: AboutSectionHeadingProps) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
    </div>
  );
}
