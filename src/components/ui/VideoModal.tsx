'use client';

import { buildYoutubeEmbedUrl } from '@lib/youtube';
import { Play, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export interface VlogItem {
  id: string;
  title: string;
  duration?: string;
  thumbnail: string;
  youtubeId?: string;
  description?: string;
}

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  vlog: VlogItem | null;
}

const BODY_OVERFLOW_HIDDEN = 'hidden';
const BODY_OVERFLOW_VISIBLE = 'unset';

export function VideoModal({ isOpen, onClose, vlog }: VideoModalProps) {
  const t = useTranslations('VideoModal');

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = BODY_OVERFLOW_HIDDEN;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow || BODY_OVERFLOW_VISIBLE;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !vlog) return null;

  const embedUrl = vlog.youtubeId
    ? buildYoutubeEmbedUrl(
        { id: vlog.youtubeId, startSeconds: null },
        { autoplay: true },
      )
    : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10">
      <button
        type="button"
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300"
        onClick={onClose}
        aria-label={t('close')}
      />
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl animate-in zoom-in-95 duration-300 sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-xl transition-all hover:bg-white hover:text-black active:scale-95 sm:top-4 sm:right-4"
          aria-label={t('close')}
        >
          <X size={16} />
        </button>
        <div className="relative aspect-video w-full bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={vlog.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div
              className="relative flex aspect-video w-full flex-col items-center justify-center gap-4 bg-zinc-900 bg-cover bg-center"
              style={{ backgroundImage: `url(${vlog.thumbnail})` }}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" />
              <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/50 bg-primary/20 shadow-[0_0_30px_rgba(6,182,212,0.4)] sm:h-20 sm:w-20">
                  <Play className="ml-1 fill-primary text-2xl text-primary" />
                </div>
                <p className="max-w-md text-lg font-bold text-white sm:text-xl">
                  {vlog.title}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-zinc-950/95 p-4 sm:p-6">
          <div>
            <p className="mb-1 text-[10px] font-bold tracking-[0.25em] text-primary uppercase sm:text-xs">
              {t('nowPlaying')}
            </p>
            <p className="text-base leading-tight font-bold text-white sm:text-lg">
              {vlog.title}
            </p>
            {vlog.description ? (
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                {vlog.description}
              </p>
            ) : null}
          </div>
          {vlog.duration ? (
            <span className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold tracking-wider text-white/70 uppercase">
              {vlog.duration}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
