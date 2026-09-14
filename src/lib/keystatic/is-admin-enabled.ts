const ENABLED_FLAGS = new Set(['true', '1', 'yes']);
const DISABLED_FLAGS = new Set(['false', '0', 'no']);

/**
 * Local-storage Keystatic has no login. Hide Admin in production unless an
 * explicit allow flag is set (Vercel preview / a private host).
 */
export function isKeystaticAdminEnabled(): boolean {
  const flag = process.env.KEYSTATIC_ADMIN_ENABLED?.trim().toLowerCase();

  if (flag && ENABLED_FLAGS.has(flag)) {
    return true;
  }

  if (flag && DISABLED_FLAGS.has(flag)) {
    return false;
  }

  return process.env.NODE_ENV !== 'production';
}
