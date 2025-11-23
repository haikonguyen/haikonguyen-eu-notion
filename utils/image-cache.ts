import { createHash } from 'crypto';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const CACHE_DIR = 'public/cached-images';
const IMAGE_MAP_FILE = 'public/cached-images/image-map.json';

export interface ImageMapEntry {
  original: string;
  cached: string;
  hash: string;
}

/**
 * Generate a hash-based filename for an image URL
 */
export function generateImageHash(url: string): string {
  return createHash('md5').update(url).digest('hex');
}

/**
 * Get the local path for a cached image
 */
export function getCachedImagePath(url: string, extension = 'jpg'): string {
  const hash = generateImageHash(url);
  return `/cached-images/${hash}.${extension}`;
}

/**
 * Download an image from a URL and save it locally
 */
export async function downloadImage(
  url: string,
  outputPath: string,
): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure directory exists
    const dir = join(process.cwd(), CACHE_DIR);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(join(process.cwd(), 'public', outputPath), buffer);
    console.log(`✓ Downloaded: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to download ${url}:`, error);
    throw error;
  }
}

/**
 * Get the file extension from a URL
 */
export function getImageExtension(url: string): string {
  // Handle Notion URLs with query parameters
  const urlWithoutQuery = url.split('?')[0];
  const match = urlWithoutQuery.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  return match ? match[1].toLowerCase() : 'jpg';
}

/**
 * Load the image map (Notion URL -> local path)
 */
export function loadImageMap(): Map<string, string> {
  try {
    if (existsSync(IMAGE_MAP_FILE)) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const data = require(`../${IMAGE_MAP_FILE}`);
      return new Map(Object.entries(data));
    }
  } catch (error) {
    console.warn('Could not load image map:', error);
  }
  return new Map();
}

/**
 * Save the image map to disk
 */
export function saveImageMap(imageMap: Map<string, string>): void {
  const dir = join(process.cwd(), CACHE_DIR);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const mapObject = Object.fromEntries(imageMap);
  writeFileSync(
    join(process.cwd(), IMAGE_MAP_FILE),
    JSON.stringify(mapObject, null, 2),
  );
  console.log(`✓ Saved image map with ${imageMap.size} entries`);
}

/**
 * Get cached image path or return original URL if not cached
 */
export function getImageSource(url: string | undefined): string {
  if (!url) return '';

  // If it's already a local path, return as-is
  if (url.startsWith('/cached-images/')) {
    return url;
  }

  // Try to load from cache map
  const imageMap = loadImageMap();
  const cachedPath = imageMap.get(url);

  if (cachedPath) {
    return cachedPath;
  }

  // Fallback to original URL (for development)
  console.warn(`Image not in cache, using original URL: ${url}`);
  return url;
}
