import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: t('accountTitle'),
    description: t('accountDescription'),
  };
}

export default function AccountLayout({ children }: { children: ReactNode }) {
  return children;
}
