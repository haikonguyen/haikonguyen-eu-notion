import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { getDatabase, requireDatabaseId } from "@lib/notion";
import { BlogPostType } from "@app-types/notion";
import { BlogSearch } from "./BlogSearch";

export const metadata: Metadata = {
  title: "Blog | Haiko Nguyen",
  description: "Articles about React, Next.js, full-stack development, photography, and more.",
};

export const revalidate = 3600;

async function getAllPosts(): Promise<BlogPostType[]> {
  const { results } = await getDatabase(requireDatabaseId());
  return results as BlogPostType[];
}

export default async function BlogPage() {
  const blogPostList = await getAllPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on React, Next.js, full-stack development, 
              photography, and the creative process.
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <BlogSearch blogPostList={blogPostList} />
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
