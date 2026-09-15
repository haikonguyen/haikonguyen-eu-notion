'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { AccountBookingsPanel } from './AccountBookingsPanel';

export function AccountOverviewPanel() {
  const t = useTranslations('Account');

  return (
    <div className="space-y-6">
      <AccountBookingsPanel />
      <section className="rounded-3xl border border-glass-border bg-glass-surface p-6 backdrop-blur-xl">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <Sparkles size={18} className="text-primary" />
          <span>{t('quickResources')}</span>
        </h3>
        <div className="space-y-2.5">
          <Link
            href="/portfolio"
            className="flex items-center justify-between rounded-xl border border-glass-border bg-background/30 p-3.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <span>{t('viewProjects')}</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/about"
            className="flex items-center justify-between rounded-xl border border-glass-border bg-background/30 p-3.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <span>{t('interactiveCv')}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
