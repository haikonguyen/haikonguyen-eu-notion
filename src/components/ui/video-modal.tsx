'use client';

import React, { useEffect } from 'react';
import { FaTimes, FaPlay, FaExpand } from 'react-icons/fa';
import { cn } from '@lib/utils';

export interface VlogItem {
  id: string;
  title: string;
  duration?: string;
  thumbnail: string;
  youtubeId?: string;
  description?: string;
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  vlog: VlogItem | null;
}

export const VideoModal = ({ isOpen, onClose, vlog }: VideoModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen || !vlog) return null;

  const embedUrl = vlog.youtubeId
    ? `https://www.youtube.com/embed/${vlog.youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-400"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-20"
        >
          <FaTimes size={14} />
        </button>

        {/* Video Container */}
        <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
          {embedUrl ? (
            <div className="relative aspect-video w-full">
              <iframe
                src={embedUrl}
                title={vlog.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            // Placeholder when no YouTube ID yet
            <div
              className="relative aspect-video w-full bg-zinc-900 flex flex-col items-center justify-center gap-6"
              style={{ backgroundImage: `url(${vlog.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              <div className="relative z-10 flex flex-col items-center gap-4 text-center px-8">
                <div className="h-20 w-20 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                  <FaPlay className="text-primary text-3xl ml-1" />
                </div>
                <p className="text-white font-bold text-xl">{vlog.title}</p>
                <p className="text-white/50 text-sm">Video coming soon</p>
              </div>
            </div>
          )}

          {/* Vlog Info Bar */}
          <div className="px-8 py-6 bg-zinc-950 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-1">Now Playing</p>
              <p className="text-white font-bold text-lg leading-tight">{vlog.title}</p>
              {vlog.description && (
                <p className="text-white/50 text-sm mt-1">{vlog.description}</p>
              )}
            </div>
            {vlog.duration && (
              <span className="shrink-0 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest">
                {vlog.duration}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
