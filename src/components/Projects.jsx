import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import projects, { filterCategories } from "../data/projects";

export default function Projects({
  activeProject: externalActiveProject,
  onOpen: externalOnOpen,
  onOpenLightbox,
}) {
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [internalActiveProject, setInternalActiveProject] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Touch swipe tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchDeltaX = useRef(0);
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
      const matchFeatures = p.features ? p.features.some((f) => f.toLowerCase().includes(q)) : false;
      const matchStatus = p.status ? p.status.toLowerCase().includes(q) : false;

      return matchTitle || matchDesc || matchTech || matchCat || matchFeatures || matchStatus;
    });
  }, [filter, searchQuery]);

  // Reset index safely when filter or search changes
  useEffect(() => {
    setCurrentIndex(0);
    setDirection(1);
  }, [filter, searchQuery]);

  // Safe current index clamped to filtered length
  const safeIndex = Math.min(currentIndex, Math.max(0, filteredProjects.length - 1));

  // Viewport resize tracking
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tab visibility detection
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Reduced motion detection
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Navigation handlers
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
      setDirection(index > safeIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [safeIndex]
  );

  // Automatic horizontal movement (4.5s interval)
  const isAutoPlayActive =
    !isHovered &&
    !isFocused &&
    !userInteracted &&
    !prefersReducedMotion &&
    !activeProject &&
    isTabVisible &&
    filteredProjects.length > 1;

  useEffect(() => {
    if (!isAutoPlayActive) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlayActive, filteredProjects.length]);

  // Temporary pause reset after manual user interaction
  useEffect(() => {
    if (!userInteracted) return;
    const timeout = setTimeout(() => setUserInteracted(false), 7000);
    return () => clearTimeout(timeout);
  }, [userInteracted, safeIndex]);

  const currentProject = filteredProjects[safeIndex] || filteredProjects[0];

  // Keyboard navigation: Left/Right Arrow, Enter/Space
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
      } else if (e.key === "Enter" || e.key === " ") {
        if (activeEl && (activeEl.tagName === "BUTTON" || activeEl.tagName === "A")) {
          return;
        }
        if (currentProject) {
          e.preventDefault();
          handleOpen(currentProject);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, activeProject, currentProject, handleOpen]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchDeltaX.current = 0;
    setIsHovered(true);
  };

  const handleTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    const deltaX = touchDeltaX.current;
    if (Math.abs(deltaX) > 40) {
      setUserInteracted(true);
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Circular relative offset calculation
  const getRelativeOffset = useCallback(
    (index) => {
      const total = filteredProjects.length;
      if (total <= 1) return 0;
      let diff = index - safeIndex;
      while (diff > total / 2) diff -= total;
      while (diff < -total / 2) diff += total;
      return diff;
    },
    [filteredProjects.length, safeIndex]
  );

  // Responsive values for compact cinematic layout
  const { xOffset, rotateY, rotateZ, sideScale, sideOpacity } = useMemo(() => {
    if (viewportWidth >= 1200) {
      return { xOffset: 330, rotateY: 10, rotateZ: 5, sideScale: 0.84, sideOpacity: 0.40 };
    }
    if (viewportWidth >= 768) {
      return { xOffset: 250, rotateY: 8, rotateZ: 4, sideScale: 0.84, sideOpacity: 0.40 };
    }
    if (viewportWidth >= 480) {
      return { xOffset: 130, rotateY: 6, rotateZ: 3, sideScale: 0.86, sideOpacity: 0.30 };
    }
    return { xOffset: 95, rotateY: 5, rotateZ: 2, sideScale: 0.88, sideOpacity: 0.25 };
  }, [viewportWidth]);

  // Spring transition config
  const springTransition = prefersReducedMotion
    ? { duration: 0.25, ease: "easeOut" }
    : {
        type: "spring",
        stiffness: 280,
        damping: 28,
        mass: 0.88,
      };

  // Card motion styles based on relative offset
  const getCardStyle = useCallback(
    (offset) => {
      if (prefersReducedMotion) {
        if (offset === 0) {
          return { x: 0, scale: 1, opacity: 1, rotateY: 0, rotateZ: 0, zIndex: 10, filter: "blur(0px)" };
        }
        if (offset === -1) {
          return { x: -30, scale: 0.95, opacity: 0.2, rotateY: 0, rotateZ: 0, zIndex: 5, filter: "blur(0px)" };
        }
        if (offset === 1) {
          return { x: 30, scale: 0.95, opacity: 0.2, rotateY: 0, rotateZ: 0, zIndex: 5, filter: "blur(0px)" };
        }
        return { x: 0, scale: 0.9, opacity: 0, rotateY: 0, rotateZ: 0, zIndex: 1, filter: "blur(0px)" };
      }

      if (offset === 0) {
        return {
          x: 0,
          scale: 1,
          opacity: 1,
          rotateY: 0,
          rotateZ: 0,
          zIndex: 10,
          filter: "blur(0px)",
        };
      } else if (offset === -1) {
        return {
          x: -xOffset,
          scale: sideScale,
          opacity: sideOpacity,
          rotateY: rotateY,
          rotateZ: -rotateZ,
          zIndex: 5,
          filter: "blur(1.2px)",
        };
      } else if (offset === 1) {
        return {
          x: xOffset,
          scale: sideScale,
          opacity: sideOpacity,
          rotateY: -rotateY,
          rotateZ: rotateZ,
          zIndex: 5,
          filter: "blur(1.2px)",
        };
      } else if (offset < -1) {
        return {
          x: -xOffset * 1.55,
          scale: sideScale * 0.85,
          opacity: 0,
          rotateY: rotateY * 1.2,
          rotateZ: -rotateZ * 1.3,
          zIndex: 1,
          filter: "blur(3px)",
        };
      } else {
        return {
          x: xOffset * 1.55,
          scale: sideScale * 0.85,
          opacity: 0,
          rotateY: -rotateY * 1.2,
          rotateZ: rotateZ * 1.3,
          zIndex: 1,
          filter: "blur(3px)",
        };
      }
    },
    [prefersReducedMotion, xOffset, rotateY, rotateZ, sideScale, sideOpacity]
  );

  // Result count label
  const resultCountLabel = useMemo(() => {
    const isFiltered = filter !== "ALL" || searchQuery.trim().length > 0;
    const count = filteredProjects.length;
    if (isFiltered) {
      return `${count} ${count === 1 ? "project found" : "projects found"}`;
    }
    return `${count} projects`;
  }, [filter, searchQuery, filteredProjects.length]);

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 md:py-24 pb-24 md:pb-28 overflow-hidden"
    >
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
            <span className="uppercase">{resultCountLabel}</span>
          </div>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
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

        {/* COMPACT CINEMATIC CAROUSEL CONTAINER */}
        {filteredProjects.length > 0 ? (
          <div
            ref={showcaseRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocusCapture={() => setIsFocused(true)}
            onBlurCapture={() => setIsFocused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative py-4"
          >
            {/* Soft Ambient Spotlight Behind Active Card */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,122,51,0.08)_0%,transparent_70%)] pointer-events-none blur-2xl"
              aria-hidden="true"
            />

            {/* Elegant Side Navigation Arrows (Positioned comfortably away from cards) */}
            {filteredProjects.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setUserInteracted(true);
                    handlePrev();
                  }}
                  data-cursor-hover
                  aria-label="Previous project"
                  className="absolute left-2 sm:left-6 md:left-10 lg:left-14 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border-soft bg-surface/90 backdrop-blur-md text-ink-soft hover:text-orange hover:border-orange/50 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-orange"
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
                  className="absolute right-2 sm:right-6 md:right-10 lg:right-14 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border-soft bg-surface/90 backdrop-blur-md text-ink-soft hover:text-orange hover:border-orange/50 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-orange"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Viewport with 3D Perspective */}
            <div
              className="relative w-full my-2 select-none overflow-hidden md:overflow-visible"
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Invisible Layout Spacer establishing compact container height */}
              {currentProject && (
                <div
                  className="invisible pointer-events-none w-full max-w-[340px] sm:max-w-[350px] md:max-w-[360px] mx-auto px-2"
                  aria-hidden="true"
                >
                  <ProjectCard
                    project={currentProject}
                    index={projects.findIndex((p) => p.id === currentProject.id)}
                    _total={filteredProjects.length}
                    onOpen={() => {}}
                    isActive={true}
                    isSpacer={true}
                  />
                </div>
              )}

              {/* 3D Layered Carousel Deck */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ transformStyle: "preserve-3d" }}
              >
                {filteredProjects.map((project, idx) => {
                  const offset = getRelativeOffset(idx);
                  const isVisible = Math.abs(offset) <= 2;
                  const isCurrent = offset === 0;
                  const isPrev = offset === -1;
                  const isNext = offset === 1;

                  return (
                    <motion.div
                      key={project.id}
                      initial={false}
                      animate={getCardStyle(offset)}
                      transition={springTransition}
                      drag={isCurrent && filteredProjects.length > 1 && !prefersReducedMotion ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.25}
                      onDragEnd={(_e, info) => {
                        const swipeThreshold = 40;
                        const velocityThreshold = 250;
                        if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                          setUserInteracted(true);
                          handleNext();
                        } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                          setUserInteracted(true);
                          handlePrev();
                        }
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        display: Math.abs(offset) > 2 ? "none" : "block",
                      }}
                      className={`absolute top-0 left-0 right-0 mx-auto w-full max-w-[340px] sm:max-w-[350px] md:max-w-[360px] px-2 ${
                        isCurrent
                          ? "pointer-events-auto cursor-pointer"
                          : isVisible
                          ? "pointer-events-auto cursor-pointer"
                          : "pointer-events-none"
                      }`}
                      onClick={() => {
                        if (isPrev) {
                          setUserInteracted(true);
                          handlePrev();
                        } else if (isNext) {
                          setUserInteracted(true);
                          handleNext();
                        }
                      }}
                    >
                      <ProjectCard
                        project={project}
                        index={projects.findIndex((p) => p.id === project.id)}
                        _total={filteredProjects.length}
                        onOpen={handleOpen}
                        onOpenLightbox={onOpenLightbox}
                        isActive={isCurrent}
                        isPrev={isPrev}
                        isNext={isNext}
                        onClickPeek={() => {
                          setUserInteracted(true);
                          if (isPrev) handlePrev();
                          if (isNext) handleNext();
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* PAGINATION & STATUS INDICATORS ROW */}
            {filteredProjects.length > 1 && (
              <div className="mt-6 flex flex-col items-center gap-3">
                {/* Small Elegant Dots */}
                <div className="flex items-center gap-2">
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
                      className={`h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange ${
                        safeIndex === idx
                          ? "w-6 bg-orange shadow-[0_0_8px_rgba(255,122,51,0.5)]"
                          : "w-2 bg-border-soft hover:bg-ink-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Numeric Counter & Autoplay Badge */}
                <div className="flex items-center gap-3 font-mono text-xs text-ink-muted select-none">
                  <span className="font-semibold tracking-wider">
                    <span className="text-orange">{String(safeIndex + 1).padStart(2, "0")}</span>
                    {" / "}
                    <span>{String(filteredProjects.length).padStart(2, "0")}</span>
                  </span>
                  <span
                    className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full border ${
                      isAutoPlayActive
                        ? "bg-orange-soft border-orange/30 text-orange"
                        : "bg-surface-2 border-border-soft text-ink-muted"
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${
                        isAutoPlayActive ? "bg-orange animate-pulse" : "bg-ink-muted"
                      }`}
                    />
                    <span>{isAutoPlayActive ? "Auto Slide" : "Paused"}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-3xl border border-border-soft bg-surface my-6">
            <div className="w-12 h-12 rounded-full bg-orange-soft border border-orange/30 text-orange flex items-center justify-center mx-auto mb-4">
              <Search size={20} />
            </div>
            <p className="font-display font-medium text-lg text-ink mb-1.5">
              No projects found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs text-ink-soft mb-6 max-w-md mx-auto leading-relaxed">
              Try searching for technologies like React, Python, Node.js, Android, or clear your query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilter("ALL");
              }}
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-orange border border-orange/40 bg-orange-soft px-5 py-2.5 rounded-full hover:bg-orange/20 transition-colors"
            >
              Clear Search &amp; Filters
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
