'use client';

import type { AppLocale } from '@i18n/locale';
import { routing } from '@i18n/routing';
import { cn } from '@lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { setLocale } from '@/actions/set-locale';

const LOCALE_LABEL_KEYS: Record<AppLocale, 'english' | 'czech' | 'vietnamese'> =
  {
    en: 'english',
    cs: 'czech',
    vi: 'vietnamese',
  };

export function LanguageSwitcher() {
  const t = useTranslations('Locale');
  const locale = useLocale() as AppLocale;
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-white/10 bg-black/30 p-0.5"
      role="group"
      aria-label={t('switcherLabel')}
    >
      {routing.locales.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            disabled={isPending || isActive}
            aria-label={t(LOCALE_LABEL_KEYS[code])}
            aria-pressed={isActive}
            onClick={() => {
              startTransition(async () => {
                await setLocale(code);
              });
            }}
            className={cn(
              'rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 sm:px-2.5',
              isActive
                ? 'bg-primary text-black shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                : 'text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-50',
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
