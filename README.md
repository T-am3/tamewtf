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