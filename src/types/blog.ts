export interface BlogPostFrontmatter {
  title: string
  description: string
  author: string
  authorAvatar?: string                  // Full URL to author avatar image
  date: string                           // YYYY-MM-DD format
  category: BlogCategory
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
  estimatedWordCount: number
}

export type BlogCategory = 
  | 'Guides' 
  | 'News' 
  | 'Tools' 
  | 'Analysis' 
  | 'Getting Started'
  | 'Tutorial'
  | 'Art'
  | 'Opinion'


export interface SearchResult extends BlogPostPreview {
  score: number
  excerpt?: string
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}