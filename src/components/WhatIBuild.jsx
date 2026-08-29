import { motion } from "framer-motion";
import { Globe, Smartphone, Store, Cpu } from "lucide-react";

const buildItems = [
  {
    icon: Globe,
    title: "WEB APPLICATIONS",
    description: "Modern full-stack applications",
  },
  {
    icon: Smartphone,
    title: "MOBILE APPS",
    description: "Android applications",
  },
  {
    icon: Store,
    title: "BUSINESS SOFTWARE",
    description: "POS, inventory and management systems",
  },
  {
    icon: Cpu,
    title: "AI / ML",
    description: "Machine-learning based solutions",
  },
];

export default function WhatIBuild() {
  return (
    <section className="relative py-12 md:py-16 bg-bg-soft/40 border-y border-border-soft">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
              What I Build
            </h3>
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mt-1">
              Core Areas of Expertise
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {buildItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex items-start gap-3.5 p-4 rounded-2xl border border-border-soft bg-surface hover:border-orange/40 transition-all shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-soft text-orange shrink-0 group-hover:scale-105 transition-transform">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold tracking-wider text-ink uppercase mb-1 group-hover:text-orange transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
