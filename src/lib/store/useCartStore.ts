'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartDraftItem, CartItem } from './cart-types';

export type { CartDraftItem, CartItem } from './cart-types';
export { CartCategory, toCartCategory } from './cart-types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: CartDraftItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNotes: (id: string, notes: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  getBadgeCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((entry) => entry.id === item.id);
        const quantityDelta = item.quantity ?? 1;

        if (existingItem) {
          set({
            items: currentItems.map((entry) =>
              entry.id === item.id
                ? {
                    ...entry,
                    quantity: entry.quantity + quantityDelta,
                    notes: item.notes ?? entry.notes,
                  }
                : entry,
            ),
          });
          return;
        }

        set({
          items: [...currentItems, { ...item, quantity: quantityDelta }],
        });
      },
      removeItem: (id) => {
        set({
          items: get().items.filter((entry) => entry.id !== id),
        });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((entry) =>
            entry.id === id ? { ...entry, quantity } : entry,
          ),
        });
      },
      updateNotes: (id, notes) => {
        set({
          items: get().items.map((entry) =>
            entry.id === id ? { ...entry, notes } : entry,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      getBadgeCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'haiko-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
