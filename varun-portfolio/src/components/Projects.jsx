import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import projects, { filterCategories } from "../data/projects";

export default function Projects() {
  const [filter, setFilter] = useState("ALL");
  const [activeProject, setActiveProject] = useState(null);

  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const rest = useMemo(() => projects.filter((p) => !p.featured), []);

  const filteredRest = useMemo(() => {
    if (filter === "ALL") return rest;
    return rest.filter((p) => p.categories.includes(filter));
  }, [filter, rest]);

  const filteredFeatured = useMemo(() => {
    if (filter === "ALL") return featured;
    return featured.filter((p) => p.categories.includes(filter));
  }, [filter, featured]);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
          <SectionHeading
            number="02"
            label="Selected Projects"
            title="My"
            accent="Works"
            subtitle="A collection of practical applications and systems I've built."
          />
          <span className="font-mono text-sm text-ink-muted whitespace-nowrap">
            {projects.length} Projects
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-14 md:mb-16">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-cursor-hover
              className={`text-xs font-mono tracking-wide px-4 py-2 rounded-full border transition-colors ${
                filter === cat
                  ? "bg-orange text-bg border-orange"
                  : "border-border-soft text-ink-muted hover:text-ink hover:border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured projects — alternating layout */}
        <div className="flex flex-col gap-20 md:gap-28 mb-20 md:mb-28">
          <AnimatePresence mode="popLayout">
            {filteredFeatured.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={projects.findIndex((p) => p.id === project.id)}
                onOpen={setActiveProject}
                reverse={i % 2 === 1}
                featured
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Secondary project grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredRest.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={projects.findIndex((p) => p.id === project.id)}
                onOpen={setActiveProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredFeatured.length === 0 && filteredRest.length === 0 && (
          <p className="text-ink-muted text-center py-16">
            No projects in this category yet.
          </p>
        )}
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
