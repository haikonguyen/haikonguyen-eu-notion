import { AppPageShell, AppPageShellSize } from '@components/layout';
import { CartView } from '@features/cart';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: t('cartTitle'),
    description: t('cartDescription'),
  };
}

export default function CartPage() {
  return (
    <AppPageShell size={AppPageShellSize.Cart}>
      <CartView />
    </AppPageShell>
  );
}
