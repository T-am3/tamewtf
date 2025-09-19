// Utility functions for parsing markdown files and extracting metadata

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  slug: string;
  content?: string;
  previewImage?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  slug: string;
  featured?: boolean;
  content?: string;
  tools?: string[];
  year?: string;
  date?: string;
  status?: string;
  liveUrl?: string;
  sourceUrl?: string;
  previewImage?: string;
}

export interface MarkdownParseResult {
  metadata: Record<string, string>;
  content: string;
}

export interface FetchResult<T> {
  data: T | null;
  error: string | null;
}

// Custom error classes for better error handling
export class MarkdownParseError extends Error {
  public readonly filePath?: string;

  constructor(message: string, filePath?: string) {
    super(message);
    this.name = 'MarkdownParseError';
    this.filePath = filePath;
  }
}

export class NetworkError extends Error {
  public readonly url: string;
  public readonly status?: number;

  constructor(message: string, url: string, status?: number) {
    super(message);
    this.name = 'NetworkError';
    this.url = url;
    this.status = status;
  }
}

// Helper function to parse tags from metadata
function parseTags(metadata: Record<string, string>): string[] {
  const tagsString = metadata.tags || metadata.tag || "";
  if (!tagsString) return [];

  // Handle both comma-separated and array-like formats
  if (tagsString.startsWith("[") && tagsString.endsWith("]")) {
    // Parse array format: ["tag1", "tag2", "tag3"]
    return tagsString
      .slice(1, -1)
      .split(",")
      .map((tag) => tag.trim().replace(/['"]/g, ""))
      .filter((tag) => tag.length > 0);
  } else {
    // Parse comma-separated format: tag1, tag2, tag3
    return tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }
}

// Parse markdown frontmatter and content
export function parseMarkdown(markdown: string): MarkdownParseResult {
  try {
    const lines = markdown.split("\n");
    const metadata: Record<string, string> = {};
    let contentStartIndex = 0;

    // Check for YAML frontmatter
    if (lines[0]?.trim() === "---") {
      let yamlEnd = -1;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === "---") {
          yamlEnd = i;
          break;
        }
      }

      if (yamlEnd > 0) {
        // Parse YAML frontmatter
        for (let i = 1; i < yamlEnd; i++) {
          const line = lines[i].trim();
          if (line.includes(":")) {
            const [key, ...valueParts] = line.split(":");
            let value = valueParts.join(":").trim();

            // Remove quotes from value
            if (
              (value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))
            ) {
              value = value.slice(1, -1);
            }

            metadata[key.trim()] = value;
          }
        }
        contentStartIndex = yamlEnd + 1;
      }
    }

    const content = lines.slice(contentStartIndex).join("\n").trim();

    return { metadata, content };
  } catch (error) {
    throw new MarkdownParseError(
      `Failed to parse markdown: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'unknown'
    );
  }
}

// Convert markdown content to JSX-friendly format
export function formatMarkdownContent(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>')
    .replace(
      /`(.*?)`/g,
      '<code class="glass px-2 py-1 rounded text-sm">$1</code>'
    );
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Fetch and parse a markdown file
export async function fetchMarkdownFile(path: string): Promise<MarkdownParseResult> {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new NetworkError(
        `Failed to fetch markdown file: ${response.status} ${response.statusText}`,
        path,
        response.status
      );
    }

    const markdown = await response.text();

    // Check if we got HTML instead of markdown (happens in dev when file doesn't exist)
    if (
      markdown.trim().startsWith("<!doctype html>") ||
      markdown.trim().startsWith("<html")
    ) {
      throw new MarkdownParseError(`Received HTML instead of markdown for path: ${path}`, path);
    }

    return parseMarkdown(markdown);
  } catch (error) {
    if (error instanceof NetworkError || error instanceof MarkdownParseError) {
      throw error;
    }
    throw new NetworkError(
      `Network error fetching markdown file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      path
    );
  }
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  let blogSlugs: string[] = [];

  try {
    // Try to fetch the manifest file first
    const manifestResponse = await fetch('/blog/blogs.json');
    blogSlugs = await manifestResponse.json();
  } catch {
    // Fallback to empty array if manifest doesn't exist
    blogSlugs = [];
  }

  const posts: BlogPost[] = [];

  for (const slug of blogSlugs) {
    try {
      const result = await fetchMarkdownFile(`/blog/${slug}.md`);
      posts.push({
        id: slug,
        title: result.metadata.title || "Untitled",
        excerpt: result.metadata.excerpt || "",
        date: result.metadata.date || new Date().toISOString().split("T")[0],
        readTime: result.metadata.readTime || result.metadata["read time"] || "3 min read",
        category: result.metadata.category || "general",
        tags: parseTags(result.metadata),
        slug,
        content: result.content,
        previewImage: result.metadata.previewImage,
      });
    } catch (error) {
      console.warn(`Failed to load blog post ${slug}:`, error instanceof Error ? error.message : error);
      // Continue with other posts instead of failing completely
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const result = await fetchMarkdownFile(`/blog/${slug}.md`);
    if (!result) {
      return null;
    }

    const { metadata, content } = result;
    return {
      id: slug,
      title: metadata.title || "Untitled",
      excerpt: metadata.excerpt || "",
      date: metadata.date || new Date().toISOString().split("T")[0],
      readTime: metadata.readTime || metadata["read time"] || "3 min read",
      category: metadata.category || "general",
      tags: parseTags(metadata),
      slug,
      content,
      previewImage: metadata.previewImage,
    };
  } catch {
    return null;
  }
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  let projectSlugs: string[] = [];

  try {
    // Try to fetch the manifest file first
    const manifestResponse = await fetch('/projects/projects.json');
    projectSlugs = await manifestResponse.json();
  } catch {
    // Fallback to empty array if manifest doesn't exist
    projectSlugs = [];
  }

  const projects: Project[] = [];

  for (const slug of projectSlugs) {
    try {
      const result = await fetchMarkdownFile(`/projects/${slug}.md`);
      if (result) {
        const { metadata, content } = result;
        projects.push({
          id: slug,
          title: metadata.title || "Untitled",
          description: metadata.description || metadata.excerpt || "",
          category: metadata.category || "general",
          tags: parseTags(metadata),
          slug,
          featured: metadata.featured === "true",
          content,
          tools: metadata.tools ? JSON.parse(metadata.tools) : [],
          year: metadata.year,
          date: metadata.date,
          status: metadata.status,
          liveUrl: metadata.liveUrl,
          sourceUrl: metadata.sourceUrl,
          previewImage: metadata.previewImage,
        });
      }
    } catch {
      // Error loading project - skip
    }
  }

  return projects;
}

// Get single project by slug
export async function getProject(slug: string): Promise<Project | null> {
  const result = await fetchMarkdownFile(`/projects/${slug}.md`);
  if (!result) return null;

  const { metadata, content } = result;
  return {
    id: slug,
    title: metadata.title || "Untitled",
    description: metadata.description || metadata.excerpt || "",
    category: metadata.category || "general",
    tags: parseTags(metadata),
    slug,
    featured: metadata.featured === "true",
    content,
    tools: metadata.tools ? JSON.parse(metadata.tools) : [],
    year: metadata.year,
    date: metadata.date,
    status: metadata.status,
    liveUrl: metadata.liveUrl,
    sourceUrl: metadata.sourceUrl,
    previewImage: metadata.previewImage,
  };
}

// Get all unique tags from blog posts
export async function getAllBlogTags(): Promise<string[]> {
  try {
    const posts = await getAllBlogPosts();
    const allTags = posts.flatMap((post) => post.tags);
    return [...new Set(allTags)].sort();
  } catch {
    return [];
  }
}

// Get all unique tags from projects
export async function getAllProjectTags(): Promise<string[]> {
  try {
    const projects = await getAllProjects();
    const allTags = projects.flatMap((project) => project.tags);
    return [...new Set(allTags)].sort();
  } catch {
    return [];
  }
}
