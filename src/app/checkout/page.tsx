'use client';

import {
  AppPageShell,
  AppPageShellSize,
} from '@components/layout/AppPageShell';
import { CheckoutView } from '@features/checkout';

export default function CheckoutPage() {
  return (
    <AppPageShell size={AppPageShellSize.Checkout}>
      <CheckoutView />
    </AppPageShell>
  );
}
