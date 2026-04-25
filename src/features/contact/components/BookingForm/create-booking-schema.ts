import { useTranslations } from 'next-intl';
import * as z from 'zod';

export function createBookingSchema(
  t: ReturnType<typeof useTranslations<'Contact.booking'>>,
) {
  return z.object({
    name: z.string().min(2, t('errors.nameMin')),
    email: z.email(t('errors.emailInvalid')),
    date: z.string().min(1, t('errors.dateRequired')),
    time: z.string().min(1, t('errors.timeRequired')),
  });
}

export type BookingFormValues = z.infer<ReturnType<typeof createBookingSchema>>;
