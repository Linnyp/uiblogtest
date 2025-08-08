import { getAllBlogPosts, getFeaturedPost, getAllCategories } from '@/lib/blog'
import { SITE_CONFIG } from '@/lib/config'
import { BlogCategory } from '@/types/blog'
import BlogListing from './BlogListing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Blog | ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
  openGraph: {
    title: `Blog | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    type: 'website',
  },
}

export default async function BlogPage() {
  try {
    const [posts, featuredPost, categories] = await Promise.all([
      getAllBlogPosts(),
      getFeaturedPost(),
      getAllCategories(),
    ])

    const allCategories = ['All', ...categories] as (BlogCategory | 'All')[]

    return (
      <BlogListing 
        posts={posts} 
        featuredPost={featuredPost} 
        categories={allCategories}
      />
    )
  } catch (error) {
    console.error('Error loading blog data:', error)
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unable to Load Blog
          </h1>
          <p className="text-gray-600 mb-8">
            There was an error loading the blog posts. Please try again later.
          </p>
          <p className="text-sm text-gray-500">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    )
  }
}