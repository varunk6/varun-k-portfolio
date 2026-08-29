import { useMemo, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import projects, { filterCategories } from "../data/projects";

export default function Projects() {
  const [filter, setFilter] = useState("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (filter === "ALL") return projects;
    return projects.filter((p) => p.categories.includes(filter));
  }, [filter]);

  // Safely clamp or reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  }, [filteredProjects.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  }, [filteredProjects.length]);

  // Keyboard navigation for desktop carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          activeEl.isContentEditable);

      if (isInput) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0];
  const prevProject =
    filteredProjects[currentIndex - 1] ||
    (currentIndex === 0 ? filteredProjects[filteredProjects.length - 1] : null);
  const nextProject =
    filteredProjects[currentIndex + 1] ||
    (currentIndex === filteredProjects.length - 1 ? filteredProjects[0] : null);

  return (
    <section id="projects" className="relative py-20 sm:py-28 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
          <SectionHeading
            number="02"
            label="SELECTED WORK"
            title="My"
            accent="Works"
            subtitle="A selection of applications, systems and experiments I've built."
          />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border-soft font-mono text-xs sm:text-sm text-ink-soft whitespace-nowrap shadow-sm">
            <span className="font-bold text-orange text-base sm:text-lg">
              {filteredProjects.length}+
            </span>
            <span>PROJECTS</span>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-cursor-hover
              type="button"
              className={`text-xs font-mono tracking-wide px-4 py-2 rounded-full border transition-all ${
                filter === cat
                  ? "bg-orange text-bg border-orange font-semibold shadow-[0_0_20px_rgba(255,122,51,0.3)]"
                  : "border-border-soft bg-surface/60 text-ink-muted hover:text-ink hover:border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* DESKTOP STACKED CAROUSEL SHOWCASE */}
        <div className="hidden md:block relative my-4">
          <div className="relative min-h-[460px] lg:min-h-[500px] flex items-center justify-center overflow-visible px-4">
            {/* Peek Previous Card */}
            {prevProject && filteredProjects.length > 1 && (
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[65%] lg:w-[70%] pointer-events-auto transform -translate-x-1/4 opacity-40 hover:opacity-70 transition-opacity z-10"
                onClick={handlePrev}
              >
                <ProjectCard
                  project={prevProject}
                  index={projects.findIndex((p) => p.id === prevProject.id)}
                  total={filteredProjects.length}
                  onOpen={setActiveProject}
                  isActive={false}
                  isPrev={true}
                  onClickPeek={handlePrev}
                />
              </div>
            )}

            {/* Current Active Featured Project */}
            {currentProject && (
              <div className="relative z-30 w-full max-w-4xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <ProjectCard
                      project={currentProject}
                      index={projects.findIndex((p) => p.id === currentProject.id)}
                      total={filteredProjects.length}
                      onOpen={setActiveProject}
                      isActive={true}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Peek Next Card */}
            {nextProject && filteredProjects.length > 1 && (
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[65%] lg:w-[70%] pointer-events-auto transform translate-x-1/4 opacity-40 hover:opacity-70 transition-opacity z-10"
                onClick={handleNext}
              >
                <ProjectCard
                  project={nextProject}
                  index={projects.findIndex((p) => p.id === nextProject.id)}
                  total={filteredProjects.length}
                  onOpen={setActiveProject}
                  isActive={false}
                  isNext={true}
                  onClickPeek={handleNext}
                />
              </div>
            )}
          </div>

          {/* Desktop Navigation Controls & Progress Indicator */}
          {filteredProjects.length > 1 && (
            <div className="mt-8 flex items-center justify-between max-w-4xl mx-auto px-2">
              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  data-cursor-hover
                  aria-label="Previous project"
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-border-soft bg-surface text-ink-soft hover:text-orange hover:border-orange/50 transition-all shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  data-cursor-hover
                  aria-label="Next project"
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-border-soft bg-surface text-ink-soft hover:text-orange hover:border-orange/50 transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Progress Indicator: Dots & Number Counter */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  {filteredProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      data-cursor-hover
                      aria-label={`Go to project ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentIndex === idx
                          ? "w-8 bg-orange shadow-[0_0_10px_rgba(255,122,51,0.5)]"
                          : "w-2.5 bg-border-soft hover:bg-ink-muted"
                      }`}
                    />
                  ))}
                </div>

                <span className="font-mono text-sm font-semibold tracking-wider text-ink-muted">
                  <span className="text-orange">{String(currentIndex + 1).padStart(2, "0")}</span>
                  {" / "}
                  <span>{String(filteredProjects.length).padStart(2, "0")}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE VERTICAL CARD STACK LAYOUT */}
        <div className="md:hidden space-y-5">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={projects.findIndex((p) => p.id === project.id)}
              total={filteredProjects.length}
              onOpen={setActiveProject}
              isMobile={true}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-ink-muted text-center py-16">
            No projects in this category yet.
          </p>
        )}
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
