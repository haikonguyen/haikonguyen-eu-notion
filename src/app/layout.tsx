import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/index.css';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';
import { ChatWidget } from '@/components/chat/chat-widget';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Haiko Nguyen - Developer, Photographer, Vlogger',
    template: '%s | Haiko Nguyen',
  },
  description:
    'Personal blog and portfolio of Haiko Nguyen - Senior React Developer, Full Stack Next.js Specialist, Photographer, and Vlogger. Sharing insights on web development, photography, and creative content.',
  keywords: [
    'React Developer',
    'Next.js',
    'Full Stack Developer',
    'Web Development',
    'Photography',
    'Vlogger',
    'Haiko Nguyen',
    'TypeScript',
    'Frontend',
  ],
  authors: [{ name: 'Haiko Nguyen', url: 'https://www.haikonguyen.eu' }],
  creator: 'Haiko Nguyen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.haikonguyen.eu',
    siteName: 'Haiko Nguyen',
    title: 'Haiko Nguyen - Developer, Photographer, Vlogger',
    description:
      'Personal blog and portfolio of Haiko Nguyen - Senior React Developer, Full Stack Next.js Specialist, Photographer, and Vlogger.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Haiko Nguyen - Developer, Photographer, Vlogger',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@haikonguyeneu',
    creator: '@haikonguyeneu',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ChatWidget />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
