'use client';

import type { CartItem } from '@lib/store/useCartStore';
import { useTranslations } from 'next-intl';

export interface CheckoutSummaryProps {
  items: CartItem[];
}

function lineTotal(item: CartItem): number | null {
  if (item.price === undefined) return null;
  return item.price * item.quantity;
}

export function CheckoutSummary({ items }: CheckoutSummaryProps) {
  const t = useTranslations('Checkout');
  const priced = items
    .map(lineTotal)
    .filter((value): value is number => value !== null);
  const subtotal = priced.reduce((sum, value) => sum + value, 0);
  const hasQuoteOnly = priced.length !== items.length;

  return (
    <aside className="rounded-3xl border border-glass-border bg-glass-surface p-6 backdrop-blur-xl">
      <h2 className="text-lg font-bold text-foreground">{t('summaryTitle')}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-3 text-sm"
          >
            <span className="text-foreground">
              {item.title} × {item.quantity}
            </span>
            <span className="text-muted-foreground">
              {item.price === undefined
                ? t('quoteOnRequest')
                : `${item.price * item.quantity} EUR`}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-2 border-t border-glass-border pt-4 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>{t('subtotal')}</span>
          <span>{hasQuoteOnly ? t('quoteOnRequest') : `${subtotal} EUR`}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>{t('tax')}</span>
          <span>{t('taxIncluded')}</span>
        </div>
      </div>
    </aside>
  );
}
