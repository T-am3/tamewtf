import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "../components/ScrollAnimation";
import {
  getAllProjects,
  getAllProjectTags,
  type Project,
} from "../utils/markdown";

export default function Work() {
  const [selectedTag, setSelectedTag] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setError(null);
        const [projectsData, tags] = await Promise.all([
          getAllProjects(),
          getAllProjectTags(),
        ]);

        if (projectsData.length === 0) {
          setError("No projects found");
        } else {
          setProjects(projectsData);
          setAvailableTags(tags);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects =
    selectedTag === "all"
      ? projects
      : projects.filter(
          (project: Project) =>
            project.tags && project.tags.includes(selectedTag)
        );

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation>
          <div className="mb-20">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-8 gradient-text">
              projects
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-white to-gray-500 mb-8" />
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              a collection of random experiments, side projects, and creative
              ideas i've been working on. some work, some don't, but all were
              fun to build.
            </p>
          </div>
        </ScrollAnimation>

        {/* Filter Navigation */}
        <ScrollAnimation delay={200}>
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              <button
                key="all"
                onClick={() => setSelectedTag("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === "all"
                    ? "bg-white text-black"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
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
                      ? "bg-white text-black"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Error State */}
        {error && !loading && (
          <ScrollAnimation delay={300}>
            <div className="text-center py-12">
              <div className="glass rounded-xl p-8 border border-red-500/20">
                <h3 className="text-xl text-white mb-4">
                  oops, something went wrong
                </h3>
                <p className="text-gray-400 mb-6">{error}</p>
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
        {!loading &&
          !error &&
          filteredProjects.length === 0 &&
          projects.length > 0 && (
            <ScrollAnimation delay={300}>
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
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
                <p className="text-gray-400">
                  try selecting a different category
                </p>
              </div>
            </ScrollAnimation>
          )}

        {/* All Projects Grid */}
        {!loading && !error && filteredProjects.length > 0 && (
          <ScrollAnimation delay={300}>
            <section>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <ScrollAnimation key={project.id} delay={300 + index * 100}>
                    <article className="group">
                      <Link
                        to={`/work/${project.slug}`}
                        className="block glass rounded-xl hover-lift transition-all duration-500 border border-gray-800/50 hover:border-gray-600/50 overflow-hidden"
                      >
                        {/* Project Image */}
                        <div className="aspect-video bg-gray-900 relative overflow-hidden">
                          {project.previewImage ? (
                            <img
                              src={project.previewImage}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                              <span className="text-gray-600 text-sm">
                                preview
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Project Content */}
                        <div className="p-6">
                          <h2 className="text-lg font-light text-white group-hover:text-gray-200 transition-colors mb-2">
                            {project.title}
                          </h2>

                          {project.year && (
                            <time className="text-gray-500 text-xs mb-3 block">
                              {project.year}
                            </time>
                          )}

                          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors mb-4 line-clamp-3">
                            {project.description}
                          </p>

                          <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
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
                    </article>
                  </ScrollAnimation>
                ))}
              </div>
            </section>
          </ScrollAnimation>
        )}

        {/* Loading State */}
        {loading && (
          <ScrollAnimation delay={300}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass rounded-xl border border-gray-800/50 overflow-hidden"
                >
                  <div className="animate-pulse">
                    <div className="aspect-video bg-gray-700"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-3/4 h-5 bg-gray-700 rounded"></div>
                        <div className="w-12 h-4 bg-gray-700 rounded"></div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="w-full h-4 bg-gray-700 rounded"></div>
                        <div className="w-2/3 h-4 bg-gray-700 rounded"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-16 h-5 bg-gray-700 rounded"></div>
                        <div className="w-20 h-5 bg-gray-700 rounded"></div>
                        <div className="w-14 h-5 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        )}
      </div>
    </div>
  );
}
