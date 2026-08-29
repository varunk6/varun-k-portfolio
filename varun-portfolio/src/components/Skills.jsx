import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Braces,
  Atom,
  Wind,
  Server,
  Route,
  Terminal,
  Coffee,
  FileCode,
  Database,
  Leaf,
  Table2,
  GitBranch,
  FolderGit2,
  SquareCode,
  Smartphone,
  BrainCircuit,
  Plug,
  Flame,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skillGroups, levelLabel } from "../data/skills";

const iconMap = {
  Code2,
  Palette,
  Braces,
  Atom,
  Wind,
  Server,
  Route,
  Terminal,
  Coffee,
  FileCode,
  Database,
  Leaf,
  Table2,
  GitBranch,
  FolderGit2,
  SquareCode,
  Smartphone,
  BrainCircuit,
  Plug,
  Flame,
};

const ringValue = { strong: 0.85, working: 0.6, familiar: 0.35 };

function SkillCard({ skill, index }) {
  const Icon = iconMap[skill.icon] || Code2;
  const pct = ringValue[skill.level] ?? 0.5;
  const circumference = 2 * Math.PI * 17;
  const offset = circumference * (1 - pct);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col items-center text-center gap-3 rounded-2xl border border-border-soft bg-surface p-5 hover:border-orange/40 transition-colors"
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg width="56" height="56" className="absolute inset-0 -rotate-90">
          <circle cx="28" cy="28" r="17" fill="none" stroke="var(--color-border-soft)" strokeWidth="2.5" />
          <circle
            cx="28"
            cy="28"
            r="17"
            fill="none"
            stroke="var(--color-orange)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <Icon size={20} className="text-ink group-hover:text-orange group-hover:rotate-6 transition-all" />
      </div>
      <p className="font-medium text-sm text-ink">{skill.name}</p>
      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-orange/80">
        {levelLabel[skill.level]}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-bg-soft/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          number="03"
          label="Technologies"
          title="Core"
          accent="Skills"
          align="center"
          subtitle="The languages, frameworks and tools I reach for when building something real."
        />

        <div className="mt-14 space-y-12">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-ink-muted mb-5 text-center">
                {group.label}
              </h3>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {group.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
