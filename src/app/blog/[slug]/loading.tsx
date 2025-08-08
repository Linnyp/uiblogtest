import { LoadingSpinner } from '@/app/components/BlogComponents'

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Article Header Skeleton */}
      <header className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="h-4 w-24 bg-gray-200 rounded mb-6 animate-pulse" />

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Title */}
          <div className="space-y-3 mb-4">
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>

          {/* Description */}
          <div className="space-y-2 mb-6">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>

          {/* Author and Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image Skeleton */}
      <div className="w-full h-64 md:h-96 bg-gray-200 animate-pulse" />

      {/* Article Content Skeleton */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-8">
          <LoadingSpinner size="lg" />
        </div>
        
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Tags Skeleton */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="h-5 w-12 bg-gray-200 rounded mb-3 animate-pulse" />
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts Skeleton */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-32 bg-gray-200" />
                <div className="p-4">
                  <div className="h-6 w-16 bg-gray-200 rounded-full mb-2" />
                  <div className="h-5 bg-gray-200 rounded mb-1" />
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}