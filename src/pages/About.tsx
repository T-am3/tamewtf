import { ScrollAnimation } from "../components/ScrollAnimation";

export default function About() {
  const skills = {
    vfx: ["after effects", "cinema 4d", "blender", "davinci resolve"],
    music: ["ableton live", "fl studio", "serum", "massive"],
    web: ["html & css", "javascript", "react", "tailwind", "node.js"],
    uiux: ["figma", "adobe illustrator"],
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation>
          <div className="mb-20">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-8 gradient-text">
              about
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-white to-gray-500 mb-12" />
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <ScrollAnimation delay={300}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl text-white mb-6">all about me</h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    heyo, i'm tame! i'm a 16 year old furry programmer, and
                    musician living in chicago, illinois.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
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

                {/* Last.fm listening component */}
                <div className="mt-8 relative rounded-lg overflow-hidden border border-gray-800/50">
                  {/* Blurred background cover art */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 to-gray-800/30 blur-sm"></div>
                  <div className="absolute inset-0 bg-black/60"></div>

                  <div className="relative p-6">
                    <div className="mb-4">
                      <h4 className="text-lg text-white font-light">
                        currently listening
                      </h4>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg flex items-center justify-center border border-gray-600/30">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">
                          loading track...
                        </p>
                        <p className="text-gray-300 text-sm truncate">
                          fetching current song
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl text-white mb-8">things i do</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg text-gray-300 mb-3">vfx & motion</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.vfx.map((tool) => (
                        <span
                          key={tool}
                          className="text-gray-400 text-sm bg-gray-800/30 rounded px-3 py-1"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg text-gray-300 mb-3">
                      music production
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.music.map((tool) => (
                        <span
                          key={tool}
                          className="text-gray-400 text-sm bg-gray-800/30 rounded px-3 py-1"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg text-gray-300 mb-3">
                      web development
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.web.map((tool) => (
                        <span
                          key={tool}
                          className="text-gray-400 text-sm bg-gray-800/30 rounded px-3 py-1"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg text-gray-300 mb-3">ui/ux design</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.uiux.map((tool) => (
                        <span
                          key={tool}
                          className="text-gray-400 text-sm bg-gray-800/30 rounded px-3 py-1"
                        >
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

        <ScrollAnimation delay={400}>
          <div className="mt-12 mb-8">
            <div className="flex items-center justify-center space-x-10">
              <div className="group relative">
                <a
                  href="https://github.com/T-am3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
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
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3.5 17.5c-.4 0-.5-.1-.5-.5v-4.5c0-.4.1-.5.5-.5s.5.1.5.5v4.5c0 .4-.1.5-.5.5zm2-1c-.4 0-.5-.1-.5-.5v-3c0-.4.1-.5.5-.5s.5.1.5.5v3c0 .4-.1.5-.5.5zm2-1.5c-.4 0-.5-.1-.5-.5v-2c0-.4.1-.5.5-.5s.5.1.5.5v2c0 .4-.1.5-.5.5zm2-.5c-.4 0-.5-.1-.5-.5v-3c0-.4.1-.5.5-.5s.5.1.5.5v3c0 .4-.1.5-.5.5zm2 .5c-.4 0-.5-.1-.5-.5v-4c0-.4.1-.5.5-.5s.5.1.5.5v4c0 .4-.1.5-.5.5zm2 1c-.4 0-.5-.1-.5-.5v-6c0-.4.1-.5.5-.5s.5.1.5.5v6c0 .4-.1.5-.5.5zm2 1c-.4 0-.5-.1-.5-.5v-8c0-.4.1-.5.5-.5s.5.1.5.5v8c0 .4-.1.5-.5.5zm2-2c-.4 0-.5-.1-.5-.5v-4c0-.4.1-.5.5-.5s.5.1.5.5v4c0 .4-.1.5-.5.5z" />
                  </svg>
                </a>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700">
                  SoundCloud
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>

              <div className="group relative">
                <a
                  href="https://x.com/_Tam3_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700">
                  Twitter
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>

              <div className="group relative">
                <a
                  href="https://youtube.com/@tam3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
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
                  href="mailto:tame@tame.wtf"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
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
        </ScrollAnimation>

        <ScrollAnimation delay={500}>
          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-3xl text-white mb-12">experience</h2>
            <div className="space-y-6">
              <div className="glass rounded-lg p-8 hover-lift">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg text-white">RoPro Extension</h4>
                  <span className="text-gray-400 text-sm">2023 - present</span>
                </div>
                <p className="text-gray-400 mb-4">
                  a browser extension for roblox that adds tons of new features
                  to the website. building assets for the extension, as well as
                  managing the website and social media.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "ui design",
                    "vfx",
                    "community management",
                    "moderation",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-gray-400 text-sm bg-gray-800/30 rounded px-3 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
