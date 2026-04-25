'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FaPlay } from 'react-icons/fa';
import { HOME_VLOG_PLACEHOLDER } from '../constants';

export function HomeVlogSlide() {
  const t = useTranslations('Home');

  return (
    <div className="group/vlog relative h-full w-full">
      <Image
        src={HOME_VLOG_PLACEHOLDER}
        alt={t('recentVlogAlt')}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover opacity-75 transition-transform duration-1000 group-hover/vlog:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <div className="absolute top-5 left-5 z-10 sm:top-6 sm:left-6">
        <span className="inline-block rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-primary uppercase backdrop-blur-md sm:text-[11px]">
          {t('recentVlogBadge')}
        </span>
      </div>
      <Link
        href="/portfolio?category=Vlogs"
        className="group/btn absolute inset-0 z-10 flex items-center justify-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/60 bg-primary/25 shadow-[0_0_40px_rgba(6,182,212,0.4)] backdrop-blur-xl transition-all duration-300 group-hover/btn:scale-110 sm:h-20 sm:w-20">
          <FaPlay className="ml-1 text-xl text-primary sm:text-2xl" />
        </div>
      </Link>
      <div className="absolute right-5 bottom-8 left-5 z-10 max-w-lg sm:right-10 sm:left-10">
        <h3 className="mb-1 text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
          {t('recentVlogTitle')}
        </h3>
        <p className="text-xs text-white/60 sm:text-sm">
          {t('recentVlogBody')}
        </p>
      </div>
    </div>
  );
}
