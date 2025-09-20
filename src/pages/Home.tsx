import { Link } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import wavingHandWebp from "../assets/Waving Hand.webp";
import { ScrollAnimation } from "../components/ScrollAnimation";
import LastFM from "../components/LastFM";
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

  // Memoize floating particles to prevent regeneration on every render
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
      // Get featured projects and limit to 4
      const featured = projects.filter((p) => p.featured).slice(0, 4);
      setWorkItems(featured);

      // Get recent blog posts and limit to 3
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
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 pb-20 overflow-hidden bg-gradient-to-br from-gray-900/30 via-black to-purple-900/20 -mt-16 pt-16">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles */}
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
                className="inline-flex items-center px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 pulse-glow font-medium"
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

      {/* About Glimpse */}
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

            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Personal intro */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl text-white mb-4 font-light">
                      all about me
                    </h3>
                    <div className="space-y-6">
                      <img
                        src="/images/tame.gif"
                        alt="Profile picture"
                        className="w-32 h-32 rounded-full border-2 border-gray-700"
                      />
                      <p className="text-lg text-gray-300 leading-relaxed">
                        heyo, i'm tame! i'm a 16 year old furry programmer, and
                        musician living in chicago, illinois.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        {(() => {
                          const now = new Date();
                          const chicagoTime = new Date(
                            now.toLocaleString("en-US", {
                              timeZone: "America/Chicago",
                            })
                          );
                          const hour = chicagoTime.getHours();
                          const formattedTime = chicagoTime.toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          );
                          // Sleep status: sleeping between 12am and 7am
                          const status =
                            hour >= 0 && hour < 7
                              ? "i'm probably sleeping"
                              : "i am likely awake";
                          return `it is ${formattedTime} in Chicago, Illinois — ${status}`;
                        })()}
                      </p>
                    </div>
                  </div>

                  {/* Last.fm listening component */}
                  <LastFM className="mt-8" />
                </div>

                {/* Skills preview */}
                <div className="space-y-6">
                  <h3 className="text-2xl text-white mb-4 font-light">
                    things i do
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg text-gray-300 mb-2">
                        vfx & motion
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "adobe after effects",
                          "cinema 4d",
                          "blender",
                          "davinci resolve",
                          "adobe premiere pro",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="text-gray-300 text-sm glass rounded px-3 py-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg text-gray-300 mb-2">
                        music production
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "ableton live",
                          "fl studio",
                          "serum",
                          "mixing & mastering",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="text-gray-300 text-sm glass rounded px-3 py-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg text-gray-300 mb-2">
                        web development
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "html & css",
                          "javascript",
                          "react",
                          "tailwind",
                          "node.js",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="text-gray-300 text-sm glass rounded px-3 py-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg text-gray-300 mb-2">
                        ui/ux design
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["figma", "adobe illustrator"].map((skill) => (
                          <span
                            key={skill}
                            className="text-gray-300 text-sm glass rounded px-3 py-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center space-x-10">
              <div className="group relative">
                <a
                  href="https://github.com/T-am3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700">
                  GitHub
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              <div className="group relative">
                <a
                  href="https://soundcloud.com/tam_3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 208.952 1048.713 581.696"
                  >
                    <path d="M0 686.216c0 13.014 4.718 22.854 14.152 29.524 9.435 6.669 19.52 9.027 30.256 7.076 10.085-1.952 17.161-5.531 21.229-10.736 4.066-5.205 6.1-13.827 6.1-25.864v-141.52c0-10.086-3.497-18.626-10.492-25.62-6.994-6.995-15.534-10.492-25.62-10.492-9.76 0-18.137 3.497-25.132 10.492C3.498 526.07 0 534.61 0 544.696v141.52zm112.24 60.512c0 9.436 3.335 16.511 10.004 21.229 6.67 4.718 15.21 7.076 25.62 7.076 10.736 0 19.438-2.359 26.108-7.076 6.669-4.717 10.004-11.793 10.004-21.229V416.84c0-9.76-3.498-18.138-10.492-25.132-6.995-6.994-15.535-10.492-25.62-10.492-9.76 0-18.138 3.498-25.132 10.492-6.995 6.995-10.492 15.372-10.492 25.132v329.888zm111.752 15.616c0 9.435 3.416 16.511 10.248 21.229 6.832 4.717 15.616 7.076 26.353 7.076 10.41 0 18.95-2.359 25.619-7.076 6.67-4.718 10.005-11.794 10.005-21.229V461.248c0-10.085-3.498-18.707-10.492-25.864-6.995-7.157-15.372-10.735-25.132-10.735-10.086 0-18.707 3.578-25.864 10.735s-10.736 15.779-10.736 25.864v301.096zm112.24 1.464c0 17.894 12.037 26.841 36.112 26.841 24.074 0 36.111-8.947 36.111-26.841v-488c0-27.328-8.296-42.781-24.888-46.36-10.736-2.603-21.31.488-31.72 9.272-10.411 8.784-15.616 21.146-15.616 37.088v488zm114.193 14.152V247.016c0-16.917 5.042-27.002 15.128-30.256 21.797-5.205 43.432-7.808 64.904-7.808 49.775 0 96.136 11.712 139.079 35.136 42.944 23.424 77.674 55.388 104.188 95.892 26.515 40.505 41.887 85.156 46.116 133.957 19.845-8.459 40.991-12.688 63.439-12.688 45.547 0 84.506 16.104 116.876 48.312 32.371 32.209 48.557 70.923 48.557 116.145 0 45.547-16.186 84.424-48.557 116.632-32.37 32.208-71.166 48.312-116.388 48.312l-424.56-.488c-2.929-.976-5.125-2.766-6.589-5.368s-2.193-4.882-2.193-6.834z" />
                  </svg>
                </a>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700">
                  SoundCloud
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              <div className="group relative">
                <a
                  href="https://x.com/_tam3_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700">
                  X
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>

              <div className="group relative">
                <a
                  href="https://youtube.com/@tam3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700">
                  YouTube
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>

              <div className="group relative">
                <a
                  href="https://www.roblox.com/users/225000861/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="20 -5 250 312"
                  >
                    <path id="path20" inkscape:connector-curvature="0" className="st0" d="M120.5,271.7c-110.9-28.6-120-31-119.9-31.5
	C0.7,239.6,62.1,0.5,62.2,0.4c0,0,54,13.8,119.9,30.8s120,30.8,120.1,30.8c0.2,0,0.2,0.4,0.1,0.9c-0.2,1.5-61.5,239.3-61.7,239.5
	C240.6,302.5,186.5,288.7,120.5,271.7z M174.9,158c3.2-12.6,5.9-23.1,6-23.4c0.1-0.5-2.3-1.2-23.2-6.6c-12.8-3.3-23.5-5.9-23.6-5.8
	c-0.3,0.3-12.1,46.6-12,46.7c0.2,0.2,46.7,12.2,46.8,12.1C168.9,180.9,171.6,170.6,174.9,158L174.9,158z"/>
                  </svg>
                </a>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700">
                  Roblox
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>

              <div className="group relative">
                <a
                  href="mailto:tame@tame.wtf"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700">
                  Email
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Work Glimpse */}
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

      {/* Blog Glimpse */}
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
                // Loading skeleton for blog posts
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

                        {/* Blog Content */}
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
