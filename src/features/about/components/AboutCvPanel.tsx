'use client';

import { useTranslations } from 'next-intl';
import { FaBriefcase, FaDownload } from 'react-icons/fa';
import { experienceItems } from '../constants';
import { AboutEducationSection } from './AboutEducationSection';
import { AboutExperienceCard } from './AboutExperienceCard';
import { AboutSectionHeading } from './AboutSectionHeading';
import { AboutSkillsSection } from './AboutSkillsSection';

export function AboutCvPanel() {
  const t = useTranslations('About');

  return (
    <div className="animate-in fade-in zoom-in-95 space-y-16 duration-700">
      <div className="flex justify-end">
        <button
          type="button"
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10"
        >
          <FaDownload /> {t('downloadPdf')}
        </button>
      </div>
      <div className="grid gap-12 md:grid-cols-3">
        <div className="space-y-12">
          <AboutSkillsSection />
          <AboutEducationSection />
        </div>
        <div className="md:col-span-2">
          <section>
            <AboutSectionHeading
              icon={<FaBriefcase size={18} />}
              title={t('professionalJourney')}
            />
            <div className="space-y-8">
              {experienceItems.map((experience) => (
                <AboutExperienceCard
                  key={experience.id}
                  experienceId={experience.id}
                  tech={experience.tech}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
