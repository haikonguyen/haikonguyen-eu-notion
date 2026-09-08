import { PortfolioContent } from '@features/portfolio';
import {
  getPhotographyItems,
  getPortfolioVlogs,
  getSoftwareProjects,
} from '@lib/keystatic';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import type { AppLocale } from '../../../i18n/locale';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: t('portfolioTitle'),
    description: t('portfolioDescription'),
  };
}

async function PortfolioPageContent() {
  const locale = (await getLocale()) as AppLocale;
  const [softwareEntries, photographyEntries, vlogEntries] = await Promise.all([
    getSoftwareProjects(locale),
    getPhotographyItems(locale),
    getPortfolioVlogs(locale),
  ]);

  return (
    <PortfolioContent
      softwareProjects={softwareEntries.map((entry) => ({
        slug: entry.slug,
        title: entry.title,
        summary: entry.summary,
        longDescription: entry.longDescription,
        image: entry.coverImage,
        tags: entry.tags,
        tech: entry.tech,
        github: entry.githubUrl,
        demo: entry.demoUrl,
      }))}
      photographyItems={photographyEntries.map((entry) => ({
        slug: entry.slug,
        src: entry.image,
        width: entry.width,
        height: entry.height,
        alt: entry.alt,
        title: entry.title,
      }))}
      portfolioVlogs={vlogEntries.map((entry) => ({
        slug: entry.slug,
        title: entry.title,
        description: entry.description,
        duration: entry.duration,
        thumbnail: entry.thumbnail,
        youtubeId: entry.youtubeId,
      }))}
    />
  );
}

export default async function PortfolioPage() {
  const t = await getTranslations('Common');

  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center bg-background"
          role="status"
          aria-label={t('loading')}
        >
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        </div>
      }
    >
      <PortfolioPageContent />
    </Suspense>
  );
}
