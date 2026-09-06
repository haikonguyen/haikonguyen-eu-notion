import { AppPageShell, AppPageShellSize, PageHeader } from '@components/layout';
import { getAllPosts } from '@lib/keystatic';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BlogSearch } from './BlogSearch';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return { title: t('blogTitle') };
}

export default async function BlogPage() {
  const t = await getTranslations('Blog');
  const blogPostList = await getAllPosts();

  return (
    <AppPageShell size={AppPageShellSize.Default}>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <BlogSearch blogPostList={blogPostList} />
      </section>
    </AppPageShell>
  );
}
