import type { Metadata } from 'next';
import '../styles/index.css';
import { Providers } from './providers';
import { Layout } from '@components';

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
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
