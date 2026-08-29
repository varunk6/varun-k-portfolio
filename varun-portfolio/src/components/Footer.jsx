import { Mail } from "lucide-react";
import { GithubMark, LinkedinMark, InstagramMark } from "./BrandIcons";
import { socialLinks } from "../data/navigation";

export default function Footer() {
  return (
    <footer className="relative border-t border-border-soft py-8 pb-28 md:pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="text-sm text-ink-muted">
            © 2026 Varun K. All rights reserved.
          </p>
          <p className="text-xs text-ink-muted/70 mt-1">Built with React</p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            data-cursor-hover
            className="text-ink-muted hover:text-orange transition-colors"
          >
            <GithubMark size={17} />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            data-cursor-hover
            className="text-ink-muted hover:text-orange transition-colors"
          >
            <LinkedinMark size={17} />
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            data-cursor-hover
            className="text-ink-muted hover:text-orange transition-colors"
          >
            <InstagramMark size={17} />
          </a>
          <a
            href={socialLinks.email}
            aria-label="Email"
            data-cursor-hover
            className="text-ink-muted hover:text-orange transition-colors"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
