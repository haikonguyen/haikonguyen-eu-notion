'use client';

import { useCartStore } from '@lib/store/useCartStore';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CartEmptyState } from './CartEmptyState';
import { CartItemRow } from './CartItemRow';

export function CartDrawer() {
  const t = useTranslations('Cart');
  const items = useCartStore((state) => state.items);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] xl:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label={t('closeDrawer')}
        onClick={closeDrawer}
      />
      <aside className="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-y-auto rounded-t-3xl border border-glass-border bg-glass-dock p-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">{t('title')}</h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-full p-2 text-muted-foreground hover:text-foreground"
            aria-label={t('closeDrawer')}
          >
            <X size={18} />
          </button>
        </div>
        {items.length === 0 ? (
          <CartEmptyState />
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onQuantityChange={(quantity) =>
                  updateQuantity(item.id, quantity)
                }
                onRemove={() => removeItem(item.id)}
              />
            ))}
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-xs font-bold uppercase tracking-wider text-black"
            >
              {t('proceed')}
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
