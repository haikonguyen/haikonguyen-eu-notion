import { CartCategory } from '@lib/store/cart-types';
import { z } from 'zod';

const checkoutItemSchema = z.object({
  id: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(160),
  category: z.enum(CartCategory),
  quantity: z.number().int().min(1).max(99),
  price: z.number().nonnegative().max(100_000).optional(),
  currency: z.string().trim().max(8).optional(),
  notes: z.string().trim().max(280).optional(),
});

export const checkoutInquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(120),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10).max(4000),
  items: z.array(checkoutItemSchema).min(1).max(20),
});

export type CheckoutInquiry = z.infer<typeof checkoutInquirySchema>;
