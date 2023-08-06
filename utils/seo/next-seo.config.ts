import { siteConfig } from '../../constants';

export const SEO = {
  title: siteConfig.title,
  description: siteConfig.description,
  facebook: {
    appId: '3287916334826012',
  },
  openGraph: {
    type: 'blog',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'Blog | Haiko Nguyen',
    description: siteConfig.description,
  },
  twitter: {
    handle: '@haikonguyeneu',
    site: 'https://twitter.com/haikonguyeneu',
    cardType: 'summary_large_image',
  },
};
