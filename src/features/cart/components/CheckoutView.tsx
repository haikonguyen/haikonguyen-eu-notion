'use client';

import { useCartStore } from '@lib/store/useCartStore';
import { useState } from 'react';
import { CartEmptyState } from './CartEmptyState';
import { CheckoutForm } from './CheckoutForm/CheckoutForm';
import { CheckoutSuccess } from './CheckoutForm/CheckoutSuccess';
import { CheckoutLineItems } from './CheckoutLineItems';

export function CheckoutView() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);

  if (emailSent !== null) {
    return <CheckoutSuccess emailSent={emailSent} />;
  }

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="grid gap-6 py-8 lg:grid-cols-2 lg:items-start">
      <CheckoutLineItems items={items} />
      <CheckoutForm
        items={items}
        onSuccess={(didSendEmail) => {
          clearCart();
          setEmailSent(didSendEmail);
        }}
      />
    </div>
  );
}
