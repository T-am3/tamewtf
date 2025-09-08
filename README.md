# tame.wtf

personal portfolio website - dark minimalist design showcasing creative work across vfx, music production, and web development.

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
│   ├── Layout.tsx       # main layout with nav and footer
│   └── ScrollAnimation.tsx # intersection observer utility
├── pages/
│   ├── Home.tsx        # landing page with featured work
│   ├── About.tsx       # background, skills, experience, FAQ
│   ├── Work.tsx        # filterable portfolio with categories
│   └── Contact.tsx     # contact form and social links
├── data/
│   └── projects.ts     # centralized project data
├── App.tsx             # main app with routing
├── main.tsx            # entry point
└── index.css           # global styles and animations
```

## tech stack

- **react 18** + **typescript 5**
- **vite 7** - build tool with hot reload
- **react router 7** - client-side routing
- **tailwind css 4** - utility-first styling
- **dynamic git hash** - build info in footer

## key features

### design
- glass morphism ui with dark theme
- scroll-triggered animations (intersection observer)
- responsive mobile-first design
- micro-interactions and hover effects

### functionality
- multi-page spa with smooth routing
- collapsible faq section on about page
- filterable work portfolio (vfx, music, web, ui/ux)
- random featured project selection on home
- fake theme toggle with sarcastic message
- centralized project data management

### ux improvements
- removed emojis throughout for cleaner aesthetic
- interactive scroll indicator with smooth scrolling
- removed social interaction elements (likes/shares)
- streamlined contact form without availability status
- mobile navigation with proper black theme

## content management

### adding projects
edit `src/data/projects.ts`:

```typescript
{
  id: 'project-name',
  title: 'Project Title',
  category: 'vfx' | 'music' | 'web' | 'uiux',
  featured: true,
  description: 'project description...',
  tech: ['tool1', 'tool2'],
  year: 2025
}
```

### updating skills
modify skills object in `src/pages/About.tsx`:

```typescript
const skills = {
  vfx: ['after effects', 'cinema 4d', ...],
  music: ['ableton live', 'logic pro', ...],
  web: ['react', 'typescript', ...],
  uiux: ['figma', 'adobe xd', ...]
}
```

## deployment notes

- uses dynamic git commit hash in footer
- vite config automatically injects `__GIT_HASH__` global
- build includes all optimizations for production
- configured for custom domain (tame.wtf)

## recent changes

- removed all emojis for professional aesthetic
- added ui/ux category across all pages
- implemented collapsible faq with smooth animations
- removed privacy link from footer
- disabled faq section from contact page
- added fake theme toggle with humorous response
- fixed mobile navigation and contact form theming
- centralized project data for consistency
- enhanced about page with better content organization

---

**personal creative portfolio** - built for showcasing multidisciplinary work
