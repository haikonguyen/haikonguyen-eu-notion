import { CoverType } from './types';
import { getImageKitUrl, IMAGEKIT_BASE_URL } from '@lib/imagekit';

const DEFAULT_PLACEHOLDER = `${IMAGEKIT_BASE_URL}/placeholder.jpg`;

/**
 * Cover type that supports both external and file covers from Notion API
 * Also supports optional imagekit_path for ImageKit integration
 */
export interface ExtendedCover {
  type: 'external' | 'file';
  external?: { url: string };
  file?: { url: string; expiry_time?: string };
  imagekit_path?: string;
}

export const getCoverSource = (
  cover: ExtendedCover | null,
  imagekitPath?: string,
): string => {
  if (imagekitPath) {
    return getImageKitUrl(imagekitPath, { quality: 85 });
  }

  if (cover?.imagekit_path) {
    return getImageKitUrl(cover.imagekit_path, { quality: 85 });
  }

  if (cover?.type === CoverType.EXTERNAL && cover.external?.url) {
    return cover.external.url;
  }

  if (cover?.type === CoverType.FILE && cover.file?.url) {
    return cover.file.url;
  }

  return DEFAULT_PLACEHOLDER;
};
