/**
 * Script to download and cache all Notion images before build
 * Run this before building the site to ensure all images are local
 */

import dotenv from 'dotenv';
import { Client } from '@notionhq/client';

// Load environment variables from .env
dotenv.config({ path: '.env' });
import {
  downloadImage,
  getCachedImagePath,
  getImageExtension,
  saveImageMap,
} from '../utils/image-cache';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

interface NotionBlock {
  type: string;
  id: string;
  has_children?: boolean;
  [key: string]: unknown;
}

interface NotionPage {
  id: string;
  cover: {
    file?: { url: string };
    external?: { url: string };
  };
  properties: Record<string, unknown>;
}

async function getDatabase(databaseId: string) {
  return await notion.databases.query({
    database_id: databaseId,
  });
}

async function getBlocks(blockId: string) {
  return await notion.blocks.children.list({
    block_id: blockId,
  });
}

/**
 * Extract image URL from Notion block or page cover
 */
function extractImageUrl(item: NotionBlock | NotionPage): string | null {
  const itemAny = item as Record<string, unknown>;

  // Handle page cover
  const cover = itemAny?.cover as
    | { file?: { url: string }; external?: { url: string } }
    | undefined;
  if (cover?.file?.url) {
    return cover.file.url;
  }
  if (cover?.external?.url) {
    return cover.external.url;
  }

  // Handle image block
  const image = itemAny?.image as
    | { file?: { url: string }; external?: { url: string } }
    | undefined;
  if (image?.file?.url) {
    return image.file.url;
  }
  if (image?.external?.url) {
    return image.external.url;
  }

  return null;
}

/**
 * Recursively get all blocks including nested ones
 */
async function getAllBlocks(blockId: string): Promise<NotionBlock[]> {
  const { results } = await getBlocks(blockId);
  const allBlocks: NotionBlock[] = [];

  for (const block of results as NotionBlock[]) {
    allBlocks.push(block);

    // Recursively get nested blocks
    if (block.has_children) {
      const nestedBlocks = await getAllBlocks(block.id);
      allBlocks.push(...nestedBlocks);
    }
  }

  return allBlocks;
}

/**
 * Main function to cache all images
 */
async function cacheAllImages() {
  console.log('🔍 Starting image cache process...\n');

  const databaseId = process.env.DATABASE_ID;
  if (!databaseId) {
    throw new Error('DATABASE_ID environment variable is not set');
  }

  const imageMap = new Map<string, string>();
  const imageUrls = new Set<string>();

  try {
    // Get all posts from database
    console.log('📚 Fetching posts from Notion database...');
    const { results } = await getDatabase(databaseId);
    console.log(`Found ${results.length} posts\n`);

    // Extract all image URLs
    for (const page of results as NotionPage[]) {
      console.log(`Processing post: ${page.id}`);

      // Get cover image
      const coverUrl = extractImageUrl(page);
      if (coverUrl) {
        imageUrls.add(coverUrl);
        console.log(`  ✓ Found cover image`);
      }

      // Get all blocks in the page
      const blocks = await getAllBlocks(page.id);

      // Find image blocks
      for (const block of blocks) {
        const imageUrl = extractImageUrl(block);
        if (imageUrl) {
          imageUrls.add(imageUrl);
          console.log(`  ✓ Found content image`);
        }
      }

      console.log('');
    }

    console.log(`\n📥 Downloading ${imageUrls.size} unique images...\n`);

    // Download all images
    let successCount = 0;
    let errorCount = 0;

    for (const url of Array.from(imageUrls)) {
      try {
        const extension = getImageExtension(url);
        const cachedPath = getCachedImagePath(url, extension);

        await downloadImage(url, cachedPath);
        imageMap.set(url, cachedPath);
        successCount++;
      } catch {
        console.error(`Failed to cache image: ${url}`);
        errorCount++;
      }
    }

    // Save image map
    saveImageMap(imageMap);

    console.log('\n✅ Image caching complete!');
    console.log(`   Success: ${successCount}`);
    console.log(`   Failed: ${errorCount}`);
    console.log(`   Total: ${imageUrls.size}`);
  } catch (error) {
    console.error('\n❌ Error during image caching:', error);
    process.exit(1);
  }
}

// Run the script
cacheAllImages();
