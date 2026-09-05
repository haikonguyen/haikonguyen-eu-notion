import { getR2PublicUrl } from '@lib/r2';
import { cache } from 'react';
import { reader } from './reader';
import type { BlogPost } from './types';

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const entry = await reader.collections.posts.read(slug, {
      resolveLinkedFiles: true,
    });

    if (!entry) {
      return null;
    }

    return {
      slug,
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
