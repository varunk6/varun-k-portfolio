import { motion } from "framer-motion";
import { Code2, Smartphone, Cpu, Lightbulb } from "lucide-react";
import SectionHeading from "./SectionHeading";

const cards = [
  {
    num: "01",
    icon: Code2,
    title: "Full Stack",
    description: "Building modern web applications",
  },
  {
    num: "02",
    icon: Smartphone,
    title: "App Development",
    description: "Building practical mobile applications",
  },
  {
    num: "03",
    icon: Cpu,
    title: "AI / ML",
    description: "Exploring intelligent solutions",
  },
  {
    num: "04",
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Turning ideas into useful software",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-14 items-center">
        <div>
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
                className="group relative rounded-2xl border border-border-soft bg-surface p-5 hover:border-orange/40 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-bold text-orange">
                    {card.num}
                  </span>
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-orange-soft text-orange">
                    <Icon size={18} />
                  </div>
                </div>
                <p className="font-display font-semibold text-lg text-ink mb-1">
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
    </section>
  );
}
