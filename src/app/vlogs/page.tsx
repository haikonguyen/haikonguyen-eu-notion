import { BentoGrid, BentoGridItem } from '@components/ui/bento-grid';
import Container from '@components/layout/container/container';
import { FaVideo, FaYoutube } from 'react-icons/fa';

export default function VlogsPage() {
  return (
    <main className="pt-24 pb-20">
      <Container>
        <div className="mb-12">
          <h1 className="mb-2">Vlogs</h1>
          <p className="text-lg">
            Behind the scenes and stories from my journey.
          </p>
        </div>

        <BentoGrid className="md:auto-rows-[20rem]">
          <BentoGridItem
            className="md:col-span-2"
            title="Creative Coding in 2026"
            description="How AI and new tools are changing the way we build."
            header={
              <div className="relative h-full min-h-40 overflow-hidden rounded-xl bg-neutral-900 flex items-center justify-center group">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <FaYoutube className="text-red-600 h-16 w-16 z-20 group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-4 left-4 z-20 font-bold text-xs uppercase tracking-widest text-white/70">
                  18:45 • Published Apr 2026
                </div>
              </div>
            }
            icon={<FaYoutube className="h-4 w-4 text-red-600" />}
          />
          <BentoGridItem
            title="Photography Gear Breakdown"
            description="What's in my bag for 2026."
            header={
              <div className="relative h-full min-h-40 overflow-hidden rounded-xl bg-neutral-900 flex items-center justify-center group">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <FaYoutube className="text-red-600 h-12 w-12 z-20 group-hover:scale-110 transition-transform" />
              </div>
            }
            icon={<FaYoutube className="h-4 w-4 text-red-600" />}
          />
          <BentoGridItem
            title="A Week in San Francisco"
            description="Vlog 042 - Life of a developer/photographer."
            header={
              <div className="relative h-full min-h-[10rem] overflow-hidden rounded-xl bg-neutral-900 flex items-center justify-center group">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <FaVideo className="text-primary h-12 w-12 z-20 group-hover:scale-110 transition-transform" />
              </div>
            }
            icon={<FaVideo className="h-4 w-4 text-primary" />}
          />
        </BentoGrid>
      </Container>
    </main>
  );
}
