'use client';

import { useTranslations } from 'next-intl';
import type { ExperienceId } from '../types';

export interface AboutExperienceCardProps {
  experienceId: ExperienceId;
  tech: readonly string[];
}

export function AboutExperienceCard({
  experienceId,
  tech,
}: AboutExperienceCardProps) {
  const t = useTranslations('About');

  return (
    <div className="relative pl-8 md:pl-0">
      <div className="group rounded-[2.5rem] border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/[0.08]">
        <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <h4 className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-primary">
            {t(`experience.${experienceId}.role`)}
          </h4>
          <span className="w-fit rounded-full border border-white/5 bg-black/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50">
            {t(`experience.${experienceId}.period`)}
          </span>
        </div>
        <p className="mb-6 text-sm font-bold text-primary">
          {t(`experience.${experienceId}.company`)}
        </p>
        <p className="mb-8 leading-relaxed text-white/60">
          {t(`experience.${experienceId}.description`)}
        </p>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-lg border border-white/5 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/40"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
