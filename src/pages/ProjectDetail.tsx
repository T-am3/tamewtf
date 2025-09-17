import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ScrollAnimation } from '../components/ScrollAnimation'
import { ProjectSkeleton } from '../components/Skeleton'
import { getProject, type Project } from '../utils/markdown'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return
      
      try {
        const projectData = await getProject(slug)
        setProject(projectData)
      } catch {
        // Error loading project - silently fail
      } finally {
        setLoading(false)
      }
    }
    
    loadProject()
  }, [slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <ProjectSkeleton />
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-light text-white mb-6">project not found</h1>
          <p className="text-gray-300 mb-8">the project you're looking for doesn't exist.</p>
          <Link 
            to="/projects" 
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            back to projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <ScrollAnimation>
          <div className="mb-8">
            <Link 
              to="/projects" 
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              back to projects
            </Link>
          </div>
        </ScrollAnimation>

        {/* Project Header */}
        <ScrollAnimation delay={200}>
          <header className="mb-12">
            {(project.date || project.year) && (
              <div className="flex items-center space-x-4 mb-6">
                <time className="text-gray-300 text-sm">
                  {project.date ? formatDate(project.date) : project.year}
                </time>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
              {project.title}
            </h1>
            
            {project.description && (
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>
            )}

            {/* Links */}
            <div className="flex gap-4">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 text-sm underline underline-offset-4"
                >
                  view live
                </a>
              )}
              {project.sourceUrl && (
                <a 
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white text-sm underline underline-offset-4"
                >
                  view code
                </a>
              )}
            </div>
          </header>
        </ScrollAnimation>

        {/* Project Image */}
        {project.previewImage && (
          <ScrollAnimation delay={300}>
            <div className="mb-12">
              <div className="aspect-video glass rounded-xl overflow-hidden">
                <img 
                  src={project.previewImage} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ScrollAnimation>
        )}

        {/* Article Content */}
        <ScrollAnimation delay={400}>
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed space-y-6">
              {project.content?.split('\n').map((paragraph, index) => {
                if (paragraph.trim() === '') return null
                
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-light text-white mt-12 mb-6">
                      {paragraph.replace('# ', '')}
                    </h1>
                  )
                }
                
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-light text-white mt-10 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-light text-white mt-8 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }
                
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="text-gray-300 ml-6 list-disc">
                      {paragraph.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')}
                    </li>
                  )
                }
                
                if (/^\d+\./.test(paragraph)) {
                  return (
                    <li key={index} className="text-gray-300 ml-6 list-decimal">
                      {paragraph.replace(/^\d+\.\s/, '')}
                    </li>
                  )
                }
                
                if (paragraph.startsWith('---')) {
                  return <hr key={index} className="border-gray-700 my-8" />
                }
                
                if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                  return (
                    <p key={index} className="text-gray-300 italic text-center mt-8">
                      {paragraph.replace(/^\*/, '').replace(/\*$/, '')}
                    </p>
                  )
                }
                
                return (
                  <p 
                    key={index} 
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                    }}
                  />
                )
              })}
            </div>
          </article>
        </ScrollAnimation>

        {/* Navigation */}
        <ScrollAnimation delay={600}>
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex justify-end items-center">
              <div className="flex space-x-4">
                <a 
                  href={`https://x.com/intent/tweet?text=Check out this project: ${project.title}&url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
