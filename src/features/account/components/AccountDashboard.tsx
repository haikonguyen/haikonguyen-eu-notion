'use client';

import { ArrowRight, Calendar, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export interface AccountDashboardProps {
  email: string;
  onSignOut: () => void;
}

interface AccountPanelProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}

function AccountPanel({ title, icon, children, action }: AccountPanelProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white">
          {icon}
          <span>{title}</span>
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function AccountResourceLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-3.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
    >
      <span>{label}</span>
      <ArrowRight size={14} />
    </Link>
  );
}

export function AccountDashboard({ email, onSignOut }: AccountDashboardProps) {
  const t = useTranslations('Account');
  const displayName = email.split('@')[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
            <User size={30} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">{displayName}</h2>
              <span className="rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                {t('memberBadge')}
              </span>
            </div>
            <p className="text-sm text-zinc-400">{email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="rounded-2xl border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          {t('signOut')}
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <AccountPanel
          title={t('upcomingBookings')}
          icon={<Calendar size={18} className="text-primary" />}
          action={
            <span className="text-xs text-zinc-400">{t('activeCount')}</span>
          }
        >
          <div className="rounded-2xl border border-white/5 bg-black/20 p-6 text-center">
            <p className="text-sm text-zinc-400">{t('noBookings')}</p>
            <Link
              href="/services"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <span>{t('bookSession')}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </AccountPanel>
        <AccountPanel
          title={t('quickResources')}
          icon={<Sparkles size={18} className="text-primary" />}
        >
          <div className="space-y-2.5">
            <AccountResourceLink href="/portfolio" label={t('viewProjects')} />
            <AccountResourceLink href="/about" label={t('interactiveCv')} />
          </div>
        </AccountPanel>
      </div>
    </div>
  );
}
