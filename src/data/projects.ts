export interface Project {
  id: number
  category: 'vfx' | 'music' | 'web' | 'uiux'
  title: string
  description: string
  tools: string[]
  year: string
  featured: boolean
  status: string
  liveUrl?: string
  sourceUrl?: string
}

export const projects: Project[] = [
  // VFX Projects
  {
    id: 1,
    category: 'vfx',
    title: "motion graphics reel",
    description: "collection of motion graphics and visual effects work for various clients including commercials, music videos, and digital content",
    tools: ["after effects", "cinema 4d", "premiere pro"],
    year: "2024",
    featured: true,
    status: "completed"
  },
  {
    id: 2,
    category: 'vfx',
    title: "3d product visualization",
    description: "photorealistic 3d renders and animations for product launches, featuring dynamic lighting and materials",
    tools: ["blender", "cycles", "davinci resolve"],
    year: "2024",
    featured: true,
    status: "completed"
  },
  {
    id: 3,
    category: 'vfx',
    title: "concert visuals",
    description: "real-time visual effects and projections for live music performances, synchronized with audio",
    tools: ["touchdesigner", "resolume", "ableton link"],
    year: "2023",
    featured: false,
    status: "completed"
  },
  {
    id: 4,
    category: 'vfx',
    title: "experimental animation",
    description: "abstract visual exploration combining procedural animation with organic forms and textures",
    tools: ["houdini", "redshift", "nuke"],
    year: "2023",
    featured: false,
    status: "completed"
  },
  // Music Projects
  {
    id: 5,
    category: 'music',
    title: "electronic ep",
    description: "4-track electronic music ep blending ambient textures with rhythmic elements, exploring themes of digital consciousness",
    tools: ["ableton live", "serum", "ozone"],
    year: "2024",
    featured: true,
    status: "completed"
  },
  {
    id: 6,
    category: 'music',
    title: "film scoring",
    description: "original compositions and sound design for short films and video projects, ranging from thriller to documentary",
    tools: ["logic pro", "kontakt", "pro tools"],
    year: "2024",
    featured: true,
    status: "completed"
  },
  {
    id: 7,
    category: 'music',
    title: "collaborative album",
    description: "experimental electronic album created with fellow artists, featuring live recordings and digital manipulation",
    tools: ["ableton live", "max for live", "fieldrecording"],
    year: "2023",
    featured: false,
    status: "completed"
  },
  {
    id: 8,
    category: 'music',
    title: "sound design portfolio",
    description: "collection of sound design work for games, apps, and interactive experiences",
    tools: ["reaper", "wwise", "pure data"],
    year: "2023",
    featured: false,
    status: "completed"
  },
  // Web Projects
  {
    id: 9,
    category: 'web',
    title: "interactive portfolio",
    description: "custom portfolio site with webgl animations and audio-reactive elements, featuring real-time visual effects",
    tools: ["react", "three.js", "web audio api"],
    year: "2024",
    featured: true,
    status: "completed",
    liveUrl: "#",
    sourceUrl: "#"
  },
  {
    id: 10,
    category: 'web',
    title: "music visualization app",
    description: "real-time audio visualization tool that creates dynamic visuals from sound input, with customizable parameters",
    tools: ["typescript", "canvas api", "tone.js"],
    year: "2024",
    featured: true,
    status: "completed",
    liveUrl: "#",
    sourceUrl: "#"
  },
  {
    id: 11,
    category: 'web',
    title: "creative studio website",
    description: "responsive website for creative studio featuring smooth animations and interactive project galleries",
    tools: ["next.js", "framer motion", "sanity"],
    year: "2023",
    featured: false,
    status: "completed",
    liveUrl: "#",
    sourceUrl: "#"
  },
  {
    id: 12,
    category: 'web',
    title: "audio streaming platform",
    description: "full-stack application for streaming and discovering experimental music, with social features",
    tools: ["react", "node.js", "postgresql"],
    year: "2023",
    featured: false,
    status: "completed",
    liveUrl: "#",
    sourceUrl: "#"
  },
  // UI/UX Projects
  {
    id: 13,
    category: 'uiux',
    title: "mobile music app redesign",
    description: "complete ui/ux redesign of music streaming app focusing on discovery and user engagement",
    tools: ["figma", "principle", "adobe xd", "user research"],
    year: "2024",
    featured: true,
    status: "completed"
  },
  {
    id: 14,
    category: 'uiux',
    title: "creative portfolio website",
    description: "ui/ux design for artist portfolio site with focus on visual storytelling and user journey",
    tools: ["figma", "framer", "protopie", "user testing"],
    year: "2024",
    featured: true,
    status: "completed"
  },
  {
    id: 15,
    category: 'uiux',
    title: "productivity app concept",
    description: "concept design for productivity app targeting creative professionals with time tracking and project management",
    tools: ["sketch", "principle", "marvel", "user interviews"],
    year: "2023",
    featured: false,
    status: "completed"
  },
  {
    id: 16,
    category: 'uiux',
    title: "e-commerce platform design",
    description: "comprehensive design system and user experience for creative marketplace platform",
    tools: ["figma", "adobe xd", "zeplin", "a/b testing"],
    year: "2023",
    featured: false,
    status: "completed"
  }
]

// Helper function to get random featured projects
export const getRandomFeaturedProjects = (count: number = 4): Project[] => {
  const featuredProjects = projects.filter(project => project.featured)
  const shuffled = [...featuredProjects].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured)
}
