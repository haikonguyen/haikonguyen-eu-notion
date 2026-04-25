'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { cn } from '@lib/utils';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    tags: string[];
    github?: string;
    demo?: string;
    tech?: string[];
  } | null;
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
        {/* Image Side */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 h-12 w-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-20 md:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content Side */}
        <div className="flex-1 p-8 md:p-16 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start mb-10">
            <div>
               <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h2>
            </div>
            
            <button 
              onClick={onClose}
              className="hidden md:flex h-12 w-12 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              <FaTimes />
            </button>
          </div>

          <div className="space-y-12">
            <div>
               <h3 className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-4">The Challenge</h3>
               <p className="text-zinc-400 text-lg leading-relaxed">
                  {project.longDescription || project.description}
               </p>
            </div>

            {project.tech && (
              <div>
                <h3 className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6">Tech Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                   {project.tech.map(t => (
                     <div key={t} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-medium text-white/70">
                        {t}
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
                  className="px-10 py-4 rounded-2xl bg-primary text-black font-bold text-xs uppercase tracking-[0.3em] shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-3"
                >
                  Live Demo <FaExternalLinkAlt size={10} />
                </a>
              )}
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  Source Code <FaGithub size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
