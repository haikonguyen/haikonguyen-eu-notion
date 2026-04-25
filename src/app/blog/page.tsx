import type { Metadata } from 'next';
import Container from '@components/layout/container/container';
import { getDatabase, requireDatabaseId } from '@lib/notion';
import { BlogPostType } from '@app-types/notion';
import { BlogSearch } from './BlogSearch';

export const metadata: Metadata = {
  title: 'Blog | Haiko Nguyen',
};

export const revalidate = 1;

async function getAllPosts(): Promise<BlogPostType[]> {
  try {
    const { results } = await getDatabase(requireDatabaseId());
    return results as BlogPostType[];
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPostList = await getAllPosts();

  return (
    <main className="pt-40 pb-20 bg-background min-h-screen">
      <Container>
        <div className="mb-20 max-w-2xl">
          <h1 className="text-6xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Thoughts on development, visual storytelling, and the future of creative technology.
          </p>
        </div>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent shadow-2xl">
             <div className="bg-black/40 backdrop-blur-3xl rounded-[2.8rem] p-8 md:p-12 border border-white/5">
                <BlogSearch blogPostList={blogPostList} />
             </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
