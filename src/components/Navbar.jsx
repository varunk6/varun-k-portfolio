import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { desktopNavLinks } from "../data/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = desktopNavLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border-soft"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="max-w-7xl mx-auto flex items-center justify-between px-8 lg:px-12 h-20"
      >
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="font-display font-bold text-xl tracking-tight text-ink"
          data-cursor-hover
        >
          V<span className="text-orange">K</span>
        </a>

        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-1">
            {desktopNavLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    data-cursor-hover
                    className="relative px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1 h-1 rounded-full bg-orange"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
