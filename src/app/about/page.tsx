import {
  AppPageShell,
  AppPageShellSize,
  PageHeader,
  PageHeaderAlign,
} from '@components/layout';
import { AboutTabs } from '@features/about';
import {
  createBlockWithChildren,
  getBlocks,
  getNestedChildBlock,
} from '@lib/notion';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const revalidate = 1;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return { title: t('aboutTitle') };
}

const getAboutContent = async () => {
  const pageId = process.env.ABOUT_PAGE_ID?.trim();
  if (!pageId) {
    throw new Error('Missing ABOUT_PAGE_ID env var');
  }

  const { results } = await getBlocks(pageId);
  const fullBlocks = results.filter((block) => 'type' in block);
  const nestedChildBlock = await getNestedChildBlock(fullBlocks);

  return fullBlocks.map((block) =>
    createBlockWithChildren(block, nestedChildBlock),
  );
};

export default async function AboutPage() {
  const t = await getTranslations('About');
  const blocks = await getAboutContent();

  return (
    <AppPageShell
      size={AppPageShellSize.Default}
      className="relative overflow-hidden"
    >
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.05),transparent_50%)]" />
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        align={PageHeaderAlign.Center}
      />
      <AboutTabs storyBlocks={blocks} />
    </AppPageShell>
  );
}
