import type { Metadata } from "next";
import { cache } from "react";
import { Image } from "@imagekit/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { getCoverSource, NotionBlocks } from "@features/blog";
import { siteConfig } from "@config";
import {
  createBlockWithChildren,
  EuDateFormat,
  getBlocks,
  getDatabase,
  getNestedChildBlock,
  getPage,
  requireDatabaseId,
} from "@lib/notion";
import { notFound } from "next/navigation";
import { BlogPage } from "@app-types/notion";

export const revalidate = 3600;

/** One Notion DB query per request (shared by generateMetadata + getPostData + static params). */
const getBlogDatabaseCached = cache(async () => {
  const databaseId = requireDatabaseId();
  return getDatabase(databaseId);
});

const getPageSlug = (page: BlogPage): string => {
  const slugProperty =
    page.properties?.slug?.rich_text?.[0]?.plain_text?.trim();
  return slugProperty && slugProperty.length > 0 ? slugProperty : page.id;
};

export async function generateStaticParams() {
  const { results } = await getBlogDatabaseCached();

  return results.map((page) => ({
    slug: getPageSlug(page as BlogPage),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { results } = await getBlogDatabaseCached();

  const matchingPage = results.find((page) => {
    const pageSlug = getPageSlug(page as BlogPage);
    return pageSlug === slug;
  });

  if (!matchingPage) {
    return { title: "Post Not Found" };
  }

  const page = (await getPage(matchingPage.id)) as BlogPage;

  const title =
    page.properties.post_name.title?.length &&
    page.properties.post_name.title[0]?.plain_text
      ? page.properties.post_name.title[0].plain_text
      : "Post";
  const description =
    page.properties.excerpt.rich_text[0]?.plain_text ||
    "Read this article on Haiko Nguyen's blog";
  const coverSrc = getCoverSource(page.cover);

  const absoluteImageUrl = coverSrc.startsWith("http")
    ? coverSrc
    : `${siteConfig.url}${coverSrc}`;

  const postUrl = `${siteConfig.url}/post/${slug}`;

  return {
    title: `${title} | Haiko Nguyen`,
    description,
    openGraph: {
      type: "article",
      url: postUrl,
      title,
      description,
      siteName: "Haiko Nguyen Blog",
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImageUrl],
      site: "@haikonguyeneu",
      creator: "@haikonguyeneu",
    },
  };
}

async function getPostData(slug: string) {
  const { results } = await getBlogDatabaseCached();

  const matchingPage = results.find((page) => {
    const pageSlug = getPageSlug(page as BlogPage);
    return pageSlug === slug;
  });

  if (!matchingPage) {
    return null;
  }

  const page = await getPage(matchingPage.id);
  const { results: blockResults } = await getBlocks(matchingPage.id);

  const fullBlocks = blockResults.filter((block) => "type" in block);
  const nestedChildBlock = await getNestedChildBlock(fullBlocks);
  const blocksWithChildren = fullBlocks.map((block) =>
    createBlockWithChildren(block, nestedChildBlock)
  );

  return { page: page as BlogPage, blocks: blocksWithChildren };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostData(slug);

  if (!data) {
    notFound();
  }

  const { page, blocks } = data;
  const coverSrc = getCoverSource(page.cover);
  const postTitle =
    page.properties.post_name.title?.length &&
    page.properties.post_name.title[0]?.plain_text
      ? page.properties.post_name.title[0].plain_text
      : "Untitled";
  const author = page.properties.author.created_by;
  const date = page.properties.published_date.date?.start;
  const tags = page.properties.tags.multi_select;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-end">
          <Image
            src={coverSrc || "/placeholder.jpg"}
            alt={postTitle}
            fill
            style={{ objectFit: "cover" }}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="bg-primary/20 text-primary backdrop-blur-sm"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              {postTitle}
            </h1>

            {/* Author and Meta */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src={author.avatar_url} alt={author.name} />
                  <AvatarFallback>
                    {author.name?.split(" ").map((n) => n[0]).join("") || "HN"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{author.name}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    {date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {EuDateFormat(date)}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      5 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Separator className="mb-8" />

            {/* Article Content */}
            <article className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-img:rounded-lg">
              <NotionBlocks blocks={blocks} />
            </article>

            <Separator className="my-12" />

            {/* Author Card */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={author.avatar_url} alt={author.name} />
                  <AvatarFallback className="text-lg">
                    {author.name?.split(" ").map((n) => n[0]).join("") || "HN"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-foreground mb-1">{author.name}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Senior React Developer, Full Stack Next.js Developer, Photographer, and Vlogger
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/about">Learn more about me</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
