import {
  AppPageShell,
  AppPageShellSize,
  PageHeader,
  PageHeaderAlign,
} from '@components/layout';
import { ServiceCard, serviceDefinitions } from '@features/services';
import { Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: t('servicesTitle'),
    description: t('servicesDescription'),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations('Services');

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
          {serviceDefinitions.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              copyKey={service.copyKey}
              highlightKeys={service.highlightKeys}
            />
          ))}
        </div>
      </div>
    </AppPageShell>
  );
}
