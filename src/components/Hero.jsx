import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, FileText } from "lucide-react";

const badges = ["React", "Node.js", "Python", "Android", "MySQL"];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  const scrollTo = (href) => (e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center pt-24 pb-28 sm:pb-20 md:pt-32 overflow-hidden"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grain-bg opacity-[0.15]" />
        <motion.div
          animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-orange/20 blur-[120px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 grid md:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 mb-4 font-mono text-[11px] sm:text-xs tracking-[0.15em] uppercase text-ink-soft bg-surface-2/80 px-3 py-1.5 rounded-full border border-border-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange" />
            </span>
            Available to build projects
          </motion.div>

          <motion.p variants={item} className="text-ink-soft text-sm sm:text-base font-mono uppercase tracking-widest mb-1">
            Hello, I'm
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-bold text-5xl sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-ink mb-2"
          >
            Varun K
          </motion.h1>

          <motion.h2
            variants={item}
            className="font-display font-semibold text-2xl sm:text-4xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-3"
          >
            Full Stack{" "}
            <span className="text-accent-italic text-orange">Developer</span>
          </motion.h2>

          <motion.p
            variants={item}
            className="text-orange text-xs sm:text-sm font-mono tracking-wider uppercase mb-4"
          >
            B.Tech Information Technology Student
          </motion.p>

          <motion.p
            variants={item}
            className="text-ink-soft text-sm sm:text-base md:text-lg max-w-md mb-6 leading-relaxed"
          >
            I design and build modern web applications, mobile apps, and useful software solutions.
          </motion.p>

          <motion.div variants={item} className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 mb-8">
            <a
              href="#projects"
              onClick={scrollTo("#projects")}
              data-cursor-hover
              className="group inline-flex items-center justify-center gap-2 bg-orange text-bg font-medium px-6 py-3.5 rounded-full hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,122,51,0.35)] transition-all text-sm"
            >
              View My Work
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              onClick={scrollTo("#contact")}
              data-cursor-hover
              className="inline-flex items-center justify-center gap-2 border border-border text-ink font-medium px-6 py-3.5 rounded-full hover:border-orange/60 hover:text-orange transition-colors text-sm"
            >
              Contact Me
            </a>
            <a
              href="/Varun-K-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="inline-flex items-center justify-center gap-2 border border-border-soft bg-surface text-ink-soft hover:text-ink font-medium px-5 py-3.5 rounded-full hover:border-orange/40 transition-colors text-sm"
            >
              <FileText size={16} className="text-orange" />
              Resume
            </a>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-2 text-xs font-mono text-ink-muted mb-8">
            <span className="text-ink-soft font-medium">React</span>
            <span>•</span>
            <span className="text-ink-soft font-medium">Node.js</span>
            <span>•</span>
            <span className="text-ink-soft font-medium">Python</span>
            <span>•</span>
            <span className="text-ink-soft font-medium">MySQL</span>
            <span>•</span>
            <span className="text-ink-soft font-medium">Android</span>
          </motion.div>

          {/* Hero Quick Stats Row */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border-soft/80 max-w-xl"
          >
            <div className="bg-surface/80 border border-border-soft rounded-2xl p-3 text-center sm:text-left">
              <p className="font-display font-bold text-2xl text-orange">10+</p>
              <p className="font-mono text-[10px] tracking-wider uppercase text-ink-muted">Projects</p>
            </div>
            <div className="bg-surface/80 border border-border-soft rounded-2xl p-3 text-center sm:text-left">
              <p className="font-display font-bold text-2xl text-orange">6</p>
              <p className="font-mono text-[10px] tracking-wider uppercase text-ink-muted">Certifications</p>
            </div>
            <div className="bg-surface/80 border border-border-soft rounded-2xl p-3 text-center sm:text-left">
              <p className="font-display font-bold text-sm text-ink leading-tight">Full Stack</p>
              <p className="font-mono text-[10px] tracking-wider uppercase text-orange">Development</p>
            </div>
            <div className="bg-surface/80 border border-border-soft rounded-2xl p-3 text-center sm:text-left">
              <p className="font-display font-bold text-sm text-ink leading-tight">Android</p>
              <p className="font-mono text-[10px] tracking-wider uppercase text-orange">Development</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative mx-auto md:mx-0 w-full max-w-[280px] sm:max-w-[340px] md:max-w-none mt-4 md:mt-0"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-orange/25 blur-[80px] rounded-[40%_60%_60%_40%/50%_40%_60%_50%]"
          />
          <div className="relative aspect-[4/5] rounded-[40%_60%_60%_40%/50%_40%_60%_50%] overflow-hidden border border-border bg-surface shadow-2xl">
            {!imgError ? (
              <img
                src="/profile.jpg"
                alt="Portrait of Varun K"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-surface-2 to-surface text-ink-muted">
                <span className="font-display text-6xl font-bold text-orange/70">
                  VK
                </span>
                <span className="text-xs font-mono tracking-wide px-4 text-center">
                  Varun K
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        onClick={scrollTo("#about")}
        data-cursor-hover
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-ink-muted hover:text-orange transition-colors"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
          Scroll to explore
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
