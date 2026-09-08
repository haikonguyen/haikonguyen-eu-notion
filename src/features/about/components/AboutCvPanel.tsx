'use client';

import type { AboutCvEntry } from '@lib/keystatic/types';
import { useTranslations } from 'next-intl';
import { FaBriefcase, FaDownload } from 'react-icons/fa';
import { AboutEducationSection } from './AboutEducationSection';
import { AboutExperienceCard } from './AboutExperienceCard';
import { AboutSectionHeading } from './AboutSectionHeading';
import { AboutSkillsSection } from './AboutSkillsSection';

export interface AboutCvPanelProps {
  cv: AboutCvEntry;
}

export function AboutCvPanel({ cv }: AboutCvPanelProps) {
  const t = useTranslations('About');

  return (
    <div className="animate-in fade-in zoom-in-95 space-y-16 duration-700">
      <div className="flex justify-end">
        {cv.pdfUrl ? (
          <a
            href={cv.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10"
          >
            <FaDownload /> {t('downloadPdf')}
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary/40"
          >
            <FaDownload /> {t('downloadPdf')}
          </button>
        )}
      </div>
      <div className="grid gap-12 md:grid-cols-3">
        <div className="space-y-12">
          <AboutSkillsSection skills={cv.skills} />
          <AboutEducationSection
            degree={cv.educationDegree}
            university={cv.educationUniversity}
            focus={cv.educationFocus}
          />
        </div>
        <div className="md:col-span-2">
          <section>
            <AboutSectionHeading
              icon={<FaBriefcase size={18} />}
              title={t('professionalJourney')}
            />
            <div className="space-y-8">
              {cv.experiences.map((experience) => (
                <AboutExperienceCard
                  key={`${experience.company}-${experience.role}-${experience.period}`}
                  experience={experience}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
