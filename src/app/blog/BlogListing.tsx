"use client";

import { useState, useMemo } from "react";
import { BlogPostPreview, BlogCategory } from "@/types/blog";
import {
  BlogCard,
  FeaturedCard,
  SearchBar,
  CategoryFilter,
  LoadingSpinner,
  EmptyState,
} from "@/app/components/BlogComponents";

interface BlogListingProps {
  posts: BlogPostPreview[];
  featuredPost: BlogPostPreview | null;
  categories: (BlogCategory | "All")[];
}

export default function BlogListing({
  posts,
  featuredPost,
  categories,
}: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    BlogCategory | "All"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((post) => {
        const searchText = [post.title, post.description, post.author]
          .join(" ")
          .toLowerCase();

        return searchText.includes(query);
      });
    }

    return filtered;
  }, [posts, selectedCategory, searchQuery]);

  const handleCategoryChange = (category: BlogCategory | "All") => {
    setIsLoading(true);
    setSelectedCategory(category);
    // Simulate loading for smooth UX
    setTimeout(() => setIsLoading(false), 100);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && !searchQuery && selectedCategory === "All" && (
          <div className="mb-16">
            {/* Mobile: Search bar above and centered */}
            <div className="flex justify-center mb-8 lg:hidden">
              <div className="w-96 max-w-full">
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search articles, guides, and more..."
                />
              </div>
            </div>

            {/* Desktop: Search bar only */}
            <div className="flex justify-center lg:justify-end mb-6">
              <div className="w-96 max-w-full hidden lg:block">
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search articles, guides, and more..."
                />
              </div>
            </div>
            <FeaturedCard post={featuredPost} />
          </div>
        )}

        {/* Search Bar - Only show when no featured post */}
        {(!featuredPost || searchQuery || selectedCategory !== "All") && (
          <div className="flex justify-center mb-12">
            <div className="w-96 max-w-full">
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search articles, guides, and more..."
              />
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="font-love-ya-like-a-sister text-2xl lg:text-3xl text-secondary">
              {searchQuery
                ? `Search Results`
                : selectedCategory === "All"
                ? "Latest Articles"
                : `${selectedCategory} Articles`}
            </h2>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={handleCategoryChange}
            />
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} showExcerpt={true} />
            ))}
          </div>
        ) : (
          <div className="py-12">
            {searchQuery ? (
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No results found for &quot;{searchQuery}&quot;
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or browse by category.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        )}

        {/* Results Summary */}
        {filteredPosts.length > 0 && (
          <div className="mt-12 text-center text-gray-600">
            <p>
              Showing {filteredPosts.length} of {posts.length} articles
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
