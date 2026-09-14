'use client';

import { useCartStore } from '@lib/store/useCartStore';
import { useTranslations } from 'next-intl';
import { CartDrawerPanel } from './CartDrawerPanel';

export function CartDrawer() {
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const t = useTranslations('Cart');

  if (!isDrawerOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] xl:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label={t('closeDrawer')}
        onClick={closeDrawer}
      />
      <CartDrawerPanel onClose={closeDrawer} />
    </div>
  );
}
