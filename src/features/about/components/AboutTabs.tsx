'use client';

import type { AboutCvEntry } from '@lib/keystatic/types';
import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { FaBriefcase, FaLaptopCode } from 'react-icons/fa';
import { AboutTab } from '../types';
import { AboutCvPanel } from './AboutCvPanel';

export interface AboutTabsProps {
  storyContent: ReactNode;
  cv: AboutCvEntry | null;
}

interface AboutTabButtonProps {
  isActive: boolean;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

const ABOUT_CONTENT_MIN_HEIGHT_CLASS = 'min-h-[500px]';

function AboutTabButton({
  isActive,
  label,
  icon,
  onClick,
}: AboutTabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:px-6',
        isActive
          ? 'bg-primary font-bold text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
          : 'text-white/70 hover:bg-white/10 hover:text-white',
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function AboutTabs({ storyContent, cv }: AboutTabsProps) {
  const t = useTranslations('About');
  const [activeTab, setActiveTab] = useState(AboutTab.Story);
  const isStory = activeTab === AboutTab.Story;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-10 flex justify-center sm:mb-14">
        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 p-1 shadow-md backdrop-blur-2xl">
          <AboutTabButton
            isActive={isStory}
            label={t('tabStory')}
            icon={<FaLaptopCode className="text-xs" />}
            onClick={() => setActiveTab(AboutTab.Story)}
          />
          <AboutTabButton
            isActive={!isStory}
            label={t('tabCv')}
            icon={<FaBriefcase className="text-xs" />}
            onClick={() => setActiveTab(AboutTab.Cv)}
          />
        </div>
      </div>
      <div className={cn('relative', ABOUT_CONTENT_MIN_HEIGHT_CLASS)}>
        {isStory ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <article>{storyContent}</article>
          </div>
        ) : cv ? (
          <AboutCvPanel cv={cv} />
        ) : null}
      </div>
    </div>
  );
}
