'use client';

import { FavoriteToggle } from '@components/common/FavoriteToggle';
import { cartCategoryFromIcon } from '@lib/cart/service-category';
import type { ServiceEntry } from '@lib/keystatic/types';
import { useCartStore } from '@lib/store/useCartStore';
import { FavoriteKind } from '@lib/store/useFavoritesStore';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export interface ServiceCardActionsProps {
  service: ServiceEntry;
}

export function ServiceCardActions({ service }: ServiceCardActionsProps) {
  const t = useTranslations('Services');
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  return (
    <div className="mt-6 flex flex-col gap-2 sm:mt-8">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            addItem({
              id: service.slug,
              title: service.title,
              category: cartCategoryFromIcon(service.icon),
            });
            openDrawer();
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-glass-border bg-glass-surface py-3 text-[11px] font-bold uppercase tracking-wider text-foreground transition-all hover:border-primary/50 sm:rounded-2xl sm:text-xs"
        >
          <ShoppingCart size={14} />
          <span>{t('addToCart')}</span>
        </button>
        <FavoriteToggle
          item={{
            id: service.slug,
            kind: FavoriteKind.Service,
            title: service.title,
            href: `/services#${service.slug}`,
            excerpt: service.description,
          }}
        />
      </div>
      <Link
        href={`/contact?service=${service.contactServiceId}`}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-[11px] font-bold uppercase tracking-wider text-foreground transition-all hover:bg-primary hover:text-black sm:rounded-2xl sm:py-3.5 sm:text-xs"
      >
        <span>{service.ctaLabel}</span>
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
