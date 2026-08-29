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
  Layout,
  Cpu,
  Wrench,
  Layers,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "../data/skills";

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

const categoryIconMap = {
  Frontend: Layout,
  Backend: Server,
  Programming: Terminal,
  Database: Database,
  Tools: Wrench,
  Other: Layers,
};

const levelBadgeStyle = {
  strong: "text-orange bg-orange-soft border-orange/30 font-semibold",
  working: "text-ink-soft bg-surface-2 border-border-soft font-medium",
  familiar: "text-ink-muted bg-surface-2/60 border-border-soft/60 font-normal",
};

const levelTextMap = {
  strong: "Strong",
  working: "Working Knowledge",
  familiar: "Familiar",
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28 md:py-32 bg-bg-soft/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeading
          number="03"
          label="EXPERTISE"
          title="Core"
          accent="Skills"
          align="center"
          subtitle="Technologies and tools I use to turn ideas into working products."
        />

        {/* Bento Grid layout */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillGroups.map((group, gIdx) => {
            const GroupIcon = categoryIconMap[group.label] || Layers;
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: gIdx * 0.08 }}
                className="group relative rounded-3xl border border-border-soft bg-surface p-6 sm:p-7 hover:border-orange/40 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-border-soft/80">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-soft text-orange">
                        <GroupIcon size={20} />
                      </div>
                      <h3 className="font-mono text-sm font-bold tracking-widest uppercase text-ink">
                        {group.label}
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] text-ink-muted bg-surface-2 px-2.5 py-1 rounded-full border border-border-soft">
                      {group.skills.length} Tech
                    </span>
                  </div>

                  {/* Skills Items List */}
                  <div className="space-y-2.5">
                    {group.skills.map((skill, sIdx) => {
                      const Icon = iconMap[skill.icon] || Code2;
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-surface-2/50 border border-border-soft/60 hover:border-orange/30 hover:bg-surface-2 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border-soft text-ink-soft group-hover/item:text-orange">
                              <Icon size={16} />
                            </div>
                            <span className="font-display font-medium text-sm text-ink">
                              {skill.name}
                            </span>
                          </div>

                          <span
                            className={`text-[10px] font-mono tracking-wide px-2.5 py-1 rounded-md border ${
                              levelBadgeStyle[skill.level] || levelBadgeStyle.working
                            }`}
                          >
                            {levelTextMap[skill.level] || "Working"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
