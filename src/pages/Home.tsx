import { Link } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import wavingHandWebp from "../assets/Waving Hand.webp";
import { ScrollAnimation } from "../components/ScrollAnimation";
import AboutContent from "../components/AboutContent";
import {
  getAllProjects,
  getAllBlogPosts,
  type Project,
  type BlogPost,
} from "../utils/markdown";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [workItems, setWorkItems] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const floatingParticles = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      opacity: 0.02 + Math.random() * 0.08,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
    }));
  }, []);

  const loadContent = useCallback(async () => {
    try {
      setError(null);
      const [projects, posts] = await Promise.all([
        getAllProjects(),
        getAllBlogPosts(),
      ]);
      const featured = projects.filter((p) => p.featured).slice(0, 4);
      setWorkItems(featured);

      const recentPosts = posts.slice(0, 3);
      setBlogPosts(recentPosts);
    } catch (err) {
      console.error("Error loading content:", err);
      setError("Failed to load content. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    loadContent();
  }, [loadContent]);

  return (
    <div className="w-full relative">
      <section className="relative flex items-center justify-center min-h-screen px-4 pb-20 overflow-hidden bg-gradient-to-br from-gray-900/30 via-black to-purple-900/20 -mt-16 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          {floatingParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: `rgba(255, 255, 255, ${particle.opacity})`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}

          {/* Gradient orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="space-y-6">
            <div className="relative">
              <h1
                className={`text-5xl md:text-7xl font-light leading-tight transition-all duration-1000 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                hey, i'm{" "}
                <span className="relative inline-block">
                  <span>tame</span>
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
                  style={{ animationDelay: "2s" }}
                />
                , programmer
              </h1>
            </div>
            <h2
              className={`text-5xl md:text-7xl font-light transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              and musician making it
            </h2>
            <h3
              className={`text-5xl md:text-7xl font-light transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              one step at a time
            </h3>

            {/* CTA buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 pt-8 transition-all duration-1000 delay-700 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                to="/projects"
                className="inline-flex items-center px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-medium"
              >
                check out my stuff
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-gray-300 text-sm mb-4 animate-pulse">
            scroll to explore
          </div>
          <button
            className="group cursor-pointer hover:scale-110 transition-all duration-300"
            onClick={() => {
              document.getElementById("about-section")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            aria-label="Scroll to about section"
          >
            <div className="w-8 h-12 border-2 border-gray-500 rounded-full flex justify-center group-hover:border-white transition-colors relative overflow-hidden">
              <div className="w-1.5 h-4 bg-gray-500 rounded-full mt-2 group-hover:bg-white transition-colors animate-bounce" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
            </div>
          </button>
        </div>
      </section>

      <ScrollAnimation>
        <section
          id="about-section"
          className="py-20 px-4 border-t border-gray-800/50"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-light text-white">about</h2>
              <Link
                to="/about"
                className="group flex items-center text-gray-300 hover:text-white text-sm transition-all duration-300 hover:scale-105"
              >
                <span className="underline underline-offset-4">see more</span>
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <AboutContent />
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="py-20 px-4 border-t border-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-light text-white">
                recent projects
              </h2>
              <Link
                to="/projects"
                className="group flex items-center text-gray-300 hover:text-white text-sm transition-all duration-300 hover:scale-105"
              >
                <span className="underline underline-offset-4">see more</span>
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {isLoading ? (
                // Loading skeleton for projects
                [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="glass rounded-xl border border-gray-800/50 overflow-hidden animate-pulse"
                  >
                    <div className="aspect-video bg-gray-800"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-700 rounded mb-3"></div>
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                ))
              ) : error ? (
                <div className="col-span-full text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-6 glass rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl text-white mb-2">
                    failed to load projects
                  </h3>
                  <p className="text-gray-300 mb-4">{error}</p>
                  <button
                    onClick={loadContent}
                    className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    try again
                  </button>
                </div>
              ) : workItems.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-6 glass rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl text-white mb-2">no projects found</h3>
                  <p className="text-gray-300">
                    check back later for new projects
                  </p>
                </div>
              ) : (
                workItems.map((item) => (
                  <div key={item.id} className="group relative">
                    <Link
                      to={`/projects/${item.slug}`}
                      className="block glass rounded-xl hover-lift transition-all duration-500 border border-gray-800/50 hover:border-gray-600/50 overflow-hidden"
                    >
                      {/* Project Image */}
                      <div className="aspect-video bg-gray-900 relative overflow-hidden">
                        {item.previewImage ? (
                          <img
                            src={item.previewImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                            <span className="text-gray-500 text-sm">
                              preview
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-light text-white group-hover:text-gray-200 transition-colors mb-2">
                          {item.title}
                        </h3>

                        {item.year && (
                          <time className="text-gray-300 text-xs mb-3 block">
                            {item.year}
                          </time>
                        )}

                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-300 transition-colors mb-4 line-clamp-3">
                          {item.description}
                        </p>

                        <div className="flex items-center text-gray-300 group-hover:text-white transition-colors">
                          <span className="text-sm">view project</span>
                          <svg
                            className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="py-20 px-4 border-t border-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-light text-white">recent blogs</h2>
              <Link
                to="/blog"
                className="group flex items-center text-gray-300 hover:text-white text-sm transition-all duration-300 hover:scale-105"
              >
                <span className="underline underline-offset-4">see more</span>
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="space-y-8">
              {isLoading ? (
                [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="glass rounded-xl border border-gray-800/50 overflow-hidden animate-pulse"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 aspect-video md:aspect-square bg-gray-800"></div>
                      <div className="md:w-2/3 p-6">
                        <div className="h-6 bg-gray-700 rounded mb-3"></div>
                        <div className="h-4 bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                        <div className="flex items-center space-x-4">
                          <div className="h-4 bg-gray-700 rounded w-20"></div>
                          <div className="h-4 bg-gray-700 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : error ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-6 glass rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl text-white mb-2">
                    failed to load blog posts
                  </h3>
                  <p className="text-gray-300 mb-4">{error}</p>
                  <button
                    onClick={loadContent}
                    className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    try again
                  </button>
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-6 glass rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl text-white mb-2">no posts found</h3>
                  <p className="text-gray-300">
                    check back later for new blog posts
                  </p>
                </div>
              ) : (
                blogPosts.map((post) => (
                  <article key={post.id} className="group">
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

                        <div
                          className={`p-8 ${
                            post.previewImage ? "md:w-2/3" : "w-full"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div className="flex items-center space-x-4 mb-3 md:mb-0">
                              <span className="text-gray-300 text-sm">
                                {post.readTime}
                              </span>
                            </div>
                            <time className="text-gray-300 text-sm">
                              {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </time>
                          </div>

                          <h3 className="text-2xl font-light text-white mb-3 group-hover:text-gray-200 transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-gray-300 leading-relaxed group-hover:text-gray-300 transition-colors mb-4">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center text-gray-300 group-hover:text-white transition-colors">
                            <span className="text-sm">read more</span>
                            <svg
                              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
