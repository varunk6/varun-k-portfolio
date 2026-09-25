import { ArrowUpRight, Star } from "lucide-react";
import ProjectMockup from "./ProjectMockup";

export default function ProjectCard({
  project,
  index,
  _total,
  onOpen,
  onOpenLightbox,
  isActive = true,
  isPrev = false,
  isNext = false,
  onClickPeek,
  isSpacer = false,
}) {
  const num = project.num || String(index + 1).padStart(2, "0");
  const isFeatured = Boolean(project.featured);
  const isAVR = project.id === 10 || project.title === "AVR Stationery POS";

  const handleCardClick = () => {
    if (isSpacer) return;
    if (isPrev || isNext) {
      onClickPeek?.();
    } else if (isActive) {
      onOpen(project);
    }
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (isSpacer) return;
    if (onOpenLightbox && project.image) {
      onOpenLightbox({
        images: [project.image],
        initialIndex: 0,
        title: project.title,
      });
    } else {
      onOpen(project);
    }
  };

  // Concise technology / category summary for compact card
  const techSummary =
    project.technologies && project.technologies.length > 0
      ? project.technologies.slice(0, 3).join(" / ")
      : project.category;

  return (
    <article
      onClick={handleCardClick}
      aria-hidden={isSpacer ? "true" : undefined}
      tabIndex={isSpacer ? -1 : isActive ? 0 : -1}
      className={`group/card relative w-full max-w-[340px] sm:max-w-[350px] md:max-w-[360px] h-[440px] sm:h-[460px] md:h-[480px] mx-auto rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between select-none ${
        isSpacer
          ? "pointer-events-none opacity-0 select-none"
          : isActive
          ? isAVR
            ? "border-orange/60 bg-surface shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_28px_rgba(255,122,51,0.25)] ring-1 ring-orange/30 cursor-pointer"
            : "border-border-soft bg-surface shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:border-orange/40 cursor-pointer"
          : "border-border-soft/60 bg-surface/90 shadow-lg cursor-pointer hover:border-orange/30"
      }`}
    >
      {/* Background card darkening overlay for depth on side cards */}
      {!isActive && !isSpacer && (
        <div
          className="absolute inset-0 bg-bg/50 backdrop-blur-[1px] z-20 pointer-events-none transition-opacity duration-300 group-hover/card:bg-bg/25"
          aria-hidden="true"
        />
      )}

      {/* Card Content Container */}
      <div className="p-4 sm:p-5 relative z-10 flex flex-col justify-between h-full">
        {/* 1. TOP: Fixed Project Number & Featured Badge */}
        <div className="flex items-center justify-between gap-2 mb-2 shrink-0">
          <span className="font-mono text-xs font-bold text-orange tracking-widest uppercase">
            PROJ. {num}
          </span>
          <div className="flex items-center gap-1.5">
            {isFeatured && (
              <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold tracking-wider uppercase text-orange bg-orange/15 border border-orange/30 px-2 py-0.5 rounded-full shadow-xs">
                <Star size={9} className="fill-orange text-orange" />
                FEATURED
              </span>
            )}
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            )}
          </div>
        </div>

        {/* 2. PROJECT COVER IMAGE CONTAINER */}
        <div
          onClick={handleImageClick}
          className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-border-soft/80 bg-surface-2 shadow-inner my-auto cursor-pointer group/img"
        >
          <ProjectMockup
            type={project.mockup}
            image={project.image}
            title={project.title}
            altText={project.altText}
          />
          {/* Subtle Hover Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
          >
            <span className="inline-flex items-center gap-1.5 bg-white text-black font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              <span>View Project</span>
              <ArrowUpRight size={13} className="text-orange" />
            </span>
          </div>
        </div>

        {/* 3. MIDDLE: Project Title & Subtitle */}
        <div className="mt-3 mb-2 shrink-0">
          <h3 className="font-display font-bold text-base sm:text-lg md:text-xl text-ink tracking-tight uppercase line-clamp-2 leading-tight group-hover/card:text-orange transition-colors">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="font-mono text-[10px] sm:text-[11px] font-semibold text-orange tracking-wide uppercase line-clamp-1 mt-1">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* 4. BOTTOM: Short Tech Label + Arrow Icon */}
        <div className="pt-3 border-t border-border-soft/70 flex items-center justify-between gap-2 shrink-0">
          <span className="font-mono text-[11px] text-ink-muted truncate tracking-tight max-w-[80%]">
            {techSummary}
          </span>
          <span
            className="w-7 h-7 rounded-full bg-orange-soft border border-orange/30 text-orange flex items-center justify-center group-hover/card:bg-orange group-hover/card:text-bg transition-colors shrink-0 shadow-xs"
            aria-hidden="true"
          >
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}
