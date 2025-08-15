export interface ImageConfig {
  src: string
  alt: string
  style?: string
  size?: string
  caption?: string
  border?: string
  shadow?: string
  align?: string
  spacing?: string
}

export function optimizeImageUrl(src: string, options: { width?: number; quality?: number } = {}): string {
  // For GitHub images, you could use a service like Cloudinary or Vercel's image optimization
  const { width = 800, quality = 80 } = options
  
  // If using Vercel's image optimization API
  if (process.env.NODE_ENV === 'production') {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
  }
  
  return src
}

export function generateResponsiveImageHtml(config: ImageConfig): string {
  const {
    src,
    alt,
    style = 'centered',
    size = 'medium',
    caption,
    border,
    shadow,
    align = 'center',
    spacing = 'normal'
  } = config

  const imageClasses = [
    'article-image',
    `image-${size}`,
    `image-${style}`,
    border ? `image-border-${border}` : '',
    shadow ? `image-shadow-${shadow}` : ''
  ].filter(Boolean).join(' ')

  const wrapperClasses = [
    'image-wrapper',
    `wrapper-${style}`,
    `align-${align}`,
    `spacing-${spacing}`
  ].join(' ')

  // Generate different sizes for responsive images
  const sizes = {
    small: 400,
    medium: 600,
    large: 800,
    full: 1200
  }

  const width = sizes[size as keyof typeof sizes] || sizes.medium

  return `
    <div class="${wrapperClasses}">
      <img 
        src="${optimizeImageUrl(src, { width })}"
        alt="${alt}"
        class="${imageClasses}"
        loading="lazy"
        width="${width}"
        height="auto"
      />
      ${caption ? `<figcaption class="image-caption">${caption}</figcaption>` : ''}
    </div>
  `
}

// Helper function to extract image attributes from custom syntax
export function parseImageAttributes(altText: string): {
  description: string
  attributes: Record<string, string>
} {
  const parts = altText.split('|')
  const description = parts[0]
  const attributes: Record<string, string> = {}
  
  // Parse attributes from remaining parts
  parts.slice(1).forEach(part => {
    const [key, value] = part.split(':')
    if (key && value) {
      attributes[key.trim()] = value.trim()
    }
  })
  
  return { description, attributes }
}

// Validate image URL and return optimized version
export function validateAndOptimizeImageUrl(url: string): string {
  try {
    new URL(url) // Validate URL format
    
    // If it's a GitHub raw URL, ensure it's properly formatted
    if (url.includes('github.com') && !url.includes('raw.githubusercontent.com')) {
      console.warn(`Image URL should use raw.githubusercontent.com: ${url}`)
    }
    
    return url
  } catch {
    console.error(`Invalid image URL: ${url}`)
    return '' // Return empty string for invalid URLs
  }
}

// Generate srcset for responsive images
export function generateSrcSet(baseUrl: string): string {
  const sizes = [400, 600, 800, 1200]
  
  return sizes
    .map(size => `${optimizeImageUrl(baseUrl, { width: size })} ${size}w`)
    .join(', ')
}

// Get appropriate sizes attribute based on image style
export function getSizesAttribute(style: string = 'centered'): string {
  const sizeMap: Record<string, string> = {
    'full-width': '100vw',
    'float-left': '(max-width: 768px) 100vw, 40vw',
    'float-right': '(max-width: 768px) 100vw, 40vw',
    'centered': '(max-width: 768px) 100vw, 800px',
    'inline': '(max-width: 768px) 100vw, 300px'
  }
  
  return sizeMap[style] || '(max-width: 768px) 100vw, 800px'
}