import AboutContent from "../components/AboutContent";
import { ScrollAnimation } from "../components/ScrollAnimation";

export default function About() {
  return (
    <>
      <ScrollAnimation>
        <div className="py-15 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-light text-white mb-8">
                about
              </h1>
              <div className="w-20 h-1 bg-white mb-12" />
            </div>
          </div>
        </div>
      </ScrollAnimation>

      <AboutContent />
      <ScrollAnimation delay={500}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="border-t border-gray-800 pt-8">
            <h2 className="text-3xl text-white mb-12">experience</h2>
            <div className="space-y-6">
              <div className="glass rounded-lg p-8 hover-lift">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg text-white">RoPro Extension</h4>
                  <span className="text-gray-300 text-sm">2023 - present</span>
                </div>
                <p className="text-gray-300 mb-4">
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
      </ScrollAnimation>
    </>
  );
}
