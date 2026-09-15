import { useTranslations } from 'next-intl';
import * as z from 'zod';

export function createAccountSignInSchema(
  t: ReturnType<typeof useTranslations<'Account'>>,
) {
  return z.object({
    name: z.string().trim().min(2, t('errors.nameMin')).optional(),
    email: z.email(t('errors.emailInvalid')),
  });
}

export type AccountSignInValues = z.infer<
  ReturnType<typeof createAccountSignInSchema>
>;
