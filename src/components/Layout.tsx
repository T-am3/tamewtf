import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/about", label: "about" },
    { path: "/work", label: "projects" },
    { path: "/blog", label: "blog" },
    { path: "/contact", label: "contact" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50">
          <div
            className="h-full bg-white animate-pulse"
            style={{ width: "100%" }}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/90 backdrop-blur-lg border-b border-gray-700/30 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl text-white hover:text-gray-300 transition-colors font-bold tracking-tight"
            >
              tame.wtf
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                    location.pathname === path
                      ? "text-white bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                  {location.pathname === path && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-white rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center space-y-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/95 backdrop-blur-xl border-t border-gray-700/30">
            <div className="px-6 py-6 space-y-1">
              {navLinks.map(({ path, label }, index) => (
                <Link
                  key={path}
                  to={path}
                  className={`group block py-4 px-5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    location.pathname === path
                      ? "text-white bg-gradient-to-r from-white/20 to-gray-400/10 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  style={{
                    animationDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                    animation: isMenuOpen
                      ? "slideInFromRight 0.4s ease-out forwards"
                      : "none",
                  }}
                >
                  <span className="relative z-10 font-medium text-lg">
                    {label}
                  </span>
                  {location.pathname === path && (
                    <span className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-white to-gray-400 rounded-r-full transform -translate-y-1/2" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-16 min-h-screen">
        <div
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          <Outlet />
        </div>
      </main>

      {/* Scroll to top button */}
      {scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-30"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-medium mb-4">connect</h3>
              <div className="space-y-2">
                <a
                  href="mailto:hello@tame.wtf"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  hello@tame.wtf
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">quick links</h3>
              <div className="space-y-2">
                <Link
                  to="/work"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  projects
                </Link>
                <Link
                  to="/blog"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  blog
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">site</h3>
              <div className="space-y-2">
                <Link
                  to="/about"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  about
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  contact
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">© 2025 tame.</p>
              <div className="flex items-center space-x-2 mt-1 md:mt-0">
                <span className="text-gray-600 text-xs">build</span>
                <code className="bg-gray-800/50 text-gray-400 px-2 py-1 rounded text-xs font-mono border border-gray-700/50 hover:border-gray-600/50 transition-colors">
                  {__GIT_HASH__}
                </code>
              </div>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
