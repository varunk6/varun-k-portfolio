import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { GithubMark } from "./BrandIcons";
import ProjectMockup from "./ProjectMockup";

export default function ProjectCard({
  project,
  index,
  total,
  onOpen,
  isActive = true,
  isPrev = false,
  isNext = false,
  onClickPeek,
  isMobile = false,
}) {
  const num = project.num || String(index + 1).padStart(2, "0");

  // 3D Tilt & Glare States
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!isActive || isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    // Max 10 degrees 3D tilt
    setRotateX(-y * 9);
    setRotateY(x * 9);

    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.18 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  if (!isMobile) {
    // Desktop Stacked Carousel Card with 3D Parallax Tilt
    return (
      <motion.article
        ref={cardRef}
        layout
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (isPrev || isNext) {
            onClickPeek?.();
          }
        }}
        initial={false}
        animate={{
          scale: isActive ? 1 : 0.9,
          opacity: isActive ? 1 : 0.45,
          zIndex: isActive ? 30 : 10,
          filter: isActive ? "blur(0px)" : "blur(1.5px)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full max-w-4xl mx-auto rounded-3xl border transition-colors duration-300 ${
          isActive
            ? "border-border-soft bg-surface shadow-[var(--theme-shadow)] hover:border-orange/50"
            : "border-border-soft/60 bg-surface/80 cursor-pointer pointer-events-auto"
        }`}
      >
        {/* 3D Animated Card Container */}
        <div
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: "preserve-3d",
            transition: rotateX === 0 ? "transform 0.5s ease-out" : "transform 0.1s ease-out",
          }}
          className="relative w-full h-full p-6 sm:p-8 md:p-10 grid md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10 items-center rounded-3xl overflow-hidden"
        >
          {/* Dynamic 3D Glare Light Reflection Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-40 rounded-3xl"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 65%)`,
            }}
          />

          {/* Left Column: Details & Scanning info */}
          <div className="flex flex-col h-full justify-between relative z-20">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="font-mono text-xs font-bold tracking-widest text-orange bg-orange-soft border border-orange/20 px-3 py-1 rounded-full shadow-xs">
                  PROJ. {num}
                </span>
                <div className="flex items-center gap-2">
                  {project.status && (
                    <span className="font-mono text-[10px] tracking-wide text-ink-soft bg-surface-2 px-2.5 py-1 rounded-full border border-border-soft">
                      {project.status}
                    </span>
                  )}
                  <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-ink-muted bg-surface-2 px-3 py-1 rounded-full border border-border-soft">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Title & Short Description */}
              <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight mb-3">
                {project.title}
              </h3>
              <p className="text-ink-soft text-sm sm:text-base leading-relaxed mb-6 line-clamp-2">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2.5">
                  Key Highlights
                </p>
                <div className="flex flex-wrap gap-2">
                  {(project.highlights || project.features.slice(0, 4)).slice(0, 4).map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft bg-surface-2/90 border border-border-soft rounded-lg px-2.5 py-1"
                    >
                      <Check size={13} className="text-orange shrink-0" />
                      {h}
                    </span>
                  ))}
                  {project.features && project.features.length > 4 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen(project);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-orange bg-orange-soft border border-orange/30 rounded-lg px-2.5 py-1 hover:bg-orange/20 transition-colors"
                    >
                      +{project.features.length - 4} more
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Tech Tags & Action CTAs */}
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono text-ink-muted border border-border-soft rounded-full px-3 py-1 bg-surface-2/40"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  data-cursor-hover
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen(project);
                  }}
                  className="group inline-flex items-center justify-center gap-2 bg-orange text-bg font-medium px-5 py-2.5 rounded-full hover:brightness-110 hover:shadow-[0_0_25px_rgba(255,122,51,0.35)] transition-all text-xs sm:text-sm"
                >
                  <span>View Project</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>

                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${project.title} live demo`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-orange border border-border-soft hover:border-orange/40 rounded-full px-4 py-2.5 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}

                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${project.title} GitHub repository`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-orange border border-border-soft hover:border-orange/40 rounded-full px-4 py-2.5 transition-colors"
                  >
                    <GithubMark size={15} />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup / Photo with 3D Depth Elevation */}
          <div
            data-cursor-hover
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
            style={{
              transform: rotateX !== 0 ? "translateZ(25px) scale(1.03)" : "translateZ(0px) scale(1)",
              transition: "transform 0.3s ease-out",
            }}
            className="group relative rounded-2xl border border-border-soft overflow-hidden aspect-[16/10] bg-surface-2 cursor-pointer shadow-xl hover:border-orange/50 transition-colors z-30"
          >
            <div className="w-full h-full">
              <ProjectMockup type={project.mockup} image={project.image} title={project.title} />
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Mobile Vertical Card Layout (Compact)
  return (
    <article
      onClick={() => onOpen(project)}
      data-cursor-hover
      className="group relative rounded-2xl border border-border-soft bg-surface p-5 hover:border-orange/40 transition-all cursor-pointer shadow-sm"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="font-mono text-xs font-bold text-orange bg-orange-soft border border-orange/20 px-2.5 py-0.5 rounded-full">
          PROJ. {num}
        </span>
        <div className="flex items-center gap-1.5">
          {project.status && (
            <span className="font-mono text-[10px] text-ink-soft bg-surface-2 px-2 py-0.5 rounded-full border border-border-soft">
              {project.status}
            </span>
          )}
          <span className="font-mono text-[10px] tracking-wider uppercase text-ink-muted">
            {project.category}
          </span>
        </div>
      </div>

      {/* Visual area */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border-soft bg-surface-2 mb-4">
        <ProjectMockup type={project.mockup} image={project.image} title={project.title} />
      </div>

      <h3 className="font-display font-bold text-xl text-ink mb-1.5">
        {project.title}
      </h3>
      <p className="text-xs text-ink-soft leading-relaxed mb-3 line-clamp-2">
        {project.description}
      </p>

      {/* Feature highlights pills */}
      <div className="flex flex-wrap gap-1.5 mb-3.5">
        {(project.highlights || project.features.slice(0, 3)).slice(0, 3).map((h) => (
          <span
            key={h}
            className="inline-flex items-center gap-1 text-[11px] text-ink-soft bg-surface-2 border border-border-soft/80 rounded-md px-2 py-0.5"
          >
            <Check size={11} className="text-orange shrink-0" />
            {h}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {project.technologies.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono text-ink-muted border border-border-soft rounded-full px-2 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border-soft/60">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-ink group-hover:text-orange transition-colors">
          View Project <ArrowUpRight size={14} />
        </span>
        {project.github && project.github !== "#" && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-ink-muted hover:text-orange transition-colors"
            aria-label={`${project.title} GitHub repository`}
          >
            <GithubMark size={15} />
          </a>
        )}
      </div>
    </article>
  );
}
