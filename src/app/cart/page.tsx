'use client';

import {
  AppPageShell,
  AppPageShellSize,
} from '@components/layout/AppPageShell';
import { CartView } from '@features/cart';

export default function CartPage() {
  return (
    <AppPageShell size={AppPageShellSize.Cart}>
      <CartView />
    </AppPageShell>
  );
}
