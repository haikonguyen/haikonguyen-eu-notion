'use client';

import { AppPageShell, AppPageShellSize } from '@components/layout';
import { BentoGrid } from '@components/ui/BentoGrid';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { HOME_BENTO_GRID_CLASS, HOME_PHOTOGRAPHY_BG } from '../constants';
import type { HomePageContentProps } from '../types';
import { HomeAboutCard } from './HomeAboutCard';
import { HomeBookingCard } from './HomeBookingCard';
import { HomeLatestProjectCard } from './HomeLatestProjectCard';
import { HomeShowcaseCarousel } from './HomeShowcaseCarousel';

export function HomePageContent({
  about,
  backgroundImage,
  photography,
  vlog,
  software,
  booking,
}: HomePageContentProps) {
  const t = useTranslations('Home');

  return (
    <AppPageShell
      size={AppPageShellSize.Default}
      className="relative overflow-x-hidden"
    >
      <div className="fixed inset-0 -z-20">
        <Image
          src={backgroundImage || HOME_PHOTOGRAPHY_BG}
          alt={t('backgroundAlt')}
          fill
          sizes="100vw"
          className="object-cover opacity-60 blur-[2px] grayscale-[0.5]"
          priority
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>
      <BentoGrid className={HOME_BENTO_GRID_CLASS}>
        <HomeAboutCard about={about} />
        <HomeLatestProjectCard software={software} />
        <HomeShowcaseCarousel
          photography={photography}
          vlog={vlog}
          software={software}
        />
        <HomeBookingCard initial={booking} />
      </BentoGrid>
    </AppPageShell>
  );
}
