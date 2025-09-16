import { useState } from 'react'
import { ScrollAnimation } from '../components/ScrollAnimation'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitStatus('success')
    setFormData({ name: '', email: '', project: '', message: '' })
    
    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000)
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation>
          <div className="mb-20">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-8 gradient-text">hello!</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-white to-gray-500 mb-8" />
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              want to chat about a project, collaborate on something cool, or just say hello? 
              drop me a line - i love meeting new people and hearing about interesting ideas.
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <ScrollAnimation delay={200}>
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl text-white mb-8 flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3" />
                  get in touch
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    interested in collaborating on creative projects? whether it's visual effects, 
                    music production, or web development, i'm passionate about bringing innovative ideas to life.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    i work with brands, artists, and fellow creatives to create compelling digital experiences. 
                    every project is an opportunity to push creative boundaries and deliver exceptional results.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <div>
              <h2 className="text-2xl text-white mb-8 flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3" />
                drop me a line
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span className="text-green-400">message sent successfully! i'll get back to you soon.</span>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-400 mb-3">
                      name *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-900/50 glass border-0 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                      placeholder="your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-400 mb-3">
                      email *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-900/50 glass border-0 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="project" className="block text-sm text-gray-400 mb-3">
                    project type *
                  </label>
                  <div className="relative">
                    <select 
                      id="project" 
                      value={formData.project}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black glass border-0 rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none cursor-pointer"
                      style={{ 
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1rem'
                      }}
                    >
                      <option value="" className="bg-black text-gray-400">select project type</option>
                      <option value="vfx" className="bg-black text-white">visual effects & motion graphics</option>
                      <option value="music" className="bg-black text-white">music production & sound design</option>
                      <option value="web" className="bg-black text-white">web development & design</option>
                      <option value="uiux" className="bg-black text-white">ui/ux design & consultation</option>
                      <option value="consultation" className="bg-black text-white">consultation & creative direction</option>
                      <option value="collaboration" className="bg-black text-white">ongoing collaboration</option>
                      <option value="other" className="bg-black text-white">other (please specify in message)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-3">
                    tell me about your project *
                  </label>
                  <textarea 
                    id="message" 
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/50 glass border-0 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-vertical"
                    placeholder="describe your project, timeline, budget range, and any specific requirements..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02] font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      sending message...
                    </>
                  ) : (
                    <>
                      send message
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="text-lg text-white mb-4">response time</h3>
                <p className="text-gray-400 text-sm mb-6">
                  i typically respond to inquiries within 24-48 hours. for urgent projects, 
                  feel free to reach out directly via email for faster response.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="mailto:hello@tame.wtf" 
                    className="inline-flex items-center px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105"
                  >
                    email directly
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="inline-flex items-center px-6 py-3 text-gray-400 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    download resume
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}
