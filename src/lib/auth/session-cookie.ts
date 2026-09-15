import { AUTH_SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from './constants';
import type { AuthUser } from './types';

export function encodeSessionUser(user: AuthUser): string {
  return Buffer.from(JSON.stringify(user), 'utf8').toString('base64url');
}

export function decodeSessionUser(value: string | undefined): AuthUser | null {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(
      Buffer.from(value, 'base64url').toString('utf8'),
    );
    if (!isAuthUser(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.email === 'string' &&
    typeof record.name === 'string' &&
    typeof record.role === 'string'
  );
}

export function sessionCookieOptions() {
  return {
    name: AUTH_SESSION_COOKIE,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
    sameSite: 'lax' as const,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };
}
