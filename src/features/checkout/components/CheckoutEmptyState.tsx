'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function CheckoutEmptyState() {
  const t = useTranslations('Checkout');

  return (
    <div className="rounded-3xl border border-glass-border bg-glass-surface px-6 py-16 text-center backdrop-blur-xl">
      <ShoppingBag className="mx-auto mb-4 text-muted-foreground" size={28} />
      <h1 className="text-2xl font-bold text-foreground">{t('emptyTitle')}</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {t('emptyBody')}
      </p>
      <Link
        href="/cart"
        className="mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-black"
      >
        {t('backToCart')}
      </Link>
    </div>
  );
}
