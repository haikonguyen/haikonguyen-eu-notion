'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { FaCamera, FaLaptopCode, FaNodeJs } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { skillLevels } from '../constants';
import { SkillId } from '../types';
import { AboutSectionHeading } from './AboutSectionHeading';

const skillIcons: Record<SkillId, ReactNode> = {
  [SkillId.React]: <SiNextdotjs />,
  [SkillId.Typescript]: <SiTypescript />,
  [SkillId.Tailwind]: <SiTailwindcss />,
  [SkillId.Node]: <FaNodeJs />,
  [SkillId.Postgres]: <SiPostgresql />,
  [SkillId.Photo]: <FaCamera />,
};

export function AboutSkillsSection() {
  const t = useTranslations('About');

  return (
    <section>
      <AboutSectionHeading
        icon={<FaLaptopCode size={18} />}
        title={t('technicalArsenal')}
      />
      <div className="space-y-6">
        {Object.values(SkillId).map((skillId) => (
          <div key={skillId}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-white/80">
                {skillIcons[skillId]}
                <span>{t(`skills.${skillId}`)}</span>
              </div>
              <span className="text-[10px] font-bold text-primary">
                {skillLevels[skillId]}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/50 to-primary"
                style={{ width: `${skillLevels[skillId]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
