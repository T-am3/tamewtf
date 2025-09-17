import { ScrollAnimation } from '../components/ScrollAnimation'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllBlogPosts, getAllBlogTags, type BlogPost } from '../utils/markdown'

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState("all")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setError(null)
        const [posts, tags] = await Promise.all([
          getAllBlogPosts(),
          getAllBlogTags()
        ])
        
        if (posts.length === 0) {
          setError("No blog posts found")
        } else {
          setBlogPosts(posts)
          setAvailableTags(tags)
        }
      } catch {
        setError('Failed to load blog posts')
      } finally {
        setLoading(false)
      }
    }
    
    loadPosts()
  }, [])

  const filteredPosts = selectedTag === "all" 
    ? blogPosts 
    : blogPosts.filter((post: BlogPost) => post.tags.includes(selectedTag))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollAnimation>
          <div className="mb-20">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-8">blog</h1>
            <div className="w-20 h-1 bg-white to-gray-500 mb-8" />
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            my random ramblings, thoughts, and ideas
            </p>
          </div>
        </ScrollAnimation>

        {/* Category Filter */}
        <ScrollAnimation delay={200}>
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedTag("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === "all"
                    ? 'bg-white text-black'
                    : 'glass text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                everything
              </button>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-white text-black'
                      : 'glass text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Loading State */}
        {loading && (
          <ScrollAnimation delay={300}>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-8 glass rounded-xl border border-gray-800/50">
                  <div className="animate-pulse">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-6 bg-gray-700 rounded-full"></div>
                      <div className="w-20 h-4 bg-gray-700 rounded"></div>
                    </div>
                    <div className="w-3/4 h-8 bg-gray-700 rounded mb-3"></div>
                    <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="w-2/3 h-4 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        )}

        {/* Error State */}
        {error && !loading && (
          <ScrollAnimation delay={300}>
            <div className="text-center py-12">
              <div className="glass rounded-xl p-8 border border-red-500/20">
                <h3 className="text-xl text-white mb-4">oops, something went wrong</h3>
                <p className="text-gray-300 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  try again
                </button>
              </div>
            </div>
          </ScrollAnimation>
        )}

        {/* Empty Filter State */}
        {!loading && !error && filteredPosts.length === 0 && blogPosts.length > 0 && (
          <ScrollAnimation delay={300}>
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 glass rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl text-white mb-2">no posts found</h3>
              <p className="text-gray-300">try selecting a different category</p>
            </div>
          </ScrollAnimation>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="space-y-8">
            {filteredPosts.map((post: BlogPost, index: number) => (
            <ScrollAnimation key={post.id} delay={300 + index * 100}>
              <article className="group">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="block glass rounded-xl hover-lift transition-all duration-500 border border-gray-800/50 hover:border-gray-600/50 overflow-hidden"
                >
                  <div className="md:flex">
                    {/* Blog Image */}
                    {post.previewImage && (
                      <div className="md:w-1/3 aspect-video md:aspect-square relative overflow-hidden">
                        <img 
                          src={post.previewImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    
                    {/* Blog Content */}
                    <div className={`p-8 ${post.previewImage ? 'md:w-2/3' : 'w-full'}`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div className="flex items-center space-x-4 mb-3 md:mb-0">
                          <span className="text-gray-300 text-sm">{post.readTime}</span>
                        </div>
                        <time className="text-gray-300 text-sm">
                          {formatDate(post.date)}
                        </time>
                      </div>
                      
                      <h2 className="text-2xl font-light text-white mb-3 group-hover:text-gray-200 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-300 transition-colors mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-gray-300 group-hover:text-white transition-colors">
                        <span className="text-sm">read more</span>
                        <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </ScrollAnimation>
          ))}
          </div>
        )}

      </div>
    </div>
  )
}
