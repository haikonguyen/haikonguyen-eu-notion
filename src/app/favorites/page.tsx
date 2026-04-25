import { AppPageShell, AppPageShellSize, PageHeader } from '@components/layout';
import { ArrowRight, Heart } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: t('favoritesTitle'),
    description: t('favoritesDescription'),
  };
}

export default async function FavoritesPage() {
  const t = await getTranslations('Favorites');

  return (
    <AppPageShell size={AppPageShellSize.Default}>
      <div className="relative mx-auto max-w-4xl">
        <PageHeader title={t('title')} subtitle={t('subtitle')} />
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center backdrop-blur-xl">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400">
            <Heart size={28} />
          </div>
          <h2 className="text-xl font-bold text-white">{t('emptyTitle')}</h2>
          <p className="mt-2 max-w-sm text-sm text-zinc-400">
            {t('emptyBody')}
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 active:scale-95"
          >
            <span>{t('exploreBlog')}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </AppPageShell>
  );
}
