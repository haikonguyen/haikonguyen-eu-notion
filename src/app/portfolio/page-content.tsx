'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BentoGrid, BentoGridItem } from '@components/ui/bento-grid';
import Container from '@components/layout/container/container';
import { FaCode, FaCamera, FaVideo, FaPlay, FaFilter } from 'react-icons/fa';
import Image from 'next/image';
import { cn } from '@lib/utils';
import { ProjectModal } from '@features/portfolio/components/project-modal';
import { PhotoLightbox, type GalleryPhoto } from '@components/ui/photo-lightbox';
import { VideoModal, type VlogItem } from '@components/ui/video-modal';

const devPlaceholder = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072";
const vlogPlaceholder = "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=2070";

type Category = 'All' | 'Dev' | 'Photo' | 'Vlogs';

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  tech?: string[];
}

const photographyGallery: GalleryPhoto[] = [
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070", width: 2070, height: 1380, alt: "Misty Peaks" },
  { src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=2070", width: 2070, height: 2756, alt: "Urban Solitude" },
  { src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=2076", width: 2076, height: 1610, alt: "Silent Forest" },
  { src: "https://images.unsplash.com/photo-1493238792040-67141f11ebd2?auto=format&fit=crop&q=80&w=2070", width: 2070, height: 1380, alt: "Neon Nights" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2070", width: 2070, height: 1380, alt: "Summit Light" },
  { src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=2070", width: 2070, height: 1380, alt: "Forest Path" },
];

const vlogItems: VlogItem[] = [
  {
    id: "v1",
    title: "Creating the V2: Behind the Scenes | AC Vlog",
    duration: "14:32",
    thumbnail: vlogPlaceholder,
    youtubeId: "", // Add your YouTube video ID here
    description: "The full making-of process of building AC Portfolio V2.",
  },
  {
    id: "v2",
    title: "Prague in Winter — A Cinematic Vlog",
    duration: "8:14",
    thumbnail: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&q=80&w=2070",
    youtubeId: "",
    description: "Exploring the magical winter streets of Prague.",
  },
];

export function PortfolioContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedVlog, setSelectedVlog] = useState<VlogItem | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category') as Category | null;
    if (cat && ['All', 'Dev', 'Photo', 'Vlogs'].includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const categories: { label: Category; icon: React.ReactNode }[] = [
    { label: 'All', icon: <FaFilter className="text-[10px]" /> },
    { label: 'Dev', icon: <FaCode className="text-[10px]" /> },
    { label: 'Photo', icon: <FaCamera className="text-[10px]" /> },
    { label: 'Vlogs', icon: <FaVideo className="text-[10px]" /> },
  ];

  const softwareProjects: Project[] = [
    {
      title: "Quantum CRM",
      description: "A high-performance CRM architecture built with Next.js 15 and distributed PostgreSQL.",
      longDescription: "Quantum CRM was designed to handle high-frequency data streams for global sales teams.",
      image: devPlaceholder,
      tags: ["Software", "Next.js 15"],
      tech: ["Next.js 15", "React 19", "Tailwind 4", "PostgreSQL", "Prisma", "TypeScript"],
      github: "https://github.com/haikonguyeneu/quantum",
      demo: "https://quantum-crm.dev"
    },
    {
      title: "Nova UI",
      description: "Ultra-lightweight, glassmorphic component library.",
      longDescription: "Nova UI is a design-first component library focusing on accessibility and premium aesthetics.",
      image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=2070",
      tags: ["Design System", "UI/UX"],
      tech: ["React", "Framer Motion", "Tailwind CSS", "Storybook"],
      github: "https://github.com/haikonguyeneu/nova-ui"
    }
  ];

  return (
    <main className="pt-40 pb-20 bg-background min-h-screen">
      <Container>
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <h1 className="text-7xl font-bold tracking-tighter mb-6 text-white">Portfolio</h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
              Exploring the intersection of code, light, and motion.
            </p>
          </div>

          {/* Category Filter — horizontal scroll on mobile, pill row on desktop */}
          <div className="w-full overflow-x-auto pb-1 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0 md:w-auto scrollbar-hide">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl w-max md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={cn(
                    "px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-2 whitespace-nowrap",
                    activeCategory === cat.label
                      ? "bg-primary text-black shadow-2xl shadow-primary/30"
                      : "text-zinc-500 hover:text-white hover:bg-white/10"
                  )}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-32">
          {/* ── Software ── */}
          {(activeCategory === 'All' || activeCategory === 'Dev') && (
            <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <div className="flex flex-col gap-4 mb-16">
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em]">/ Expertise</span>
                <h2 className="text-5xl font-bold tracking-tight text-white">Software Architecture</h2>
                <div className="h-px w-32 bg-primary/30 mt-4" />
              </div>
              <BentoGrid>
                {softwareProjects.map((project, idx) => (
                  <BentoGridItem
                    key={project.title}
                    className={cn(idx === 0 ? "md:col-span-2" : "md:col-span-1", "group")}
                    title={project.title}
                    description={project.description}
                    onClick={() => setSelectedProject(project)}
                    header={
                      <div className="relative h-full min-h-[16rem] rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900">
                        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                          <div className="px-10 py-4 rounded-2xl bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            Explore Details
                          </div>
                        </div>
                      </div>
                    }
                  />
                ))}
              </BentoGrid>
            </section>
          )}

          {/* ── Photography ── */}
          {(activeCategory === 'All' || activeCategory === 'Photo') && (
            <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <div className="flex flex-col gap-4 mb-16">
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em]">/ Visuals</span>
                <h2 className="text-5xl font-bold tracking-tight text-white">Photography</h2>
                <div className="h-px w-32 bg-primary/30 mt-4" />
              </div>
              <PhotoLightbox photos={photographyGallery} />
            </section>
          )}

          {/* ── Vlogs ── */}
          {(activeCategory === 'All' || activeCategory === 'Vlogs') && (
            <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <div className="flex flex-col gap-4 mb-16">
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em]">/ Motion</span>
                <h2 className="text-5xl font-bold tracking-tight text-white">Vlogs & Stories</h2>
                <div className="h-px w-32 bg-primary/30 mt-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vlogItems.map((vlog) => (
                  <div
                    key={vlog.id}
                    onClick={() => { setSelectedVlog(vlog); setVideoOpen(true); }}
                    className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 cursor-pointer transition-all duration-500 hover:border-primary/30 hover:shadow-2xl aspect-video"
                  >
                    <Image src={vlog.thumbnail} alt={vlog.title} fill className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="h-16 w-16 rounded-full bg-primary/20 border border-primary/50 backdrop-blur-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/40 transition-all duration-500 shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                        <FaPlay className="text-primary ml-1 text-xl" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary block mb-2">Motion Series</span>
                      <p className="text-white font-bold text-xl leading-tight">{vlog.title}</p>
                      {vlog.duration && <span className="text-white/50 text-xs font-bold mt-2 block">{vlog.duration}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
      <VideoModal
        isOpen={videoOpen}
        onClose={() => { setVideoOpen(false); setSelectedVlog(null); }}
        vlog={selectedVlog}
      />
    </main>
  );
}
