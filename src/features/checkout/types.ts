import type { CartItem } from '@lib/store/useCartStore';

export interface CheckoutPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes: string;
  items: CartItem[];
}
