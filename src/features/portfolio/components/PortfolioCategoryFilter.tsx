'use client';

import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { FaCamera, FaCode, FaFilter, FaVideo } from 'react-icons/fa';
import { PortfolioCategory } from '../types';

const categoryIcons = {
  [PortfolioCategory.All]: FaFilter,
  [PortfolioCategory.Dev]: FaCode,
  [PortfolioCategory.Photo]: FaCamera,
  [PortfolioCategory.Vlogs]: FaVideo,
};

const categoryLabelKeys = {
  [PortfolioCategory.All]: 'categoryAll',
  [PortfolioCategory.Dev]: 'categoryDev',
  [PortfolioCategory.Photo]: 'categoryPhoto',
  [PortfolioCategory.Vlogs]: 'categoryVlogs',
} as const;

interface PortfolioCategoryFilterProps {
  activeCategory: PortfolioCategory;
  onSelect: (category: PortfolioCategory) => void;
}

export function PortfolioCategoryFilter({
  activeCategory,
  onSelect,
}: PortfolioCategoryFilterProps) {
  const t = useTranslations('Portfolio');

  return (
    <div className="w-full overflow-x-auto pb-1 -mx-3 px-3 scrollbar-hide md:mx-0 md:w-auto md:px-0 md:pb-0">
      <div className="flex w-max items-center gap-1.5 rounded-full border border-white/15 bg-black/45 p-1 shadow-md backdrop-blur-2xl md:w-auto">
        {Object.values(PortfolioCategory).map((category) => {
          const Icon = categoryIcons[category];
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              className={cn(
                'flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:px-5',
                isActive
                  ? 'bg-primary font-bold text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
              )}
            >
              <Icon className="text-[10px]" />
              {t(categoryLabelKeys[category])}
            </button>
          );
        })}
      </div>
    </div>
  );
}
