'use client';

import { Button, ButtonVariant } from '@components/ui/Button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export interface CheckoutSuccessProps {
  onReset: () => void;
}

export function CheckoutSuccess({ onReset }: CheckoutSuccessProps) {
  const t = useTranslations('Checkout');

  return (
    <div className="rounded-3xl border border-glass-border bg-glass-surface px-6 py-16 text-center backdrop-blur-xl">
      <CheckCircle2 className="mx-auto mb-4 text-primary" size={36} />
      <h1 className="text-2xl font-bold text-foreground">
        {t('successTitle')}
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {t('successBody')}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/account"
          className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-black"
        >
          {t('viewAccount')}
        </Link>
        <Button variant={ButtonVariant.Outline} onClick={onReset}>
          {t('startAnother')}
        </Button>
      </div>
    </div>
  );
}
