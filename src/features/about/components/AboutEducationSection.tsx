'use client';

import { useTranslations } from 'next-intl';
import { FaGraduationCap } from 'react-icons/fa';
import { AboutSectionHeading } from './AboutSectionHeading';

export interface AboutEducationSectionProps {
  degree: string;
  university: string;
  focus: string;
}

export function AboutEducationSection({
  degree,
  university,
  focus,
}: AboutEducationSectionProps) {
  const t = useTranslations('About');

  return (
    <section>
      <AboutSectionHeading
        icon={<FaGraduationCap size={18} />}
        title={t('education')}
      />
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <h4 className="text-lg font-bold text-white">{degree}</h4>
        <p className="my-2 text-xs font-bold uppercase tracking-widest text-primary">
          {university}
        </p>
        <p className="text-sm text-white/50">{focus}</p>
      </div>
    </section>
  );
}
