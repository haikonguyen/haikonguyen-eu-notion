'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export interface HomeEngineeringSlideProps {
  title?: string;
  description?: string;
}

export function HomeEngineeringSlide({
  title,
  description,
}: HomeEngineeringSlideProps) {
  const t = useTranslations('Home');

  return (
    <div className="group/eng relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#0d1117] to-[#080b0f] p-5 sm:p-10">
      <div className="z-10 flex items-center justify-between">
        <span className="rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-primary uppercase backdrop-blur-md sm:text-[11px]">
          {t('engineeringBadge')}
        </span>
        <div className="flex gap-1.5 opacity-40">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="my-auto py-4">
        <h3 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
          {title || t('engineeringTitle')}
        </h3>
        <p className="mb-4 max-w-lg text-xs leading-relaxed text-white/70 sm:text-sm">
          {description || t('engineeringBody')}
        </p>
        <Link
          href="/portfolio?category=Dev"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold tracking-wider text-black uppercase transition-all hover:scale-105 active:scale-95"
        >
          <span>{t('exploreProjects')}</span>
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
