# Next.js 14 TypeScript Blog System

Production-ready blog with GitHub content separation. App code in main repo, content in separate GitHub repo via API.

ALWAYS CHECK AND REFERENCE /SRC/ASSETS FOLDER FOR EXAMPLES, IMAGES, AND INSTRUCTIONS OR DETAILED RULES TO FOLLOW FOR COMPLETING CERTAIN TASKS LIKE UI STYLING.

## Architecture

- **App Repo**: Components, utils, config (Next.js 14 + TypeScript)
- **Content Repo**: Markdown files, images, videos only
- **Bridge**: GitHub API with caching (5min ISR)

## Core Types

```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string; // YYYY-MM-DD
  category: BlogCategory;
  contentHtml: string;
  estimatedWordCount: number;
  heroImage?: string;
  tags?: string[];
  featured?: boolean;
}

type BlogCategory = "Guides" | "News" | "Tools" | "Analysis";
```

## Key Components

- **Server**: `app/blog/page.tsx` - Data fetching
- **Client**: `app/blog/BlogListing.tsx` - Interactivity
- **Individual**: `app/blog/[slug]/BlogPost.tsx` - Post display

## GitHub Integration

```typescript
// lib/blog.ts - Core functions
export async function getAllBlogPosts(): Promise<BlogPostPreview[]>;
export async function getBlogData(slug: string): Promise<BlogPost>;

// Uses GitHub API with headers
const headers = {
  Accept: "application/vnd.github.v3+json",
  Authorization: `token ${GITHUB_TOKEN}`, // Optional but recommended
};
```

## Environment Variables

```bash
NEXT_PUBLIC_GITHUB_OWNER=username
NEXT_PUBLIC_GITHUB_REPO=content-repo-name
NEXT_PUBLIC_GITHUB_PATH=blog
GITHUB_TOKEN=ghp_token_for_higher_rate_limits
```

## Content Format

```markdown
---
title: "Post Title"
description: "SEO description"
author: "Author Name"
date: "2024-01-15"
category: "Guides"
tags: ["tag1", "tag2"]
heroImage: "https://raw.githubusercontent.com/owner/repo/main/images/hero.jpg"
---

# Content here
```

## File Structure

```
nextjs-blog/
├── app/blog/[slug]/page.tsx
├── lib/blog.ts
├── types/blog.ts
├── components/BlogComponents.tsx
└── utils/validation.ts

content-repo/
├── blog/post1.md
├── images/hero.jpg
└── videos/demo.mp4
```

## Validation & Error Handling

- Frontmatter validation with defaults
- GitHub API error handling
- Content sanitization
- Build-time validation

## Performance Features

- ISR with 5min revalidation
- Type-safe caching
- Image optimization
- Bundle splitting

## Development Workflow

1. Developers: Maintain app repo
2. Content team: Manage content repo independently
3. GitHub webhooks: Auto-deploy on content changes
4. Validation: Pre-commit hooks for content quality

## Deployment

- Vercel/Netlify compatible
- Environment variables in dashboard
- Automatic builds on content updates
- Health check endpoint at `/api/health`

## Security

- Rate limiting via caching
- Environment variables for tokens
- Content sanitization
- CORS configuration

Complete separation enables independent workflows while maintaining type safety and production performance.
