export interface BlogPostFrontmatter {
  title: string
  description: string
  author: string
  date: string                           // YYYY-MM-DD format
  readTime?: string                      // e.g., "5 min read"
  category: BlogCategory
  tags?: string[]
  heroImage?: string                     // Full URL to image
  featured?: boolean
  seoKeywords?: string[]
  lastUpdated?: string
  socialSharing?: boolean
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string
  contentHtml: string                    // Processed HTML from markdown
  estimatedWordCount: number
}

export interface BlogPostPreview extends BlogPostFrontmatter {
  slug: string                           // Used for routing
}

export type BlogCategory = 
  | 'Guides' 
  | 'News' 
  | 'Tools' 
  | 'Analysis' 
  | 'Getting Started'
  | 'Tutorial'


export interface SearchResult extends BlogPostPreview {
  score: number
  excerpt?: string
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}