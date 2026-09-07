'use client';

import { AppPageShell, AppPageShellSize, PageHeader } from '@components/layout';
import { VideoModal, type VlogItem } from '@components/ui/VideoModal';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { parsePortfolioCategory } from '../constants';
import {
  type PhotographyGalleryItem,
  PortfolioCategory,
  type PortfolioProject,
  type PortfolioVlog,
  type SoftwareProject,
} from '../types';
import { PortfolioCategoryFilter } from './PortfolioCategoryFilter';
import { PortfolioSections } from './PortfolioSections';
import { ProjectModal } from './project-modal';

export interface PortfolioContentProps {
  softwareProjects: SoftwareProject[];
  photographyItems: PhotographyGalleryItem[];
  portfolioVlogs: PortfolioVlog[];
}

export function PortfolioContent({
  softwareProjects,
  photographyItems,
  portfolioVlogs,
}: PortfolioContentProps) {
  const t = useTranslations('Portfolio');
  const searchParams = useSearchParams();
  const urlCategory = parsePortfolioCategory(searchParams.get('category'));
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory | null>(null);
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [selectedVlog, setSelectedVlog] = useState<VlogItem | null>(null);

  const activeCategory = selectedCategory ?? urlCategory;

  return (
    <AppPageShell size={AppPageShellSize.Default}>
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        action={
          <PortfolioCategoryFilter
            activeCategory={activeCategory}
            onSelect={setSelectedCategory}
          />
        }
      />
      <PortfolioSections
        activeCategory={activeCategory}
        softwareProjects={softwareProjects}
        photographyItems={photographyItems}
        portfolioVlogs={portfolioVlogs}
        onSelectProject={setSelectedProject}
        onSelectVlog={setSelectedVlog}
      />
      <ProjectModal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
      <VideoModal
        isOpen={Boolean(selectedVlog)}
        onClose={() => setSelectedVlog(null)}
        vlog={selectedVlog}
      />
    </AppPageShell>
  );
}
