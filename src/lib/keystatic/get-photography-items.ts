import { getR2PublicUrl } from '@lib/r2';
import { cache } from 'react';
import { compareSortOrderThenTitle } from './portfolio-utils';
import { reader } from './reader';
import type { PhotographyItemEntry } from './types';

export const getPhotographyItems = cache(
  async (): Promise<PhotographyItemEntry[]> => {
    const entries = await reader.collections.photographyItems.all();

    return entries
      .map(({ slug, entry }) => ({
        slug,
        title: entry.title,
        alt: entry.alt || entry.title,
        image: getR2PublicUrl(entry.image),
        width: entry.width || 1,
        height: entry.height || 1,
        sortOrder: entry.sortOrder ?? 0,
        featured: Boolean(entry.featured),
      }))
      .sort(compareSortOrderThenTitle);
  },
);
