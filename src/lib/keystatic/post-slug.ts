const DATE_PREFIX_RE = /^(\d{4}-\d{2}-\d{2})-(.+)$/;

/** Keystatic entry key, e.g. `2015-12-26-a-warm-winter-day-in-prague`. */
export function getPublicSlugFromEntryKey(entryKey: string): string {
  const leaf = entryKey.includes('/')
    ? entryKey.slice(entryKey.lastIndexOf('/') + 1)
    : entryKey;
  const match = DATE_PREFIX_RE.exec(leaf);
  return match ? match[2] : leaf;
}

export function findEntryKeyByPublicSlug(
  entryKeys: readonly string[],
  publicSlug: string,
): string | undefined {
  return entryKeys.find(
    (entryKey) => getPublicSlugFromEntryKey(entryKey) === publicSlug,
  );
}
