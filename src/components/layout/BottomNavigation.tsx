'use client';

import { useCartBadgeCount } from '@lib/hooks/useCartBadgeCount';
import { cn } from '@lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getSiteBottomNavItems } from './nav-items';

interface BottomNavigationProps {
  isAuthenticated?: boolean;
  className?: string;
}

export function BottomNavigation({
  isAuthenticated = false,
  className,
}: BottomNavigationProps) {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const cartBadgeCount = useCartBadgeCount();
  const items = getSiteBottomNavItems({
    pathname,
    cartBadgeCount,
    isAuthenticated,
  });

  return (
    <nav
      className={cn(
        'pointer-events-auto fixed bottom-4 left-1/2 z-50 flex w-[94%] max-w-md -translate-x-1/2 select-none items-center justify-around rounded-3xl border border-white/15 bg-black/75 p-1 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl xl:hidden',
        className,
      )}
      aria-label={t('mobileNavigation')}
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={true}
            className="flex flex-1 flex-col items-center justify-center outline-none transition-all duration-300"
          >
            <div
              className={cn(
                'relative flex w-full max-w-[62px] flex-col items-center justify-center gap-0.5 rounded-2xl py-1 transition-all duration-300',
                item.active
                  ? 'bg-primary text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white',
              )}
            >
              <Icon
                size={18}
                className={cn(
                  'shrink-0 transition-transform duration-200 active:scale-110',
                  item.active ? 'scale-105 text-black' : 'text-white/70',
                )}
              />
              {item.badgeCount !== undefined && item.badgeCount > 0 && (
                <span className="absolute -top-1 right-2 flex h-3.5 w-3.5 animate-scale-in items-center justify-center rounded-full bg-red-500 font-bold text-[8.5px] text-white shadow-sm ring-1 ring-black">
                  {item.badgeCount}
                </span>
              )}
              <span
                className={cn(
                  'whitespace-nowrap font-medium text-[9.5px] tracking-wide transition-colors duration-300',
                  item.active ? 'font-bold text-black' : 'text-white/70',
                )}
              >
                {t(item.labelKey)}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
