import { fields } from '@keystatic/core';
import type { AppLocale } from '../../../i18n/locale';

export interface LocalizedString {
  en: string;
  cs: string;
  vi: string;
}

export function localizedTextField(
  label: string,
  options?: { multiline?: boolean; description?: string },
) {
  const multiline = options?.multiline ?? false;
  return fields.object(
    {
      en: fields.text({ label: 'EN', multiline }),
      cs: fields.text({ label: 'CS', multiline }),
      vi: fields.text({ label: 'VI', multiline }),
    },
    {
      label,
      description: options?.description,
    },
  );
}

export function pickLocalized(
  value: LocalizedString | string | null | undefined,
  locale: AppLocale,
): string {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  const preferred = value[locale]?.trim();
  if (preferred) {
    return preferred;
  }
  return value.en?.trim() || value.cs?.trim() || value.vi?.trim() || '';
}

export function pickLocalizedTitle(
  titleEn: string,
  translations: { cs?: string; vi?: string } | null | undefined,
  locale: AppLocale,
): string {
  if (locale === 'en') {
    return titleEn;
  }
  const translated = translations?.[locale]?.trim();
  return translated || titleEn;
}
