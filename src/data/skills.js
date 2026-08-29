// Proficiency uses plain, honest labels instead of invented percentages.
// level: "strong" | "working" | "familiar"

export const skillGroups = [
  {
    label: "Frontend",
    skills: [
      { name: "HTML", icon: "Code2", level: "strong" },
      { name: "CSS", icon: "Palette", level: "strong" },
      { name: "JavaScript", icon: "Braces", level: "strong" },
      { name: "React", icon: "Atom", level: "strong" },
      { name: "Tailwind CSS", icon: "Wind", level: "working" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "Server", level: "working" },
      { name: "Express.js", icon: "Route", level: "working" },
    ],
  },
  {
    label: "Programming",
    skills: [
      { name: "C", icon: "Terminal", level: "strong" },
      { name: "Java", icon: "Coffee", level: "working" },
      { name: "Python", icon: "FileCode", level: "working" },
    ],
  },
  {
    label: "Database",
    skills: [
      { name: "MySQL", icon: "Database", level: "strong" },
      { name: "MongoDB", icon: "Leaf", level: "familiar" },
      { name: "SQL", icon: "Table2", level: "strong" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", icon: "GitBranch", level: "strong" },
      { name: "GitHub", icon: "FolderGit2", level: "strong" },
      { name: "VS Code", icon: "SquareCode", level: "strong" },
      { name: "Android Studio", icon: "Smartphone", level: "working" },
    ],
  },
  {
    label: "Other",
    skills: [
      { name: "Machine Learning", icon: "BrainCircuit", level: "familiar" },
      { name: "REST APIs", icon: "Plug", level: "working" },
      { name: "Firebase", icon: "Flame", level: "working" },
    ],
  },
];

export const levelLabel = {
  strong: "Strong",
  working: "Working knowledge",
  familiar: "Familiar",
};
