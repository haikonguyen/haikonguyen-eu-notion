import { getR2PublicUrl } from '@lib/r2';
import { cache } from 'react';
import { getPublicSlugFromEntryKey } from './post-slug';
import { reader } from './reader';
import type { BlogPostSummary } from './types';

export const getAllPosts = cache(async (): Promise<BlogPostSummary[]> => {
  const entries = await reader.collections.posts.all();

  return entries
    .map(({ slug: entryKey, entry }) => ({
      slug: getPublicSlugFromEntryKey(entryKey),
      title: entry.title,
      publishedDate: entry.publishedDate,
      excerpt: entry.excerpt,
      tags: [...entry.tags],
      authorName: entry.authorName,
      coverImage: getR2PublicUrl(entry.coverImage),
    }))
    .sort((a, b) => {
      const aTime = a.publishedDate ? Date.parse(a.publishedDate) : 0;
      const bTime = b.publishedDate ? Date.parse(b.publishedDate) : 0;
      return bTime - aTime;
    });
});
