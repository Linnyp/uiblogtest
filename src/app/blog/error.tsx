'use client'

import { useEffect } from 'react'
import { ErrorMessage } from '@/app/components/BlogComponents'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Blog page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <ErrorMessage 
          error={error.message || 'Failed to load blog content'}
          retry={reset}
        />
        
        <div className="mt-6 text-center">
          <details className="text-sm text-gray-500">
            <summary className="cursor-pointer hover:text-gray-700">
              Technical Details
            </summary>
            <div className="mt-2 p-3 bg-gray-100 rounded text-left font-mono text-xs">
              <p><strong>Error:</strong> {error.message}</p>
              {error.digest && <p><strong>Digest:</strong> {error.digest}</p>}
              {error.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer">Stack Trace</summary>
                  <pre className="mt-1 whitespace-pre-wrap">{error.stack}</pre>
                </details>
              )}
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}