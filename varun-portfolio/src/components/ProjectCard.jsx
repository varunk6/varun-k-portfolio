import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubMark } from "./BrandIcons";
import ProjectMockup from "./ProjectMockup";

export default function ProjectCard({ project, index, onOpen, reverse = false, featured = false }) {
  const num = String(index + 1).padStart(2, "0");

  if (featured) {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div
          data-cursor-hover
          onClick={() => onOpen(project)}
          className="group relative rounded-2xl border border-border-soft overflow-hidden aspect-[4/3] cursor-pointer hover:border-orange/40 transition-colors"
        >
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
            <ProjectMockup type={project.mockup} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
        </div>

        <div>
          <span className="font-mono text-sm text-orange">{num}</span>
          <h3 className="font-display font-semibold text-3xl sm:text-4xl text-ink mt-2 mb-1">
            {project.title}
          </h3>
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-ink-muted mb-4">
            {project.category}
          </p>
          <p className="text-ink-soft leading-relaxed mb-5 max-w-md">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 5).map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-ink-muted border border-border-soft rounded-full px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <button
              data-cursor-hover
              onClick={() => onOpen(project)}
              className="group inline-flex items-center gap-2 text-ink font-medium hover:text-orange transition-colors"
            >
              View Project
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                aria-label={`${project.title} GitHub repository`}
                className="text-ink-muted hover:text-orange transition-colors"
              >
                <GithubMark size={18} />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      data-cursor-hover
      onClick={() => onOpen(project)}
      className="group relative rounded-2xl border border-border-soft bg-surface overflow-hidden cursor-pointer hover:border-orange/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <ProjectMockup type={project.mockup} />
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs text-orange">{num}</span>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted">
            {project.category}
          </span>
        </div>
        <h3 className="font-display font-semibold text-xl text-ink mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono text-ink-muted border border-border-soft rounded-full px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-ink group-hover:text-orange transition-colors">
          View Project
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </motion.article>
  );
}
