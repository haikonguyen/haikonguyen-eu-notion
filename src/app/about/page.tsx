import {
  AppPageShell,
  AppPageShellSize,
  PageHeader,
  PageHeaderAlign,
} from '@components/layout';
import { AboutTabs } from '@features/about';
import { MarkdocRenderer } from '@features/blog/components/MarkdocRenderer';
import { getAboutCv, getAboutStory } from '@lib/keystatic';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return { title: t('aboutTitle') };
}

const STORY_PROSE_CLASS =
  'prose prose-invert prose-lg mx-auto max-w-3xl leading-relaxed text-white/70 prose-headings:text-white prose-a:text-primary prose-strong:text-white';

export default async function AboutPage() {
  const t = await getTranslations('About');
  const [story, cv] = await Promise.all([getAboutStory(), getAboutCv()]);

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
      <AboutTabs
        cv={cv}
        storyContent={
          story ? (
            <MarkdocRenderer
              node={story.content}
              className={STORY_PROSE_CLASS}
            />
          ) : null
        }
      />
    </AppPageShell>
  );
}
