import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Award, 
  Code2, 
  Sparkles,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const milestones = [
  {
    num: "01",
    category: "EDUCATION",
    title: "Dr. Mahalingam College of Engineering and Technology",
    subtitle: "B.Tech Information Technology",
    description:
      "Studying Information Technology with emphasis on computer science fundamentals, data structures, algorithms, and practical software engineering.",
    tags: ["Information Technology", "Computer Science", "Engineering"],
    icon: GraduationCap,
    position: "above", // Desktop: card above timeline
  },
  {
    num: "02",
    category: "EDUCATION",
    title: "Sri Krishna Matric Higher Secondary School",
    subtitle: "Higher Secondary Education",
    description:
      "Built core analytical, mathematical, and logical thinking foundations that sparked my passion for programming.",
    tags: ["Mathematics", "Science", "Academics"],
    icon: Award,
    position: "below", // Desktop: card below timeline
  },
  {
    num: "03",
    category: "DEVELOPMENT",
    title: "Building Practical Software",
    subtitle: "Web, Mobile & Practical Systems",
    description:
      "Architected full-stack web platforms, responsive mobile apps, and practical management software with real database backends.",
    tags: ["React", "Node.js", "Android", "MySQL"],
    icon: Code2,
    position: "above", // Desktop: card above timeline
  },
  {
    num: "04",
    category: "CURRENT FOCUS",
    title: "Full Stack & Intelligent Systems",
    subtitle: "Continuous Evolution",
    description:
      "Actively building advanced web applications, exploring AI/ML integration, and engineering practical software solutions.",
    tags: ["Full Stack", "AI / ML", "Mobile Dev", "Systems"],
    icon: Sparkles,
    position: "below", // Desktop: card below timeline
    isCurrent: true,
  },
];

const timelineTrackPhases = [
  { label: "LEARN", step: "01" },
  { label: "BUILD", step: "02" },
  { label: "EXPLORE", step: "03" },
  { label: "CREATE", step: "04" },
];

