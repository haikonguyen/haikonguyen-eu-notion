'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa';
import type { PortfolioProject } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: PortfolioProject | null;
}

export const ProjectModal = ({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) => {
  const t = useTranslations('Portfolio.modal');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-xl border-none p-0 cursor-pointer animate-in fade-in duration-500"
        onClick={onClose}
        aria-label={t('close')}
      />
      <div className="relative flex h-full max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-[3rem] border border-white/10 bg-[#0a0a0a] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 md:flex-row">
        <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-1/2">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="absolute top-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-all hover:bg-white hover:text-black md:hidden"
          >
            <FaTimes />
          </button>
        </div>
        <div className="custom-scrollbar flex-1 overflow-y-auto p-8 md:p-16">
          <div className="mb-10 flex items-start justify-between">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('close')}
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white hover:text-black md:flex"
            >
              <FaTimes />
            </button>
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                {t('challenge')}
              </h3>
              <p className="text-lg leading-relaxed text-zinc-400">
                {project.longDescription || project.description}
              </p>
            </div>
            {project.tech && (
              <div>
                <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                  {t('techStack')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.tech.map((tech) => (
                    <div
                      key={tech}
                      className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm font-medium text-white/70"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-4 pt-6">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-primary px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] text-black shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                >
                  {t('liveDemo')} <FaExternalLinkAlt size={10} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-white/10"
                >
                  {t('sourceCode')} <FaGithub size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
