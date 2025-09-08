import { useState } from 'react'
import { ScrollAnimation } from '../components/ScrollAnimation'
import { projects, getFeaturedProjects } from '../data/projects'

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'all projects' },
    { id: 'vfx', label: 'visual effects' },
    { id: 'music', label: 'music' },
    { id: 'web', label: 'web development' },
    { id: 'uiux', label: 'ui/ux design' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const featuredProjects = getFeaturedProjects()

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vfx': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'music': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'web': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'uiux': return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="mb-20">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-8 gradient-text">work</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-white to-gray-500 mb-8" />
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              exploring the intersection of technology, art, and sound through creative projects 
              that push boundaries and inspire connection.
            </p>
          </div>
        </ScrollAnimation>

        {/* Featured Projects */}
        <ScrollAnimation delay={200}>
          <section className="mb-20">
            <h2 className="text-3xl text-white mb-8 flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3" />
              featured projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.slice(0, 4).map((project) => (
                <div key={project.id} className="glass rounded-lg p-8 hover-lift group cursor-pointer">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl text-white mb-2 group-hover:text-gray-300 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-3 py-1 rounded-full border ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                        <span className="text-xs text-gray-500">{project.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-40 bg-gray-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors">
                    <span className="text-gray-600 text-sm">preview</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tools.map((tool) => (
                      <span key={tool} className="text-gray-500 text-xs glass rounded-full px-3 py-1">
                        {tool}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.category === 'web' ? (
                      <>
                        <a href={project.liveUrl} className="text-white hover:text-gray-300 text-sm underline underline-offset-4">
                          view live
                        </a>
                        <a href={project.sourceUrl} className="text-gray-400 hover:text-white text-sm underline underline-offset-4">
                          source code
                        </a>
                      </>
                    ) : project.category === 'music' ? (
                      <a href="#" className="text-white hover:text-gray-300 text-sm underline underline-offset-4">
                        listen
                      </a>
                    ) : (
                      <a href="#" className="text-white hover:text-gray-300 text-sm underline underline-offset-4">
                        view reel
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollAnimation>

        {/* Filter Navigation */}
        <ScrollAnimation delay={300}>
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-white text-black font-medium'
                      : 'glass text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* All Projects Grid */}
        <ScrollAnimation delay={400}>
          <section>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="glass rounded-lg p-6 hover-lift group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{project.year}</span>
                  </div>
                  
                  <div className="h-32 bg-gray-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-800 transition-colors">
                    <span className="text-gray-600 text-sm">preview</span>
                  </div>
                  
                  <h3 className="text-lg text-white mb-3 group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tools.slice(0, 3).map((tool) => (
                      <span key={tool} className="text-gray-500 text-xs glass rounded px-2 py-1">
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="text-gray-500 text-xs">+{project.tools.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {project.category === 'web' ? (
                      <div className="flex gap-2">
                        <a href={project.liveUrl} className="text-white hover:text-gray-300 text-sm underline underline-offset-4">
                          view
                        </a>
                        <a href={project.sourceUrl} className="text-gray-400 hover:text-white text-sm underline underline-offset-4">
                          code
                        </a>
                      </div>
                    ) : (
                      <a href="#" className="text-white hover:text-gray-300 text-sm underline underline-offset-4">
                        {project.category === 'music' ? 'listen' : 'view'}
                      </a>
                    )}
                    
                    {project.featured && (
                      <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
                        featured
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollAnimation>

        {/* Call to action */}
        <ScrollAnimation delay={500}>
          <div className="text-center mt-20 pt-16 border-t border-gray-800">
            <h2 className="text-3xl text-white mb-6">interested in collaborating?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              i'm always excited to work on new projects and bring creative ideas to life. 
              let's discuss how we can create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:hello@tame.wtf" 
                className="inline-flex items-center px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-medium"
              >
                start a project
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a 
                href="#" 
                className="inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105"
              >
                view process
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
