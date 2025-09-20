# tame.wtf

personal portfolio website

## development setup

### prerequisites
- node.js 18+
- npm

### local development
```bash
# install frontend dependencies
npm install


# start both frontend and server
npm run dev:full

# or run them separately:
npm run dev          # frontend only
npm run server:dev   # server only
```


## project structure

```
src/
├── components/
│   ├── Layout.tsx           # main layout with nav and footer
│   ├── ScrollAnimation.tsx  # intersection observer utility
│   ├── ErrorBoundary.tsx    # error handling component
│   └── LastFM.tsx           # LastFM integration component
├── pages/
│   ├── Home.tsx            # landing page with featured work
│   ├── About.tsx           # background, skills, experience, FAQ
│   ├── Work.tsx            # filterable portfolio with categories
│   ├── Blog.tsx            # blog posts listing
│   ├── BlogPost.tsx        # individual blog post view
│   ├── ProjectDetail.tsx   # individual project view
│   └── Contact.tsx         # contact form and social links
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
- **dark minimalist theme** - clean, professional aesthetic
- **markdown-based content** - blogs and projects managed via markdown files
- **dynamic content loading** - content fetched at runtime for fast builds
- **blog system** - chronological blog posts with categories and tags
- **project portfolio** - showcase work with filtering and detailed views
- **seo optimized** - proper meta tags and semantic HTML
- **LastFM integration** - displays currently playing music with server-side API

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

### server endpoints
- `GET /api/health` - Health check
- `GET /api/lastfm/recent?username=tame` - Get recent track

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