'use client';

import type { CartItem } from '@lib/store/useCartStore';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CartTotals } from './CartTotals';

interface CartSummaryProps {
  items: CartItem[];
}

export function CartSummary({ items }: CartSummaryProps) {
  const t = useTranslations('Cart');

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <CartTotals items={items} />
      <Link
        href="/checkout"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <span>{t('checkout')}</span>
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
