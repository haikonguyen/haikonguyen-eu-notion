'use client';

import { useCartStore } from '@lib/store/useCartStore';
import { CartEmptyState } from './CartEmptyState';
import { CartHeader } from './CartHeader';
import { CartItemRow } from './CartItemRow';
import { CartSummary } from './CartSummary';

export function CartView() {
  const { items, removeItem, updateQuantity, updateNotes, clearCart } =
    useCartStore();
  const hasItems = items.length > 0;

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
                onNotesChange={(notes) => updateNotes(item.id, notes)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>
          <CartSummary items={items} />
        </div>
      ) : (
        <CartEmptyState />
      )}
    </div>
  );
}
