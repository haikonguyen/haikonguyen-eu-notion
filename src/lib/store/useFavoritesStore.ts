'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type FavoriteItem, FavoriteKind } from './favorite-types';

const FAVORITES_STORAGE_KEY = 'haiko-favorites';

interface FavoritesState {
  items: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string, kind: FavoriteKind) => boolean;
}

export function favoriteKey(id: string, kind: FavoriteKind): string {
  return `${kind}:${id}`;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleFavorite: (item) => {
        const key = favoriteKey(item.id, item.kind);
        const exists = get().items.some(
          (entry) => favoriteKey(entry.id, entry.kind) === key,
        );
        set({
          items: exists
            ? get().items.filter(
                (entry) => favoriteKey(entry.id, entry.kind) !== key,
              )
            : [item, ...get().items],
        });
      },
      isFavorite: (id, kind) =>
        get().items.some(
          (entry) =>
            favoriteKey(entry.id, entry.kind) === favoriteKey(id, kind),
        ),
    }),
    {
      name: FAVORITES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export type { FavoriteItem };
export { FavoriteKind };
