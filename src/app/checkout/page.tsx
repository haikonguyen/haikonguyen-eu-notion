'use client';

import {
  AppPageShell,
  AppPageShellSize,
} from '@components/layout/AppPageShell';
import { CheckoutEmptyState, CheckoutView } from '@features/checkout';
import { useCartStore } from '@lib/store/useCartStore';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);

  return (
    <AppPageShell size={AppPageShellSize.Checkout}>
      {items.length > 0 ? <CheckoutView /> : <CheckoutEmptyState />}
    </AppPageShell>
  );
}
