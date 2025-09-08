import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import wavingHandWebp from '../assets/Waving Hand.webp'
import { ScrollAnimation } from '../components/ScrollAnimation'
import { getRandomFeaturedProjects, type Project } from '../data/projects'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [workItems, setWorkItems] = useState<Project[]>([])

  useEffect(() => {
    setIsLoaded(true)
    // Get 4 random featured projects on component mount
    setWorkItems(getRandomFeaturedProjects(4))
  }, [])

  return (
    <div className="w-full">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/20 via-black to-gray-900/20 pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 pb-20 overflow-hidden">
        {/* Animated background dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/5 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="space-y-6">
            <div className="relative">
              <h1 className={`text-5xl md:text-7xl font-light leading-tight transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                hey, i'm <span className="relative inline-block">
                  <span className="gradient-text">tame</span>
                  <svg 
                    width="136" 
                    height="16" 
                    viewBox="0 0 136 16" 
                    className="absolute -bottom-1 left-0 w-full h-auto"
                    fill="none"
                  >
                    <path 
                      d="M2 7.5L22.7221 3.77001C24.7662 3.40208 26.5324 5.22102 26.1046 7.25337V7.25337C25.6275 9.5194 27.8464 11.4157 30.0104 10.5913L41.1145 6.36115C43.27 5.54001 45.4994 7.37821 45.1042 9.65071V9.65071C44.6694 12.1509 47.3636 14.0124 49.5483 12.7214L61.5257 5.6439C63.3084 4.59051 65.5124 6.08819 65.1895 8.13347V8.13347C64.8894 10.0336 66.7973 11.5215 68.5671 10.7677L86.3296 3.20222C88.558 2.25307 90.9521 4.15044 90.5371 6.53679V6.53679C90.1075 9.00673 92.6714 10.9143 94.9137 9.79314L100.628 6.93623C102.703 5.89841 105.096 7.60068 104.795 9.90183V9.90183C104.479 12.3313 107.133 14.0326 109.208 12.7297L120.741 5.48839C122.552 4.35102 124.849 5.91941 124.448 8.02048V8.02048C124.065 10.0331 126.175 11.5986 127.99 10.6479L134 7.5" 
                      stroke="white" 
                      strokeWidth="4" 
                      strokeLinecap="round"
                      strokeDasharray="450"
                      strokeDashoffset="450"
                      className="animate-[drawLoop_4s_ease-in-out_1s_infinite]"
                    />
                  </svg>
                </span>
                <img 
                  src={wavingHandWebp} 
                  alt="waving hand" 
                  className="inline w-12 h-12 md:w-16 md:h-16 ml-3 animate-bounce"
                  style={{ animationDelay: '2s' }}
                />, full stack developer
              </h1>
            </div>
            <h2 className={`text-5xl md:text-7xl font-light transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              and musician making it
            </h2>
            <h3 className={`text-5xl md:text-7xl font-light transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              one step at a time
            </h3>
            
            {/* CTA buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 pt-8 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Link 
                to="/work" 
                className="inline-flex items-center px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 pulse-glow font-medium"
              >
                view my work
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105"
              >
                get in touch
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => {
            document.getElementById('about-section')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }}
          aria-label="Scroll to about section"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center hover:border-gray-400 transition-colors">
            <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-pulse" />
          </div>
        </button>
      </section>

      {/* About Glimpse */}
      <ScrollAnimation>
        <section id="about-section" className="py-20 px-4 border-t border-gray-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-light text-white gradient-text">about</h2>
              <Link 
                to="/about" 
                className="group flex items-center text-gray-400 hover:text-white text-sm transition-all duration-300 hover:scale-105"
              >
                <span className="underline underline-offset-4">view all</span>
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="mb-16">
              <p className="text-xl text-gray-300 leading-relaxed mb-6 font-light">
                creative developer specializing in visual effects, music production, and web development. 
                i love bringing digital ideas to life through code, sound, and motion.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                passionate about creating work that moves people through the intersection of technology, art, and sound.
              </p>
            </div>

            {/* Enhanced Skills Grid */}
            <div className="mb-12">
              <h3 className="text-2xl text-white mb-8 font-light">what i do</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  { 
                    title: "vfx & motion", 
                    tools: ["after effects", "cinema 4d", "blender", "davinci resolve"], 
                    color: "from-purple-500/20 to-pink-500/20",
                    border: "border-purple-500/30"
                  },
                  { 
                    title: "music production", 
                    tools: ["ableton live", "logic pro", "serum", "kontakt"], 
                    color: "from-blue-500/20 to-cyan-500/20",
                    border: "border-blue-500/30"
                  },
                  { 
                    title: "web development", 
                    tools: ["react", "typescript", "tailwind", "node.js"], 
                    color: "from-green-500/20 to-emerald-500/20",
                    border: "border-green-500/30"
                  },
                  { 
                    title: "ui/ux design", 
                    tools: ["figma", "adobe xd", "principle", "framer"], 
                    color: "from-orange-500/20 to-red-500/20",
                    border: "border-orange-500/30"
                  }
                ].map((skill, index) => (
                  <div 
                    key={skill.title} 
                    className={`glass rounded-xl p-8 hover-lift cursor-pointer relative overflow-hidden group transition-all duration-500 hover:scale-[1.02] ${skill.border} w-full`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 ${
                          skill.title === 'vfx & motion' 
                            ? 'bg-purple-500/20 border border-purple-500/30' 
                            : skill.title === 'music production'
                            ? 'bg-blue-500/20 border border-blue-500/30'
                            : skill.title === 'web development'
                            ? 'bg-green-500/20 border border-green-500/30'
                            : 'bg-orange-500/20 border border-orange-500/30'
                        }`}>
                          <span className={`w-3 h-3 rounded-full ${
                            skill.title === 'vfx & motion' 
                              ? 'bg-purple-400' 
                              : skill.title === 'music production'
                              ? 'bg-blue-400'
                              : skill.title === 'web development'
                              ? 'bg-green-400'
                              : 'bg-orange-400'
                          }`}></span>
                        </div>
                        <h4 className="text-xl text-white font-medium group-hover:text-white transition-colors">{skill.title}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.tools.map((tool, toolIndex) => (
                          <span 
                            key={tool}
                            className="text-sm bg-gray-800/50 text-gray-300 px-4 py-2 rounded-full border border-gray-700/50 group-hover:bg-gray-700/50 group-hover:text-white transition-all duration-300"
                            style={{ animationDelay: `${toolIndex * 100}ms` }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { number: "5+", label: "years experience" },
                { number: "50+", label: "projects completed" },
                { number: "20+", label: "happy clients" },
                { number: "∞", label: "creative ideas" }
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-3xl md:text-4xl font-light text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Work Glimpse */}
      <ScrollAnimation>
        <section className="py-20 px-4 border-t border-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-light text-white gradient-text">recent work</h2>
              <Link 
                to="/work" 
                className="group flex items-center text-gray-400 hover:text-white text-sm transition-all duration-300 hover:scale-105"
              >
                <span className="underline underline-offset-4">view all</span>
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {workItems.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="glass rounded-xl p-6 hover-lift cursor-pointer overflow-hidden relative border border-gray-800/50 hover:border-gray-600/50 transition-all duration-500 h-full">
                    {/* Category badge */}
                    <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      item.category === 'vfx' 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                        : item.category === 'music'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : item.category === 'web'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : item.category === 'uiux'
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                        : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                    }`}>
                      {item.category}
                    </div>

                    {/* Content Header */}
                    <div className="mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                        item.category === 'vfx' 
                          ? 'bg-purple-500/20 border border-purple-500/30' 
                          : item.category === 'music'
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : item.category === 'web'
                          ? 'bg-green-500/20 border border-green-500/30'
                          : item.category === 'uiux'
                          ? 'bg-orange-500/20 border border-orange-500/30'
                          : 'bg-gray-500/20 border border-gray-500/30'
                      }`}>
                        <span className={`w-3 h-3 rounded-full ${
                          item.category === 'vfx' 
                            ? 'bg-purple-400' 
                            : item.category === 'music'
                            ? 'bg-blue-400'
                            : item.category === 'web'
                            ? 'bg-green-400'
                            : item.category === 'uiux'
                            ? 'bg-orange-400'
                            : 'bg-gray-400'
                        }`}></span>
                      </div>
                      <h3 className="text-xl font-light text-white mb-2 group-hover:text-gray-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                        {item.description}
                      </p>
                    </div>

                    {/* Preview Area */}
                    <div className={`relative h-32 rounded-lg overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform duration-500 ${
                      item.category === 'vfx' 
                        ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30' 
                        : item.category === 'music'
                        ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30'
                        : item.category === 'web'
                        ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30'
                        : item.category === 'uiux'
                        ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30'
                        : 'bg-gradient-to-br from-gray-900/30 to-gray-800/30'
                    }`}>
                      {/* Animated preview placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                          <span className="text-sm font-medium">preview</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Subtle animation overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>

                    {/* Project link */}
                    <div className="flex justify-end">
                      <Link 
                        to="/work"
                        className="text-xs text-gray-400 hover:text-white underline underline-offset-2 transition-colors"
                      >
                        view project
                      </Link>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Contact Glimpse */}
      <ScrollAnimation>
        <section className="py-20 px-4 border-t border-gray-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light text-white mb-8 gradient-text">let's connect</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              interested in collaborating on creative projects? let's make something amazing together.
            </p>
            
            {/* Enhanced CTA section */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a 
                  href="mailto:hello@tame.wtf" 
                  className="group inline-flex items-center px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-medium relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    get in touch
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                </a>
                <Link 
                  to="/contact" 
                  className="group inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 hover:border-gray-500"
                >
                  more ways to connect
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  )
}
