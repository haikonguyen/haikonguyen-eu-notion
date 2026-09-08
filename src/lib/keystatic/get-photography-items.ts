import { getR2PublicUrl } from '@lib/r2';
import { cache } from 'react';
import type { AppLocale } from '../../../i18n/locale';
import { pickLocalized, pickLocalizedTitle } from './localized';
import { compareSortOrderThenTitle } from './portfolio-utils';
import { reader } from './reader';
import type { PhotographyItemEntry } from './types';

export const getPhotographyItems = cache(
  async (locale: AppLocale): Promise<PhotographyItemEntry[]> => {
    const entries = await reader.collections.photographyItems.all();

    return entries
      .map(({ slug, entry }) => {
        const title = pickLocalizedTitle(entry.title, entry.titleI18n, locale);
        return {
          slug,
          title,
          alt: pickLocalized(entry.alt, locale) || title,
          image: getR2PublicUrl(entry.image),
          width: entry.width || 1,
          height: entry.height || 1,
          sortOrder: entry.sortOrder ?? 0,
          featured: Boolean(entry.featured),
        };
      })
      .sort(compareSortOrderThenTitle);
  },
);
