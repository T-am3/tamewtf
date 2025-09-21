# tame.wtf

personal website for myself

## development setup

### prerequisites
- node.js 18+
- npm


## project structure

```
src/
├── components/
│   ├── Layout.tsx           # main layout with nav and footer
│   ├── ScrollAnimation.tsx  # intersection observer utility
│   ├── AboutContent.tsx     # reusable about section component
│   ├── LastFM.tsx           # LastFM integration component
│   ├── Skeleton.tsx         # loading skeleton components
│   └── ErrorBoundary.tsx    # error handling component
├── pages/
│   ├── Home.tsx            # landing page with featured work
│   ├── About.tsx           # background, skills, experience, FAQ
│   ├── Work.tsx            # filterable portfolio with categories
│   ├── Blog.tsx            # blog posts listing
│   ├── BlogPost.tsx        # individual blog post view
│   ├── ProjectDetail.tsx   # individual project view
│   └── NotFound.tsx        # 404 error page
├── utils/
│   └── markdown.ts         # content parsing and fetching utilities
├── App.tsx                 # main app with routing
├── main.tsx                # entry point
└── index.css               # global styles and animations

server/
├── index.js                # express server with LastFM API
├── package.json            # server dependencies
├── .env.example            # environment variables template
└── README.md               # server setup instructions

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
- **component architecture** - reusable components like AboutContent for consistent UI
- **markdown-based content** - blogs and projects managed via markdown files
- **blog system** - blog posts with categories and tags
- **seo optimized** - proper meta tags and semantic HTML
- **LastFM integration** - displays currently playing music with server-side API

### key components

- **AboutContent** - Reusable component containing personal info, skills grid, and social links
  - Used on both Home and About pages for consistency
  - Includes LastFM integration and responsive skill display
  - Accepts custom className prop for styling flexibility

- **ScrollAnimation** - Intersection Observer wrapper for smooth scroll-triggered animations
- **Skeleton** - Loading state components for better UX during content fetching
- **ErrorBoundary** - Graceful error handling and fallback UI

### component usage patterns

```tsx
// Reusable AboutContent component
<AboutContent className="custom-spacing" />

// Scroll animations
<ScrollAnimation delay={200} threshold={0.1}>
  <div>Animated content</div>
</ScrollAnimation>
```

## server setup (LastFM integration)

The project includes a Node.js server for secure LastFM API integration:

### server configuration
1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your LastFM API key
   ```

4. **Get LastFM API key:**
   - Visit [LastFM API Account](https://www.last.fm/api/account/create)
   - Create account or login
   - Fill application form
   - Add API key to `.env` file

5. **Start server:**
   ```bash
   npm run dev  # development with auto-restart
   npm start    # production
   ```


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
