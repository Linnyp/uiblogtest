import { LoadingSpinner } from '@/app/components/BlogComponents'

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="h-12 bg-white/20 rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-white/20 rounded-lg mb-2 max-w-2xl mx-auto animate-pulse" />
            <div className="h-6 bg-white/20 rounded-lg mb-8 max-w-xl mx-auto animate-pulse" />
            
            {/* Search Bar Skeleton */}
            <div className="max-w-md mx-auto">
              <div className="h-10 bg-white/20 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post Skeleton */}
        <div className="mb-16">
          <div className="h-8 bg-gray-200 rounded-lg mb-6 w-48 animate-pulse" />
          <div className="bg-gray-200 rounded-2xl h-64 animate-pulse" />
        </div>

        {/* Category Filter Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="h-8 bg-gray-200 rounded-lg w-64 animate-pulse" />
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 w-20 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}