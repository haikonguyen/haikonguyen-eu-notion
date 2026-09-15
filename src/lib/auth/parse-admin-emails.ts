import { ADMIN_EMAIL_ENV } from './constants';

export function parseAdminEmails(raw = process.env[ADMIN_EMAIL_ENV]): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter((value) => value.length > 0);
}

export function isAdminEmail(
  email: string,
  allowlist = parseAdminEmails(),
): boolean {
  if (allowlist.length === 0) return false;
  return allowlist.includes(email.trim().toLowerCase());
}
