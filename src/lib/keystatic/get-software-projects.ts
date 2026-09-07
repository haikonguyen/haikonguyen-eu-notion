import { getR2PublicUrl } from '@lib/r2';
import { cache } from 'react';
import { compareSortOrderThenTitle, optionalCmsUrl } from './portfolio-utils';
import { reader } from './reader';
import type { SoftwareProjectEntry } from './types';

export const getSoftwareProjects = cache(
  async (): Promise<SoftwareProjectEntry[]> => {
    const entries = await reader.collections.softwareProjects.all();

    return entries
      .map(({ slug, entry }) => ({
        slug,
        title: entry.title,
        summary: entry.summary,
        longDescription: entry.longDescription,
        coverImage: getR2PublicUrl(entry.coverImage),
        tags: [...entry.tags],
        tech: [...entry.tech],
        githubUrl: optionalCmsUrl(entry.githubUrl),
        demoUrl: optionalCmsUrl(entry.demoUrl),
        sortOrder: entry.sortOrder ?? 0,
        featured: Boolean(entry.featured),
      }))
      .sort(compareSortOrderThenTitle);
  },
);
