# tame.wtf

## Architecture Overview
This is a React + TypeScript portfolio website using Vite, featuring a dark minimalist design. Content is stored as Markdown files in `public/` and loaded dynamically at runtime.

**Key Components:**
- `Layout.tsx` - Navigation wrapper with mobile menu and loading states
- `ScrollAnimation.tsx` - Intersection Observer-based animations
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
  pages/         # Route components
  utils/         # Content parsing utilities
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