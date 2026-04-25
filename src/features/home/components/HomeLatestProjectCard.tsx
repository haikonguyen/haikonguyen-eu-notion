'use client';

import { BentoGridItem } from '@components/ui/BentoGrid';
import { ArrowRight, Code2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const TECH_TAGS = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Tailwind 4',
] as const;

export function HomeLatestProjectCard() {
  const t = useTranslations('Home');

  return (
    <BentoGridItem
      className="group/project md:col-span-1"
      showGlow
      href="/portfolio?category=Dev"
      title={t('latestProjectTitle')}
      header={
        <div className="flex h-full flex-col justify-between space-y-4">
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]/90 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-3.5 py-2">
              <div className="flex gap-1.5 opacity-60">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-0.5 text-[9px] font-mono text-zinc-400">
                <Code2 size={10} className="text-primary" />
                <span>page.tsx</span>
              </div>
            </div>

            <div className="p-3.5 font-mono text-[10px] leading-relaxed sm:text-[11px]">
              <pre className="text-zinc-400">
                <span className="text-primary/90">
                  export default async function
                </span>{' '}
                <span className="text-blue-400">StudioPage</span>() {'{'}
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">const</span> data
                = <span className="text-primary/90">await</span>{' '}
                <span className="text-yellow-300">getPortfolio</span>();
                <br />
                &nbsp;&nbsp;<span className="text-primary/90">return</span> (
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'<'}
                <span className="text-cyan-400">NextStudio</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stack=
                <span className="text-emerald-300">"React 19"</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;speed=
                <span className="text-emerald-300">"100%"</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;/{'>'}
                <br />
                &nbsp;&nbsp;);
                <br />
                {'}'}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-base font-bold leading-snug tracking-tight text-white sm:text-lg">
                {t('latestProjectDescription')}
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                {t('latestProjectSubtext')}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {TECH_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold text-zinc-300 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-transform group-hover/project:translate-x-1">
                <span>{t('exploreProjects')}</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>
      }
    />
  );
}
