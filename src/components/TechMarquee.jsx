const techItems = [
  "REACT",
  "NODE.JS",
  "PYTHON",
  "MYSQL",
  "ANDROID",
  "JAVASCRIPT",
  "GIT",
  "TAILWIND CSS",
  "EXPRESS",
  "MONGODB",
  "REST API",
  "FIGMA",
];

export default function TechMarquee() {
  // Duplicate array for seamless infinite looping
  const list = [...techItems, ...techItems, ...techItems, ...techItems];

  return (
    <div
      aria-label="Technologies strip"
      className="relative w-full overflow-hidden border-y border-border-soft bg-surface-2/40 py-3.5 sm:py-5 my-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-bg to-transparent z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-bg to-transparent z-10" />

      <div className="flex overflow-hidden select-none group">
        <div className="animate-marquee flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
          {list.map((tech, idx) => (
            <div key={`${tech}-${idx}`} className="flex items-center gap-6 sm:gap-10">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-ink-muted/80 hover:text-orange transition-colors">
                {tech}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
