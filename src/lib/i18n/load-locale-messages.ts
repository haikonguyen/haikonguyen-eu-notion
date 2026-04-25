import type { AppLocale } from '../../../i18n/locale';
import cs from '../../../messages/cs.json';
import en from '../../../messages/en.json';
import vi from '../../../messages/vi.json';

type AppMessages = typeof en;

const localeMessages: Record<AppLocale, AppMessages> = {
  en,
  cs,
  vi,
};

export async function loadLocaleMessages(
  locale: AppLocale,
): Promise<AppMessages> {
  return localeMessages[locale];
}
