import { remark } from 'remark'
import html from 'remark-html'
import { visit } from 'unist-util-visit'
import type { Node } from 'unist'

interface ImageNode extends Node {
  type: 'image'
  url: string
  alt: string
  title?: string
}

interface ParagraphNode extends Node {
  type: 'paragraph'
  children: Node[]
}

interface LinkNode extends Node {
  type: 'link'
  url: string
  title?: string
  children: Node[]
}

// Custom remark plugin to make external links open in new window
function remarkLinkEnhancer() {
  return (tree: Node) => {
    visit(tree, 'link', (node: LinkNode, index, parent) => {
      const { url, title } = node
      
      // Check if it's an external link (not relative, not anchor)
      const isExternal = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
      const isAnchor = url.startsWith('#')
      
      if (isExternal && !isAnchor) {
        // Convert link node to HTML with target="_blank" and rel="noopener noreferrer"
        const linkText = extractTextFromChildren(node.children)
        const enhancedHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${linkText}</a>`
        
        const htmlNode = {
          type: 'html',
          value: enhancedHtml
        }
        
        if (parent && typeof index === 'number') {
          parent.children[index] = htmlNode
        }
      }
    })
  }
}

// Helper function to extract text content from AST nodes
function extractTextFromChildren(children: Node[]): string {
  return children.map((child: any) => {
    if (child.type === 'text') {
      return child.value
    } else if (child.children) {
      return extractTextFromChildren(child.children)
    }
    return ''
  }).join('')
}

// Custom remark plugin to enhance image processing
function remarkImageEnhancer() {
  return (tree: Node) => {
    visit(tree, 'image', (node: ImageNode, index, parent: ParagraphNode) => {
      const { url, alt, title } = node
      
      // Parse custom image syntax from alt text
      // Examples:
      // ![Image description|style:full-width](url)
      // ![Chart explanation|style:centered|caption:Data from 2024](url)
      // ![Screenshot|style:float-right|size:small](url)
      
      const parts = alt.split('|')
      const description = parts[0]
      const options: Record<string, string> = {}
      
      // Parse options
      parts.slice(1).forEach(part => {
        const [key, value] = part.split(':')
        if (key && value) {
          options[key.trim()] = value.trim()
        }
      })
      
      // Generate enhanced HTML with custom classes
      const imageClasses = generateImageClasses(options)
      const wrapperClasses = generateWrapperClasses(options)
      
      // Create enhanced image HTML
      const enhancedHtml = `
        <div class="${wrapperClasses}">
          <img 
            src="${url}" 
            alt="${description}" 
            class="${imageClasses}"
            ${title ? `title="${title}"` : ''}
            loading="lazy"
          />
          ${options.caption ? `<figcaption class="image-caption">${options.caption}</figcaption>` : ''}
        </div>
      `
      
      // Replace the image node with raw HTML
      const htmlNode = {
        type: 'html',
        value: enhancedHtml
      }
      
      if (parent && typeof index === 'number') {
        parent.children[index] = htmlNode
      }
    })
  }
}

function generateImageClasses(options: Record<string, string>): string {
  const classes = ['article-image']
  
  // Size variations
  if (options.size) {
    classes.push(`image-${options.size}`) // image-small, image-medium, image-large
  }
  
  // Style variations
  if (options.style) {
    classes.push(`image-${options.style}`) // image-full-width, image-centered, etc.
  }
  
  // Border and shadow options
  if (options.border) {
    classes.push(`image-border-${options.border}`)
  }
  
  if (options.shadow) {
    classes.push(`image-shadow-${options.shadow}`)
  }
  
  // Interactive effects
  if (options.hover) {
    classes.push(`image-hover-${options.hover}`)
  }
  
  // Special effects
  if (options.effect) {
    classes.push(`image-${options.effect}`)
  }
  
  return classes.join(' ')
}

function generateWrapperClasses(options: Record<string, string>): string {
  const classes = ['image-wrapper']
  
  // Layout options
  if (options.style) {
    classes.push(`wrapper-${options.style}`)
  }
  
  // Alignment
  if (options.align) {
    classes.push(`align-${options.align}`)
  }
  
  // Spacing
  if (options.spacing) {
    classes.push(`spacing-${options.spacing}`)
  }
  
  return classes.join(' ')
}

// Enhanced content processing function
export async function processArticleContent(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkLinkEnhancer) // Custom link processing for external links
    .use(remarkImageEnhancer) // Custom image processing
    .use(html, { sanitize: false })
    .process(content)
    
  return processedContent.toString()
}