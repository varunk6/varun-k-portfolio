import { motion } from "framer-motion";
import { GraduationCap, Code2, Smartphone, Hammer } from "lucide-react";
import SectionHeading from "./SectionHeading";

const cards = [
  {
    icon: GraduationCap,
    title: "B.Tech IT",
    subtitle: "Student",
    description: "Learning the fundamentals that power real software.",
  },
  {
    icon: Code2,
    title: "Full Stack",
    subtitle: "Developer",
    description: "Comfortable across the frontend, backend and database.",
  },
  {
    icon: Smartphone,
    title: "Android",
    subtitle: "Developer",
    description: "Building mobile apps people can actually use daily.",
  },
  {
    icon: Hammer,
    title: "Real-World",
    subtitle: "Project Builder",
    description: "I'd rather ship a working system than a perfect theory.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-14 md:gap-10 items-start">
        <div className="md:sticky md:top-32">
          <SectionHeading
            number="01"
            label="About"
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
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-4 text-ink-muted text-sm font-mono tracking-wide"
          >
            An IT student who builds practical real-world software.
          </motion.p>
        </div>

        <div className="grid xs:grid-cols-2 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-border-soft bg-surface p-5 sm:p-6 hover:border-orange/40 transition-colors"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-orange/[0.04]"
                />
                <div className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-orange/10 text-orange mb-5">
                  <Icon size={20} />
                </div>
                <p className="relative font-display font-semibold text-lg text-ink leading-tight">
                  {card.title}
                </p>
                <p className="relative font-mono text-[11px] tracking-[0.15em] uppercase text-orange mb-2">
                  {card.subtitle}
                </p>
                <p className="relative text-sm text-ink-muted leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
