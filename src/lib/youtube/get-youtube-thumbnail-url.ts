import { YOUTUBE_THUMBNAIL_BASE } from './constants';

export function getYoutubeThumbnailUrl(youtubeId: string): string {
  return `${YOUTUBE_THUMBNAIL_BASE}/${youtubeId}/hqdefault.jpg`;
}
