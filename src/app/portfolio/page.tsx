import { PortfolioContent } from '@features/portfolio';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

export default async function PortfolioPage() {
  const t = await getTranslations('Common');

  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center bg-background"
          role="status"
          aria-label={t('loading')}
        >
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
