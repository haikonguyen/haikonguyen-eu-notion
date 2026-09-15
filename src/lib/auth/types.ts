export enum AuthRole {
  Client = 'client',
  Admin = 'admin',
}

export enum AuthProvider {
  Email = 'email',
  MagicLink = 'magic-link',
  Github = 'github',
  Google = 'google',
}

export interface AuthUser {
  email: string;
  name: string;
  phone: string;
  company: string;
  role: AuthRole;
  provider: AuthProvider;
}

export interface AuthPreferences {
  emailNotifications: boolean;
  bookingReminders: boolean;
  language: string;
}

export const DEFAULT_AUTH_PREFERENCES: AuthPreferences = {
  emailNotifications: true,
  bookingReminders: true,
  language: 'en',
};
