import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import '../styles/index.css';
import { Layout } from '@components';
import { DevXray } from '@components/dev/DevXray';
import { PWARegister } from '@components/pwa';
import { Providers } from './providers';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#050505',
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('siteTitle'),
    description: t('siteDescription'),
    manifest: '/manifest.webmanifest',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: t('appleWebAppTitle'),
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://www.haikonguyen.eu',
      siteName: t('appleWebAppTitle'),
      description: t('openGraphDescription'),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@haikonguyeneu',
    },
    icons: {
      icon: '/favicon/favicon-32x32.png',
      apple: '/favicon/apple-touch-icon.png',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`dark ${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary/30">
        {process.env.NODE_ENV === 'development' && <DevXray />}
        <PWARegister />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
