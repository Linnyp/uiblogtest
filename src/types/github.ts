export interface GitHubConfig {
  owner: string                          // GitHub username/org
  repo: string                           // Content repository name
  path: string                           // Folder containing markdown files
  branch: string                         // Branch to fetch from
  token?: string                         // Optional auth token
}

export interface GitHubFile {
  name: string
  path: string
  sha: string
  content?: string                       // Base64 encoded content
  encoding?: 'base64'
  type: 'file' | 'dir'
  download_url: string
}

export interface GitHubDirectoryItem {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: 'file' | 'dir'
  _links: {
    self: string
    git: string
    html: string
  }
}