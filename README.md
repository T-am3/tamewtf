# tame.wtf

personal portfolio website

## development setup

### prerequisites
- node.js 18+
- npm

### local development
```bash
# install dependencies
npm install

# start dev server
npm run dev
# → http://localhost:5173

# build for production
npm run build

# preview production build
npm run preview
```

## project structure

```
src/
├── components/
│   ├── Layout.tsx           # main layout with nav and footer
│   ├── ScrollAnimation.tsx  # intersection observer utility
│   └── ErrorBoundary.tsx    # error handling component
├── pages/
│   ├── Home.tsx            # landing page with featured work
│   ├── About.tsx           # background, skills, experience, FAQ
│   ├── Work.tsx            # filterable portfolio with categories
│   ├── Blog.tsx            # blog posts listing
│   ├── BlogPost.tsx        # individual blog post view
│   ├── ProjectDetail.tsx   # individual project view
│   ├── Guestbook.tsx       # visitor messages and comments
│   └── Contact.tsx         # contact form and social links
├── utils/
│   └── markdown.ts         # content parsing and fetching utilities
├── App.tsx                 # main app with routing
├── main.tsx                # entry point
└── index.css               # global styles and animations

public/
├── blog/
│   ├── blogs.json          # manifest of available blog posts
│   └── *.md                # individual blog post markdown files
├── projects/
│   ├── projects.json       # manifest of available projects
│   └── *.md                # individual project markdown files
└── images/                 # static assets
```

## features

- **responsive design** - works perfectly on all devices
- **dark minimalist theme** - clean, professional aesthetic
- **markdown-based content** - blogs and projects managed via markdown files
- **dynamic content loading** - content fetched at runtime for fast builds
- **guestbook** - visitors can leave messages and comments with reply functionality
- **blog system** - chronological blog posts with categories and tags
- **project portfolio** - showcase work with filtering and detailed views
- **seo optimized** - proper meta tags and semantic HTML

## content management

### content system overview
content is managed through markdown files in the `public/` directory with manifest files for dynamic discovery:

- **blog posts**: stored in `public/blog/` with `blogs.json` manifest
- **projects**: stored in `public/projects/` with `projects.json` manifest
- **runtime loading**: content is fetched dynamically at runtime, not bundled

### adding blog posts
1. create markdown file in `public/blog/`:
   ```markdown
   ---
   title: "Your Blog Post Title"
   date: "2025-01-18"
   category: "music"
   tags: ["music", "production"]
   readTime: "5 min read"
   excerpt: "Brief description of your post"
   ---

   # Your Blog Post Title

   Your content here...
   ```

2. add slug to `public/blog/blogs.json`:
   ```json
   ["existing-post", "your-new-post-slug"]
   ```

### adding projects
1. create markdown file in `public/projects/`:
   ```markdown
   ---
   title: "Your Project Title"
   description: "Project description"
   category: "web"
   tags: ["react", "typescript"]
   year: 2025
   featured: true
   status: "completed"
   liveUrl: "https://your-project.com"
   sourceUrl: "https://github.com/your/repo"
   ---

   # Your Project Title

   Project details and content...
   ```

2. add slug to `public/projects/projects.json`:
   ```json
   ["existing-project", "your-new-project-slug"]
   ```

### markdown frontmatter fields

**blog posts:**
- `title`: post title
- `date`: publication date (YYYY-MM-DD)
- `category`: content category
- `tags`: array of tags
- `readTime`: estimated read time
- `excerpt`: brief description

**projects:**
- `title`: project title
- `description`: project description
- `category`: project category
- `tags`: array of technologies
- `year`: project year
- `featured`: whether to feature on homepage
- `status`: project status
- `liveUrl`: live demo URL
- `sourceUrl`: source code URL

## deployment notes

- uses dynamic git commit hash in footer
- vite config automatically injects `__GIT_HASH__` global
- build includes all optimizations for production
- configured for custom domain (tame.wtf)
- content served statically from `public/` directory