'use client';

import { useCartStore } from '@lib/store/useCartStore';
import { CartEmptyState } from './CartEmptyState';
import { CartHeader } from './CartHeader';
import { CartItemRow } from './CartItemRow';
import { CartSummary } from './CartSummary';

export function CartView() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const hasItems = items.length > 0;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative mx-auto max-w-3xl py-8">
      <CartHeader hasItems={hasItems} onClear={clearCart} />
      {hasItems ? (
        <div className="space-y-6">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onQuantityChange={(quantity) =>
                  updateQuantity(item.id, quantity)
                }
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>
          <CartSummary totalQuantity={totalQuantity} />
        </div>
      ) : (
        <CartEmptyState />
      )}
    </div>
  );
}
