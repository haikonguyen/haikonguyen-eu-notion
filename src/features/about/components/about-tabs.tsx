'use client';

import React, { useState } from 'react';
import { cn } from '@lib/utils';
import { NotionBlocks } from '@features/blog';
import { FaLaptopCode, FaBriefcase, FaGraduationCap, FaDownload, FaReact, FaNodeJs, FaCamera } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiPostgresql } from 'react-icons/si';

interface AboutTabsProps {
  storyBlocks: any[];
}

export const AboutTabs = ({ storyBlocks }: AboutTabsProps) => {
  const [activeTab, setActiveTab] = useState<'story' | 'cv'>('story');

  const experienceData = [
    {
      role: "Senior Frontend Engineer",
      company: "Tech Innovators Inc.",
      period: "2024 - Present",
      description: "Leading the development of highly scalable Next.js architectures. Spearheaded the transition to React 19, improving global performance metrics by 40%.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      role: "UI/UX Developer",
      company: "Creative Studio EU",
      period: "2021 - 2024",
      description: "Designed and implemented interactive web experiences. Specialized in framer-motion animations and building robust design systems.",
      tech: ["React", "Framer Motion", "Styled Components", "Figma"],
    },
    {
      role: "Freelance Developer & Photographer",
      company: "Self-Employed",
      period: "2018 - 2021",
      description: "Delivered premium visual storytelling campaigns merging custom web solutions with professional photography for boutique brands.",
      tech: ["JavaScript", "WordPress", "Adobe Creative Suite", "Photography"],
    }
  ];

  const skillData = [
    { name: "React / Next.js", icon: <SiNextdotjs />, level: 95 },
    { name: "TypeScript", icon: <SiTypescript />, level: 90 },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 95 },
    { name: "Node.js", icon: <FaNodeJs />, level: 80 },
    { name: "PostgreSQL", icon: <SiPostgresql />, level: 75 },
    { name: "Photography / Video", icon: <FaCamera />, level: 90 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tab Controls */}
      <div className="flex justify-center mb-16">
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab('story')}
            className={cn(
              "px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500",
              activeTab === 'story'
                ? "bg-primary text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                : "text-white/50 hover:text-white"
            )}
          >
            The Story
          </button>
          <button
            onClick={() => setActiveTab('cv')}
            className={cn(
              "px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500",
              activeTab === 'cv'
                ? "bg-primary text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                : "text-white/50 hover:text-white"
            )}
          >
            Interactive CV
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative min-h-[500px]">
        {/* Story Tab */}
        {activeTab === 'story' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <article className="prose prose-invert prose-lg max-w-3xl mx-auto leading-relaxed text-white/70">
              <NotionBlocks blocks={storyBlocks} />
            </article>
          </div>
        )}

        {/* CV Tab */}
        {activeTab === 'cv' && (
          <div className="animate-in fade-in zoom-in-95 duration-700 space-y-16">
            
            {/* Download Action */}
            <div className="flex justify-end">
              <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary/10 transition-colors">
                <FaDownload /> Download PDF
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Left Column: Skills & Education */}
              <div className="space-y-12">
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <FaLaptopCode size={18} />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Technical Arsenal</h3>
                  </div>
                  <div className="space-y-6">
                    {skillData.map(skill => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-white/80 font-medium">
                            {skill.icon}
                            <span>{skill.name}</span>
                          </div>
                          <span className="text-[10px] text-primary font-bold">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full" 
                            style={{ width: `${skill.level}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <FaGraduationCap size={18} />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Education</h3>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                    <h4 className="text-lg font-bold text-white">MSc in Computer Science</h4>
                    <p className="text-primary text-xs uppercase tracking-widest font-bold my-2">Czech Technical University</p>
                    <p className="text-white/50 text-sm">Focus on Software Engineering and Human-Computer Interaction.</p>
                  </div>
                </section>
              </div>

              {/* Right Column: Experience Timeline */}
              <div className="md:col-span-2">
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <FaBriefcase size={18} />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Professional Journey</h3>
                  </div>
                  
                  <div className="space-y-8">
                    {experienceData.map((exp, idx) => (
                      <div key={idx} className="relative pl-8 md:pl-0">
                        {/* Timeline Line for Mobile */}
                        <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-white/10 md:hidden" />
                        {/* Timeline Dot for Mobile */}
                        <div className="absolute left-2 top-2 h-2 w-2 rounded-full bg-primary md:hidden ring-4 ring-[#0a0a0a]" />
                        
                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors group">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                            <h4 className="text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">{exp.role}</h4>
                            <span className="px-4 py-1.5 rounded-full bg-black/40 border border-white/5 text-[10px] text-white/50 font-bold uppercase tracking-widest w-fit">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-primary font-bold text-sm mb-6">{exp.company}</p>
                          <p className="text-white/60 leading-relaxed mb-8">
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map(t => (
                              <span key={t} className="px-3 py-1 rounded-lg bg-black/30 border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
