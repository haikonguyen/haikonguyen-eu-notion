'use client';

import { PhotoLightbox } from '@components/ui/PhotoLightbox';
import type { VlogItem } from '@components/ui/VideoModal';
import { useTranslations } from 'next-intl';
import {
  PHOTO_ALT_KEYS,
  photographyGallery,
  portfolioVlogs,
  softwareProjects,
} from '../constants';
import { PortfolioCategory, type PortfolioProject } from '../types';
import { PortfolioSectionHeading } from './PortfolioSectionHeading';
import { SoftwareProjectCard } from './SoftwareProjectCard';
import { VlogCard } from './VlogCard';

interface PortfolioSectionsProps {
  activeCategory: PortfolioCategory;
  onSelectProject: (project: PortfolioProject) => void;
  onSelectVlog: (vlog: VlogItem) => void;
}

export function PortfolioSections({
  activeCategory,
  onSelectProject,
  onSelectVlog,
}: PortfolioSectionsProps) {
  const t = useTranslations('Portfolio');
  const showDev =
    activeCategory === PortfolioCategory.All ||
    activeCategory === PortfolioCategory.Dev;
  const showPhoto =
    activeCategory === PortfolioCategory.All ||
    activeCategory === PortfolioCategory.Photo;
  const showVlogs =
    activeCategory === PortfolioCategory.All ||
    activeCategory === PortfolioCategory.Vlogs;

  const photos = photographyGallery.map((photo, index) => ({
    ...photo,
    alt: t(PHOTO_ALT_KEYS[index]),
  }));

  return (
    <div className="space-y-24 sm:space-y-32">
      {showDev && (
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <PortfolioSectionHeading
            eyebrow={t('expertiseEyebrow')}
            title={t('softwareHeading')}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
            {softwareProjects.map((project) => (
              <SoftwareProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        </section>
      )}

      {showPhoto && (
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <PortfolioSectionHeading
            eyebrow={t('visualsEyebrow')}
            title={t('photographyHeading')}
          />
          <PhotoLightbox photos={photos} />
        </section>
      )}

      {showVlogs && (
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <PortfolioSectionHeading
            eyebrow={t('motionEyebrow')}
            title={t('vlogsHeading')}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {portfolioVlogs.map((vlog) => (
              <VlogCard
                key={vlog.id}
                vlog={vlog}
                onSelect={() =>
                  onSelectVlog({
                    id: vlog.id,
                    duration: vlog.duration,
                    thumbnail: vlog.thumbnail,
                    youtubeId: vlog.youtubeId,
                    title: t(`vlogs.${vlog.id}.title`),
                    description: t(`vlogs.${vlog.id}.description`),
                  })
                }
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
