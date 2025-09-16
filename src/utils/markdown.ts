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
export function parseMarkdown(markdown: string): {
  metadata: Record<string, string>;
  content: string;
} {
  const lines = markdown.split("\n");
  const metadata: Record<string, string> = {};
  let contentStartIndex = 0;
  let title = "";

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
      return {
        metadata,
        content: lines.slice(contentStartIndex).join("\n"),
      };
    }
  }

  // Extract title from first heading
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("# ") && !title) {
      title = line
        .replace("# ", "")
        .replace("Blog Post: ", "")
        .replace("Project: ", "");
      metadata.title = title;
    }

    if (line.startsWith("**") && line.endsWith("**") && line.includes(":")) {
      const [key, ...valueParts] = line.replace(/\*\*/g, "").split(":");
      const value = valueParts.join(":").trim();
      metadata[key.toLowerCase().trim()] = value;
    }

    if (line === "---" && i > 0) {
      contentStartIndex = i + 1;
      break;
    }
  }

  const content = lines.slice(contentStartIndex).join("\n").trim();

  return { metadata, content };
}

// Convert markdown content to JSX-friendly format
export function formatMarkdownContent(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>')
    .replace(
      /`(.*?)`/g,
      '<code class="bg-gray-800 px-2 py-1 rounded text-sm">$1</code>'
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
export async function fetchMarkdownFile(path: string): Promise<{
  metadata: Record<string, string>;
  content: string;
} | null> {
  try {
    const response = await fetch(path);
    if (!response.ok) return null;

    const markdown = await response.text();

    // Check if we got HTML instead of markdown (happens in dev when file doesn't exist)
    if (
      markdown.trim().startsWith("<!doctype html>") ||
      markdown.trim().startsWith("<html")
    ) {
      console.warn(`Received HTML instead of markdown for path: ${path}`);
      return null;
    }

    return parseMarkdown(markdown);
  } catch (error) {
    console.error("Error fetching markdown file:", error);
    return null;
  }
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogSlugs = [
    "creative-project-management",
    "building-first-vfx-project",
    "web-development-journey",
    "music-production-setup",
  ];

  const posts: BlogPost[] = [];

  for (const slug of blogSlugs) {
    try {
      const result = await fetchMarkdownFile(`/blog/${slug}.md`);
      if (result) {
        const { metadata, content } = result;
        posts.push({
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
        });
      }
    } catch (error) {
      console.error(`Error loading blog post ${slug}:`, error);
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
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  const projectSlugs = [
    "motion-graphics-reel",
    "electronic-ep",
    "portfolio-website",
    "3d-product-visualization",
  ];

  const projects: Project[] = [];

  for (const slug of projectSlugs) {
    try {
      const result = await fetchMarkdownFile(`/content/projects/${slug}.md`);
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
    } catch (error) {
      console.error(`Error loading project ${slug}:`, error);
    }
  }

  return projects;
}

// Get single project by slug
export async function getProject(slug: string): Promise<Project | null> {
  const result = await fetchMarkdownFile(`/content/projects/${slug}.md`);
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
  } catch (error) {
    console.error("Error getting blog tags:", error);
    return [];
  }
}

// Get all unique tags from projects
export async function getAllProjectTags(): Promise<string[]> {
  try {
    const projects = await getAllProjects();
    const allTags = projects.flatMap((project) => project.tags);
    return [...new Set(allTags)].sort();
  } catch (error) {
    console.error("Error getting project tags:", error);
    return [];
  }
}
