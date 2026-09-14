import {
  AppPageShell,
  AppPageShellSize,
  PageHeader,
  PageHeaderAlign,
} from '@components/layout';
import { CheckoutView } from '@features/cart';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: t('checkoutTitle'),
    description: t('checkoutDescription'),
  };
}

export default async function CheckoutPage() {
  const t = await getTranslations('Checkout');

  return (
    <AppPageShell size={AppPageShellSize.Checkout}>
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        align={PageHeaderAlign.Center}
      />
      <CheckoutView />
    </AppPageShell>
  );
}
