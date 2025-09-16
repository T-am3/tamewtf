import { ScrollAnimation } from '../components/ScrollAnimation'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getBlogPost, type BlogPost as BlogPostType } from '../utils/markdown'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [blogPost, setBlogPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('No blog post specified')
        setLoading(false)
        return
      }
      
      try {
        setError(null)
        const post = await getBlogPost(slug)
        if (!post) {
          setError(`Blog post "${slug}" not found`)
        } else {
          setBlogPost(post)
        }
      } catch (error) {
        console.error(`Error loading blog post ${slug}:`, error)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }
    
    loadPost()
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
          <div className="animate-pulse">
            <div className="w-32 h-6 bg-gray-700 rounded mb-8"></div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-6 bg-gray-700 rounded-full"></div>
              <div className="w-20 h-4 bg-gray-700 rounded"></div>
            </div>
            <div className="w-3/4 h-12 bg-gray-700 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="w-full h-4 bg-gray-700 rounded"></div>
              <div className="w-full h-4 bg-gray-700 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || (!loading && !blogPost)) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-xl p-8 border border-red-500/20 mb-8">
            <h1 className="text-4xl font-light text-white mb-6">
              {error ? 'error loading post' : 'post not found'}
            </h1>
            <p className="text-gray-400 mb-8">
              {error || "the blog post you're looking for doesn't exist."}
            </p>
            {slug && (
              <p className="text-gray-500 text-sm mb-6">
                tried to load: <code className="bg-gray-800 px-2 py-1 rounded">{slug}</code>
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                back to blog
              </Link>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                try again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!blogPost) {
    return null // This should not happen due to the error handling above, but TypeScript requires it
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <ScrollAnimation>
          <div className="mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              back to blog
            </Link>
          </div>
        </ScrollAnimation>

        {/* Article Header */}
        <ScrollAnimation delay={200}>
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-gray-400 text-sm">{blogPost.readTime}</span>
              <span className="text-gray-400 text-sm">•</span>
              <time className="text-gray-400 text-sm">
                {formatDate(blogPost.date)}
              </time>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
              {blogPost.title}
            </h1>
          </header>
        </ScrollAnimation>

        {/* Blog Image */}
        {blogPost.previewImage && (
          <ScrollAnimation delay={300}>
            <div className="mb-12">
              <div className="aspect-video glass rounded-xl overflow-hidden">
                <img 
                  src={blogPost.previewImage} 
                  alt={blogPost.title}
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
              {blogPost.content?.split('\n').map((paragraph, index) => {
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
                    <p key={index} className="text-gray-400 italic text-center mt-8">
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
            <div className="flex justify-between items-center">
              <Link 
                to="/blog" 
                className="group flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                all posts
              </Link>
              
              <div className="flex space-x-4">
                <a 
                  href={`https://twitter.com/intent/tweet?text=Check out this blog post: ${blogPost.title}&url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
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
