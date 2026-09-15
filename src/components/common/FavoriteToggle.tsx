'use client';

import { useAuth } from '@lib/hooks/useAuth';
import {
  type FavoriteItem,
  useFavoritesStore,
} from '@lib/store/useFavoritesStore';
import { cn } from '@lib/utils';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export interface FavoriteToggleProps {
  item: FavoriteItem;
  className?: string;
}

export function FavoriteToggle({ item, className }: FavoriteToggleProps) {
  const t = useTranslations('Favorites');
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const isSaved = useFavoritesStore((state) =>
    state.items.some(
      (entry) => entry.id === item.id && entry.kind === item.kind,
    ),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!isAuthenticated) {
          router.push('/login');
          return;
        }
        toggleFavorite(item);
      }}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full border border-glass-border bg-glass-surface text-muted-foreground backdrop-blur-xl transition-colors hover:text-primary',
        isSaved && 'border-primary/40 text-primary',
        className,
      )}
      aria-label={isSaved ? t('unsave') : t('save')}
      aria-pressed={isSaved}
    >
      <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} />
    </button>
  );
}
