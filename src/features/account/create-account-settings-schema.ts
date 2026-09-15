import { useTranslations } from 'next-intl';
import * as z from 'zod';

export function createAccountSettingsSchema(
  t: ReturnType<typeof useTranslations<'Account'>>,
) {
  return z.object({
    name: z.string().trim().min(2, t('errors.nameMin')),
    email: z.email(t('errors.emailInvalid')),
    phone: z.string().trim().max(40).optional(),
    company: z.string().trim().max(80).optional(),
  });
}

export type AccountSettingsValues = z.infer<
  ReturnType<typeof createAccountSettingsSchema>
>;
