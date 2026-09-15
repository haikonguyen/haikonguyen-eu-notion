'use client';

import { useTranslations } from 'next-intl';

interface CartHeaderProps {
  hasItems: boolean;
  onClear: () => void;
}

export function CartHeader({ hasItems, onClear }: CartHeaderProps) {
  const t = useTranslations('Cart');

  return (
    <div className="mb-8 flex items-center justify-between border-b border-glass-border pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>
      {hasItems && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-zinc-400 transition-colors hover:text-red-400"
        >
          {t('clearAll')}
        </button>
      )}
    </div>
  );
}
