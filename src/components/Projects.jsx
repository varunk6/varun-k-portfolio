import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import projects, { filterCategories } from "../data/projects";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 320, damping: 32 },
      opacity: { duration: 0.28 },
      scale: { duration: 0.28 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: "spring", stiffness: 320, damping: 32 },
      opacity: { duration: 0.22 },
      scale: { duration: 0.22 },
    },
  }),
};

export default function Projects({
  activeProject: externalActiveProject,
  onOpen: externalOnOpen,
  onOpenLightbox,
}) {
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [internalActiveProject, setInternalActiveProject] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Touch Swipe tracking
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const showcaseRef = useRef(null);

  const activeProject = externalActiveProject !== undefined ? externalActiveProject : internalActiveProject;
  const handleOpen = externalOnOpen || setInternalActiveProject;

  // Filtered projects list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = filter === "ALL" || p.categories.includes(filter);
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTech = p.technologies.some((t) => t.toLowerCase().includes(q));
      const matchCat = p.category.toLowerCase().includes(q);
      const matchFeatures = p.features.some((f) => f.toLowerCase().includes(q));
      const matchStatus = p.status ? p.status.toLowerCase().includes(q) : false;

      return matchTitle || matchDesc || matchTech || matchCat || matchFeatures || matchStatus;
    });
  }, [filter, searchQuery]);

  // Reset index when filter or search changes
  useEffect(() => {
    setCurrentIndex(0);
    setDirection(1);
  }, [filter, searchQuery]);

  // Reduced motion detection
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Handlers for next / prev navigation
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  }, [filteredProjects.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  }, [filteredProjects.length]);

  const handleJump = useCallback(
    (index) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // AUTOMATIC HORIZONTAL PROJECT MOVEMENT (5.5s interval)
  // Pauses on hover, touch, modal open, or reduced motion preference
  const isAutoPlayActive =
    !isHovered &&
    !userInteracted &&
    !prefersReducedMotion &&
    !activeProject &&
    filteredProjects.length > 1;

  useEffect(() => {
    if (!isAutoPlayActive) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
    }, 5500);

    return () => clearInterval(timer);
  }, [isAutoPlayActive, filteredProjects.length]);

  // Resume auto play after temporary manual interaction
  useEffect(() => {
    if (!userInteracted) return;
    const timeout = setTimeout(() => setUserInteracted(false), 9000);
    return () => clearTimeout(timeout);
  }, [userInteracted, currentIndex]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          activeEl.isContentEditable);

      if (isInput || activeProject) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setUserInteracted(true);
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setUserInteracted(true);
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, activeProject]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    const deltaX = touchEndX.current - touchStartX.current;
    if (deltaX > 45) {
      setUserInteracted(true);
      handlePrev();
    } else if (deltaX < -45) {
      setUserInteracted(true);
      handleNext();
    }
  };

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0];
  const prevProject =
    filteredProjects[currentIndex - 1] ||
    (currentIndex === 0 ? filteredProjects[filteredProjects.length - 1] : null);
  const nextProject =
    filteredProjects[currentIndex + 1] ||
    (currentIndex === filteredProjects.length - 1 ? filteredProjects[0] : null);

  return (
    <section id="projects" className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <SectionHeading
            number="02"
            label="SELECTED WORK"
            title="Featured"
            accent="Projects"
            subtitle="Explore high-impact web apps, practical systems, and machine-learning projects."
          />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border-soft font-mono text-xs sm:text-sm text-ink-soft whitespace-nowrap shadow-sm">
            <span className="font-bold text-orange text-base sm:text-lg">
              {filteredProjects.length}
            </span>
            <span>{filteredProjects.length === 1 ? "PROJECT" : "PROJECTS"}</span>
          </div>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 md:mb-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setUserInteracted(true);
                }}
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

          {/* Real-time Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <div className="relative flex items-center">
              <Search
                size={16}
                className="absolute left-3.5 text-ink-muted pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                placeholder="Search projects (React, Python...)..."
                className="w-full bg-surface border border-border-soft rounded-full pl-9 pr-9 py-2 text-xs font-mono text-ink placeholder:text-ink-muted focus:border-orange focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 text-ink-muted hover:text-orange transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SHOWCASE CAROUSEL CONTAINER */}
        {filteredProjects.length > 0 ? (
          <div
            ref={showcaseRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative"
          >
            {/* DESKTOP VIEWPORT WITH PEEK CARDS */}
            <div className="hidden md:block relative my-4">
              <div className="relative min-h-[500px] lg:min-h-[530px] flex items-center justify-center overflow-visible px-4">
                {/* Peek Previous Card */}
                {prevProject && filteredProjects.length > 1 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[65%] lg:w-[70%] pointer-events-auto transform -translate-x-1/4 opacity-35 hover:opacity-75 transition-opacity z-10"
                    onClick={() => {
                      setUserInteracted(true);
                      handlePrev();
                    }}
                  >
                    <ProjectCard
                      project={prevProject}
                      index={projects.findIndex((p) => p.id === prevProject.id)}
                      _total={filteredProjects.length}
                      onOpen={handleOpen}
                      onOpenLightbox={onOpenLightbox}
                      isActive={false}
                      isPrev={true}
                      onClickPeek={() => {
                        setUserInteracted(true);
                        handlePrev();
                      }}
                    />
                  </div>
                )}

                {/* Current Active Featured Project */}
                {currentProject && (
                  <div className="relative z-30 w-full max-w-4xl">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentProject.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        <ProjectCard
                          project={currentProject}
                          index={projects.findIndex((p) => p.id === currentProject.id)}
                          _total={filteredProjects.length}
                          onOpen={handleOpen}
                          onOpenLightbox={onOpenLightbox}
                          isActive={true}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}

                {/* Peek Next Card */}
                {nextProject && filteredProjects.length > 1 && (
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[65%] lg:w-[70%] pointer-events-auto transform translate-x-1/4 opacity-35 hover:opacity-75 transition-opacity z-10"
                    onClick={() => {
                      setUserInteracted(true);
                      handleNext();
                    }}
                  >
                    <ProjectCard
                      project={nextProject}
                      index={projects.findIndex((p) => p.id === nextProject.id)}
                      _total={filteredProjects.length}
                      onOpen={handleOpen}
                      onOpenLightbox={onOpenLightbox}
                      isActive={false}
                      isNext={true}
                      onClickPeek={() => {
                        setUserInteracted(true);
                        handleNext();
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE VIEWPORT WITH TOUCH HORIZONTAL SLIDER */}
            <div className="md:hidden relative my-2">
              {currentProject && (
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentProject.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <ProjectCard
                      project={currentProject}
                      index={projects.findIndex((p) => p.id === currentProject.id)}
                      _total={filteredProjects.length}
                      onOpen={handleOpen}
                      onOpenLightbox={onOpenLightbox}
                      isMobile={true}
                    />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* NAVIGATION CONTROLS & PROGRESS INDICATORS ROW */}
            {filteredProjects.length > 1 && (
              <div className="mt-8 flex items-center justify-between max-w-4xl mx-auto px-2">
                {/* Prev / Next Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setUserInteracted(true);
                      handlePrev();
                    }}
                    data-cursor-hover
                    aria-label="Previous project"
                    className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border-soft bg-surface text-ink-soft hover:text-orange hover:border-orange/50 transition-all shadow-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUserInteracted(true);
                      handleNext();
                    }}
                    data-cursor-hover
                    aria-label="Next project"
                    className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border-soft bg-surface text-ink-soft hover:text-orange hover:border-orange/50 transition-all shadow-sm"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Auto-movement status badge */}
                  <span
                    className={`hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full border ${
                      isAutoPlayActive
                        ? "bg-orange-soft/60 border-orange/20 text-orange"
                        : "bg-surface-2 border-border-soft text-ink-muted"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isAutoPlayActive ? "bg-orange animate-pulse" : "bg-ink-muted"
                      }`}
                    />
                    <span>{isAutoPlayActive ? "Auto Slide" : "Paused"}</span>
                  </span>
                </div>

                {/* Progress Indicators: Dot Pills & Numeric Counter */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-1.5">
                    {filteredProjects.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setUserInteracted(true);
                          handleJump(idx);
                        }}
                        data-cursor-hover
                        aria-label={`Go to project ${idx + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          currentIndex === idx
                            ? "w-7 sm:w-8 bg-orange shadow-[0_0_10px_rgba(255,122,51,0.5)]"
                            : "w-2 sm:w-2.5 bg-border-soft hover:bg-ink-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-ink-muted">
                    <span className="text-orange">{String(currentIndex + 1).padStart(2, "0")}</span>
                    {" / "}
                    <span>{String(filteredProjects.length).padStart(2, "0")}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl border border-border-soft bg-surface">
            <p className="font-display font-medium text-lg text-ink mb-2">
              No projects found matching "{searchQuery}"
            </p>
            <p className="text-xs text-ink-soft mb-6">
              Try searching for technologies like React, Python, Node.js, Android, or clear your query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilter("ALL");
              }}
              className="inline-flex items-center gap-2 text-xs font-mono text-orange border border-orange/40 bg-orange-soft px-4 py-2 rounded-full hover:bg-orange/20 transition-colors"
            >
              Clear Search & Filters
            </button>
          </div>
        )}
      </div>

      {externalActiveProject === undefined && (
        <ProjectModal project={internalActiveProject} onClose={() => setInternalActiveProject(null)} />
      )}
    </section>
  );
}
