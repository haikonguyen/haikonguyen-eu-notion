import { PortfolioCategory } from './types';

const categoryValues = new Set<string>(Object.values(PortfolioCategory));

export function parsePortfolioCategory(
  value: string | null,
): PortfolioCategory {
  if (value && categoryValues.has(value)) {
    return value as PortfolioCategory;
  }

  return PortfolioCategory.All;
}
