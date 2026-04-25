import {
  BookOpen,
  Briefcase,
  Heart,
  Home,
  Layers,
  type LucideIcon,
  Mail,
  ShoppingCart,
  User,
} from 'lucide-react';

export enum NavLabelKey {
  Home = 'home',
  Blog = 'blog',
  Services = 'services',
  Favorites = 'favorites',
  Cart = 'cart',
  Account = 'account',
  Portfolio = 'portfolio',
  About = 'about',
  Contact = 'contact',
}

export interface NavItemConfig {
  labelKey: NavLabelKey;
  href: string;
  icon: LucideIcon;
  badgeCount?: number;
  exact?: boolean;
}

export interface NavItemWithActive extends NavItemConfig {
  active: boolean;
}

export interface SiteBottomNavOptions {
  pathname: string;
  cartBadgeCount?: number;
  isAuthenticated?: boolean;
}

export function isRouteActive(
  currentPath: string,
  targetHref: string,
  exact = false,
): boolean {
  if (!currentPath) return false;
  if (targetHref === '/') return currentPath === '/';
  if (exact) return currentPath === targetHref;
  return currentPath.startsWith(targetHref);
}

function createNavItem(
  config: NavItemConfig,
  pathname: string,
  activeOverride?: boolean,
): NavItemWithActive {
  return {
    ...config,
    active:
      activeOverride ?? isRouteActive(pathname, config.href, config.exact),
  };
}

export function getSiteBottomNavItems({
  pathname,
  cartBadgeCount = 0,
  isAuthenticated = false,
}: SiteBottomNavOptions): NavItemWithActive[] {
  const items: NavItemWithActive[] = [
    createNavItem(
      {
        labelKey: NavLabelKey.Home,
        href: '/',
        icon: Home,
        exact: true,
      },
      pathname,
    ),
    createNavItem(
      {
        labelKey: NavLabelKey.Blog,
        href: '/blog',
        icon: BookOpen,
      },
      pathname,
      isRouteActive(pathname, '/blog') || isRouteActive(pathname, '/post'),
    ),
    createNavItem(
      {
        labelKey: NavLabelKey.Services,
        href: '/services',
        icon: Layers,
      },
      pathname,
    ),
  ];

  if (isAuthenticated) {
    items.push(
      createNavItem(
        {
          labelKey: NavLabelKey.Favorites,
          href: '/favorites',
          icon: Heart,
        },
        pathname,
      ),
    );
  }

  items.push(
    createNavItem(
      {
        labelKey: NavLabelKey.Cart,
        href: '/cart',
        icon: ShoppingCart,
        badgeCount: cartBadgeCount > 0 ? cartBadgeCount : undefined,
      },
      pathname,
      isRouteActive(pathname, '/cart') || isRouteActive(pathname, '/checkout'),
    ),
    createNavItem(
      {
        labelKey: NavLabelKey.Account,
        href: '/account',
        icon: User,
      },
      pathname,
      isRouteActive(pathname, '/account') || isRouteActive(pathname, '/login'),
    ),
  );

  return items;
}

export const desktopNavLinks: NavItemConfig[] = [
  { labelKey: NavLabelKey.Home, href: '/', icon: Home, exact: true },
  { labelKey: NavLabelKey.Services, href: '/services', icon: Layers },
  { labelKey: NavLabelKey.Portfolio, href: '/portfolio', icon: Briefcase },
  { labelKey: NavLabelKey.Blog, href: '/blog', icon: BookOpen },
  { labelKey: NavLabelKey.About, href: '/about', icon: User },
  { labelKey: NavLabelKey.Contact, href: '/contact', icon: Mail },
];
