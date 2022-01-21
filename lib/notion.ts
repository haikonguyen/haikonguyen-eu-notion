import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getDatabase = async (databaseId: string) => {
  return await notion.databases.query({
    database_id: databaseId,
  });
};

export const getPage = async (pageId: string) => {
  return await notion.pages.retrieve({ page_id: pageId });
};

export const getBlocks = async (blockId: string) => {
  return await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
};
