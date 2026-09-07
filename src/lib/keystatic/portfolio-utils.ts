export function optionalCmsUrl(
  value: string | null | undefined,
): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function compareSortOrderThenTitle(
  a: { sortOrder: number; title: string },
  b: { sortOrder: number; title: string },
): number {
  if (a.sortOrder !== b.sortOrder) {
    return a.sortOrder - b.sortOrder;
  }

  return a.title.localeCompare(b.title);
}
