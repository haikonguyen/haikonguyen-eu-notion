import { BlogPostType } from '@app-types/notion';
import { AppPageShell, AppPageShellSize, PageHeader } from '@components/layout';
import { getDatabase, requireDatabaseId } from '@lib/notion';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BlogSearch } from './BlogSearch';

export const revalidate = 1;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return { title: t('blogTitle') };
}

async function getAllPosts(): Promise<BlogPostType[]> {
  try {
    const { results } = await getDatabase(requireDatabaseId());
    return results as BlogPostType[];
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
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
