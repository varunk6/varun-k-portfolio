import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import MobileHeader from "./components/MobileHeader";
import BottomNav from "./components/BottomNav";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatIBuild from "./components/WhatIBuild";
import TechMarquee from "./components/TechMarquee";
import Projects from "./components/Projects";
import ProjectModal from "./components/ProjectModal";
import PdfViewerModal from "./components/PdfViewerModal";
import ImageLightboxModal from "./components/ImageLightboxModal";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [pdfModalData, setPdfModalData] = useState(null);
  const [imageLightboxData, setImageLightboxData] = useState(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const timer = setTimeout(() => setLoading(false), reduceMotion ? 0 : 850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "g" || e.key === "G") {
        const activeElement = document.activeElement;
        const isInput =
          activeElement &&
          (activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.tagName === "SELECT" ||
            activeElement.isContentEditable);

        if (!isInput) {
          e.preventDefault();
          document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
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
      <MobileHeader />
      <BottomNav />

      <main>
        <Hero onOpenPdf={setPdfModalData} />
        <About />
        <WhatIBuild />
        <TechMarquee />
        <Projects activeProject={activeProject} onOpen={setActiveProject} />
        <Skills />
        <Journey />
        <Certifications onOpenPdf={setPdfModalData} onOpenImage={setImageLightboxData} />
        <Contact />
      </main>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

      <PdfViewerModal
        pdfUrl={pdfModalData?.pdfUrl}
        title={pdfModalData?.title}
        downloadUrl={pdfModalData?.downloadUrl}
        onClose={() => setPdfModalData(null)}
      />

      <ImageLightboxModal
        images={imageLightboxData?.images}
        initialIndex={imageLightboxData?.initialIndex || 0}
        title={imageLightboxData?.title}
        isOpen={Boolean(imageLightboxData)}
        onClose={() => setImageLightboxData(null)}
      />

      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
