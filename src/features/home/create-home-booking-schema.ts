import { useTranslations } from 'next-intl';
import * as z from 'zod';

export function createHomeBookingSchema(
  t: ReturnType<typeof useTranslations<'Home'>>,
) {
  return z.object({
    name: z.string().min(2, t('bookingNameError')),
    email: z.email(t('bookingEmailError')),
  });
}

export type HomeBookingFormValues = z.infer<
  ReturnType<typeof createHomeBookingSchema>
>;
