'use client';

import { AppPageShell, AppPageShellSize, PageHeader } from '@components/layout';
import { AccountSignInPanel } from '@features/account';
import { FavoritesView } from '@features/favorites';
import { useAuth } from '@lib/hooks/useAuth';
import { useTranslations } from 'next-intl';

export default function FavoritesPage() {
  const t = useTranslations('Favorites');
  const { isAuthenticated } = useAuth();

  return (
    <AppPageShell
      size={isAuthenticated ? AppPageShellSize.Default : AppPageShellSize.Auth}
    >
      {isAuthenticated ? (
        <div className="relative mx-auto max-w-4xl">
          <PageHeader title={t('title')} subtitle={t('subtitle')} />
          <FavoritesView />
        </div>
      ) : (
        <div className="relative mx-auto w-full py-8">
          <AccountSignInPanel />
        </div>
      )}
    </AppPageShell>
  );
}
