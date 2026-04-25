import { routing } from './routing';

export type AppLocale = (typeof routing.locales)[number];

export const isSupportedLocale = (value?: string): value is AppLocale =>
  routing.locales.includes(value as AppLocale);
