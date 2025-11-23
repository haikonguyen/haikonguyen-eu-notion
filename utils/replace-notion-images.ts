/**
 * Server-side utility to replace Notion image URLs with cached versions
 * Use this in getStaticProps/getServerSideProps to transform data before sending to client
 */

import { loadImageMap } from './image-cache';

/**
 * Get base URL without query parameters (for Notion S3 URLs)
 */
function getBaseUrl(url: string): string {
  return url.split('?')[0];
}

/**
 * Replace a single image URL with cached version
 * Matches based on base URL (ignoring signed URL parameters)
 */
function replaceImageUrl(url: string | undefined): string {
  if (!url) return '';

  // If already a local cached path, return as-is
  if (url.startsWith('/cached-images/')) {
    return url;
  }

  const imageMap = loadImageMap();
  const baseUrl = getBaseUrl(url);

  // Try exact match first
  const cachedPath = imageMap.get(url);
  if (cachedPath) return cachedPath;

  // Try matching by base URL (without query params)
  for (const [cachedUrl, localPath] of Array.from(imageMap.entries())) {
    if (getBaseUrl(cachedUrl) === baseUrl) {
      return localPath;
    }
  }

  // Fallback to original URL if not found
  return url;
}

/**
 * Replace image URLs in Notion page cover
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function replaceCoverUrl(cover: any): any {
  if (!cover) return cover;

  if (cover?.file?.url) {
    return {
      ...cover,
      file: {
        ...cover.file,
        url: replaceImageUrl(cover.file.url),
      },
    };
  }

  if (cover?.external?.url) {
    return {
      ...cover,
      external: {
        ...cover.external,
        url: replaceImageUrl(cover.external.url),
      },
    };
  }

  return cover;
}

/**
 * Replace all image URLs in Notion blocks
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function replaceBlockImages(blocks: any[]): any[] {
  if (!blocks) return blocks;

  return blocks.map((block) => {
    // Handle image blocks
    if (block.type === 'image' && block.image) {
      const newBlock = { ...block };

      if (newBlock.image.file?.url) {
        newBlock.image = {
          ...newBlock.image,
          file: {
            ...newBlock.image.file,
            url: replaceImageUrl(newBlock.image.file.url),
          },
        };
      }

      if (newBlock.image.external?.url) {
        newBlock.image = {
          ...newBlock.image,
          external: {
            ...newBlock.image.external,
            url: replaceImageUrl(newBlock.image.external.url),
          },
        };
      }

      return newBlock;
    }

    // Recursively handle nested blocks
    if (block.has_children && block[block.type]?.children) {
      return {
        ...block,
        [block.type]: {
          ...block[block.type],
          children: {
            ...block[block.type].children,
            results: replaceBlockImages(block[block.type].children.results),
          },
        },
      };
    }

    return block;
  });
}

/**
 * Replace all Notion image URLs in page data with cached versions
 * Call this in getStaticProps before returning props
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function replaceNotionImages(page: any): any {
  if (!page) return page;

  return {
    ...page,
    cover: replaceCoverUrl(page.cover),
  };
}

/**
 * Replace image URLs in an array of pages (for blog list)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function replaceNotionImagesInList(pages: any[]): any[] {
  if (!pages) return pages;

  return pages.map((page) => replaceNotionImages(page));
}

/**
 * Replace image URLs in blocks
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function replaceNotionImagesInBlocks(blocks: any[]): any[] {
  return replaceBlockImages(blocks);
}
