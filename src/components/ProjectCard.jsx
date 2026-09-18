import { ArrowUpRight, Check, Star } from "lucide-react";
import { GithubMark } from "./BrandIcons";
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
  isMobile = false,
}) {
  const num = project.num || String(index + 1).padStart(2, "0");
  const isFeatured = Boolean(project.featured);

  const handleImageClick = (e) => {
    e.stopPropagation();
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

  const handleCardClick = () => {
    if (isPrev || isNext) {
      onClickPeek?.();
    } else if (isMobile) {
      onOpen(project);
    }
  };

  // AVR Stationery POS Highlight Items
  const avrHighlights = [
    "POS Billing",
    "Inventory",
    "Barcode",
    "GST",
    "Thermal Printing",
  ];

  return (
    <article
      onClick={handleCardClick}
      className={`relative w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
        isActive
          ? "border-border-soft bg-surface shadow-[0_12px_40px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)] hover:border-orange/50"
          : "border-border-soft/60 bg-surface/85 cursor-pointer opacity-40 hover:opacity-70"
      }`}
    >
      <div className="p-4 sm:p-6 lg:p-8">
        {/* 1. LARGE PROJECT IMAGE CONTAINER (Approx 16:9 Aspect Ratio) */}
        <div
          onClick={handleImageClick}
          data-cursor-hover
          className="group/img relative w-full aspect-[16/9] sm:aspect-[16/9.2] rounded-xl sm:rounded-2xl overflow-hidden border border-border-soft/80 bg-surface-2 cursor-pointer shadow-md select-none"
        >
          {/* Visual Showcase (Real Screenshot / Device Mockup / Tailored Dashboard) */}
          <ProjectMockup
            type={project.mockup}
            image={project.image}
            title={project.title}
            altText={project.altText}
          />

          {/* Desktop Subtle Hover Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none hidden sm:flex"
          >
            <div className="inline-flex items-center gap-2 bg-white/95 text-black font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-2xl transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300 backdrop-blur-md">
              <span>View Project</span>
              <ArrowUpRight size={15} className="text-orange" />
            </div>
          </div>

          {/* Corner Quick Action Badge */}
          <div className="absolute top-3 right-3 sm:hidden">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-sm shadow-md">
              <ArrowUpRight size={14} className="text-orange" />
            </span>
          </div>
        </div>

        {/* 2. PROJECT INFORMATION AREA */}
        <div className="pt-6 sm:pt-7">
          {/* Row 1: Number & Category (e.g. 01  FULL STACK) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm sm:text-base font-bold text-orange tracking-widest">
                {num}
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-ink-muted">
                {project.category}
              </span>
            </div>

            {isFeatured && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-wider uppercase text-orange bg-orange/15 border border-orange/30 px-2.5 py-0.5 rounded-full shadow-xs">
                <Star size={11} className="fill-orange text-orange" />
                FEATURED PROJECT
              </span>
            )}
          </div>

          {/* Row 2: Title */}
          <h3
            onClick={() => onOpen(project)}
            data-cursor-hover
            className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight hover:text-orange transition-colors cursor-pointer inline-block"
          >
            {project.title}
          </h3>

          {/* Row 2b: Subtitle (Featured AVR Stationery POS & projects with subtitle) */}
          {project.subtitle && (
            <p className="font-mono text-xs sm:text-sm font-semibold text-orange tracking-wide uppercase mt-1 mb-2">
              {project.subtitle}
            </p>
          )}

          {/* Row 3: Short Description */}
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mt-2 mb-4 max-w-3xl">
            {project.description}
          </p>

          {/* Row 4: Highlights (Specifically tailored for AVR Stationery POS & key projects) */}
          {isFeatured ? (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {avrHighlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-ink-soft bg-surface-2 border border-border-soft rounded-lg px-2.5 py-1"
                  >
                    <Check size={12} className="text-orange shrink-0" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            project.highlights && (
              <div className="mb-4 hidden sm:block">
                <div className="flex flex-wrap gap-2">
                  {project.highlights.slice(0, 4).map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft bg-surface-2 border border-border-soft rounded-lg px-2.5 py-0.5"
                    >
                      <Check size={11} className="text-orange shrink-0" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Row 5: Technologies (e.g. React • Node.js • REST API • Database) */}
          <div className="text-xs sm:text-sm font-mono text-ink-muted mb-6 flex flex-wrap items-center gap-x-2 gap-y-1">
            {project.technologies.map((tech, i) => (
              <span key={tech} className="inline-flex items-center">
                <span className="text-ink-soft hover:text-orange transition-colors">{tech}</span>
                {i < project.technologies.length - 1 && (
                  <span className="text-orange/60 ml-2 select-none">•</span>
                )}
              </span>
            ))}
          </div>

          {/* Row 6: Action CTA (View Case Study →) & Verified Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-soft/70">
            <button
              type="button"
              data-cursor-hover
              onClick={(e) => {
                e.stopPropagation();
                onOpen(project);
              }}
              className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-orange hover:text-orange/90 transition-colors"
            >
              <span>View Case Study</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-sans">
                →
              </span>
            </button>

            <div className="flex items-center gap-3">
              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${project.title} live demo`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-orange border border-border-soft hover:border-orange/40 rounded-full px-3.5 py-1.5 transition-colors"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight size={13} />
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
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-orange border border-border-soft hover:border-orange/40 rounded-full px-3.5 py-1.5 transition-colors"
                >
                  <GithubMark size={14} />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