export default function Journey() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section id="journey" className="relative py-14 sm:py-18 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header: 06 / JOURNEY */}
        <div className="mb-8 sm:mb-10">
          <SectionHeading
            number="06"
            label="JOURNEY"
            title="My"
            accent="Journey"
            subtitle="From learning the fundamentals to building practical digital products."
          />
        </div>

        {/* ============================================================== */}
        {/* DESKTOP LAYOUT (lg & xl): HORIZONTAL ALTERNATING TIMELINE       */}
        {/* ============================================================== */}
        <div className="hidden lg:block relative my-6">
          
          {/* Subtle Technology Rail Header Track */}
          <div className="flex items-center justify-between px-6 mb-5 font-mono text-[11px] text-ink-muted tracking-[0.25em] uppercase">
            <span className="flex items-center gap-2 text-[#FF6A00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
              MILESTONE TRAJECTORY
            </span>
            <div className="flex items-center gap-6">
              {timelineTrackPhases.map((phase, idx) => (
                <span key={phase.label} className="flex items-center gap-2">
                  <span className="text-[#111111] dark:text-white font-semibold">{phase.label}</span>
                  {idx < timelineTrackPhases.length - 1 && (
                    <span className="text-ink-muted/30">→</span>
                  )}
                </span>
              ))}
            </div>
            <span className="text-ink-muted">PERSONAL TIMELINE</span>
          </div>

          {/* 3-Row Grid: Top Cards, Middle Horizontal Rail & Nodes, Bottom Cards */}
          <div className="relative">
            
            {/* CONTINUOUS HORIZONTAL TECHNOLOGY RAIL LINE */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#E7E1DA] dark:bg-white/10 rounded-full z-0 overflow-hidden">
              <motion.div
                initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#FF6A00]/40 via-[#FF6A00] to-[#FF6A00] origin-left"
              />
            </div>

            {/* Subtle Circuit Nodes on Line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-0 px-10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E7E1DA] dark:bg-white/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E7E1DA] dark:bg-white/30" />
            </div>

            {/* FOUR COLUMNS GRID (Top Card / Node / Bottom Card) */}
            <div className="grid grid-cols-4 gap-5 xl:gap-6 relative z-10">
              {milestones.map((m, idx) => {
                const Icon = m.icon;
                const isAbove = m.position === "above";

                return (
                  <div key={m.num} className="flex flex-col items-center">
                    
                    {/* TOP SLOT (Above the timeline) */}
                    <div className="w-full min-h-[250px] flex flex-col justify-end items-center">
                      {isAbove ? (
                        <motion.div
                          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                          className="w-full flex flex-col items-center"
                        >
                          {/* Top Card using unified card design */}
                          <div className="w-full rounded-[22px] p-5 xl:p-6 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#FF6A00]/60 border border-[#E7E1DA] dark:border-white/10 bg-white dark:bg-[#0D0D0D] group">
                            {/* Card Header with unified 42-46px icon container */}
                            <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-[13px] bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center shrink-0">
                                  <Icon size={18} />
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-xs font-bold text-[#FF6A00]">
                                    {m.num}
                                  </span>
                                  <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#111111] dark:text-white">
                                    {m.category}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <h3 className="font-display font-semibold text-sm xl:text-base text-[#111111] dark:text-white group-hover:text-[#FF6A00] transition-colors leading-snug mb-1">
                              {m.title}
                            </h3>
                            <p className="font-mono text-xs text-[#FF6A00] mb-2">
                              {m.subtitle}
                            </p>
                            <p className="text-xs text-[#6B6B6B] dark:text-[#A1A1A1] leading-relaxed mb-3">
                              {m.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                              {m.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#F2EFE9] dark:bg-surface border border-black/5 dark:border-border-soft text-ink-soft"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Connecting vertical stem going down to the timeline node */}
                          <div className="w-[2px] h-7 bg-gradient-to-b from-[#FF6A00]/60 to-[#FF6A00]" />
                        </motion.div>
                      ) : (
                        // Faint Circuit Accent for empty top slot
                        <div className="w-full h-full flex flex-col items-center justify-end pb-7 opacity-25">
                          <div className="w-px h-10 border-l border-dashed border-[#FF6A00]" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                        </div>
                      )}
                    </div>

                    {/* MIDDLE NODE: Numbered Milestone Circle matching icon container size */}
                    <div className="relative my-1 flex items-center justify-center">
                      <motion.div
                        initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className={`w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                          m.isCurrent
                            ? "bg-white dark:bg-[#0D0D0D] border-2 border-[#FF6A00] text-[#FF6A00] shadow-[0_0_18px_rgba(255,106,0,0.35)] ring-2 ring-[#FF6A00]/20 scale-105"
                            : "bg-white dark:bg-[#0D0D0D] border border-[#E7E1DA] dark:border-white/20 text-[#111111] dark:text-white shadow-sm hover:border-[#FF6A00]/60"
                        }`}
                      >
                        {m.num}
                      </motion.div>
                    </div>

                    {/* BOTTOM SLOT (Below the timeline) */}
                    <div className="w-full min-h-[250px] flex flex-col justify-start items-center">
                      {!isAbove ? (
                        <motion.div
                          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                          className="w-full flex flex-col items-center"
                        >
                          {/* Connecting vertical stem going down from the timeline node */}
                          <div className="w-[2px] h-7 bg-gradient-to-b from-[#FF6A00] to-[#FF6A00]/60" />

                          {/* Bottom Card using unified card design */}
                          <div className={`w-full rounded-[22px] p-5 xl:p-6 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#FF6A00]/60 border bg-white dark:bg-[#0D0D0D] group ${
                            m.isCurrent
                              ? "border-[#FF6A00] shadow-[0_0_25px_rgba(255,106,0,0.12)]"
                              : "border-[#E7E1DA] dark:border-white/10"
                          }`}>
                            {/* Card Header with unified 42-46px icon container */}
                            <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-[13px] bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center shrink-0">
                                  <Icon size={18} />
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-xs font-bold text-[#FF6A00]">
                                    {m.num}
                                  </span>
                                  <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#111111] dark:text-white">
                                    {m.category}
                                  </span>
                                </div>
                              </div>

                              {m.isCurrent && (
                                <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#FF6A00] text-black font-bold">
                                  ACTIVE
                                </span>
                              )}
                            </div>

                            <h3 className="font-display font-semibold text-sm xl:text-base text-[#111111] dark:text-white group-hover:text-[#FF6A00] transition-colors leading-snug mb-1">
                              {m.title}
                            </h3>
                            <p className="font-mono text-xs text-[#FF6A00] mb-2">
                              {m.subtitle}
                            </p>
                            <p className="text-xs text-[#6B6B6B] dark:text-[#A1A1A1] leading-relaxed mb-3">
                              {m.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                              {m.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#F2EFE9] dark:bg-surface border border-black/5 dark:border-border-soft text-ink-soft"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        // Faint Circuit Accent for empty bottom slot
                        <div className="w-full h-full flex flex-col items-center justify-start pt-7 opacity-25">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                          <div className="w-px h-10 border-l border-dashed border-[#FF6A00]" />
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* MOBILE & TABLET LAYOUT (< lg): VERTICAL TIMELINE               */}
        {/* ============================================================== */}
        <div className="lg:hidden relative pl-6 sm:pl-10">
          {/* Vertical Timeline Guide Line on the left */}
          <div className="absolute left-[13px] sm:left-[19px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#FF6A00] via-[#FF6A00]/50 to-transparent" />

          <div className="space-y-6 sm:space-y-8">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={`mob-${m.num}`}
                  initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                  className="relative group"
                >
                  {/* Numbered Milestone Node Circle on the Left Line */}
                  <div
                    aria-hidden="true"
                    className={`absolute -left-[27px] sm:-left-[35px] top-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                      m.isCurrent
                        ? "bg-white dark:bg-[#0D0D0D] border-2 border-[#FF6A00] text-[#FF6A00] shadow-[0_0_15px_rgba(255,106,0,0.3)] scale-105"
                        : "bg-white dark:bg-[#0D0D0D] border border-[#E7E1DA] dark:border-white/20 text-[#111111] dark:text-white shadow-sm"
                    }`}
                  >
                    {m.num}
                  </div>

                  {/* Glassmorphic Card matching exact Skills card styling */}
                  <div className={`rounded-[22px] p-5 sm:p-6 transition-all duration-300 shadow-sm border bg-white dark:bg-[#0D0D0D] ${
                    m.isCurrent
                      ? "border-[#FF6A00] shadow-[0_4px_20px_rgba(255,106,0,0.12)]"
                      : "border-[#E7E1DA] dark:border-white/10"
                  }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-[13px] bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center shrink-0">
                          <Icon size={18} />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-[#FF6A00]">
                            {m.num}
                          </span>
                          <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#111111] dark:text-white">
                            {m.category}
                          </span>
                        </div>
                      </div>

                      {m.isCurrent && (
                        <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#FF6A00] text-black font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-semibold text-base sm:text-lg text-[#111111] dark:text-white group-hover:text-[#FF6A00] transition-colors leading-snug mb-1">
                      {m.title}
                    </h3>
                    <p className="font-mono text-xs text-[#FF6A00] mb-2">
                      {m.subtitle}
                    </p>
                    <p className="text-xs text-[#6B6B6B] dark:text-[#A1A1A1] leading-relaxed mb-3">
                      {m.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#F2EFE9] dark:bg-surface border border-black/5 dark:border-border-soft text-ink-soft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
