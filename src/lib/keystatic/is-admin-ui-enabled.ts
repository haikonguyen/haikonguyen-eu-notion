export function isKeystaticAdminFlagEnabled(): boolean {
  return process.env.KEYSTATIC_ADMIN_ENABLED === 'true';
}

export function isKeystaticAuthRequired(): boolean {
  return process.env.KEYSTATIC_REQUIRE_AUTH === 'true';
}

export function isKeystaticAdminUiEnabled(): boolean {
  if (isKeystaticAdminFlagEnabled()) return true;
  return process.env.NODE_ENV !== 'production';
}
