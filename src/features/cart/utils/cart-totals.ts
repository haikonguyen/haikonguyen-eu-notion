import type { CartItem } from '@lib/store/useCartStore';

export interface CartTotals {
  quantity: number;
  subtotal: number;
  hasPricedItems: boolean;
}

export function getCartTotals(items: CartItem[]): CartTotals {
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasPricedItems =
    items.length > 0 && items.every((item) => typeof item.price === 'number');
  const subtotal = items.reduce((sum, item) => {
    if (typeof item.price !== 'number') {
      return sum;
    }
    return sum + item.price * item.quantity;
  }, 0);

  return { quantity, subtotal, hasPricedItems };
}
