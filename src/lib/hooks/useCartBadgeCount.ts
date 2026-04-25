'use client';

import { useCartStore } from '@lib/store/useCartStore';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function useCartBadgeCount() {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const items = useCartStore((state) => state.items);

  if (!isHydrated) {
    return 0;
  }

  return items.reduce((total, item) => total + item.quantity, 0);
}
