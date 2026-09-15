'use client';

import {
  AppPageShell,
  AppPageShellSize,
} from '@components/layout/AppPageShell';
import { AccountDashboard, AccountSignInPanel } from '@features/account';
import { useAuth } from '@lib/hooks/useAuth';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();

  return (
    <AppPageShell
      size={isAuthenticated ? AppPageShellSize.Default : AppPageShellSize.Auth}
    >
      <div className="relative mx-auto w-full py-8">
        {isAuthenticated ? <AccountDashboard /> : <AccountSignInPanel />}
      </div>
    </AppPageShell>
  );
}
