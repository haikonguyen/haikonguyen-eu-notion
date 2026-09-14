import {
  CHECKOUT_COMPANY_MAX_LENGTH,
  CHECKOUT_EMAIL_MAX_LENGTH,
  CHECKOUT_MESSAGE_MAX_LENGTH,
  CHECKOUT_MESSAGE_MIN_LENGTH,
  CHECKOUT_NAME_MAX_LENGTH,
  CHECKOUT_PHONE_MAX_LENGTH,
} from '@features/cart/constants';
import { useTranslations } from 'next-intl';
import * as z from 'zod';

export function createCheckoutSchema(
  t: ReturnType<typeof useTranslations<'Checkout'>>,
) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, t('errors.nameMin'))
      .max(CHECKOUT_NAME_MAX_LENGTH),
    email: z.email(t('errors.emailInvalid')).max(CHECKOUT_EMAIL_MAX_LENGTH),
    phone: z.string().trim().max(CHECKOUT_PHONE_MAX_LENGTH).optional(),
    company: z.string().trim().max(CHECKOUT_COMPANY_MAX_LENGTH).optional(),
    message: z
      .string()
      .trim()
      .min(CHECKOUT_MESSAGE_MIN_LENGTH, t('errors.messageMin'))
      .max(CHECKOUT_MESSAGE_MAX_LENGTH),
  });
}

export type CheckoutFormValues = z.infer<
  ReturnType<typeof createCheckoutSchema>
>;
