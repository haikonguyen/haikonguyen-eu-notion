'use client';

import { PhotoLightbox } from '@components/ui/PhotoLightbox';
import type { VlogItem } from '@components/ui/VideoModal';
import { useTranslations } from 'next-intl';
import {
  type PhotographyGalleryItem,
  PortfolioCategory,
  type PortfolioProject,
  type PortfolioVlog,
  type SoftwareProject,
} from '../types';
import { PortfolioSectionHeading } from './PortfolioSectionHeading';
import { SoftwareProjectCard } from './SoftwareProjectCard';
import { VlogCard } from './VlogCard';

interface PortfolioSectionsProps {
  activeCategory: PortfolioCategory;
  softwareProjects: SoftwareProject[];
  photographyItems: PhotographyGalleryItem[];
  portfolioVlogs: PortfolioVlog[];
  onSelectProject: (project: PortfolioProject) => void;
  onSelectVlog: (vlog: VlogItem) => void;
}

export function PortfolioSections({
  activeCategory,
  softwareProjects,
  photographyItems,
  portfolioVlogs,
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

  return (
    <div className="space-y-24 sm:space-y-32">
      {showDev && (
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <PortfolioSectionHeading
            eyebrow={t('expertiseEyebrow')}
            title={t('softwareHeading')}
          />
          {softwareProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
              {softwareProjects.map((project) => (
                <SoftwareProjectCard
                  key={project.slug}
                  project={project}
                  onSelect={onSelectProject}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/60">{t('emptySoftware')}</p>
          )}
        </section>
      )}

      {showPhoto && (
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <PortfolioSectionHeading
            eyebrow={t('visualsEyebrow')}
            title={t('photographyHeading')}
          />
          {photographyItems.length > 0 ? (
            <PhotoLightbox photos={photographyItems} />
          ) : (
            <p className="text-sm text-white/60">{t('emptyPhotography')}</p>
          )}
        </section>
      )}

      {showVlogs && (
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <PortfolioSectionHeading
            eyebrow={t('motionEyebrow')}
            title={t('vlogsHeading')}
          />
          {portfolioVlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {portfolioVlogs.map((vlog) => (
                <VlogCard
                  key={vlog.slug}
                  vlog={vlog}
                  onSelect={() =>
                    onSelectVlog({
                      id: vlog.slug,
                      duration: vlog.duration,
                      thumbnail: vlog.thumbnail,
                      youtubeId: vlog.youtubeId,
                      title: vlog.title,
                      description: vlog.description,
                    })
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/60">{t('emptyVlogs')}</p>
          )}
        </section>
      )}
    </div>
  );
}
