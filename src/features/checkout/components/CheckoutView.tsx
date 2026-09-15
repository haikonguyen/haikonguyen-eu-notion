'use client';

import { useAuth } from '@lib/hooks/useAuth';
import {
  BookingKind,
  BookingStatus,
  useBookingsStore,
} from '@lib/store/useBookingsStore';
import { useCartStore } from '@lib/store/useCartStore';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { submitCheckout } from '@/actions/submit-checkout';
import type { CheckoutFormValues } from '../create-checkout-schema';
import { CheckoutEmptyState } from './CheckoutEmptyState';
import { CheckoutForm } from './CheckoutForm';
import { CheckoutSuccess } from './CheckoutSuccess';
import { CheckoutSummary } from './CheckoutSummary';

export function CheckoutView() {
  const t = useTranslations('Checkout');
  const { user } = useAuth();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const addBooking = useBookingsStore((state) => state.addBooking);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    const result = await submitCheckout({ ...values, items });
    setIsSubmitting(false);
    if (!result.success) {
      setErrorMessage(t('submitError'));
      return;
    }

    addBooking({
      id: `checkout-${Date.now()}`,
      title: t('inquiryTitle'),
      kind: BookingKind.Service,
      startIso: new Date().toISOString(),
      status: BookingStatus.InReview,
      notes: values.notes,
    });
    clearCart();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return <CheckoutSuccess onReset={() => setIsSuccess(false)} />;
  }

  if (items.length === 0) {
    return <CheckoutEmptyState />;
  }

  return (
    <div className="grid gap-6 py-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-3xl border border-glass-border bg-glass-surface p-6 backdrop-blur-xl sm:p-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {t('title')}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('subtitle')}</p>
        <div className="mt-6">
          <CheckoutForm
            defaultName={user?.name}
            defaultEmail={user?.email}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </div>
        {errorMessage ? (
          <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
        ) : null}
      </section>
      <CheckoutSummary items={items} />
    </div>
  );
}
