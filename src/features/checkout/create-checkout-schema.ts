import { useTranslations } from 'next-intl';
import * as z from 'zod';

export function createCheckoutSchema(
  t: ReturnType<typeof useTranslations<'Checkout'>>,
) {
  return z.object({
    name: z.string().trim().min(2, t('errors.nameMin')),
    email: z.email(t('errors.emailInvalid')),
    phone: z.string().trim().max(40).optional(),
    company: z.string().trim().max(80).optional(),
    notes: z.string().trim().min(10, t('errors.notesMin')),
  });
}

export type CheckoutFormValues = z.infer<
  ReturnType<typeof createCheckoutSchema>
>;
