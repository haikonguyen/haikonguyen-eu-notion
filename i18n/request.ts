import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { loadLocaleMessages } from '../src/lib/i18n/load-locale-messages';
import { isSupportedLocale } from './locale';
import { routing } from './routing';

const LOCALE_COOKIE = 'NEXT_LOCALE';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isSupportedLocale(cookieLocale)
    ? cookieLocale
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadLocaleMessages(locale),
  };
});
