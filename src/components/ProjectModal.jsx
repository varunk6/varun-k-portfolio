import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Check, Info, UserCheck, AlertCircle, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GithubMark } from "./BrandIcons";
import ProjectMockup from "./ProjectMockup";
import ImageLightboxModal from "./ImageLightboxModal";

export default function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reset active image index when project changes
  useEffect(() => {
    setActiveImgIndex(0);
    setIsLightboxOpen(false);
  }, [project]);

  // Extract valid screenshot list
  const screenshots = useMemoScreenshots(project);

  const handlePrevImg = useCallback(() => {
    if (screenshots.length <= 1) return;
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  }, [screenshots.length]);

  const handleNextImg = useCallback(() => {
    if (screenshots.length <= 1) return;
    setActiveImgIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
  }, [screenshots.length]);

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (isLightboxOpen) return; // Lightbox modal handles keypresses when open
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevImg();
      } else if (e.key === "ArrowRight") {
        handleNextImg();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, isLightboxOpen, handlePrevImg, handleNextImg]);

  if (!project) return null;

  const hasLiveLink = Boolean(project.live && project.live !== "#");
  const hasGithubLink = Boolean(project.github && project.github !== "#");

  const currentScreenshot = screenshots[activeImgIndex] || project.image;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-surface border border-border-soft w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-y-auto no-scrollbar shadow-2xl"
          >
            {/* Close Button sticky */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close project details"
              data-cursor-hover
              className="sticky top-4 float-right mr-4 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-bg/80 border border-border-soft text-ink hover:text-orange hover:border-orange/40 transition-colors shadow-md"
            >
              <X size={18} />
            </button>

            {/* SCREENSHOT GALLERY / MOCKUP CONTAINER */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-surface-2 overflow-hidden rounded-t-3xl group/gallery">
              {currentScreenshot ? (
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  data-cursor-hover
                  className="w-full h-full cursor-pointer relative flex items-center justify-center overflow-hidden bg-black/40"
                >
                  <img
                    src={currentScreenshot}
                    alt={`${project.title} screenshot ${activeImgIndex + 1}`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover/gallery:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-0 group-hover/gallery:opacity-100 transition-opacity flex items-end justify-between p-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-orange bg-bg/90 px-3 py-1 rounded-full border border-orange/30 shadow-md">
                      <Maximize2 size={12} />
                      Click to expand fullscreen
                    </span>
                  </div>
                </div>
              ) : (
                <ProjectMockup type={project.mockup} image={project.image} title={project.title} />
              )}

              {/* Gallery Navigation Controls (when multiple screenshots exist) */}
              {screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImg();
                    }}
                    aria-label="Previous screenshot"
                    data-cursor-hover
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-bg/80 border border-border-soft text-ink hover:text-orange hover:border-orange/50 transition-all shadow-md opacity-80 hover:opacity-100"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImg();
                    }}
                    aria-label="Next screenshot"
                    data-cursor-hover
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-bg/80 border border-border-soft text-ink hover:text-orange hover:border-orange/50 transition-all shadow-md opacity-80 hover:opacity-100"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Screenshot Counter Pill */}
                  <div className="absolute top-4 left-4 z-20 font-mono text-[11px] text-ink-soft bg-bg/80 border border-border-soft px-2.5 py-1 rounded-full backdrop-blur-md">
                    <span className="text-orange font-bold">{activeImgIndex + 1}</span> / {screenshots.length}
                  </div>
                </>
              )}
            </div>

            {/* THUMBNAIL ROW (shown when screenshots > 1) */}
            {screenshots.length > 1 && (
              <div className="px-6 pt-3 pb-1 border-b border-border-soft bg-surface-2/40 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
                {screenshots.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    data-cursor-hover
                    aria-label={`View screenshot ${idx + 1}`}
                    className={`relative shrink-0 w-16 h-11 rounded-lg overflow-hidden border transition-all ${
                      activeImgIndex === idx
                        ? "border-orange ring-2 ring-orange/30 scale-105"
                        : "border-border-soft opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-6 sm:p-8">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-orange bg-orange-soft border border-orange/20 px-2.5 py-0.5 rounded-full">
                    PROJ. {project.num}
                  </span>
                  <span className="font-mono text-xs tracking-wider uppercase text-ink-muted">
                    {project.category}
                  </span>
                </div>
                {project.status && (
                  <span className="font-mono text-[11px] text-ink-soft bg-surface-2 px-3 py-1 rounded-full border border-border-soft flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                    Status: {project.status}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3
                id="project-modal-title"
                className="font-display font-bold text-3xl sm:text-4xl text-ink mb-1"
              >
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="font-mono text-xs text-orange uppercase tracking-wider mb-4">
                  {project.subtitle}
                </p>
              )}

              {/* Description */}
              <p className="text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Problem / Purpose Statement */}
              {project.problem && (
                <div className="mb-6 p-4 rounded-xl bg-surface-2/60 border border-border-soft">
                  <h4 className="font-mono text-xs tracking-wider uppercase text-orange font-bold mb-1.5 flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    The Problem / Purpose
                  </h4>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* My Role Statement */}
              {project.role && (
                <div className="mb-6 p-4 rounded-xl bg-surface-2/60 border border-border-soft">
                  <h4 className="font-mono text-xs tracking-wider uppercase text-ink-muted font-bold mb-1.5 flex items-center gap-1.5">
                    <UserCheck size={14} className="text-orange" />
                    My Role
                  </h4>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {project.role}
                  </p>
                </div>
              )}

              {/* Key Features */}
              <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-ink-muted mb-3">
                Key Features
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2.5 mb-6">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs sm:text-sm text-ink-soft bg-surface-2/40 p-2 rounded-lg border border-border-soft/60"
                  >
                    <Check size={14} className="text-orange mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-ink-muted mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-ink-soft bg-surface-2 border border-border-soft rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links Action Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                {hasLiveLink ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-orange text-bg font-medium px-5 py-3 rounded-full hover:brightness-110 transition-all text-sm"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                ) : (
                  <div className="flex-1 inline-flex items-center justify-center gap-2 bg-surface-2 border border-border-soft text-ink-muted font-mono text-xs px-5 py-3 rounded-full">
                    <Info size={14} />
                    Project Built & Verified
                  </div>
                )}

                {hasGithubLink && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-border text-ink font-medium px-5 py-3 rounded-full hover:border-orange/50 hover:text-orange transition-colors text-sm"
                  >
                    View Code <GithubMark size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <ImageLightboxModal
        images={screenshots}
        initialIndex={activeImgIndex}
        title={project.title}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}

// Helper hook/function to memoize screenshots list
function useMemoScreenshots(project) {
  if (!project) return [];
  if (Array.isArray(project.screenshots) && project.screenshots.length > 0) {
    return project.screenshots;
  }
  if (project.image && typeof project.image === "string") {
    return [project.image];
  }
  return [];
}
