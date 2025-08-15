import matter from 'gray-matter'
import { BlogPost, BlogPostPreview, BlogCategory } from '@/types/blog'
import { GitHubDirectoryItem, GitHubFile } from '@/types/github'
import { GITHUB_CONFIG } from '@/lib/config'
import { sanitizeFrontmatter, validateFrontmatter } from '@/utils/validation'
import { contentCache } from '@/utils/cache'
import { processArticleContent } from '@/lib/contentProcessor'

async function fetchFromGitHub<T>(endpoint: string): Promise<T> {
  const baseUrl = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'nextjs-blog-app',
  }
  
  if (GITHUB_CONFIG.token) {
    headers['Authorization'] = `token ${GITHUB_CONFIG.token}`
  }
  
  const response = await fetch(`${baseUrl}${endpoint}`, { 
    headers,
    next: { revalidate: 300 } // ISR: 5 minutes
  })
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`)
  }
  
  return await response.json()
}

async function fetchDirectoryContents(): Promise<GitHubDirectoryItem[]> {
  const endpoint = `/contents/${GITHUB_CONFIG.path}?ref=${GITHUB_CONFIG.branch}`
  const data = await fetchFromGitHub<GitHubDirectoryItem[]>(endpoint)
  
  return data.filter(item => 
    item.type === 'file' && 
    item.name.endsWith('.md')
  )
}

async function fetchFileContent(filename: string): Promise<string> {
  const endpoint = `/contents/${GITHUB_CONFIG.path}/${filename}?ref=${GITHUB_CONFIG.branch}`
  const file = await fetchFromGitHub<GitHubFile>(endpoint)
  
  if (!file.content || file.encoding !== 'base64') {
    throw new Error(`Unable to fetch content for ${filename}`)
  }
  
  return Buffer.from(file.content, 'base64').toString('utf-8')
}

export async function getAllBlogSlugs(): Promise<string[]> {
  return contentCache.get('slugs', 'all', async () => {
    const files = await fetchDirectoryContents()
    return files.map(file => file.name.replace(/\.md$/, ''))
  })
}

export async function getBlogData(slug: string): Promise<BlogPost> {
  return contentCache.get('post', slug, async () => {
    const fileContent = await fetchFileContent(`${slug}.md`)
    const matterResult = matter(fileContent)
    
    // Validate and sanitize frontmatter
    const validation = validateFrontmatter(matterResult.data, `${slug}.md`)
    if (!validation.isValid) {
      console.warn(`Validation errors in ${slug}.md:`, validation.errors)
    }
    if (validation.warnings.length > 0) {
      console.info(`Validation warnings in ${slug}.md:`, validation.warnings)
    }
    
    const sanitizedData = sanitizeFrontmatter(matterResult.data, `${slug}.md`)
    
    // Use enhanced content processing with custom image handling
    const contentHtml = await processArticleContent(matterResult.content)
    
    // Calculate word count
    const wordCount = matterResult.content.split(/\s+/).filter(word => word.length > 0).length
    
    return {
      slug,
      contentHtml,
      estimatedWordCount: wordCount,
      ...sanitizedData,
    }
  })
}

export async function getAllBlogPosts(): Promise<BlogPostPreview[]> {
  return contentCache.get('posts', 'all', async () => {
    const files = await fetchDirectoryContents()
    
    const allPostsData = await Promise.all(
      files.map(async (file): Promise<BlogPostPreview | null> => {
        try {
          const fileContent = await fetchFileContent(file.name)
          const matterResult = matter(fileContent)
          
          const validation = validateFrontmatter(matterResult.data, file.name)
          if (!validation.isValid) {
            console.warn(`Validation errors in ${file.name}:`, validation.errors)
          }
          
          const sanitizedData = sanitizeFrontmatter(matterResult.data, file.name)
          
          // Calculate word count for preview
          const wordCount = matterResult.content.split(/\s+/).filter(word => word.length > 0).length
          
          return {
            slug: file.name.replace(/\.md$/, ''),
            estimatedWordCount: wordCount,
            ...sanitizedData,
          }
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error)
          return null
        }
      })
    )
    
    return allPostsData
      .filter((post): post is BlogPostPreview => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })
}

export async function getFeaturedPost(): Promise<BlogPostPreview | null> {
  const posts = await getAllBlogPosts()
  return posts.find(post => post.featured) || null
}

export async function getPostsByCategory(category: BlogCategory): Promise<BlogPostPreview[]> {
  const posts = await getAllBlogPosts()
  return posts.filter(post => post.category === category)
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  const posts = await getAllBlogPosts()
  const categories = new Set<BlogCategory>()
  
  posts.forEach(post => categories.add(post.category))
  
  return Array.from(categories).sort()
}

export async function getRecentPosts(limit: number = 5): Promise<BlogPostPreview[]> {
  const posts = await getAllBlogPosts()
  return posts.slice(0, limit)
}

export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPostPreview[]> {
  const allPosts = await getAllBlogPosts()
  const currentPost = allPosts.find(post => post.slug === currentSlug)
  
  if (!currentPost) return []
  
  // Find posts with same category
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0
      
      // Same category gets higher score
      if (post.category === currentPost.category) {
        score += 3
      }
      
      return { post, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
  
  return relatedPosts
}