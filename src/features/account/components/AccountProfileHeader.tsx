'use client';

import type { AuthUser } from '@lib/auth/types';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface AccountProfileHeaderProps {
  user: AuthUser;
  onSignOut: () => void;
}

export function AccountProfileHeader({
  user,
  onSignOut,
}: AccountProfileHeaderProps) {
  const t = useTranslations('Account');

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-glass-border bg-glass-surface p-8 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
          <User size={30} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
            <span className="rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              {t('memberBadge')}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onSignOut}
        className="rounded-2xl border border-glass-border bg-glass-surface px-6 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        {t('signOut')}
      </button>
    </div>
  );
}
