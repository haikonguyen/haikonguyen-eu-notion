'use client';

import type { CartItem } from '@lib/store/useCartStore';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CartQuantityStepper } from './CartQuantityStepper';

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  const t = useTranslations('Cart');
  const tCommon = useTranslations('Common');
  const currency = item.currency ?? tCommon('currencyEur');

  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:border-white/20">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          {t(`categories.${item.category}`)}
        </span>
        <h2 className="text-base font-bold text-white">{item.title}</h2>
        {item.price && (
          <p className="text-sm font-semibold text-zinc-300">
            {item.price} {currency}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <CartQuantityStepper
          quantity={item.quantity}
          onDecrease={() => onQuantityChange(item.quantity - 1)}
          onIncrease={() => onQuantityChange(item.quantity + 1)}
        />
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-zinc-500 transition-colors hover:text-red-400"
          aria-label={t('removeItem')}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
