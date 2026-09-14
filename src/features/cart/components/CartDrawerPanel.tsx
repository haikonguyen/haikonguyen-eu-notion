'use client';

import { useCartStore } from '@lib/store/useCartStore';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CartEmptyState } from './CartEmptyState';
import { CartItemRow } from './CartItemRow';
import { CartTotals } from './CartTotals';

interface CartDrawerPanelProps {
  onClose: () => void;
}

export function CartDrawerPanel({ onClose }: CartDrawerPanelProps) {
  const t = useTranslations('Cart');
  const { items, removeItem, updateQuantity, updateNotes } = useCartStore();
  const hasItems = items.length > 0;

  return (
    <aside
      className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-3xl border border-white/15 bg-black/85 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
      aria-label={t('drawerTitle')}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className="text-base font-bold text-white">{t('drawerTitle')}</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
          aria-label={t('closeDrawer')}
        >
          <X size={18} />
        </button>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {hasItems ? (
          items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
              onNotesChange={(notes) => updateNotes(item.id, notes)}
              onRemove={() => removeItem(item.id)}
            />
          ))
        ) : (
          <CartEmptyState onNavigate={onClose} />
        )}
      </div>
      {hasItems && (
        <div className="space-y-3 border-t border-white/10 px-5 py-4">
          <CartTotals items={items} />
          <Link
            href="/checkout"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-xs font-bold uppercase tracking-wider text-black"
          >
            {t('checkout')}
          </Link>
          <Link
            href="/cart"
            onClick={onClose}
            className="flex w-full items-center justify-center text-xs font-semibold text-zinc-400 hover:text-white"
          >
            {t('viewFullCart')}
          </Link>
        </div>
      )}
    </aside>
  );
}
