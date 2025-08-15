import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { BlogPostPreview, BlogCategory } from "@/types/blog";

interface BlogCardProps {
  post: BlogPostPreview;
  showExcerpt?: boolean;
  className?: string;
}

export function BlogCard({
  post,
  showExcerpt = true,
  className = "",
}: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={`group block ${className}`}>
      <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
        {post.heroImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <CategoryBadge category={post.category} />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {showExcerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.description}
            </p>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>By {post.author}</span>
              <span>{format(new Date(post.date), "MMM dd, yyyy")}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

interface FeaturedCardProps {
  post: BlogPostPreview;
}

export function FeaturedCard({ post }: FeaturedCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative bg-gradient-to-r from-[#64748b] to-white rounded-2xl overflow-hidden text-black">
        {post.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#64748b]/80 to-white/80" />
          </div>
        )}

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-cta text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
            <CategoryBadge category={post.category} variant="light" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-white transition-colors">
            {post.title}
          </h2>

          <p className="text-lg opacity-90 mb-6 line-clamp-3">
            {post.description}
          </p>

          <div className="flex items-center gap-6 text-sm opacity-80">
            <span>By {post.author}</span>
            <span>{format(new Date(post.date), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

interface CategoryBadgeProps {
  category: BlogCategory;
  variant?: "default" | "light";
}

export function CategoryBadge({
  category,
  variant = "default",
}: CategoryBadgeProps) {
  const variantClasses = variant === "light" 
    ? "bg-white/20 text-black" 
    : "bg-secondary text-primary";
    
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${variantClasses}`}
    >
      {category}
    </span>
  );
}

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      />
    </div>
  );
}

interface ErrorMessageProps {
  error: string;
  retry?: () => void;
}

export function ErrorMessage({ error, retry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-red-600 mb-2">
        <svg
          className="w-12 h-12 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Something went wrong
      </h3>
      <p className="text-red-600 mb-4">{error}</p>
      {retry && (
        <button
          onClick={retry}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <svg
        className="w-16 h-16 mx-auto mb-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No posts found
      </h3>
      <p className="text-gray-600">
        There are no blog posts available at the moment.
      </p>
    </div>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search articles...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
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
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

interface CategoryFilterProps {
  categories: (BlogCategory | "All")[];
  selected: BlogCategory | "All";
  onChange: (category: BlogCategory | "All") => void;
}

export function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 drop-shadow-md hover:drop-shadow-lg ${
            selected === category
              ? "bg-cta text-white drop-shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
