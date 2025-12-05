/**
 * ImageKit Configuration and URL Builder
 *
 * This utility provides functions to generate ImageKit URLs with transformations.
 * ImageKit URLs follow this pattern:
 * https://ik.imagekit.io/{imagekit_id}/{path}?tr={transformations}
 *
 * @see https://docs.imagekit.io/features/image-transformations
 */

export const IMAGEKIT_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL || 'https://ik.imagekit.io/8qy7obkhf';

/**
 * Image transformation options for ImageKit
 */
export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  focus?: 'center' | 'top' | 'left' | 'bottom' | 'right' | 'auto';
  crop?: 'maintain_ratio' | 'force' | 'at_least' | 'at_max';
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
  blur?: number;
}

/**
 * Builds an ImageKit URL with optional transformations
 *
 * @param path - The image path in ImageKit (e.g., 'blog/my-image.jpg')
 * @param options - Transformation options
 * @returns Full ImageKit URL with transformations
 *
 * @example
 * getImageKitUrl('blog/cover.jpg', { width: 800, quality: 80 })
 * // Returns: https://ik.imagekit.io/8qy7obkhf/blog/cover.jpg?tr=w-800,q-80
 */
export const getImageKitUrl = (
  path: string,
  options?: ImageTransformOptions,
): string => {
  // Ensure path doesn't start with a slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = `${IMAGEKIT_BASE_URL}/${cleanPath}`;

  if (!options) {
    return baseUrl;
  }

  const transforms: string[] = [];

  if (options.width) transforms.push(`w-${options.width}`);
  if (options.height) transforms.push(`h-${options.height}`);
  if (options.quality) transforms.push(`q-${options.quality}`);
  if (options.focus) transforms.push(`fo-${options.focus}`);
  if (options.crop) transforms.push(`c-${options.crop}`);
  if (options.format) transforms.push(`f-${options.format}`);
  if (options.blur) transforms.push(`bl-${options.blur}`);

  if (transforms.length === 0) {
    return baseUrl;
  }

  return `${baseUrl}?tr=${transforms.join(',')}`;
};
