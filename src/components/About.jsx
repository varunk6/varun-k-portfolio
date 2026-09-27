import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, Brain, Puzzle } from "lucide-react";
import SectionHeading from "./SectionHeading";

const cards = [
  {
    num: "01",
    icon: Code2,
    title: "Full Stack",
    description: "Building modern web applications",
    desktopClass: "top-1 lg:top-2 left-1/2 -translate-x-1/2",
    lineX2: "50%",
    lineY2: "15%",
  },
  {
    num: "02",
    icon: Smartphone,
    title: "App Development",
    description: "Building practical mobile applications",
    desktopClass: "right-0 lg:right-1 top-1/2 -translate-y-1/2",
    lineX2: "82%",
    lineY2: "50%",
  },
  {
    num: "03",
    icon: Brain,
    title: "AI / ML",
    description: "Exploring intelligent solutions",
    desktopClass: "left-0 lg:left-1 top-1/2 -translate-y-1/2",
    lineX2: "18%",
    lineY2: "50%",
  },
  {
    num: "04",
    icon: Puzzle,
    title: "Problem Solving",
    description: "Turning ideas into useful software",
    desktopClass: "bottom-1 lg:bottom-2 left-1/2 -translate-x-1/2",
    lineX2: "50%",
    lineY2: "85%",
  },
];

const floatAnimations = [
  { y: [-3, 3, -3], duration: 4.8, delay: 0 },
  { y: [3, -4, 3], duration: 5.4, delay: 0.7 },
  { y: [-4, 3, -4], duration: 5.0, delay: 1.4 },
  { y: [3, -3, 3], duration: 5.6, delay: 2.1 },
];

