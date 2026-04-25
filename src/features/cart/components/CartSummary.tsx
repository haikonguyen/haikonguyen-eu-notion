'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface CartSummaryProps {
  totalQuantity: number;
}

export function CartSummary({ totalQuantity }: CartSummaryProps) {
  const t = useTranslations('Cart');

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between text-sm text-zinc-300">
        <span>{t('totalItems')}</span>
        <span className="font-bold text-white">{totalQuantity}</span>
      </div>
      <Link
        href="/contact?intent=checkout"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <span>{t('proceed')}</span>
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
