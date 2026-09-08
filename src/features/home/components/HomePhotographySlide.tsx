'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { HOME_PHOTOGRAPHY_BG } from '../constants';

export interface HomePhotographySlideProps {
  image?: string;
  title?: string;
  description?: string;
  alt?: string;
}

export function HomePhotographySlide({
  image,
  title,
  description,
  alt,
}: HomePhotographySlideProps) {
  const t = useTranslations('Home');

  return (
    <div className="group/photo relative h-full w-full">
      <Image
        src={image || HOME_PHOTOGRAPHY_BG}
        alt={alt || title || t('photographyShowcaseAlt')}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        className="object-cover transition-transform duration-1000 group-hover/photo:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <div className="absolute top-5 left-5 z-10 sm:top-6 sm:left-6">
        <span className="inline-block rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-primary uppercase backdrop-blur-md sm:text-[11px]">
          {t('photographyBadge')}
        </span>
      </div>
      <div className="absolute right-5 bottom-8 left-5 z-10 max-w-lg sm:right-10 sm:left-10">
        <h3 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
          {title || t('visualStorytellingTitle')}
        </h3>
        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-white/70 sm:text-sm">
          {description || t('visualStorytellingBody')}
        </p>
        <Link
          href="/portfolio?category=Photo"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-black active:scale-95"
        >
          <span>{t('viewGallery')}</span>
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
