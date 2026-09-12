import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { GithubMark, LinkedinMark, InstagramMark } from "./BrandIcons";
import { socialLinks } from "../data/navigation";

const socialButtons = [
  { href: socialLinks.github, label: "GitHub", Icon: GithubMark, external: true },
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: LinkedinMark, external: true },
  { href: socialLinks.instagram, label: "Instagram", Icon: InstagramMark, external: true },
  { href: socialLinks.email, label: "Email", Icon: Mail, external: false },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border-soft/80 py-12 pb-32 md:pb-12 overflow-hidden">
      {/* 3D Ambient Glowing Orbs Background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 20, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-orange/15 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.35, 0.2],
            x: [0, -20, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-orange/10 blur-[110px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* 3D Copyright Floating Glass Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, rotateX: -3, rotateY: 3, z: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          className="group relative inline-flex items-center gap-2 bg-surface/90 border border-border-soft px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md hover:border-orange/50 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
          <span className="text-sm font-medium text-ink tracking-wide">
            © 2026 Varun K
          </span>
          <Sparkles size={13} className="text-orange opacity-80 group-hover:rotate-12 transition-transform" />
        </motion.div>

        {/* 3D Social Buttons List */}
        <div
          className="flex items-center gap-3"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {socialButtons.map(({ href, label, Icon, external }, idx) => (
            <motion.a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-label={label}
              data-cursor-hover
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{
                scale: 1.18,
                rotateY: 12,
                rotateX: -8,
                z: 25,
                boxShadow: "0 10px 25px -5px rgba(255, 122, 51, 0.4)",
              }}
              whileTap={{ scale: 0.92 }}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-surface-2/90 border border-border-soft text-ink-soft hover:text-orange hover:border-orange/50 transition-colors shadow-md backdrop-blur-sm"
            >
              <Icon size={18} />
              {/* 3D Backlight Glow on Hover */}
              <div aria-hidden="true" className="absolute inset-0 rounded-xl bg-orange/20 opacity-0 hover:opacity-100 blur-sm transition-opacity pointer-events-none -z-10" />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
