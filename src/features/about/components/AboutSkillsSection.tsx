'use client';

import type { CvSkillEntry } from '@lib/keystatic/types';
import { CvSkillIcon } from '@lib/keystatic/types';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { FaCamera, FaLaptopCode, FaNodeJs } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { AboutSectionHeading } from './AboutSectionHeading';

const skillIcons: Record<CvSkillIcon, ReactNode> = {
  [CvSkillIcon.React]: <SiNextdotjs />,
  [CvSkillIcon.Typescript]: <SiTypescript />,
  [CvSkillIcon.Tailwind]: <SiTailwindcss />,
  [CvSkillIcon.Node]: <FaNodeJs />,
  [CvSkillIcon.Postgres]: <SiPostgresql />,
  [CvSkillIcon.Photo]: <FaCamera />,
};

export interface AboutSkillsSectionProps {
  skills: CvSkillEntry[];
}

export function AboutSkillsSection({ skills }: AboutSkillsSectionProps) {
  const t = useTranslations('About');

  return (
    <section>
      <AboutSectionHeading
        icon={<FaLaptopCode size={18} />}
        title={t('technicalArsenal')}
      />
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={`${skill.icon}-${skill.label}`}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-white/80">
                {skillIcons[skill.icon]}
                <span>{skill.label}</span>
              </div>
              <span className="text-[10px] font-bold text-primary">
                {skill.level}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/50 to-primary"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
