import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  HeroSection,
  AboutSection,
  TechStackSection,
  PortfolioSection,
  BlogSection,
  TestimonialsSection,
  CTASection,
} from "@/components/home";
import { ChatWidget } from "@/components/chat/chat-widget";
import { getDatabase, requireDatabaseId } from "@lib/notion";
import type { BlogPostType } from "@app-types/notion";

export const revalidate = 3600; // Revalidate every hour

async function getLatestPosts(): Promise<BlogPostType[]> {
  const { results } = await getDatabase(requireDatabaseId());
  return results.slice(0, 6) as BlogPostType[];
}

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <PortfolioSection />
        <BlogSection posts={posts} />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
