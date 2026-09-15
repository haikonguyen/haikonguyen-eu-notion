'use client';

import { FavoriteToggle } from '@components/common/FavoriteToggle';
import { FavoriteKind } from '@lib/store/useFavoritesStore';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import type { PortfolioVlog } from '../types';

interface VlogCardProps {
  vlog: PortfolioVlog;
  onSelect: () => void;
}

export function VlogCard({ vlog, onSelect }: VlogCardProps) {
  return (
    <div className="relative">
      <FavoriteToggle
        className="absolute top-3 right-3 z-10"
        item={{
          id: vlog.slug,
          kind: FavoriteKind.Vlog,
          title: vlog.title,
          href: '/portfolio',
          image: vlog.thumbnail,
          excerpt: vlog.description,
        }}
      />
      <button
        type="button"
        onClick={onSelect}
        className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-glass-border bg-glass-surface text-left transition-all duration-500 hover:border-primary/50 hover:bg-glass-surface-hover hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.2)]"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
          <Image
            src={vlog.thumbnail}
            alt={vlog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/60 bg-primary/25 shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-xl transition-all duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
              <FaPlay className="ml-1 text-lg text-primary sm:text-xl" />
            </div>
          </div>
          {vlog.duration && (
            <span className="absolute right-3 bottom-3 rounded-lg border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[10px] font-bold text-white backdrop-blur-md">
              {vlog.duration}
            </span>
          )}
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="mb-1 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {vlog.title}
          </h3>
          <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm">
            {vlog.description}
          </p>
        </div>
      </button>
    </div>
  );
}
