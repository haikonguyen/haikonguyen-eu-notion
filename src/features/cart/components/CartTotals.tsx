'use client';

import { getCartTotals } from '@features/cart/utils/cart-totals';
import { formatCartMoney } from '@features/cart/utils/format-cart-money';
import type { CartItem } from '@lib/store/useCartStore';
import { useTranslations } from 'next-intl';

interface CartTotalsProps {
  items: CartItem[];
}

interface CartTotalRowProps {
  label: string;
  value: string;
  isEmphasis?: boolean;
}

function CartTotalRow({ label, value, isEmphasis = false }: CartTotalRowProps) {
  return (
    <div className="flex items-center justify-between text-sm text-zinc-300">
      <span>{label}</span>
      <span
        className={
          isEmphasis ? 'font-bold text-white' : 'font-semibold text-zinc-200'
        }
      >
        {value}
      </span>
    </div>
  );
}

export function CartTotals({ items }: CartTotalsProps) {
  const t = useTranslations('Cart');
  const tCommon = useTranslations('Common');
  const totals = getCartTotals(items);
  const subtotalValue = totals.hasPricedItems
    ? `${formatCartMoney(totals.subtotal)} ${tCommon('currencyEur')}`
    : t('onRequest');

  return (
    <div className="space-y-3">
      <CartTotalRow label={t('totalItems')} value={String(totals.quantity)} />
      <CartTotalRow label={t('subtotal')} value={subtotalValue} isEmphasis />
      <CartTotalRow label={t('taxes')} value={t('taxesPending')} />
    </div>
  );
}
