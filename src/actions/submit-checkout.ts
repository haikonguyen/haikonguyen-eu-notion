'use server';

import { escapeHtml, sendTransactionalEmail } from '@lib/email';
import type { CartItem } from '@lib/store/useCartStore';
import { z } from 'zod';

const CheckoutSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(120),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(80).optional(),
  notes: z.string().trim().min(10).max(4000),
  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        category: z.string(),
        quantity: z.number().int().positive(),
        price: z.number().optional(),
      }),
    )
    .min(1),
});

export interface SubmitCheckoutResult {
  success: boolean;
  message?: string;
}

function buildCheckoutHtml(values: z.infer<typeof CheckoutSchema>): string {
  const rows = values.items
    .map((item) => {
      const price = item.price ? `${item.price} EUR` : 'quote';
      return `<li>${escapeHtml(item.title)} × ${item.quantity} (${escapeHtml(item.category)}, ${price})</li>`;
    })
    .join('');

  return `
    <div>
      <h1>New checkout inquiry</h1>
      <ul>
        <li>Name: ${escapeHtml(values.name)}</li>
        <li>Email: ${escapeHtml(values.email)}</li>
        <li>Phone: ${escapeHtml(values.phone ?? '')}</li>
        <li>Company: ${escapeHtml(values.company ?? '')}</li>
      </ul>
      <p>${escapeHtml(values.notes)}</p>
      <ul>${rows}</ul>
    </div>
  `;
}

export async function submitCheckout(
  payload: unknown,
): Promise<SubmitCheckoutResult> {
  const parsed = CheckoutSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, message: 'invalid' };
  }

  await sendTransactionalEmail({
    subject: `${parsed.data.name} - [Checkout from haikonguyen.eu]`,
    html: buildCheckoutHtml(parsed.data),
    replyTo: parsed.data.email,
  });

  return { success: true };
}

export type { CartItem };
