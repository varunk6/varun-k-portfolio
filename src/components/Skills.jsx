import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Terminal,
  Database,
  Brain,
  Smartphone,
  Atom,
  Braces,
  FileCode,
  Palette,
  Wind,
  Zap,
  Route,
  Plug,
  Coffee,
  Cpu,
  Table2,
  Flame,
  Sparkles,
  GitBranch,
  FolderGit2,
  Box,
  Workflow,
  Layers,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

// 6 Core Categories with all verified technologies from the prompt
const skillCategories = [
  {
    id: "frontend",
    num: "01",
    title: "FRONTEND",
    icon: Layout,
    skills: [
      { name: "React", icon: Atom, levelWidth: "95%" },
      { name: "JavaScript", icon: Braces, levelWidth: "92%" },
      { name: "HTML", icon: FileCode, levelWidth: "96%" },
      { name: "CSS", icon: Palette, levelWidth: "90%" },
      { name: "Tailwind CSS", icon: Wind, levelWidth: "88%" },
      { name: "Vite", icon: Zap, levelWidth: "85%" },
    ],
  },
  {
    id: "backend",
    num: "02",
    title: "BACKEND",
    icon: Server,
    skills: [
      { name: "Node.js", icon: Server, levelWidth: "88%" },
      { name: "Express.js", icon: Route, levelWidth: "85%" },
      { name: "REST APIs", icon: Plug, levelWidth: "92%" },
    ],
  },
  {
    id: "programming",
    num: "03",
    title: "PROGRAMMING",
    icon: Terminal,
    skills: [
      { name: "Python", icon: FileCode, levelWidth: "90%" },
      { name: "Java", icon: Coffee, levelWidth: "82%" },
      { name: "C", icon: Cpu, levelWidth: "85%" },
    ],
  },
  {
    id: "database",
    num: "04",
    title: "DATABASE",
    icon: Database,
    skills: [
      { name: "MySQL", icon: Database, levelWidth: "90%" },
      { name: "DBMS", icon: Table2, levelWidth: "88%" },
    ],
  },
  {
    id: "aiml",
    num: "05",
    title: "AI / ML",
    icon: Brain,
    skills: [
      { name: "TensorFlow", icon: Brain, levelWidth: "80%" },
      { name: "PyTorch", icon: Flame, levelWidth: "78%" },
      { name: "Machine Learning", icon: Sparkles, levelWidth: "84%" },
      { name: "AI / ML", icon: Cpu, levelWidth: "82%" },
    ],
  },
  {
    id: "mobile-tools",
    num: "06",
    title: "MOBILE & TOOLS",
    icon: Smartphone,
    skills: [
      { name: "Android", icon: Smartphone, levelWidth: "88%" },
      { name: "Kotlin", icon: Layers, levelWidth: "80%" },
      { name: "Flutter", icon: Smartphone, levelWidth: "78%" },
      { name: "Git", icon: GitBranch, levelWidth: "92%" },
      { name: "GitHub", icon: FolderGit2, levelWidth: "90%" },
      { name: "Docker", icon: Box, levelWidth: "75%" },
      { name: "GitHub Actions", icon: Workflow, levelWidth: "78%" },
    ],
  },
];

export default function Skills() {
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
    <section id="skills" className="relative py-14 sm:py-18 lg:py-20 overflow-hidden bg-bg-soft/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Compact Header: 05 / CORE SKILLS */}
        <div className="mb-8 sm:mb-10">
          <SectionHeading
            number="05"
            label="CORE SKILLS"
            title="Core"
            accent="Skills"
            subtitle="Technologies I use to build modern digital products."
          />
        </div>

        {/* 3 × 2 Dashboard Grid on Desktop, 2 cols on Tablet, 1 col on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
          {skillCategories.map((category, idx) => {
            const CategoryIcon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: "easeOut" }}
                className="group relative rounded-[22px] p-5 xl:p-6 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#FF6A00]/60 border border-[#E7E1DA] dark:border-white/10 bg-white dark:bg-[#0D0D0D] flex flex-col justify-between"
              >
                <div>
                  {/* Category Card Header with Unified 42-46px Icon Container */}
                  <div className="flex items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-black/[0.06] dark:border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-[13px] bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center shrink-0">
                        <CategoryIcon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-[#FF6A00]">
                            {category.num}
                          </span>
                          <h3 className="font-mono font-bold text-xs sm:text-sm tracking-wider uppercase text-[#111111] dark:text-white">
                            {category.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Tech Count Badge */}
                    <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#F2EFE9] dark:bg-white/5 border border-black/5 dark:border-white/10 text-[#6B6B6B] dark:text-white/60 font-medium">
                      {category.skills.length} Tech
                    </span>
                  </div>

                  {/* Technology Rows List */}
                  <div className="space-y-1.5 sm:space-y-2">
                    {category.skills.map((skill) => {
                      const SkillIcon = skill.icon;

                      return (
                        <div
                          key={skill.name}
                          className="group/row flex items-center justify-between gap-3 py-1 px-1.5 -mx-1.5 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors"
                        >
                          {/* Left: Icon + Name */}
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="text-[#FF6A00] shrink-0">
                              <SkillIcon size={14} />
                            </div>
                            <span className="font-display font-medium text-xs sm:text-[13px] text-[#111111] dark:text-white/90 truncate group-hover/row:text-[#FF6A00] transition-colors">
                              {skill.name}
                            </span>
                          </div>

                          {/* Right: Compact Visual Proficiency Accent Line (No percentages) */}
                          <div 
                            className="w-16 sm:w-20 h-1.5 rounded-full bg-[#EAE6DF] dark:bg-white/10 overflow-hidden shrink-0"
                            aria-hidden="true"
                          >
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF904D]"
                              style={{ width: skill.levelWidth }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Subtle bottom decorative accent */}
                <div 
                  className="mt-4 pt-2.5 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-[9px] font-mono text-[#8C857B] dark:text-white/40"
                  aria-hidden="true"
                >
                  <span className="uppercase tracking-widest">VERIFIED STACK</span>
                  <span className="text-[#FF6A00]">● ACTIVE</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
