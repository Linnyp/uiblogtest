import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { getBlogData, getAllBlogSlugs, getRelatedPosts } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/config";
import BlogPostComponent from "./BlogPost";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getBlogData(slug);

    const ogImage =
      post.heroImage ||
      `${SITE_CONFIG.siteUrl}/api/og?title=${encodeURIComponent(post.title)}`;

    return {
      title: `${post.title} | ${SITE_CONFIG.title}`,
      description: post.description,
      authors: [{ name: post.author }],
      keywords: post.seoKeywords?.join(", "),
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.lastUpdated || post.date,
        authors: [post.author],
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [ogImage],
      },
      alternates: {
        canonical: `${SITE_CONFIG.siteUrl}/blog/${slug}`,
      },
    };
  } catch {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;

    const [post, relatedPosts] = await Promise.all([
      getBlogData(slug),
      getRelatedPosts(slug, 3),
    ]);

    if (!post) {
      notFound();
    }

    return <BlogPostComponent post={post} relatedPosts={relatedPosts} />;
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}
