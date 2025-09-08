import { useState } from 'react'
import { ScrollAnimation } from '../components/ScrollAnimation'

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqItems = [
    {
      question: "what's your typical timeline?",
      answer: "2-4 weeks for web projects, 6-12 weeks for complex vfx or music production."
    },
    {
      question: "do you work internationally?",
      answer: "absolutely! i collaborate with clients worldwide across all time zones."
    },
    {
      question: "how do you price projects?",
      answer: "both project-based and hourly rates available. detailed quotes after consultation."
    },
    {
      question: "ongoing collaboration?",
      answer: "yes! available for one-time projects and retainer work."
    },
    {
      question: "what makes your approach unique?",
      answer: "my multidisciplinary background lets me blend vfx, music, and web development for holistic creative solutions."
    },
    {
      question: "do you offer revisions?",
      answer: "absolutely! all projects include revisions to ensure the final result exceeds your expectations."
    }
  ]
  const skills = {
    vfx: [
      'after effects', 'cinema 4d', 'blender', 'davinci resolve',
      'houdini', 'nuke', 'premiere pro', 'redshift'
    ],
    music: [
      'ableton live', 'logic pro', 'serum', 'kontakt',
      'massive x', 'ozone', 'fabfilter', 'soundtoys'
    ],
    web: [
      'react', 'typescript', 'node.js', 'tailwind',
      'three.js', 'next.js', 'vite', 'postgresql'
    ],
    uiux: [
      'figma', 'adobe xd', 'sketch', 'principle',
      'framer', 'invision', 'miro', 'webflow'
    ]
  }

  const stats = [
    { label: 'years of experience', value: '5+' },
    { label: 'projects completed', value: '50+' },
    { label: 'happy clients', value: '25+' },
    { label: 'coffee consumed', value: '∞' }
  ]

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation>
          <div className="mb-20">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-8 gradient-text">about</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-white to-gray-500 mb-12" />
          </div>
        </ScrollAnimation>

        {/* Stats */}
        <ScrollAnimation delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center glass rounded-lg p-6 hover-lift">
                <div className="text-3xl md:text-4xl font-light text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
        
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <ScrollAnimation delay={300}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3" />
                  my story
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    creative developer specializing in visual effects, music production, and web development. 
                    i love bringing digital ideas to life through code, sound, and motion.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    whether it's crafting immersive vfx, producing beats, or building seamless web experiences, 
                    i'm passionate about creating work that moves people.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    with over 5 years of experience in the creative industry, i've worked with brands, artists, 
                    and fellow developers to bring ambitious projects to life. my approach combines technical 
                    precision with artistic vision, always pushing the boundaries of what's possible.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3" />
                  philosophy
                </h2>
                <blockquote className="border-l-4 border-gray-600 pl-6 text-gray-300 italic">
                  "creativity is intelligence having fun. i believe in the power of combining 
                  artistic vision with technical excellence to create experiences that inspire and engage."
                </blockquote>
              </div>

              <div>
                <h2 className="text-2xl text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3" />
                  faq
                </h2>
                <div className="space-y-3">
                  {faqItems.map((item, index) => (
                    <div key={index} className="glass rounded-lg overflow-hidden hover-lift">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                      >
                        <h3 className="text-white text-sm font-medium">{item.question}</h3>
                        <svg 
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            openFaq === index ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-4 pb-4">
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation delay={400}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl text-white mb-8 flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3" />
                  creative toolkit
                </h2>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mr-3">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      </div>
                      <h3 className="text-lg text-gray-300">vfx & motion</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {skills.vfx.map((tool) => (
                        <span key={tool} className="text-gray-500 text-sm glass rounded px-3 py-2 hover:bg-gray-800/50 transition-colors">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mr-3">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      </div>
                      <h3 className="text-lg text-gray-300">music production</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {skills.music.map((tool) => (
                        <span key={tool} className="text-gray-500 text-sm glass rounded px-3 py-2 hover:bg-gray-800/50 transition-colors">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center mr-3">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      </div>
                      <h3 className="text-lg text-gray-300">web development</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {skills.web.map((tool) => (
                        <span key={tool} className="text-gray-500 text-sm glass rounded px-3 py-2 hover:bg-gray-800/50 transition-colors">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mr-3">
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                      </div>
                      <h3 className="text-lg text-gray-300">ui/ux design</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {skills.uiux.map((tool) => (
                        <span key={tool} className="text-gray-500 text-sm glass rounded px-3 py-2 hover:bg-gray-800/50 transition-colors">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation delay={500}>
          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-3xl text-white mb-12 flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3" />
              journey
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-xl text-gray-300 mb-8 flex items-center">
                  <div className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mr-3">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  </div>
                  education & certifications
                </h3>
                <div className="space-y-6">
                  <div className="glass rounded-lg p-8 hover-lift">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg text-white">bachelor of fine arts in digital media</h4>
                      <span className="text-gray-400 text-sm">2019-2023</span>
                    </div>
                    <p className="text-gray-400 mb-3">university of creative arts</p>
                    <p className="text-gray-500 text-sm">
                      focused on digital art, interactive media, and creative technology. 
                      graduated magna cum laude with a thesis on real-time visual effects.
                    </p>
                  </div>
                  <div className="glass rounded-lg p-8 hover-lift">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg text-white">audio engineering certificate</h4>
                      <span className="text-gray-400 text-sm">2022</span>
                    </div>
                    <p className="text-gray-400 mb-3">berklee online</p>
                    <p className="text-gray-500 text-sm">
                      comprehensive program covering recording, mixing, mastering, and sound design.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl text-gray-300 mb-8 flex items-center">
                  <div className="w-6 h-6 rounded-lg bg-gray-500/20 border border-gray-500/30 flex items-center justify-center mr-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  </div>
                  experience
                </h3>
                <div className="space-y-6">
                  <div className="glass rounded-lg p-8 hover-lift">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg text-white">freelance creative developer</h4>
                      <span className="text-gray-400 text-sm">2023 - present</span>
                    </div>
                    <p className="text-gray-400 mb-4">
                      working with brands and artists to create compelling digital experiences, 
                      from music videos to interactive web applications.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['creative direction', 'project management', 'client relations', 'full-stack development'].map((skill) => (
                        <span key={skill} className="text-gray-500 text-xs bg-gray-900 rounded-full px-3 py-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="glass rounded-lg p-8 hover-lift">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg text-white">motion graphics artist</h4>
                      <span className="text-gray-400 text-sm">2022 - 2023</span>
                    </div>
                    <p className="text-gray-400 mb-4">
                      created motion graphics and visual effects for commercials, music videos, 
                      and digital content at creative studio.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['motion design', 'compositing', 'team collaboration', 'deadline management'].map((skill) => (
                        <span key={skill} className="text-gray-500 text-xs bg-gray-900 rounded-full px-3 py-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-lg p-8 hover-lift">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg text-white">junior web developer</h4>
                      <span className="text-gray-400 text-sm">2021 - 2022</span>
                    </div>
                    <p className="text-gray-400 mb-4">
                      developed responsive websites and web applications using modern frameworks 
                      and technologies for various clients.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['react development', 'responsive design', 'api integration', 'version control'].map((skill) => (
                        <span key={skill} className="text-gray-500 text-xs bg-gray-900 rounded-full px-3 py-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Call to action */}
        <ScrollAnimation delay={600}>
          <div className="text-center mt-20 pt-16 border-t border-gray-800">
            <h2 className="text-2xl text-white mb-6">let's create something amazing</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              interested in working together? i'm always excited to discuss new projects and creative opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:hello@tame.wtf" 
                className="inline-flex items-center px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-medium"
              >
                get in touch
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105"
              >
                download resume
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
