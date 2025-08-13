import { parseISO, isValid } from 'date-fns'
import { BlogPostFrontmatter } from '@/types/blog'
import { BLOG_CONFIG, isValidCategory } from '@/lib/config'

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export function validateFrontmatter(
  frontmatter: Partial<BlogPostFrontmatter>, 
  filename: string
): { isValid: boolean; errors: ValidationError[]; warnings: ValidationError[] } {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Required fields validation
  const requiredFields: (keyof BlogPostFrontmatter)[] = [
    'title', 'description', 'author', 'date', 'category'
  ]

  requiredFields.forEach(field => {
    if (!frontmatter[field]) {
      errors.push({
        field,
        message: `Missing required field: ${field}`,
        severity: 'error'
      })
    }
  })

  // Date validation
  if (frontmatter.date && !isValid(parseISO(frontmatter.date))) {
    errors.push({
      field: 'date',
      message: 'Invalid date format. Use YYYY-MM-DD format',
      severity: 'error'
    })
  }

  // Category validation
  if (frontmatter.category && !isValidCategory(frontmatter.category)) {
    errors.push({
      field: 'category',
      message: `Invalid category. Must be one of: ${BLOG_CONFIG.categories.join(', ')}`,
      severity: 'error'
    })
  }



  return { isValid: errors.length === 0, errors, warnings }
}

export function calculateReadTime(wordCount: number): string {
  const wordsPerMinute = 200 // Average reading speed
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  
  if (minutes < 1) {
    return '< 1 min read'
  } else if (minutes === 1) {
    return '1 min read'
  } else {
    return `${minutes} min read`
  }
}

export function sanitizeFrontmatter(
  frontmatter: Partial<BlogPostFrontmatter>, 
  filename: string
): BlogPostFrontmatter {
  return {
    title: frontmatter.title || filename.replace('.md', '').replace(/-/g, ' '),
    description: frontmatter.description || 'No description provided',
    author: frontmatter.author || 'Unknown Author',
    date: frontmatter.date || new Date().toISOString().split('T')[0],
    category: isValidCategory(frontmatter.category || '') 
      ? frontmatter.category! 
      : 'Guides',
    heroImage: frontmatter.heroImage || undefined,
    featured: frontmatter.featured || false,
    seoKeywords: frontmatter.seoKeywords?.slice(0, 15) || [],
    lastUpdated: frontmatter.lastUpdated || undefined,
    socialSharing: frontmatter.socialSharing || true,
  }
}