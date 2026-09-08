import { cache } from 'react';
import type { AppLocale } from '../../../i18n/locale';
import { pickLocalized } from './localized';
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

function mapSkill(
  entry: {
    label: { en: string; cs: string; vi: string };
    level: number | null;
    icon: string;
  },
  locale: AppLocale,
): CvSkillEntry {
  return {
    label: pickLocalized(entry.label, locale),
    level: Math.min(100, Math.max(0, entry.level ?? 0)),
    icon: toSkillIcon(entry.icon),
  };
}

function mapExperience(
  entry: {
    role: { en: string; cs: string; vi: string };
    company: { en: string; cs: string; vi: string };
    period: { en: string; cs: string; vi: string };
    description: { en: string; cs: string; vi: string };
    tech: readonly string[];
  },
  locale: AppLocale,
): CvExperienceEntry {
  return {
    role: pickLocalized(entry.role, locale),
    company: pickLocalized(entry.company, locale),
    period: pickLocalized(entry.period, locale),
    description: pickLocalized(entry.description, locale),
    tech: [...entry.tech],
  };
}

export const getAboutCv = cache(
  async (locale: AppLocale): Promise<AboutCvEntry | null> => {
    const entry = await reader.singletons.aboutCv.read();
    if (!entry) {
      return null;
    }

    return {
      pdfUrl: optionalCmsUrl(entry.pdfUrl),
      skills: entry.skills.map((skill) => mapSkill(skill, locale)),
      educationDegree: pickLocalized(entry.educationDegree, locale),
      educationUniversity: pickLocalized(entry.educationUniversity, locale),
      educationFocus: pickLocalized(entry.educationFocus, locale),
      experiences: entry.experiences.map((experience) =>
        mapExperience(experience, locale),
      ),
    };
  },
);
