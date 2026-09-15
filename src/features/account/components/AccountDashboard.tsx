'use client';

import { useAuth } from '@lib/hooks/useAuth';
import { useState } from 'react';
import { AccountTab } from '../constants';
import { AccountBookingsPanel } from './AccountBookingsPanel';
import { AccountFavoritesPanel } from './AccountFavoritesPanel';
import { AccountHistoryPanel } from './AccountHistoryPanel';
import { AccountOverviewPanel } from './AccountOverviewPanel';
import { AccountProfileHeader } from './AccountProfileHeader';
import { AccountSettingsPanel } from './AccountSettingsPanel';
import { AccountTabNav } from './AccountTabNav';

function renderAccountTab(tab: AccountTab) {
  if (tab === AccountTab.Bookings) return <AccountBookingsPanel />;
  if (tab === AccountTab.Favorites) return <AccountFavoritesPanel />;
  if (tab === AccountTab.History) return <AccountHistoryPanel />;
  if (tab === AccountTab.Settings) return <AccountSettingsPanel />;
  return <AccountOverviewPanel />;
}

export function AccountDashboard() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState(AccountTab.Profile);

  if (!user) return null;

  return (
    <div className="space-y-8">
      <AccountProfileHeader user={user} onSignOut={() => void signOut()} />
      <div className="grid gap-6 md:grid-cols-[14rem_1fr]">
        <AccountTabNav activeTab={tab} onChange={setTab} />
        <div>{renderAccountTab(tab)}</div>
      </div>
    </div>
  );
}
