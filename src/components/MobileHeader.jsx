import ThemeToggle from "./ThemeToggle";

export default function MobileHeader() {
  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 md:hidden bg-bg/85 backdrop-blur-md border-b border-border-soft px-4 h-14 flex items-center justify-between">
      <a
        href="#home"
        onClick={handleClick}
        className="font-display font-bold text-lg tracking-tight text-ink"
      >
        V<span className="text-orange">K</span>
      </a>

      <ThemeToggle />
    </header>
  );
}
