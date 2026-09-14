'use client';

import type { CartItem } from '@lib/store/useCartStore';
import { useTranslations } from 'next-intl';
import { CartTotals } from './CartTotals';

interface CheckoutLineItemsProps {
  items: CartItem[];
}

export function CheckoutLineItems({ items }: CheckoutLineItemsProps) {
  const t = useTranslations('Checkout');
  const tCart = useTranslations('Cart');

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="mb-5 text-xl font-bold text-white">{t('yourOrder')}</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {tCart(`categories.${item.category}`)}
                </p>
                <p className="font-semibold text-white">{item.title}</p>
                {item.notes && (
                  <p className="mt-1 text-xs text-zinc-400">{item.notes}</p>
                )}
              </div>
              <span className="text-sm font-bold text-zinc-300">
                ×{item.quantity}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-white/10 pt-4">
        <CartTotals items={items} />
      </div>
    </div>
  );
}
