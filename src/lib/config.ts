import { GitHubConfig } from "@/types/github";

export const GITHUB_CONFIG: GitHubConfig = {
  owner: process.env.NEXT_PUBLIC_GITHUB_OWNER || "Linnyp",
  repo: process.env.NEXT_PUBLIC_GITHUB_REPO || "blogtest",
  path: process.env.NEXT_PUBLIC_GITHUB_PATH || "blog",
  branch: process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main",
  token: process.env.GITHUB_TOKEN,
};

export const SITE_CONFIG = {
  title: "Discovering Ordinals",
  description: "All your Ordinals related content in one place!",
  author: "Ord-X Team",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ord-x.com",
} as const;

export const BLOG_CONFIG = {
  categories: [
    "Guides",
    "News",
    "Tools",
    "Analysis",
    "Getting Started",
    "Art",
    "Opinion",
  ] as const,
  postsPerPage: 12,
  excerptLength: 160,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
};

export function validateEnvironment(): void {
  const required = [
    "NEXT_PUBLIC_GITHUB_OWNER",
    "NEXT_PUBLIC_GITHUB_REPO",
    "NEXT_PUBLIC_GITHUB_PATH",
  ];

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

export function isValidCategory(
  category: string
): category is (typeof BLOG_CONFIG.categories)[number] {
  return (BLOG_CONFIG.categories as readonly string[]).includes(category);
}
