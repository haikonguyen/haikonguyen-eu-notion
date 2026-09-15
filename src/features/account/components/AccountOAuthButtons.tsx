'use client';

import { ToastType } from '@config';
import { isSupabaseConfigured } from '@lib/auth/is-supabase-configured';
import { AuthProvider } from '@lib/auth/types';
import { useStore } from '@lib/store';
import { useTranslations } from 'next-intl';
import { FaGithub } from 'react-icons/fa';

export interface AccountOAuthButtonsProps {
  onDemoProvider: (provider: AuthProvider) => Promise<void>;
}

export function AccountOAuthButtons({
  onDemoProvider,
}: AccountOAuthButtonsProps) {
  const t = useTranslations('Account');
  const setToastSettings = useStore((state) => state.setToastSettings);
  const supabaseReady = isSupabaseConfigured();

  const handleProvider = async (provider: AuthProvider) => {
    if (!supabaseReady) {
      setToastSettings(true, ToastType.Info, t('oauthNeedsSupabase'));
      await onDemoProvider(provider);
      return;
    }

    window.location.href = `/api/auth/oauth?provider=${provider}`;
  };

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => void handleProvider(AuthProvider.Github)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-glass-border bg-glass-surface px-4 py-3 text-xs font-bold uppercase tracking-wider text-foreground"
      >
        <FaGithub size={14} />
        {t('continueGithub')}
      </button>
      <button
        type="button"
        onClick={() => void handleProvider(AuthProvider.Google)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-glass-border bg-glass-surface px-4 py-3 text-xs font-bold uppercase tracking-wider text-foreground"
      >
        {t('continueGoogle')}
      </button>
    </div>
  );
}
