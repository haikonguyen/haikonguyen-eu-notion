'use client';

import { Button, ButtonSize, ButtonVariant } from '@components/ui/Button';
import { ToastType } from '@config';
import type { ServiceEntry } from '@lib/keystatic/types';
import { useStore } from '@lib/store';
import { toCartCategory, useCartStore } from '@lib/store/useCartStore';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface ServiceCardActionsProps {
  service: ServiceEntry;
}

export function ServiceCardActions({ service }: ServiceCardActionsProps) {
  const t = useTranslations('Services');
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const setToastSettings = useStore((state) => state.setToastSettings);

  const handleAddToCart = () => {
    addItem({
      id: service.slug,
      title: service.title,
      category: toCartCategory(service.contactServiceId),
    });
    setToastSettings(true, ToastType.Success, t('addedToCart'));
    openDrawer();
  };

  return (
    <div className="mt-6 flex flex-col gap-2 sm:mt-8">
      <Button
        type="button"
        variant={ButtonVariant.Primary}
        size={ButtonSize.Lg}
        onClick={handleAddToCart}
        className="w-full"
      >
        <ShoppingCart size={14} />
        <span>{t('addToCart')}</span>
      </Button>
      <Link
        href={`/contact?service=${service.contactServiceId}`}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-all hover:bg-white/15 sm:rounded-2xl sm:py-3.5 sm:text-xs"
      >
        <span>{service.ctaLabel}</span>
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
