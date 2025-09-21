# tame.wtf

## Architecture Overview
This is a React + TypeScript portfolio website using Vite, featuring a dark minimalist design. Content is stored as Markdown files in `public/` and loaded dynamically at runtime.

**Key Components:**
- `Layout.tsx` - Navigation wrapper with mobile menu and loading states
- `ScrollAnimation.tsx` - Intersection Observer-based animations
- `AboutContent.tsx` - Reusable component for about section (personal info, skills, social links)
- `LastFM.tsx` - LastFM integration component
- `Skeleton.tsx` - Loading skeleton components
- `ErrorBoundary.tsx` - Error handling component
- `markdown.ts` - Content parsing utilities for blog posts and projects

## Content Management
Content lives in `public/` directory:
- Blog posts: `public/blog/*.md`
- Projects: `public/projects/*.md`

**Content Structure:**
```yaml
---
title: Post Title
date: December 5, 2023
category: music
tags: ["music", "production"]
readTime: 7 min read
excerpt: Brief description
previewImage: https://example.com/image.jpg
---
```

**Loading Pattern:**
```typescript
// Content loaded via fetch at runtime, not bundled
const result = await fetchMarkdownFile(`/blog/${slug}.md`);
const result = await fetchMarkdownFile(`/projects/${slug}.md`);
```

## Styling Conventions
- **Tailwind CSS v4** with custom dark theme
- Black background (`bg-black`) with white text
- Gray accents: `text-gray-300`, `border-gray-700/30`
- Responsive design with `md:` breakpoints
- Backdrop blur effects: `backdrop-blur-lg`

**Navigation States:**
```tsx
// Active link styling
location.pathname === path
  ? "text-white bg-white/10"
  : "text-gray-300 hover:text-white hover:bg-white/5"
```

## Component Patterns
**Scroll Animations:**
```tsx
<ScrollAnimation delay={200} threshold={0.1}>
  <div>Content</div>
</ScrollAnimation>
```

**Loading States:**
```tsx
const [isLoading, setIsLoading] = useState(true);
// 300ms transition on route changes
```

**AboutContent Component:**
```tsx
// Reusable component for about section content
<AboutContent className="custom-spacing" />

// Contains: personal info, skills grid, social links, LastFM integration
// Used on both Home and About pages for consistency
```

**Scroll to Explore:**
```tsx
// Smooth scroll to about section with center alignment
document.getElementById("about-section")?.scrollIntoView({
  behavior: "smooth",
  block: "center",
});
```

## Development Workflow
```bash
npm run dev      # Vite dev server on :5173
npm run build    # TypeScript + Vite build
npm run lint     # ESLint with React hooks rules
npm run preview  # Preview production build
```

**Deployment:**
- GitHub Pages via `gh-pages` package
- Custom domain: `tame.wtf`
- Build output: `dist/` directory

## File Organization
```
src/
  components/     # Reusable UI components
    ├── Layout.tsx           # Navigation wrapper with mobile menu
    ├── ScrollAnimation.tsx  # Intersection Observer-based animations
    ├── AboutContent.tsx     # Reusable about section component
    ├── LastFM.tsx           # LastFM integration component
    ├── Skeleton.tsx         # Loading skeleton components
    └── ErrorBoundary.tsx    # Error handling component
  pages/         # Route components
    ├── Home.tsx            # Landing page with hero and featured content
    ├── About.tsx           # About page with personal info and experience
    ├── Work.tsx            # Portfolio/projects listing page
    ├── Blog.tsx            # Blog posts listing page
    ├── BlogPost.tsx        # Individual blog post view
    ├── ProjectDetail.tsx   # Individual project view
    └── NotFound.tsx        # 404 error page
  utils/         # Content parsing utilities
    └── markdown.ts         # Markdown parsing and content fetching
public/
  blog/          # Markdown blog posts + blogs.json manifest
  projects/      # Project markdown files + projects.json manifest
  images/        # Static assets
```

## Key Dependencies
- React 19 with React Router v7
- Tailwind CSS v4 (via Vite plugin)
- TypeScript with strict ESLint rules
- Git hash injection for versioning

## Content Management System
Content is managed through manifest files for dynamic loading:

**Manifest Files:**
- `public/blog/blogs.json` - Array of available blog post slugs
- `public/projects/projects.json` - Array of available project slugs

**Example Manifest:**
```json
["music-production-setup", "web-development-journey"]
```

## Adding New Content
1. Create markdown file in appropriate `public/` subdirectory (`blog/` or `projects/`)
2. Add the slug to the corresponding manifest file (e.g., `blogs.json` or `projects.json`)
3. Include required frontmatter fields
4. Test loading via development server

## Performance Notes
- Content fetched at runtime (not bundled)
- Intersection Observer for scroll animations
- Minimal bundle with Vite tree-shaking
- Responsive images with Unsplash URLs

## Critical Patterns for AI Agents

### Error Handling Strategy
```typescript
// Use custom error classes for better debugging
export class MarkdownParseError extends Error {
  constructor(message: string, filePath?: string) {
    super(message);
    this.name = 'MarkdownParseError';
    this.filePath = filePath;
  }
}

// Graceful degradation - continue loading other content if one fails
for (const slug of blogSlugs) {
  try {
    const result = await fetchMarkdownFile(`/blog/${slug}.md`);
    // Process result
  } catch (error) {
    console.warn(`Failed to load blog post ${slug}:`, error);
    // Continue with other posts instead of failing completely
  }
}
```

### Git Hash Injection
```typescript
// vite.config.ts - Dynamic git hash for versioning
const getGitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  } catch {
    return 'dev'
  }
}

export default defineConfig({
  define: {
    __GIT_HASH__: JSON.stringify(getGitHash())
  }
})
```

### Mobile-First Navigation
```tsx
// Layout.tsx - Hamburger menu with staggered animations
<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
  <span className={`transition-all duration-300 ${
    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
  }`} />
</button>

// Staggered link animations in mobile menu
style={{
  animationDelay: isMenuOpen ? `${index * 100}ms` : "0ms"
}}
```

### Content Parsing Robustness
```typescript
// markdown.ts - Handle both array and comma-separated tag formats
function parseTags(metadata: Record<string, string>): string[] {
  const tagsString = metadata.tags || "";
  if (tagsString.startsWith("[") && tagsString.endsWith("]")) {
    return tagsString
      .slice(1, -1)
      .split(",")
      .map(tag => tag.trim().replace(/['"]/g, ""));
  } else {
    return tagsString.split(",").map(tag => tag.trim());
  }
}
```

### Build Optimization
```typescript
// vite.config.ts - Manual chunk splitting for caching
rollupOptions: {
  output: {
    manualChunks: {
      'react-vendor': ['react', 'react-dom', 'react-router-dom'],
      'utils': ['./src/utils/markdown.ts']
    }
  }
}
```