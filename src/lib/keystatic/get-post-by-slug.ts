import { getR2PublicUrl } from '@lib/r2';
import { cache } from 'react';
import {
  findEntryKeyByPublicSlug,
  getPublicSlugFromEntryKey,
} from './post-slug';
import { reader } from './reader';
import type { BlogPost } from './types';

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const entryKeys = await reader.collections.posts.list();
    const entryKey = findEntryKeyByPublicSlug(entryKeys, slug);

    if (!entryKey) {
      return null;
    }

    const entry = await reader.collections.posts.read(entryKey, {
      resolveLinkedFiles: true,
    });

    if (!entry) {
      return null;
    }

    return {
      slug: getPublicSlugFromEntryKey(entryKey),
      title: entry.title,
      publishedDate: entry.publishedDate,
      excerpt: entry.excerpt,
      tags: [...entry.tags],
      authorName: entry.authorName,
      coverImage: getR2PublicUrl(entry.coverImage),
      content: entry.content.node,
    };
  },
);
