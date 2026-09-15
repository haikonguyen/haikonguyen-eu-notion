'use client';

import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { ACCOUNT_TAB_KEYS, AccountTab } from '../constants';

export interface AccountTabNavProps {
  activeTab: AccountTab;
  onChange: (tab: AccountTab) => void;
}

export function AccountTabNav({ activeTab, onChange }: AccountTabNavProps) {
  const t = useTranslations('Account');

  return (
    <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-glass-border bg-glass-surface p-2 backdrop-blur-xl md:flex-col md:overflow-visible">
      {ACCOUNT_TAB_KEYS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={cn(
            'whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === tab
              ? 'bg-primary text-black'
              : 'text-muted-foreground hover:bg-glass-surface-hover hover:text-foreground',
          )}
        >
          {t(`tabs.${tab}`)}
        </button>
      ))}
    </nav>
  );
}
