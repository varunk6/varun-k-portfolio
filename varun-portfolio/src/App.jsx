import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Certifications from "./components/Certifications";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const timer = setTimeout(() => setLoading(false), reduceMotion ? 0 : 850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-bg flex items-center justify-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold text-3xl tracking-tight text-ink"
            >
              V<span className="text-orange">K</span>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <BottomNav />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Certifications />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
