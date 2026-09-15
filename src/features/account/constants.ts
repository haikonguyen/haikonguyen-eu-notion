export enum AccountTab {
  Profile = 'profile',
  Bookings = 'bookings',
  Favorites = 'favorites',
  History = 'history',
  Settings = 'settings',
}

export const ACCOUNT_TAB_KEYS = [
  AccountTab.Profile,
  AccountTab.Bookings,
  AccountTab.Favorites,
  AccountTab.History,
  AccountTab.Settings,
] as const;
