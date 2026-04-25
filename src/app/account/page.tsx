'use client';

import {
  AppPageShell,
  AppPageShellSize,
} from '@components/layout/AppPageShell';
import { AccountDashboard, AccountSignInPanel } from '@features/account';
import { useState } from 'react';

export default function AccountPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <AppPageShell
      size={isSignedIn ? AppPageShellSize.Default : AppPageShellSize.Auth}
    >
      <div className="relative mx-auto w-full py-8">
        {isSignedIn ? (
          <AccountDashboard
            email={email}
            onSignOut={() => setIsSignedIn(false)}
          />
        ) : (
          <AccountSignInPanel
            onSignIn={(nextEmail) => {
              setEmail(nextEmail);
              setIsSignedIn(true);
            }}
          />
        )}
      </div>
    </AppPageShell>
  );
}
