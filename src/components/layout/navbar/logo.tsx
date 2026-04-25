'use client';

import mainLogo from '@images/mainLogoOptimized.png';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Logo = () => {
  const t = useTranslations('Nav');

  return (
    <Link
      href="/"
      className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-primary/40 active:scale-95 sm:h-11 sm:w-11"
      aria-label={t('homeAria')}
    >
      <div
        role="img"
        aria-label={t('home')}
        className="h-5 w-5 bg-primary transition-transform duration-300 group-hover:scale-110 sm:h-6.5 sm:w-6.5"
        style={{
          maskImage: `url(${mainLogo.src})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskImage: `url(${mainLogo.src})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
      />
    </Link>
  );
};
