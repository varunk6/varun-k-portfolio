import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Check } from "lucide-react";
import { GithubMark } from "./BrandIcons";
import ProjectMockup from "./ProjectMockup";

export default function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-surface border border-border-soft w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl overflow-y-auto no-scrollbar"
          >
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close project details"
              data-cursor-hover
              className="sticky top-4 float-right mr-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-bg/80 border border-border-soft text-ink hover:text-orange hover:border-orange/40 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="aspect-[16/9]">
              <ProjectMockup type={project.mockup} />
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-orange mb-2">
                {project.category}
              </p>
              <h3
                id="project-modal-title"
                className="font-display font-bold text-3xl sm:text-4xl text-ink mb-4"
              >
                {project.title}
              </h3>
              <p className="text-ink-soft leading-relaxed mb-8">
                {project.description}
              </p>

              <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-ink-muted mb-3">
                Key Features
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2.5 mb-8">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-ink-soft"
                  >
                    <Check size={14} className="text-orange mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-ink-muted mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-ink-soft border border-border-soft rounded-full px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-orange text-bg font-medium px-5 py-3 rounded-full hover:brightness-110 transition-all"
                >
                  Live Demo <ExternalLink size={16} />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-border text-ink font-medium px-5 py-3 rounded-full hover:border-orange/50 hover:text-orange transition-colors"
                >
                  GitHub <GithubMark size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
