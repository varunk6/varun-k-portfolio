import { motion } from "framer-motion";
import {
  ShoppingCart,
  Package,
  Scan,
  Receipt,
  Printer,
  Database,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Cpu,
  Monitor,
  CheckCircle2,
  HardDrive,
  Layers,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectMockup from "./ProjectMockup";

const whatIBuiltFeatures = [
  {
    num: "01",
    title: "POS BILLING",
    description:
      "Fast product search, cart management, billing workflow and invoice generation.",
    icon: ShoppingCart,
  },
  {
    num: "02",
    title: "INVENTORY",
    description:
      "Product management, stock tracking and automatic stock reduction.",
    icon: Package,
  },
  {
    num: "03",
    title: "BARCODE SUPPORT",
    description:
      "USB HID barcode scanner integration for faster product entry.",
    icon: Scan,
  },
  {
    num: "04",
    title: "GST & BILLING",
    description: "GST-aware billing and invoice generation.",
    icon: Receipt,
  },
  {
    num: "05",
    title: "PRINTING",
    description: "Support for thermal receipt and A4 invoice printing.",
    icon: Printer,
  },
  {
    num: "06",
    title: "DATABASE",
    description: "MySQL-based persistent business data with Sequelize.",
    icon: Database,
  },
];

const archNodes = [
  {
    layer: "Frontend",
    tech: "React + Vite + Tailwind CSS",
    icon: Code2,
  },
  {
    layer: "Backend",
    tech: "Node.js + Express",
    icon: Cpu,
  },
  {
    layer: "ORM",
    tech: "Sequelize",
    icon: Layers,
  },
  {
    layer: "Database",
    tech: "MySQL",
    icon: HardDrive,
  },
  {
    layer: "Desktop",
    tech: "Electron",
    icon: Monitor,
  },
  {
    layer: "Hardware",
    tech: "USB HID Barcode Scanner + Thermal Printer",
    icon: Printer,
  },
];

const myRoleCards = [
  {
    title: "FULL-STACK DEVELOPMENT",
    description:
      "Designed and implemented the frontend and backend application flow.",
  },
  {
    title: "DATABASE DESIGN",
    description:
      "Structured persistent business data using MySQL and Sequelize.",
  },
  {
    title: "DESKTOP INTEGRATION",
    description:
      "Integrated the web application into a desktop workflow using Electron.",
  },
  {
    title: "REAL-WORLD TESTING",
    description:
      "Tested billing, stock management, barcode scanning and printing workflows.",
  },
];

export default function FeaturedProject({ project, onOpen }) {
  if (!project) return null;

  return (
    <section
      id="featured"
      className="relative py-20 sm:py-28 md:py-32 bg-bg-soft/30 border-y border-border-soft overflow-hidden"
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-orange/10 blur-[130px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <SectionHeading
          number="03"
          label="FEATURED PROJECT"
          title="One Project."
          accent="Built End-to-End."
          subtitle="A closer look at one of the real-world systems I've designed and developed."
        />

        {/* Editorial Showcase Container */}
        <div className="mt-12 sm:mt-14 rounded-3xl border border-border-soft bg-surface p-6 sm:p-8 md:p-12 shadow-[var(--theme-shadow)] relative overflow-hidden">
          {/* Status Ribbon / Badge Top Right */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-border-soft/80">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-widest text-orange bg-orange-soft border border-orange/20 px-3 py-1 rounded-full">
                PROJ. {project.num}
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-ink-muted bg-surface-2 px-3 py-1 rounded-full border border-border-soft">
                BUSINESS SOFTWARE
              </span>
            </div>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-border-soft font-mono text-xs text-ink-soft">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange" />
              </span>
              <span>STATUS: <strong className="text-ink">{project.status}</strong></span>
            </div>
          </div>

          {/* Main 2-Column Hero Showcase Layout */}
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center mb-12">
            {/* Left Column: Title, Subtitle, Description & Tech */}
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight mb-2">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="font-mono text-xs sm:text-sm text-orange uppercase tracking-wider mb-4">
                    {project.subtitle}
                  </p>
                )}
                <p className="text-ink-soft text-base sm:text-lg leading-relaxed max-w-xl">
                  "A full-stack point-of-sale and inventory management system designed for real stationery-store operations."
                </p>
              </div>

              {/* Tech Tags */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-2.5">
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-ink-soft border border-border-soft rounded-full px-3.5 py-1.5 bg-surface-2/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => onOpen(project)}
                  className="group inline-flex items-center justify-center gap-2 bg-orange text-bg font-medium px-6 py-3 rounded-full hover:brightness-110 hover:shadow-[0_0_25px_rgba(255,122,51,0.35)] transition-all text-sm"
                >
                  <span>View Project Details</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>

                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-2 text-sm font-mono text-ink-muted hover:text-orange border border-border-soft hover:border-orange/40 rounded-full px-5 py-3 transition-colors"
                  >
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Visual Mockup / Interface Showcase */}
            <div
              data-cursor-hover
              onClick={() => onOpen(project)}
              className="relative aspect-[16/10] rounded-2xl border border-border-soft bg-surface-2 overflow-hidden shadow-2xl group cursor-pointer"
            >
              <ProjectMockup
                type={project.mockup}
                image={project.image}
                title={project.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                <span className="font-mono text-xs text-orange bg-bg/90 px-3 py-1 rounded-full border border-orange/30">
                  Click to Expand Case Study
                </span>
              </div>
            </div>
          </div>

          {/* COMPACT CASE-STUDY BLOCKS */}

          {/* 1. THE PROBLEM */}
          <div className="mb-12 rounded-2xl border border-border-soft bg-surface-2/40 p-6 sm:p-8">
            <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-orange font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange" />
              The Problem
            </h4>
            <p className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-4xl">
              Traditional stationery-store workflows can involve manual billing, stock tracking, product lookup, and invoice generation. AVR Stationery POS was designed to bring these operations into one practical desktop system.
            </p>
          </div>

          {/* 2. WHAT I BUILT */}
          <div className="mb-12">
            <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-ink-muted mb-6">
              What I Built
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whatIBuiltFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.num}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="p-5 rounded-2xl border border-border-soft bg-surface hover:border-orange/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold text-orange">
                          {f.num}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-orange-soft text-orange flex items-center justify-center">
                          <Icon size={16} />
                        </div>
                      </div>
                      <h5 className="font-mono text-xs font-bold tracking-wider text-ink uppercase mb-2">
                        {f.title}
                      </h5>
                      <p className="text-xs text-ink-soft leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 3. TECHNICAL ARCHITECTURE */}
          <div className="mb-12">
            <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-ink-muted mb-6">
              Technical Architecture
            </h4>

            {/* Architecture Flow */}
            <div className="rounded-2xl border border-border-soft bg-surface-2/50 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 lg:gap-2">
                {archNodes.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={node.layer}
                      className="w-full md:w-auto flex flex-col md:flex-row items-center gap-3 flex-1"
                    >
                      <div className="w-full flex-1 p-3.5 rounded-xl border border-border-soft bg-surface text-center md:text-left flex flex-col items-center md:items-start justify-center">
                        <span className="font-mono text-[10px] uppercase text-orange font-semibold mb-1 flex items-center gap-1.5">
                          <Icon size={12} />
                          {node.layer}
                        </span>
                        <span className="font-display font-medium text-xs text-ink">
                          {node.tech}
                        </span>
                      </div>

                      {i < archNodes.length - 1 && (
                        <div className="text-orange shrink-0 py-1 md:py-0">
                          <ArrowRight
                            size={16}
                            className="hidden md:block opacity-60"
                          />
                          <ArrowRight
                            size={16}
                            className="md:hidden rotate-90 opacity-60"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. MY ROLE */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-ink-muted mb-6">
              My Role
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {myRoleCards.map((role) => (
                <div
                  key={role.title}
                  className="p-5 rounded-2xl border border-border-soft bg-surface hover:border-orange/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2 text-orange">
                    <CheckCircle2 size={16} />
                    <h5 className="font-mono text-xs font-bold tracking-wider uppercase text-ink">
                      {role.title}
                    </h5>
                  </div>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
