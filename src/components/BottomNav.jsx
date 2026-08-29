import { useEffect, useState } from "react";
import { Home, User, FolderGit2, Award, MessageSquare } from "lucide-react";
import { mobileNavLinks } from "../data/navigation";

const icons = { Home, User, FolderGit2, Award, MessageSquare };

export default function BottomNav() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = mobileNavLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-3 left-3 right-3 z-50 md:hidden safe-bottom"
    >
      <ul className="flex items-center justify-between bg-surface/90 backdrop-blur-md border border-border-soft rounded-2xl px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        {mobileNavLinks.map((link) => {
          const Icon = icons[link.icon] || Home;
          const isActive = active === link.href;
          return (
            <li key={link.href} className="flex-1">
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                aria-current={isActive ? "page" : undefined}
                aria-label={link.label}
                className={`flex flex-col items-center gap-1 py-1.5 rounded-xl transition-colors ${
                  isActive ? "text-orange" : "text-ink-muted"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                <span className="text-[10px] font-medium">{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
