'use client';

import { ArrowRight, Camera, Code, type LucideIcon, Video } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ServiceId } from '../constants';

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  [ServiceId.WebDev]: Code,
  [ServiceId.Photography]: Camera,
  [ServiceId.Video]: Video,
};

interface ServiceCardProps {
  id: ServiceId;
  copyKey: 'webDev' | 'photography' | 'video';
  highlightKeys: string[];
}

export function ServiceCard({ id, copyKey, highlightKeys }: ServiceCardProps) {
  const t = useTranslations('Services');
  const Icon = SERVICE_ICONS[id] ?? Code;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-2xl transition-all duration-300 hover:border-primary/50 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:rounded-3xl sm:p-6 md:p-8">
      <div>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
          <Icon size={24} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 sm:text-[11px]">
          {t(`${copyKey}.category`)}
        </span>
        <h2 className="mt-1 text-lg font-bold tracking-tight text-white sm:mt-2 sm:text-2xl">
          {t(`${copyKey}.title`)}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:mt-3 sm:text-sm">
          {t(`${copyKey}.description`)}
        </p>
        <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4 sm:mt-6 sm:space-y-2 sm:pt-6">
          {highlightKeys.map((key) => (
            <li
              key={key}
              className="flex items-center gap-2 text-[11px] text-zinc-300 sm:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>
                {t(`${copyKey}.highlights.${key}` as Parameters<typeof t>[0])}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={`/contact?service=${id}`}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-all duration-300 group-hover:bg-primary group-hover:text-black hover:scale-[1.02] active:scale-[0.98] sm:mt-8 sm:rounded-2xl sm:py-3.5 sm:text-xs"
      >
        <span>{t(`${copyKey}.cta`)}</span>
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
