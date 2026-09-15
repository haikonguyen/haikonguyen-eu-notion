'use client';

import { FavoritesView } from '@features/favorites';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AccountFavoritesPanel() {
  const t = useTranslations('Account');

  return (
    <section className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
        <Heart size={18} className="text-primary" />
        <span>{t('tabs.favorites')}</span>
      </h3>
      <FavoritesView />
    </section>
  );
}
