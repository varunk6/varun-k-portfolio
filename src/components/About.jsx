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
    desktopClass: "top-1 lg:top-3 left-1/2 -translate-x-1/2 lg:left-[55%]",
    lineX2: "55%",
    lineY2: "15%",
  },
  {
    num: "02",
    icon: Smartphone,
    title: "App Development",
    description: "Building practical mobile applications",
    desktopClass: "right-0 lg:right-2 top-[55%] -translate-y-1/2",
    lineX2: "82%",
    lineY2: "55%",
  },
  {
    num: "03",
    icon: Brain,
    title: "AI / ML",
    description: "Exploring intelligent solutions",
    desktopClass: "left-0 lg:left-2 top-[42%] -translate-y-1/2",
    lineX2: "18%",
    lineY2: "42%",
  },
  {
    num: "04",
    icon: Puzzle,
    title: "Problem Solving",
    description: "Turning ideas into useful software",
    desktopClass: "bottom-1 lg:bottom-3 left-1/2 -translate-x-1/2 lg:left-[45%]",
    lineX2: "45%",
    lineY2: "85%",
  },
];

const floatAnimations = [
  { y: [-3, 3, -3], duration: 4.6, delay: 0 },
  { y: [3, -4, 3], duration: 5.2, delay: 0.7 },
  { y: [-4, 3, -4], duration: 4.9, delay: 1.4 },
  { y: [3, -3, 3], duration: 5.5, delay: 2.1 },
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

        {/* RIGHT COLUMN: 3D EARTH TECHNOLOGY COMPOSITION */}
        <div className="relative">
          {/* DESKTOP/TABLET COMPOSITION (md and up): 3D EARTH WITH 4 ORBITING FLOATING CARDS */}
          <div className="hidden md:flex relative w-full min-h-[500px] lg:min-h-[550px] items-center justify-center select-none">
            {/* Ambient Background Aura */}
            <div
              className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-sky-500/15 via-orange-500/10 to-blue-600/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Connecting SVG Lines between Earth Center and 4 Floating Cards */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="orbitLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF7A33" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {cards.map((c) => (
                <line
                  key={c.num}
                  x1="50%"
                  y1="50%"
                  x2={c.lineX2}
                  y2={c.lineY2}
                  stroke="url(#orbitLineGrad)"
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                  opacity="0.55"
                />
              ))}
            </svg>

            {/* Primary Tilted Orbital Ring */}
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute w-[290px] h-[115px] lg:w-[330px] lg:h-[130px] pointer-events-none z-10"
              style={{ transform: "rotate(-24deg)" }}
              aria-hidden="true"
            >
              <div className="w-full h-full rounded-[50%] border border-orange/40 shadow-[0_0_15px_rgba(255,122,51,0.22)] border-dashed relative">
                {/* Glowing Satellite Marker */}
                <div className="absolute top-1/2 -left-1 w-2.5 h-2.5 rounded-full bg-orange shadow-[0_0_10px_#FF7A33] animate-pulse" />
              </div>
            </motion.div>

            {/* Secondary Counter-Tilted Orbital Ring */}
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: -360 }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
              className="absolute w-[310px] h-[120px] lg:w-[350px] lg:h-[140px] pointer-events-none z-10"
              style={{ transform: "rotate(32deg)" }}
              aria-hidden="true"
            >
              <div className="w-full h-full rounded-[50%] border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.2)] relative">
                {/* Cyan Telemetry Node */}
                <div className="absolute top-0 right-1/4 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
              </div>
            </motion.div>

            {/* CENTRAL 3D REALISTIC EARTH GLOBE */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-[0_0_60px_rgba(56,189,248,0.32),0_0_30px_rgba(255,122,51,0.25)] border border-sky-400/30 z-20">
              {/* Very slow continuous subtle rotation (28s cycle) */}
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="w-full h-full relative"
              >
                <img
                  src="/tech-earth.jpg"
                  alt="Realistic 3D Technology Earth visualization"
                  loading="lazy"
                  className="w-[145%] h-[145%] max-w-none -left-[22.5%] -top-[22.5%] absolute object-cover rounded-full select-none pointer-events-none"
                />
              </motion.div>

              {/* Spherical 3D Volume & Specular Shading Overlay */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_-10px_-10px_25px_rgba(0,0,0,0.9),inset_8px_8px_22px_rgba(56,189,248,0.35)] bg-gradient-to-tr from-black/60 via-transparent to-sky-400/20"
                aria-hidden="true"
              />

              {/* Atmospheric Edge Rim Light */}
              <div
                className="absolute inset-0 rounded-full border border-sky-300/40 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* FOUR FLOATING GLASS/METAL CARDS SURROUNDING THE EARTH */}
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
                  className={`absolute ${card.desktopClass} z-30 w-52 sm:w-56 lg:w-60 group/interest rounded-2xl border border-border-soft bg-surface/85 backdrop-blur-md p-3.5 sm:p-4 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-orange/50 hover:shadow-[0_12px_35px_rgba(255,122,51,0.2)] focus-visible:ring-2 focus-visible:ring-orange cursor-default`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-orange">
                      {card.num}
                    </span>
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-orange-soft text-orange transition-colors group-hover/interest:bg-orange/20">
                      <Icon size={16} />
                    </div>
                  </div>
                  <p className="font-display font-semibold text-sm sm:text-base text-ink mb-1 group-hover/interest:text-orange transition-colors">
                    {card.title}
                  </p>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE VIEWPORT COMPOSITION (< md): STACKED VERTICALLY WITH CLEAR VISIBILITY */}
          <div className="md:hidden flex flex-col items-center">
            {/* 3D Earth Globe Centered with Orbital Rings */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 my-6 flex items-center justify-center select-none">
              {/* Subtle Ambient Aura */}
              <div
                className="absolute w-52 h-52 rounded-full bg-gradient-to-tr from-sky-500/15 via-orange-500/10 to-blue-600/15 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Mobile Orbital Ring */}
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[240px] h-[95px] pointer-events-none z-10"
                style={{ transform: "rotate(-20deg)" }}
                aria-hidden="true"
              >
                <div className="w-full h-full rounded-[50%] border border-orange/40 border-dashed relative">
                  <div className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-orange shadow-[0_0_8px_#FF7A33]" />
                </div>
              </motion.div>

              {/* Earth Globe Sphere */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-[0_0_45px_rgba(56,189,248,0.3),0_0_20px_rgba(255,122,51,0.2)] border border-sky-400/30 z-20">
                <motion.div
                  animate={prefersReducedMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full relative"
                >
                  <img
                    src="/tech-earth.jpg"
                    alt="Realistic 3D Technology Earth visualization"
                    loading="lazy"
                    className="w-[145%] h-[145%] max-w-none -left-[22.5%] -top-[22.5%] absolute object-cover rounded-full select-none pointer-events-none"
                  />
                </motion.div>
                <div
                  className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.85),inset_6px_6px_18px_rgba(56,189,248,0.35)] bg-gradient-to-tr from-black/60 via-transparent to-sky-400/20"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Four Interest Cards Stacked Below Earth (Accessible, No Excessive Overlap) */}
            <div className="w-full grid xs:grid-cols-2 gap-3.5 mt-2">
              {cards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.num}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    tabIndex={0}
                    className="group/mcard relative rounded-2xl border border-border-soft bg-surface/90 backdrop-blur-md p-4 transition-all duration-300 shadow-md hover:border-orange/50 focus-visible:ring-2 focus-visible:ring-orange"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-mono text-xs font-bold text-orange">
                        {card.num}
                      </span>
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-orange-soft text-orange group-hover/mcard:bg-orange/20 transition-colors">
                        <Icon size={16} />
                      </div>
                    </div>
                    <p className="font-display font-semibold text-base text-ink mb-1 group-hover/mcard:text-orange transition-colors">
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
