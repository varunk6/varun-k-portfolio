import { motion } from "framer-motion";

/**
 * Consistent section label + heading used across every section.
 * number/label encode real position in the page's narrative (01—ABOUT etc).
 */
export default function SectionHeading({
  number,
  label,
  title,
  accent,
  subtitle,
  align = "left",
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className={`flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase mb-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="text-orange font-bold">{number}</span>
        <span className="text-ink-muted">/</span>
        <span className="text-ink-muted font-medium">{label}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-ink"
      >
        {title} {accent && <span className="text-accent-italic text-orange">{accent}</span>}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mt-4 text-ink-soft text-base sm:text-lg max-w-xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
