'use client';

import { buildYoutubeEmbedUrl, parseYoutubeUrl } from '@lib/youtube';
import { useTranslations } from 'next-intl';

export interface YouTubeEmbedProps {
  url: string;
  title?: string;
  caption?: string;
}

export function YouTubeEmbed({ url, title, caption }: YouTubeEmbedProps) {
  const t = useTranslations('YouTubeEmbed');
  const video = parseYoutubeUrl(url);

  if (!video) {
    return null;
  }

  const iframeTitle = title?.trim() || t('defaultTitle');
  const embedUrl = buildYoutubeEmbedUrl(video);

  return (
    <figure className="my-10 not-prose">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
        <iframe
          src={embedUrl}
          title={iframeTitle}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mx-auto mt-3 max-w-prose text-center text-sm leading-relaxed text-zinc-400 italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
