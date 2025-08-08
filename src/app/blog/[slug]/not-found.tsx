import Link from 'next/link'

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-gray-400 mb-8">
          <svg 
            className="w-24 h-24 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Article Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/blog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse All Articles
          </Link>
          
          <div className="text-center">
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>Looking for something specific?</p>
          <p className="mt-1">
            Try searching from our{' '}
            <Link href="/blog" className="text-blue-600 hover:underline">
              blog homepage
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}