export default function About() {
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
    <section id="about" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-[0.88fr_1.12fr] lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-14 items-center">
        {/* LEFT COLUMN: 01 / INTRO + ABOUT ME + PARAGRAPH */}
        <div className="z-10">
          <SectionHeading
            number="01"
            label="INTRO"
            title="About"
            accent="Me"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-6 text-ink-soft text-base sm:text-lg leading-relaxed max-w-md"
          >
            I'm a B.Tech Information Technology student passionate about
            building real-world software applications. I enjoy turning ideas
            into functional, clean and user-friendly digital products.
          </motion.p>
        </div>

        {/* RIGHT COLUMN: 3D DEVELOPER ROBOT TECHNOLOGY COMPOSITION */}
        <div className="relative">
          {/* DESKTOP/TABLET COMPOSITION (md and up): 3D ROBOT WITH 4 FLOATING CARDS */}
          <div className="hidden md:flex relative w-full min-h-[520px] lg:min-h-[580px] items-center justify-center select-none">
            {/* Ambient Background Aura */}
            <div
              className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-sky-500/15 via-[#FF6A00]/15 to-indigo-600/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Connecting SVG Circuit Lines between Robot Center and 4 Floating Cards */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="robotLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              {cards.map((c) => (
                <line
                  key={c.num}
                  x1="50%"
                  y1="50%"
                  x2={c.lineX2}
                  y2={c.lineY2}
                  stroke="url(#robotLineGrad)"
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                  opacity="0.55"
                />
              ))}
            </svg>

            {/* Primary Tilted Technology Orbital Ring */}
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[120px] lg:w-[340px] lg:h-[135px] pointer-events-none z-10"
              style={{ transform: "rotate(-24deg)" }}
              aria-hidden="true"
            >
              <div className="w-full h-full rounded-[50%] border border-[#FF6A00]/40 shadow-[0_0_15px_rgba(255,106,0,0.22)] border-dashed relative">
                {/* Glowing Satellite Marker */}
                <div className="absolute top-1/2 -left-1 w-2.5 h-2.5 rounded-full bg-[#FF6A00] shadow-[0_0_10px_#FF6A00] animate-pulse" />
              </div>
            </motion.div>

            {/* Secondary Counter-Tilted Orbital Ring */}
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: -360 }}
              transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
              className="absolute w-[320px] h-[125px] lg:w-[360px] lg:h-[145px] pointer-events-none z-10"
              style={{ transform: "rotate(32deg)" }}
              aria-hidden="true"
            >
              <div className="w-full h-full rounded-[50%] border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.2)] relative">
                {/* Cyan Telemetry Node */}
                <div className="absolute top-0 right-1/4 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
              </div>
            </motion.div>

            {/* CENTRAL 3D DEVELOPER ROBOT (Replacing the Earth completely) */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? { y: 0 }
                  : {
                      y: [-4, 4, -4],
                      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }
              }
              className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-68 lg:h-68 rounded-full overflow-hidden p-1.5 border border-white/20 bg-[#080808]/90 shadow-[0_0_50px_rgba(255,106,0,0.25),0_0_30px_rgba(56,189,248,0.2)] z-20 group"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border border-[#FF6A00]/40">
                <picture>
                  <source srcSet="/robot-developer.webp" type="image/webp" />
                  <img
                    src="/robot-developer.jpg"
                    alt="3D futuristic developer robot representing technology and software development"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  />
                </picture>

                {/* Spherical Specular Shading & Volumetric Overlay */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.8),inset_6px_6px_18px_rgba(255,106,0,0.2)] bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  aria-hidden="true"
                />

                {/* Minimalist Centered Brand Overlay */}
                <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center pointer-events-none">
                  <span className="font-mono text-[9px] tracking-widest text-[#FF6A00] font-bold bg-[#080808]/85 px-2.5 py-0.5 rounded-full border border-[#FF6A00]/30 shadow-sm">
                    VARUN K // DEV
                  </span>
                </div>
              </div>
            </motion.div>

            {/* FOUR FLOATING GLASS CARDS SURROUNDING THE ROBOT */}
            {cards.map((card, i) => {
              const Icon = card.icon;
              const float = floatAnimations[i];

              return (
                <motion.div
                  key={card.num}
                  animate={
                    prefersReducedMotion
                      ? { y: 0 }
                      : {
                          y: float.y,
                          transition: {
                            duration: float.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: float.delay,
                          },
                        }
                  }
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.04,
                          y: -4,
                          transition: { duration: 0.25 },
                        }
                  }
                  tabIndex={0}
                  className={`absolute ${card.desktopClass} z-30 w-52 sm:w-56 lg:w-60 group/interest rounded-2xl border border-border-soft bg-surface/90 backdrop-blur-md p-3.5 sm:p-4 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-[#FF6A00]/50 hover:shadow-[0_12px_35px_rgba(255,106,0,0.2)] focus-visible:ring-2 focus-visible:ring-[#FF6A00] cursor-default`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#FF6A00]">
                      {card.num}
                    </span>
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-orange-soft text-[#FF6A00] transition-colors group-hover/interest:bg-[#FF6A00]/20">
                      <Icon size={16} />
                    </div>
                  </div>
                  <p className="font-display font-semibold text-sm sm:text-base text-ink mb-1 group-hover/interest:text-[#FF6A00] transition-colors">
                    {card.title}
                  </p>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE VIEWPORT COMPOSITION (< md): STACKED VERTICALLY */}
          <div className="md:hidden flex flex-col items-center">
            {/* 3D Robot Centered with Orbital Rings */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 my-6 flex items-center justify-center select-none">
              {/* Ambient Aura */}
              <div
                className="absolute w-52 h-52 rounded-full bg-gradient-to-tr from-sky-500/15 via-[#FF6A00]/15 to-indigo-600/15 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Mobile Orbital Ring */}
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[250px] h-[100px] pointer-events-none z-10"
                style={{ transform: "rotate(-20deg)" }}
                aria-hidden="true"
              >
                <div className="w-full h-full rounded-[50%] border border-[#FF6A00]/40 border-dashed relative">
                  <div className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]" />
                </div>
              </motion.div>

              {/* Robot Frame */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden p-1 border border-white/20 bg-[#080808]/90 shadow-[0_0_40px_rgba(255,106,0,0.25)] z-20">
                <div className="w-full h-full rounded-full overflow-hidden border border-[#FF6A00]/30">
                  <picture>
                    <source srcSet="/robot-developer.webp" type="image/webp" />
                    <img
                      src="/robot-developer.jpg"
                      alt="3D futuristic developer robot representing technology and software development"
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  </picture>
                </div>
              </div>
            </div>

            {/* Four Interest Cards Stacked Below Robot (2x2 grid on small screens) */}
            <div className="w-full grid xs:grid-cols-2 gap-3.5 mt-2">
              {cards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.num}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    tabIndex={0}
                    className="group/mcard relative rounded-2xl border border-border-soft bg-surface/90 backdrop-blur-md p-4 transition-all duration-300 shadow-md hover:border-[#FF6A00]/50 focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-mono text-xs font-bold text-[#FF6A00]">
                        {card.num}
                      </span>
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-orange-soft text-[#FF6A00] group-hover/mcard:bg-[#FF6A00]/20 transition-colors">
                        <Icon size={16} />
                      </div>
                    </div>
                    <p className="font-display font-semibold text-base text-ink mb-1 group-hover/mcard:text-[#FF6A00] transition-colors">
                      {card.title}
                    </p>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
