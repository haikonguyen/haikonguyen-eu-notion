'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface CheckoutSuccessProps {
  emailSent: boolean;
}

export function CheckoutSuccess({ emailSent }: CheckoutSuccessProps) {
  const t = useTranslations('Checkout');

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center backdrop-blur-xl">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
        <CheckCircle2 size={28} />
      </div>
      <h2 className="text-xl font-bold text-white">{t('successTitle')}</h2>
      <p className="mt-2 max-w-md text-sm text-zinc-400">
        {emailSent ? t('successBody') : t('successLocalBody')}
      </p>
      <Link
        href="/services"
        className="mt-6 inline-flex items-center rounded-2xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-black"
      >
        {t('backToServices')}
      </Link>
    </div>
  );
}
