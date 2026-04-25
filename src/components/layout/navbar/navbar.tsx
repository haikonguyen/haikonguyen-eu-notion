'use client';

import { useCartBadgeCount } from '@lib/hooks/useCartBadgeCount';
import { cn } from '@lib/utils';
import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { desktopNavLinks, isRouteActive } from '../nav-items';
import { Logo } from './logo';

interface NavBarProps {
  isAuthenticated?: boolean;
}

export const NavBar = ({ isAuthenticated = false }: NavBarProps) => {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const cartBadgeCount = useCartBadgeCount();

  return (
    <header className="pointer-events-none fixed top-3 right-0 left-0 z-50 w-full transition-all duration-300 sm:top-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        <div className="pointer-events-auto">
          <Logo />
        </div>
        <div className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/15 bg-black/45 px-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:h-11 xl:flex">
          {desktopNavLinks.map((link) => {
            const active = isRouteActive(pathname, link.href, link.exact);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 sm:text-[13px]',
                  active
                    ? 'bg-primary text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'text-white/70 hover:bg-white/10 hover:text-white',
                )}
              >
                <span>{t(link.labelKey)}</span>
              </Link>
            );
          })}
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <Link
            href="/cart"
            prefetch={true}
            className={cn(
              'relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 hover:border-white/30 hover:scale-105 active:scale-95 sm:hidden',
              pathname === '/cart' || pathname === '/checkout'
                ? 'bg-primary text-black'
                : 'text-white/80',
            )}
            aria-label={t('shoppingCart')}
          >
            <ShoppingCart size={15} />
            {cartBadgeCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 animate-scale-in items-center justify-center rounded-full bg-red-500 font-bold text-[8.5px] text-white shadow-sm ring-1 ring-black">
                {cartBadgeCount}
              </span>
            )}
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:flex sm:h-11">
            <Link
              href="/cart"
              prefetch={true}
              className={cn(
                'relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 active:scale-95',
                pathname === '/cart' || pathname === '/checkout'
                  ? 'bg-primary text-black'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
              )}
              aria-label={t('shoppingCart')}
            >
              <ShoppingCart size={15} />
              {cartBadgeCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-scale-in items-center justify-center rounded-full bg-red-500 font-bold text-[9px] text-white shadow-sm ring-1 ring-black">
                  {cartBadgeCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              prefetch={true}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 active:scale-95 sm:text-[13px]',
                pathname.startsWith('/account') || pathname.startsWith('/login')
                  ? 'bg-primary text-black'
                  : 'text-white/80 hover:bg-white/10 hover:text-white',
              )}
              aria-label={t('userAccount')}
            >
              <User size={14} />
              <span>{isAuthenticated ? t('account') : t('signIn')}</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
