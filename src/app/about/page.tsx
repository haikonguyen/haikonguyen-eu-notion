import type { Metadata } from 'next';
import {
  createBlockWithChildren,
  getBlocks,
  getNestedChildBlock,
} from '@lib/notion';
import Container from '@components/layout/container/container';
import { AboutTabs } from '@features/about';

export const metadata: Metadata = {
  title: 'About | Haiko Nguyen',
};

export const revalidate = 1;

const getAboutContent = async () => {
  const pageId = process.env.ABOUT_PAGE_ID?.trim();
  if (!pageId) {
    throw new Error('Missing ABOUT_PAGE_ID env var');
  }

  const { results } = await getBlocks(pageId);

  const fullBlocks = results.filter((block) => 'type' in block);
  const nestedChildBlock = await getNestedChildBlock(fullBlocks);
  const blocksWithChildren = fullBlocks.map((block) =>
    createBlockWithChildren(block, nestedChildBlock),
  );

  return { blocks: blocksWithChildren };
};

export default async function AboutPage() {
  const { blocks } = await getAboutContent();

  return (
    <main className="pt-40 pb-20 bg-background min-h-screen relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.05),transparent_50%)]" />

      <Container>
        <div className="mb-16 text-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 text-white">About</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Exploring the intersection of code, light, and motion.
          </p>
        </div>

        <AboutTabs storyBlocks={blocks} />
        
      </Container>
    </main>
  );
}
