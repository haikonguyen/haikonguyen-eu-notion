/**
 * Quick test to verify image replacement is working
 */

import dotenv from 'dotenv';
import { Client } from '@notionhq/client';
import { replaceNotionImagesInList } from '../utils/replace-notion-images';

dotenv.config({ path: '.env' });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function test() {
  console.log('🧪 Testing image replacement...\n');

  const { results } = await notion.databases.query({
    database_id: process.env.DATABASE_ID!,
    page_size: 1,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = results[0] as any;

  console.log('📥 Original cover URL:');
  console.log(page?.cover?.file?.url || 'No cover found');

  const replaced = replaceNotionImagesInList(results);

  console.log('\n📤 Replaced cover URL:');
  console.log(replaced[0]?.cover?.file?.url || 'No cover found');

  const isLocal = replaced[0]?.cover?.file?.url?.startsWith('/cached-images/');
  console.log(
    `\n${isLocal ? '✅ SUCCESS' : '❌ FAILED'}: URL is ${isLocal ? 'local' : 'still remote'}`,
  );
}

test();
