import {
  AppPageShell,
  AppPageShellSize,
  PageHeader,
  PageHeaderAlign,
} from '@components/layout';
import { ServiceCard } from '@features/services';
import { getServices } from '@lib/keystatic';
import { Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import type { AppLocale } from '../../../i18n/locale';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: t('servicesTitle'),
    description: t('servicesDescription'),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations('Services');
  const locale = (await getLocale()) as AppLocale;
  const services = await getServices(locale);

  return (
    <AppPageShell size={AppPageShellSize.Default}>
      <div className="relative mx-auto max-w-5xl py-2 sm:py-6">
        <PageHeader
          title={t('title')}
          subtitle={t('subtitle')}
          align={PageHeaderAlign.Center}
          eyebrow={
            <>
              <Sparkles size={13} />
              <span>{t('eyebrow')}</span>
            </>
          }
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </AppPageShell>
  );
}
