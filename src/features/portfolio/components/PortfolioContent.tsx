'use client';

import { AppPageShell, AppPageShellSize, PageHeader } from '@components/layout';
import { VideoModal, type VlogItem } from '@components/ui/VideoModal';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { parsePortfolioCategory } from '../constants';
import { PortfolioCategory, type PortfolioProject } from '../types';
import { PortfolioCategoryFilter } from './PortfolioCategoryFilter';
import { PortfolioSections } from './PortfolioSections';
import { ProjectModal } from './project-modal';

export function PortfolioContent() {
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
        onSelectProject={setSelectedProject}
        onSelectVlog={(vlog) => setSelectedVlog(vlog)}
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
