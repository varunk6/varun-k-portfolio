import { ArrowUpRight, Mail } from "lucide-react";
import { GithubMark, LinkedinMark, InstagramMark } from "./BrandIcons";
import { footerNavLinks, socialLinks } from "../data/navigation";

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const connectLinks = [
    { label: "GitHub", href: socialLinks.github, Icon: GithubMark, external: true },
    { label: "LinkedIn", href: socialLinks.linkedin, Icon: LinkedinMark, external: true },
    { label: "Instagram", href: socialLinks.instagram, Icon: InstagramMark, external: true },
    { label: "Email", href: socialLinks.email, Icon: Mail, external: false },
  ];

  return (
    <footer className="relative bg-[#0A0908] text-[#F3EFE8] border-t border-[#201D18] pt-16 lg:pt-20 pb-28 md:pb-12 overflow-hidden">
      {/* Ambient background glow effects */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-orange/10 blur-[120px]" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-orange/8 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* TOP ROW: Large Agency Call-to-Action */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 lg:pb-16 border-b border-white/10">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold tracking-widest text-orange uppercase bg-orange/10 border border-orange/20 px-3 py-1 rounded-full inline-block mb-4">
              COLLABORATION &amp; WORK
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Let&apos;s build something <span className="text-orange">useful.</span>
            </h2>
          </div>

          <div>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              data-cursor-hover
              className="group inline-flex items-center gap-3 bg-orange text-bg font-semibold px-7 py-3.5 rounded-full hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,122,51,0.4)] transition-all text-sm sm:text-base whitespace-nowrap"
            >
              <span>Get in touch</span>
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* MAIN COLUMNS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 py-12 lg:py-16">
          {/* Col 1: Brand & Bio (5 cols on desktop) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                data-cursor-hover
                className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight inline-block mb-3 hover:text-orange transition-colors"
              >
                Varun <span className="text-orange">K</span>
              </a>
              <p className="text-sm sm:text-base text-gray-400 font-normal leading-relaxed max-w-sm">
                B.Tech Information Technology Student | Full Stack Developer
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for internships &amp; projects
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (4 cols on desktop) */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-orange mb-5">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {footerNavLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    data-cursor-hover
                    className="text-xs sm:text-sm text-gray-300 hover:text-orange hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect Links (3 cols on desktop) */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-orange mb-5">
              Connect
            </h3>
            <ul className="space-y-3">
              {connectLinks.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    data-cursor-hover
                    className="group inline-flex items-center gap-2.5 text-xs sm:text-sm text-gray-300 hover:text-orange transition-colors"
                  >
                    <Icon size={16} className="text-gray-400 group-hover:text-orange transition-colors shrink-0" />
                    <span>{label}</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & CREDITS */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-gray-400 font-mono">
          <p>© 2026 Varun K. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            <span>Designed &amp; Built by</span>
            <span className="text-white font-medium">Varun K</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
