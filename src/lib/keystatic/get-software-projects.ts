import { getR2PublicUrl } from '@lib/r2';
import { cache } from 'react';
import type { AppLocale } from '../../../i18n/locale';
import { pickLocalized, pickLocalizedTitle } from './localized';
import { compareSortOrderThenTitle, optionalCmsUrl } from './portfolio-utils';
import { reader } from './reader';
import type { SoftwareProjectEntry } from './types';

export const getSoftwareProjects = cache(
  async (locale: AppLocale): Promise<SoftwareProjectEntry[]> => {
    const entries = await reader.collections.softwareProjects.all();

    return entries
      .map(({ slug, entry }) => ({
        slug,
        title: pickLocalizedTitle(entry.title, entry.titleI18n, locale),
        summary: pickLocalized(entry.summary, locale),
        longDescription: pickLocalized(entry.longDescription, locale),
        coverImage: getR2PublicUrl(entry.coverImage),
        tags: entry.tags.map((tag) => pickLocalized(tag, locale)),
        tech: [...entry.tech],
        githubUrl: optionalCmsUrl(entry.githubUrl),
        demoUrl: optionalCmsUrl(entry.demoUrl),
        sortOrder: entry.sortOrder ?? 0,
        featured: Boolean(entry.featured),
      }))
      .sort(compareSortOrderThenTitle);
  },
);
