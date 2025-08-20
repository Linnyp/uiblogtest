"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { BlogPost, BlogPostPreview } from "@/types/blog";
import { CategoryBadge } from "@/app/components/BlogComponents";
import { calculateReadTime } from "@/utils/validation";
import TableOfContents from "@/app/components/TableOfContentsTest";
import MobileCTA from "@/app/components/MobileCTA";

interface BlogPostProps {
  post: BlogPost;
  relatedPosts: BlogPostPreview[];
}

export default function BlogPostComponent({
  post,
  relatedPosts,
}: BlogPostProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [imageModal, setImageModal] = useState<string | null>(null);

  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0);

    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  // Add click handlers for image zoom
  useEffect(() => {
    const handleImageClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === "IMG" &&
        target.classList.contains("article-image")
      ) {
        const src = (target as HTMLImageElement).src;
        setImageModal(src);
      }
    };

    document.addEventListener("click", handleImageClick);
    return () => document.removeEventListener("click", handleImageClick);
  }, []);

  const handleShare = async (platform: "twitter" | "linkedin" | "facebook") => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 w-full h-1 bg-blue-600 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="min-h-screen bg-[#ebebeb]">
        {/* REDESIGNED Article Header */}
        <header className="bg-[#ebebeb] border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ← Back to Blog
              </Link>
            </nav>

            {/* SHARED CONTAINER: Image and text split 50/50 */}
            <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-8">
              {/* MOBILE: Image first (full width on mobile) */}
              {post.heroImage && (
                <div className="lg:hidden mb-6">
                  <div className="relative w-full h-0 pb-[33.33%] rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-fill absolute inset-0"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </div>
              )}

              {/* LEFT HALF: All text content (50% on desktop) */}
              <div className="flex-1 lg:w-1/2">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight font-love-ya-like-a-sister">
                  {post.title}
                </h1>

                {/* Category Badge and Read Time */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <CategoryBadge category={post.category} />
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {calculateReadTime(post.estimatedWordCount)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xl text-gray-600 mb-6 leading-relaxed font-inter">
                  {post.description}
                </p>

                {/* Author and Date - Hidden on mobile */}
                <div className="mb-6 hidden lg:block">
                  <div className="flex items-center justify-between lg:justify-start lg:gap-8 xl:justify-start xl:gap-8">
                    <div className="flex items-center text-gray-600">
                      {/* Author Avatar Placeholder */}
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center font-inter">
                        <span className="font-medium">{post.author}</span>
                        <span className="hidden sm:inline mx-2">•</span>
                        <time
                          dateTime={post.date}
                          className="text-sm sm:text-base"
                        >
                          {format(new Date(post.date), "MMMM dd, yyyy")}
                        </time>
                      </div>
                    </div>

                    {/* Social Sharing - Mobile and Large Desktop inline */}
                    {post.socialSharing && (
                      <div className="flex lg:hidden xl:flex items-center gap-2">
                        <span className="text-sm text-gray-500 mr-2">
                          Share:
                        </span>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                          aria-label="Share on Twitter"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleShare("linkedin")}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          aria-label="Share on LinkedIn"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </button>

                        <button
                          onClick={copyToClipboard}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="Copy link"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Social Sharing - Medium/Large screens only (new line) */}
                  {post.socialSharing && (
                    <div className="hidden lg:flex xl:hidden items-center gap-2 mt-4 justify-start">
                      <span className="text-sm text-gray-500 mr-2">Share:</span>
                      <button
                        onClick={() => handleShare("twitter")}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleShare("linkedin")}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label="Share on LinkedIn"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </button>

                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Copy link"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT HALF: Hero Image (50% on desktop) - Desktop Only */}
              {post.heroImage && (
                <div className="hidden lg:block lg:w-1/2 lg:flex-shrink-0">
                  <div className="relative h-full min-h-[400px] max-h-[16.67vw] rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Article Content with Sidebar Layout */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents Sidebar - Left Side - Desktop Only */}
            <aside className="hidden lg:block lg:w-60 lg:flex-shrink-0">
              <div className="sticky top-6" style={{ marginTop: "3rem" }}>
                <TableOfContents contentHtml={post.contentHtml} />
              </div>
            </aside>

            {/* Main Article Content */}
            <article className="flex-1 max-w-4xl">
              <div
                className="article-content max-w-none overflow-hidden font-inter"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {/* Author and Date Section - Mobile only */}
              <div className="lg:hidden mt-12 border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    {/* Author Avatar Placeholder */}
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center font-inter">
                      <span className="font-medium">{post.author}</span>
                      <span className="hidden sm:inline mx-2">•</span>
                      <time
                        dateTime={post.date}
                        className="text-sm sm:text-base"
                      >
                        {format(new Date(post.date), "MMMM dd, yyyy")}
                      </time>
                    </div>
                  </div>

                  {/* Social Sharing - Mobile */}
                  {post.socialSharing && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 mr-2">Share:</span>
                      <button
                        onClick={() => handleShare("twitter")}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleShare("linkedin")}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label="Share on LinkedIn"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </button>

                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Copy link"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile CTA - Only show on mobile */}
              <div className="mt-16">
                <MobileCTA />
              </div>

              {/* Back to Blog - Mobile only */}
              <div className="lg:hidden mt-8 text-center">
                <Link
                  href="/blog"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  ← Back to Blog
                </Link>
              </div>
            </article>
          </div>
        </div>

        {/* Related Posts - Desktop Only */}
        {relatedPosts.length > 0 && (
          <section className="hidden lg:block bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {relatedPost.heroImage && (
                      <div className="relative h-32 w-full overflow-hidden">
                        <Image
                          src={relatedPost.heroImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <CategoryBadge category={relatedPost.category} />
                      <h3 className="font-semibold text-gray-900 mt-2 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Image Modal for Zoom */}
        {imageModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setImageModal(null)}
          >
            <div className="relative max-w-5xl max-h-full">
              <Image
                src={imageModal}
                alt="Zoomed image"
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg"
                sizes="100vw"
              />
              <button
                onClick={() => setImageModal(null)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
                aria-label="Close image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
