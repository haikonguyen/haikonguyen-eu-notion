/**
 * Client-safe image cache utilities
 * This file can be imported by client-side components
 */

let imageMapCache: Map<string, string> | null = null;

/**
 * Load the image map (Notion URL -> local path)
 * This works on the client by reading from the bundled JSON
 */
export function loadImageMap(): Map<string, string> {
  if (imageMapCache) {
    return imageMapCache;
  }

  try {
    // In production, this will be bundled with the app
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const imageMap = require('../public/cached-images/image-map.json');
    imageMapCache = new Map(Object.entries(imageMap));
    return imageMapCache;
  } catch (error) {
    console.warn('Could not load image map:', error);
    return new Map();
  }
}

/**
 * Get cached image path or return original URL if not cached
 * Safe to use on both client and server
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
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Image not in cache, using original URL: ${url}`);
  }
  return url;
}
