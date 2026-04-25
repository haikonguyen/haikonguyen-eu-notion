'use client';

import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CartQuantityStepperProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function CartQuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
}: CartQuantityStepperProps) {
  const t = useTranslations('Cart');

  return (
    <div className="flex items-center rounded-xl border border-white/10 bg-black/40 p-1">
      <button
        type="button"
        onClick={onDecrease}
        aria-label={t('decreaseQuantity')}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white"
      >
        <Minus size={13} />
      </button>
      <span className="w-8 text-center text-xs font-bold text-white">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label={t('increaseQuantity')}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white"
      >
        <Plus size={13} />
      </button>
    </div>
  );
}
