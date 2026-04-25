import { useTranslations } from 'next-intl';
import * as z from 'zod';

export function createContactSchema(
  t: ReturnType<typeof useTranslations<'Contact.form'>>,
) {
  return z.object({
    name: z.string().min(2, t('errors.nameMin')),
    email: z.email(t('errors.emailInvalid')),
    message: z.string().min(10, t('errors.messageMin')),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
