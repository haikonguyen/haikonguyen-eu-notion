import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'cs', 'vi'] as const,
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/account': '/account',
    '/blog': '/blog',
    '/cart': '/cart',
    '/contact': '/contact',
    '/favorites': '/favorites',
    '/portfolio': '/portfolio',
    '/post/[slug]': '/post/[slug]',
    '/services': '/services',
    '/vlogs': '/vlogs',
  },
});
