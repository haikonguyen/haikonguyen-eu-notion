import type { YoutubeVideoRef } from './parse-youtube-url';

export interface BuildYoutubeEmbedUrlOptions {
  autoplay?: boolean;
}

export function buildYoutubeEmbedUrl(
  video: YoutubeVideoRef,
  options: BuildYoutubeEmbedUrlOptions = {},
): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
  });

  if (options.autoplay) {
    params.set('autoplay', '1');
  }

  if (video.startSeconds !== null && video.startSeconds > 0) {
    params.set('start', String(video.startSeconds));
  }

  return `https://www.youtube.com/embed/${video.id}?${params.toString()}`;
}
