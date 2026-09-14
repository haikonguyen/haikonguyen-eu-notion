export enum CartCategory {
  WebDev = 'web-dev',
  Photography = 'photography',
  Video = 'video',
  Consultation = 'consultation',
  Digital = 'digital',
}

export interface CartItem {
  id: string;
  title: string;
  category: CartCategory;
  price?: number;
  currency?: string;
  quantity: number;
  notes?: string;
}

export interface CartDraftItem extends Omit<CartItem, 'quantity'> {
  quantity?: number;
}

export function toCartCategory(value: string): CartCategory {
  const match = Object.values(CartCategory).find(
    (category) => category === value,
  );
  return match ?? CartCategory.Digital;
}
