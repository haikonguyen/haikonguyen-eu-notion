import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import '../styles/index.css';
import { Providers } from './providers';
import { Layout } from '@components';

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

export const metadata: Metadata = {
  title: 'Haiko Nguyen - Developer, Photographer, Vlogger',
  description: 'A personal blog made by Haiko Nguyen with ❤️',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.haikonguyen.eu',
    siteName: 'Blog | Haiko Nguyen',
    description: 'A personal blog made by Haiko Nguyen with ❤️',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@haikonguyeneu',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
