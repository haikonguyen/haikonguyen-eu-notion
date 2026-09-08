const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export function getR2PublicBaseUrl(): string {
  return process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL?.replace(/\/$/, '') ?? '';
}

/**
 * Resolves a cover/media value to a browser-loadable URL.
 * Accepts a full public URL or an R2 object key (joined to NEXT_PUBLIC_R2_PUBLIC_BASE_URL).
 */
export function getR2PublicUrl(urlOrKey: string | null | undefined): string {
  if (!urlOrKey?.trim()) {
    return '';
  }

  const value = urlOrKey.trim();
  if (ABSOLUTE_URL_PATTERN.test(value)) {
    return value;
  }

  if (value.startsWith('/assets/')) {
    return value;
  }

  const baseUrl = getR2PublicBaseUrl();
  if (!baseUrl) {
    return value.startsWith('/') ? value : `/${value}`;
  }

  const key = value.replace(/^\//, '');
  return `${baseUrl}/${key}`;
}
