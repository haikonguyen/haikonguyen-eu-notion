'use client';

import { FavoriteKind, useFavoritesStore } from '@lib/store/useFavoritesStore';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function FavoritesView() {
  const t = useTranslations('Favorites');
  const items = useFavoritesStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-glass-border bg-glass-surface px-6 py-16 text-center backdrop-blur-xl">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-glass-border bg-glass-surface text-muted-foreground">
          <Heart size={28} />
        </div>
        <h2 className="text-xl font-bold text-foreground">{t('emptyTitle')}</h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {t('emptyBody')}
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-black"
        >
          <span>{t('exploreBlog')}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={`${item.kind}-${item.id}`}>
          <Link
            href={item.href}
            className="flex h-full flex-col rounded-3xl border border-glass-border bg-glass-surface p-5 backdrop-blur-xl transition-colors hover:border-primary/40"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {t(`kinds.${item.kind}` as `kinds.${FavoriteKind}`)}
            </span>
            <h3 className="mt-2 text-lg font-bold text-foreground">
              {item.title}
            </h3>
            {item.excerpt ? (
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {item.excerpt}
              </p>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
