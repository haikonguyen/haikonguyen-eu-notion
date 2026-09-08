import { cache } from 'react';
import { optionalCmsUrl } from './portfolio-utils';
import { reader } from './reader';
import {
  type AboutCvEntry,
  type CvExperienceEntry,
  type CvSkillEntry,
  CvSkillIcon,
} from './types';

function toSkillIcon(value: string): CvSkillIcon {
  const icons = Object.values(CvSkillIcon);
  return icons.includes(value as CvSkillIcon)
    ? (value as CvSkillIcon)
    : CvSkillIcon.React;
}

function mapSkill(entry: {
  label: string;
  level: number | null;
  icon: string;
}): CvSkillEntry {
  return {
    label: entry.label,
    level: Math.min(100, Math.max(0, entry.level ?? 0)),
    icon: toSkillIcon(entry.icon),
  };
}

function mapExperience(entry: {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: readonly string[];
}): CvExperienceEntry {
  return {
    role: entry.role,
    company: entry.company,
    period: entry.period,
    description: entry.description,
    tech: [...entry.tech],
  };
}

export const getAboutCv = cache(async (): Promise<AboutCvEntry | null> => {
  const entry = await reader.singletons.aboutCv.read();
  if (!entry) {
    return null;
  }

  return {
    pdfUrl: optionalCmsUrl(entry.pdfUrl),
    skills: entry.skills.map(mapSkill),
    educationDegree: entry.educationDegree,
    educationUniversity: entry.educationUniversity,
    educationFocus: entry.educationFocus,
    experiences: entry.experiences.map(mapExperience),
  };
});
