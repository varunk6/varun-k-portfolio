# Varun K — Portfolio

A premium, dark-themed personal portfolio built with React, Vite, Tailwind CSS
and Framer Motion.

## 🚀 Quick Start (One-Click Windows Launcher)

Simply **double-click** `start-portfolio.bat` to launch the portfolio automatically!

```text
Double-click start-portfolio.bat → Checks Node/Dependencies → Starts Vite → Opens Browser
```

### Stopping the Portfolio Server:
Double-click `stop-portfolio.bat` to safely terminate the portfolio server running on port 5173.

---

### 📌 How to Create a Desktop Shortcut:

1. Right-click `start-portfolio.bat` in File Explorer.
2. Select **Show more options** → **Send to** → **Desktop (create shortcut)**.
3. Rename the shortcut on your desktop to **Varun K Portfolio**.

---

## 🛠️ CLI Development Commands

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Edit your content

Everything content-related lives in `src/data/`, so you never need to touch
component code to update the site:

- `src/data/projects.js` — all 10 projects (title, description, features,
  technologies, image path, GitHub/live links, featured flag, category)
- `src/data/skills.js` — skill groups and proficiency labels
- `src/data/navigation.js` — nav links, social links, journey timeline

## Replace these images

The site ships with clean, clearly-labeled placeholders wherever a real photo
is missing (this is on purpose — see project brief). Drop your own files in:

- `public/profile.png` — hero portrait
- `public/projects/*.webp` — one preview image per project (filenames already
  referenced in `src/data/projects.js`; until you add real screenshots, each
  project shows an original abstract mockup instead)
- `public/gallery/gallery-01.webp` … `gallery-06.webp` — "Life in Frames"
  photos

## Add real links

In `src/data/projects.js`, replace `"#"` in each project's `github` and
`live` fields with your real repository/deployment URLs. Do the same for
`src/data/navigation.js` → `socialLinks` (github, linkedin, email).

## Contact form

The form validates input and opens a pre-filled email draft (`mailto:`) on
submit — there's no backend yet. To wire up real delivery later, swap the
`handleSubmit` logic in `src/components/Contact.jsx` for a call to a service
like Formspree, EmailJS, or your own API route.
