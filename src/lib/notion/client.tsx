import { NestedChildBlock, NotionBlock } from '@app-types/notion';
import { Client } from '@notionhq/client';
import type {
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

export { renderBlock } from './render-block';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getDatabase = async (
  databaseId: string,
): Promise<QueryDatabaseResponse> => {
  const allResults: QueryDatabaseResponse['results'] = [];
  let start_cursor: string | undefined;
  let has_more = true;

  while (has_more) {
    const response = await notion.databases.query({
      database_id: databaseId,
      ...(start_cursor ? { start_cursor } : {}),
    });
    allResults.push(...response.results);
    has_more = response.has_more;
    start_cursor = response.next_cursor ?? undefined;
  }

  return {
    object: 'list',
    results: allResults,
    has_more: false,
    next_cursor: null,
  } as QueryDatabaseResponse;
};

export const getPage = async (pageId: string): Promise<GetPageResponse> => {
  return notion.pages.retrieve({ page_id: pageId });
};

export const getBlocks = async (
  blockId: string,
): Promise<ListBlockChildrenResponse> => {
  const allResults: ListBlockChildrenResponse['results'] = [];
  let start_cursor: string | undefined;
  let has_more = true;
  let last: ListBlockChildrenResponse | undefined;

  while (has_more) {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      ...(start_cursor ? { start_cursor } : {}),
    });
    last = response;
    allResults.push(...response.results);
    has_more = response.has_more;
    start_cursor = response.next_cursor ?? undefined;
  }

  return {
    ...(last ?? {
      object: 'list',
      type: 'block',
      block: {},
      results: [],
      has_more: false,
      next_cursor: null,
    }),
    results: allResults,
    has_more: false,
    next_cursor: null,
  } as ListBlockChildrenResponse;
};

export const getNestedChildBlock = async (
  blocks: NotionBlock[],
): Promise<NestedChildBlock[]> =>
  await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      }),
  );

export const createBlockWithChildren = (
  block: NotionBlock,
  nestedChildBlocks: NestedChildBlock[],
) => {
  if (block?.has_children && !block[block.type].children) {
    block[block.type]['children'] = nestedChildBlocks.find(
      (child) => child.id === block.id,
    )?.children;
  }
  return block;
};
