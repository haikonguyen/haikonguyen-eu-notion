import type { BlogPage } from '@app-types/notion';
import {
  createBlockWithChildren,
  getBlocks,
  getDatabase,
  getNestedChildBlock,
  getPage,
  requireDatabaseId,
} from '@lib/notion';
import { cache } from 'react';
import { getPageSlug } from './get-page-slug';

export const getBlogDatabaseCached = cache(async () => {
  return getDatabase(requireDatabaseId());
});

export async function findBlogPageBySlug(
  slug: string,
): Promise<BlogPage | null> {
  const { results } = await getBlogDatabaseCached();
  const matchingPage = results.find((page) => {
    return getPageSlug(page as BlogPage) === slug;
  });

  if (!matchingPage) {
    return null;
  }

  return (await getPage(matchingPage.id)) as BlogPage;
}

export async function getPostBlocks(pageId: string) {
  const { results: blockResults } = await getBlocks(pageId);
  const fullBlocks = blockResults.filter((block) => 'type' in block);
  const nestedChildBlock = await getNestedChildBlock(fullBlocks);

  return fullBlocks.map((block) =>
    createBlockWithChildren(block, nestedChildBlock),
  );
}
