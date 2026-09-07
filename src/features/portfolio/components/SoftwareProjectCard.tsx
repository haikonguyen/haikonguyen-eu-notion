'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { PortfolioProject, SoftwareProject } from '../types';

interface SoftwareProjectCardProps {
  project: SoftwareProject;
  onSelect: (project: PortfolioProject) => void;
}

export function SoftwareProjectCard({
  project,
  onSelect,
}: SoftwareProjectCardProps) {
  const t = useTranslations('Portfolio');

  return (
    <button
      type="button"
      onClick={() =>
        onSelect({
          slug: project.slug,
          title: project.title,
          description: project.summary,
          longDescription: project.longDescription,
          image: project.image,
          tags: project.tags,
          tech: project.tech,
          github: project.github,
          demo: project.demo,
        })
      }
      className="group relative flex cursor-pointer flex-col rounded-3xl border border-white/10 bg-black/45 p-4 text-left backdrop-blur-2xl transition-all duration-500 hover:border-primary/50 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.2)] sm:p-6"
    >
      <div className="relative mb-4 aspect-[16/9] w-full shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 sm:aspect-[16/10]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-xl bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg">
            {t('exploreDetails')}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            {project.tags[0]}
          </span>
          {project.tech[0] && (
            <span className="font-mono text-[11px] text-white/50">
              {project.tech[0]}
            </span>
          )}
        </div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-primary sm:text-2xl">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/70">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
