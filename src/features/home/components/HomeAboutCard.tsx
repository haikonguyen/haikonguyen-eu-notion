'use client';

import { BentoGridItem } from '@components/ui/BentoGrid';
import type { HomeAboutEntry } from '@lib/keystatic/types';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export interface HomeAboutCardProps {
  about: HomeAboutEntry;
}

export function HomeAboutCard({ about }: HomeAboutCardProps) {
  const t = useTranslations('Home');

  return (
    <BentoGridItem
      className="md:col-span-2 group/about"
      showGlow
      title={t('aboutTitle')}
      header={
        <div className="flex h-full flex-col items-stretch gap-6 pt-1 md:flex-row md:items-start md:gap-10 md:pt-4">
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] sm:aspect-[16/10] md:h-64 md:w-64 md:aspect-square md:rounded-[2rem]">
            <Image
              src={about.portraitImage}
              alt={about.name}
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              priority
              className="object-cover grayscale-[0.2] transition-all duration-700 group-hover/about:scale-105 group-hover/about:grayscale-0"
            />
          </div>
          <div className="flex h-full flex-col justify-center space-y-4 text-center sm:space-y-6 md:text-left">
            <div>
              <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                {about.name}
              </h1>
              <p className="text-xs font-bold tracking-tight text-primary opacity-90 sm:text-sm md:text-base">
                {about.role}
              </p>
            </div>
            <p className="mx-auto max-w-md text-xs leading-relaxed text-white/70 sm:text-sm md:mx-0 md:text-base">
              {about.bio}
            </p>
            <div className="pt-2">
              <Link href={about.ctaHref}>
                <button
                  type="button"
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-8 py-3 text-[11px] font-bold tracking-[0.25em] text-primary uppercase shadow-lg backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 sm:w-auto md:rounded-2xl"
                >
                  {t('learnMore')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      }
    />
  );
}
