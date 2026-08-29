import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { journeyItems } from "../data/navigation";

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          number="04"
          label="JOURNEY"
          title="My"
          accent="Journey"
          align="center"
          subtitle="From learning fundamentals to building real-world applications."
        />

        <div className="relative mt-16 pl-10 sm:pl-14">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[13px] sm:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-orange via-border to-transparent"
          />

          <div className="space-y-10">
            {journeyItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-10 sm:-left-14 top-1.5 w-3.5 h-3.5 rounded-full bg-bg border-2 border-orange shadow-[0_0_10px_rgba(255,122,51,0.5)]"
                />
                <div className="rounded-2xl border border-border-soft bg-surface p-5 sm:p-6 hover:border-orange/30 transition-colors">
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-ink mb-1">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-orange mb-2">
                    {item.tag}
                  </p>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
