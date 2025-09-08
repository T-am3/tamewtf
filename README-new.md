# tame.wtf 🎨✨

modern creative portfolio showcasing vfx, music production, and web development work.

## ✨ features

### 🎭 design & animations
- **glass morphism ui** - modern translucent design language
- **scroll-triggered animations** - smooth intersection observer animations
- **cursor tracking** - interactive cursor follower on home page
- **micro-interactions** - hover effects, loading states, and transitions
- **responsive design** - mobile-first approach with fluid layouts

### 🧭 navigation & ux
- **multi-page routing** - react router v7 with smooth transitions
- **fixed navigation** - glass nav bar with mobile hamburger menu
- **scroll-to-top** - floating action button for long pages
- **loading indicators** - skeleton states and progress feedback
- **breadcrumb navigation** - clear page hierarchy

### 📱 pages & content
- **home** - hero section with animated background and cta buttons
- **about** - comprehensive background with stats, philosophy, and journey
- **work** - filterable project portfolio with categories and featured projects
- **contact** - interactive form with social links and faq section

### 🎨 visual effects
- **background patterns** - animated dots and grid overlays
- **gradient text** - webkit text clipping for colorful headings
- **parallax elements** - floating animations and depth effects
- **custom scrollbars** - styled to match dark theme
- **scribble animation** - svg path animation for signature effect

### ♿ accessibility & performance
- **reduced motion support** - respects user preferences
- **focus management** - clear focus indicators and keyboard navigation
- **high contrast mode** - adapts to system preferences
- **semantic html** - proper heading hierarchy and landmarks
- **loading optimization** - gpu acceleration and will-change properties

### 📋 project features
- **category filtering** - vfx, music, web, and experimental projects
- **project cards** - detailed descriptions with hover effects
- **tech stack displays** - visual representation of tools used
- **external links** - github, live demos, and case studies

## 🛠️ tech stack

### core
- **react 18** - component-based ui library
- **typescript 5** - type-safe javascript
- **vite 7** - fast development build tool
- **react router 7** - client-side routing

### styling
- **tailwind css 4** - utility-first css framework
- **custom css** - advanced animations and effects
- **karla font** - clean, modern typography

### development
- **eslint** - code linting and formatting
- **hot reload** - instant development feedback
- **path mapping** - clean import statements

## 🚀 getting started

### prerequisites
- node.js 18+ 
- npm or yarn

### installation
```bash
# clone the repository
git clone https://github.com/tamewtf/tamewtf.git
cd tamewtf

# install dependencies
npm install

# start development server
npm run dev
```

### building for production
```bash
# create optimized build
npm run build

# preview production build
npm run preview
```

### deployment
```bash
# deploy to github pages
npm run deploy
```

## 📁 project structure

```
src/
├── components/           # reusable components
│   ├── Layout.tsx       # main layout with nav and footer
│   └── ScrollAnimation.tsx # intersection observer utility
├── pages/               # route components
│   ├── Home.tsx        # landing page with hero
│   ├── About.tsx       # background and experience
│   ├── Work.tsx        # portfolio showcase
│   └── Contact.tsx     # contact form and social links
├── App.tsx             # main app component with routing
├── main.tsx            # app entry point
└── index.css           # global styles and animations
```

## 🎨 design system

### colors
- **background** - `#000000` pure black
- **surface** - `rgba(255,255,255,0.05)` translucent white
- **text primary** - `#ffffff` white
- **text secondary** - `#d1d5db` gray-300
- **text muted** - `#9ca3af` gray-400
- **accent** - `#3b82f6` blue gradient

### typography
- **primary font** - karla (google fonts)
- **fallback** - system-ui, -apple-system, sans-serif
- **responsive sizing** - clamp() functions for fluid typography

### spacing
- **responsive padding** - clamp(1rem, 4vw, 2rem)
- **section spacing** - clamp(2rem, 5vw, 4rem)
- **consistent margins** - 8px grid system

## 🔧 customization

### adding new projects
edit the `projects` array in `src/pages/Work.tsx`:

```typescript
const projects = [
  {
    id: 'new-project',
    title: 'project name',
    category: 'vfx',
    featured: true,
    description: 'project description...',
    tech: ['after effects', 'cinema 4d'],
    links: {
      github: 'https://github.com/...',
      live: 'https://...',
      case: 'https://...'
    }
  }
]
```

### modifying animations
animation classes are defined in `src/index.css`:

```css
.custom-animation {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### updating contact info
modify social links in `src/pages/Contact.tsx`:

```typescript
const socialLinks = [
  {
    platform: 'email',
    icon: '📧',
    label: 'your.email@domain.com',
    href: 'mailto:your.email@domain.com'
  }
]
```

## 📈 performance optimizations

- **code splitting** - automatic route-based splitting
- **image optimization** - modern formats and lazy loading
- **css optimization** - purged unused styles
- **bundle analysis** - optimized dependencies
- **caching** - proper headers for static assets

## 🐛 browser support

- **modern browsers** - chrome 88+, firefox 85+, safari 14+
- **mobile browsers** - ios safari 14+, chrome mobile 88+
- **progressive enhancement** - graceful degradation for older browsers

## 📝 license

mit license - feel free to use this project as inspiration for your own portfolio!

## 🤝 contributing

contributions welcome! please read the contributing guidelines and submit pull requests.

---

**built with ❤️ by tame** - creating digital experiences that push creative boundaries
