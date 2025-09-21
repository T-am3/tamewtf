# tame.wtf

personal website for myself

## development setup

### prerequisites
- node.js 18+
- npm


## project structure

```
.
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Node.js dependencies and scripts
├── README.md                # Project documentation
├── tsconfig.app.json        # TypeScript config for app
├── tsconfig.json            # Main TypeScript configuration
├── tsconfig.node.json       # TypeScript config for Node.js
├── vite.config.ts           # Vite build configuration
├── src/
│   ├── components/
│   │   ├── AboutContent.tsx     # reusable about section component
│   │   ├── DiscordAvatar.tsx    # Discord avatar component
│   │   ├── ErrorBoundary.tsx    # error handling component
│   │   ├── LastFM.tsx           # LastFM integration component
│   │   ├── Layout.tsx           # main layout with nav and footer
│   │   ├── ScrollAnimation.tsx  # intersection observer utility
│   │   └── Skeleton.tsx         # loading skeleton components
│   ├── pages/
│   │   ├── About.tsx            # background, skills, experience, FAQ
│   │   ├── Blog.tsx             # blog posts listing
│   │   ├── BlogPost.tsx         # individual blog post view
│   │   ├── Home.tsx             # landing page with featured work
│   │   ├── NotFound.tsx         # 404 error page
│   │   ├── ProjectDetail.tsx    # individual project view
│   │   └── Work.tsx             # filterable portfolio with categories
│   ├── utils/
│   │   └── markdown.ts          # content parsing and fetching utilities
│   ├── assets/
│   │   └── Waving Hand.webp     # static asset
│   ├── App.tsx                  # main app with routing
│   ├── index.css                # global styles and animations
│   ├── main.tsx                 # entry point
│   └── vite-env.d.ts            # Vite environment types
├── server/
│   ├── index.js                 # express server with LastFM API
│   ├── package.json             # server dependencies
│   ├── README.md                # server setup instructions
│   ├── middleware/
│   │   └── common.js            # common middleware
│   └── routes/
│       ├── api.js               # API routes
│       ├── discord.js           # Discord integration routes
│       └── lastfm.js            # LastFM API routes
└── public/
    ├── 404.html                 # 404 error page
    ├── CNAME                    # custom domain configuration
    ├── lastfm.json              # LastFM data
    ├── blog/
    │   ├── blogs.json           # manifest of available blog posts
    │   └── hello.md             # blog post markdown file
    ├── images/
    │   ├── tame.gif             # static asset
    │   ├── blog/
    │   │   └── silly.png        # blog image
    │   └── projects/
    │       └── 4PCqnzhVb6.png   # project image
    └── projects/
        ├── projects.json        # manifest of available projects
        └── tame-wtf.md          # project markdown file
```

## features

- **responsive design** - works perfectly on all devices
- **component architecture** - reusable components like AboutContent for consistent UI
- **markdown-based content** - blogs and projects managed via markdown files
- **blog system** - blog posts with categories and tags
- **seo optimized** - proper meta tags and semantic HTML
- **LastFM integration** - displays currently playing music with server-side API

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
