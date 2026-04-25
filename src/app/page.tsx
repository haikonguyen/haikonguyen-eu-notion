import Image from 'next/image';
import heroProfileImg from '@images/heroProfileImg.png';
import { BentoGrid, BentoGridItem } from '@components/ui/bento-grid';
import Container from '@components/layout/container/container';
import { FaPlay, FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import { cn } from '@lib/utils';
import Link from 'next/link';

// Premium Unsplash Assets
const photographyBg = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070";
const devPlaceholder = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072";
const vlogPlaceholder = "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=2070";

export default async function HomePage() {
  return (
    <main className="relative min-h-screen pt-36 pb-20 overflow-x-hidden">
      {/* Cinematic Dark Backdrop */}
      <div className="fixed inset-0 -z-20">
        <Image
          src={photographyBg}
          alt="Atmospheric Background"
          fill
          className="object-cover opacity-60 grayscale-[0.5] blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      <Container>
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[30rem] gap-8 auto-rows-auto">
          
          {/* ABOUT ME */}
          <BentoGridItem
            className="md:col-span-2 group/about"
            showGlow
            title="About Me"
            header={
              <div className="flex flex-col md:flex-row gap-10 items-start h-full pt-4">
                {/* Photo Left */}
                <div className="relative aspect-square w-64 md:w-72 overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] shrink-0">
                  <Image
                    src={heroProfileImg}
                    alt="Haiko Nguyen"
                    fill
                    className="object-cover grayscale-[0.2] transition-all duration-700 group-hover/about:grayscale-0 group-hover/about:scale-105"
                  />
                </div>
                
                {/* Content Right */}
                <div className="flex flex-col h-full justify-center space-y-6">
                  <div>
                    <h1 className="text-5xl font-bold text-white tracking-tight leading-none mb-2">Haiko Nguyen</h1>
                    <p className="text-primary font-bold text-base tracking-tight opacity-90">Senior Software Engineer & Visual Artist</p>
                  </div>
                  
                  <p className="text-white/60 leading-relaxed max-w-md text-base">
                    Hello! I'm Haiko, a senior software engineer based in Prague building elegant solutions with React and a creative with a love for visual storytelling.
                  </p>
                  
                  <Link href="/about">
                    <button className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-primary text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white/10 transition-all shadow-xl backdrop-blur-md">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            }
          />

          {/* LATEST PROJECT */}
          <BentoGridItem
            className="md:col-span-1"
            href="/portfolio?category=Dev"
            title="Latest Project"
            description="Developing high-performance web interfaces."
            header={
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl bg-black/40">
                 <div className="h-full w-full bg-[#0d1117] border border-white/5 p-6 font-mono text-[11px] leading-relaxed relative">
                    <div className="flex gap-1.5 mb-5 opacity-40">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                       <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                       <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <pre className="text-white/30">
                       <span className="text-primary/70">function</span> <span className="text-blue-400">App</span>() {'{'}<br/>
                       &nbsp;&nbsp;<span className="text-primary/70">return</span> (<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-primary">h1</span>{'>'}AC Portfolio V2{'<'}/{'h1'}{'>'}<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-primary">ProjectGrid</span> {'/'}{'>'}<br/>
                       &nbsp;&nbsp;);<br/>
                       {'}'}
                    </pre>
                 </div>
              </div>
            }
          />

          {/* PHOTOGRAPHY */}
          <BentoGridItem
            className="md:col-span-1 group/photo relative overflow-hidden p-0 h-[20rem] md:h-auto"
            href="/portfolio?category=Photo"
            header={
              <div className="absolute inset-0">
                <Image
                  src={photographyBg}
                  alt="Photography"
                  fill
                  className="object-cover transition-transform group-hover/photo:scale-110 duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 z-10">
                   <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Photography</span>
                   <p className="text-white font-bold text-2xl tracking-tight leading-tight">Visual<br/>Storytelling</p>
                </div>
              </div>
            }
          />

          {/* RECENT VLOG */}
          <BentoGridItem
            className="md:col-span-1 group/vlog p-0 overflow-hidden h-[20rem] md:h-auto"
            href="/portfolio?category=Vlogs"
            header={
              <div className="absolute inset-0">
                <Image
                  src={vlogPlaceholder}
                  alt="Vlog Thumbnail"
                  fill
                  className="object-cover opacity-60 transition-transform group-hover/vlog:scale-110 duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                   <div className="h-16 w-16 rounded-full bg-primary/20 border border-primary/50 backdrop-blur-xl flex items-center justify-center group-hover/vlog:scale-125 transition-all duration-500 cursor-pointer shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                      <FaPlay className="text-primary ml-1 text-xl" />
                   </div>
                </div>
                <div className="absolute bottom-10 left-10 z-10">
                   <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Recent Vlog</span>
                   <p className="text-white font-bold text-lg leading-tight max-w-[80%]">Creating the V2: Behind the Scenes</p>
                </div>
              </div>
            }
          />

          {/* BOOK A CALL */}
          <BentoGridItem
            className="md:col-span-1"
            showGlow
            title="Book A Call"
            header={
              <div className="flex flex-col gap-10 h-full pt-4">
                <div className="flex flex-col gap-6">
                   <div className="flex items-center justify-between px-1">
                      <span className="text-xl font-bold text-white tracking-tight">April 2026</span>
                      <div className="flex gap-8 opacity-40">
                         <FaChevronLeft className="text-sm hover:text-primary cursor-pointer transition-colors" />
                         <FaChevronRight className="text-sm hover:text-primary cursor-pointer transition-colors" />
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">
                      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                   </div>
                   
                   <div className="grid grid-cols-5 gap-3">
                      {[13, 14, 15, 16, 17].map((day, idx) => {
                        const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
                        return (
                          <div key={day} className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{labels[idx]}</span>
                            <div className={cn(
                              "w-12 h-14 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-500 cursor-pointer border",
                              day === 15 
                                ? "bg-primary/20 border-primary text-primary shadow-[0_0_30px_rgba(34,211,238,0.2)] scale-110" 
                                : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:border-white/10"
                            )}>
                              {day}
                            </div>
                          </div>
                        )
                      })}
                   </div>
                </div>

                <div className="space-y-5">
                   <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary opacity-90 ml-1">Select A Slot</span>
                   <div className="grid grid-cols-2 gap-3">
                      {["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"].map(time => (
                         <div key={time} className="py-4 px-4 rounded-[1.5rem] border border-white/5 bg-white/5 text-[11px] font-bold text-white/40 text-center hover:border-primary/50 hover:bg-white/10 hover:text-white transition-all cursor-pointer backdrop-blur-md">
                            {time}
                         </div>
                      ))}
                   </div>
                </div>

                <button className="mt-auto w-full py-5 rounded-[2rem] bg-primary text-black font-bold text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(34,211,238,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                   Confirm Booking
                   <FaCalendarAlt className="text-sm opacity-60" />
                </button>
              </div>
            }
          />

        </BentoGrid>
      </Container>
    </main>
  );
}
