'use client';

import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import type { PortfolioVlog } from '../types';

interface VlogCardProps {
  vlog: PortfolioVlog;
  onSelect: () => void;
}

export function VlogCard({ vlog, onSelect }: VlogCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/45 text-left transition-all duration-500 hover:border-primary/50 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.2)]"
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
        <h3 className="mb-1 text-lg font-bold tracking-tight text-white transition-colors group-hover:text-primary sm:text-xl">
          {vlog.title}
        </h3>
        <p className="line-clamp-2 text-xs text-white/60 sm:text-sm">
          {vlog.description}
        </p>
      </div>
    </button>
  );
}
