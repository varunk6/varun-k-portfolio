import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export default function ImageLightboxModal({
  images = [],
  initialIndex = 0,
  title,
  isOpen,
  onClose,
}) {
  const [index, setIndex] = useState(initialIndex);
  const closeBtnRef = useRef(null);

  const imageList = Array.isArray(images)
    ? images
    : typeof images === "string"
    ? [images]
    : [];

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
  }, [imageList.length]);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
  }, [imageList.length]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || imageList.length === 0) return null;

  const currentImg = imageList[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label={title || "Fullscreen image view"}
      >
        {/* Backdrop Click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Top Controls Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 bg-surface/80 backdrop-blur-md border border-border-soft px-3.5 py-1.5 rounded-full text-xs font-mono text-ink-soft shadow-lg">
            <Maximize2 size={13} className="text-orange" />
            <span className="font-bold text-ink">{title || "Image Viewer"}</span>
            {imageList.length > 1 && (
              <span className="text-orange ml-1">
                ({index + 1} / {imageList.length})
              </span>
            )}
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            data-cursor-hover
            aria-label="Close fullscreen view"
            className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md border border-border-soft text-ink hover:text-orange hover:border-orange/50 transition-colors shadow-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Previous Image Arrow */}
        {imageList.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            data-cursor-hover
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-surface/80 backdrop-blur-md border border-border-soft text-ink hover:text-orange hover:border-orange/50 transition-colors shadow-xl"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next Image Arrow */}
        {imageList.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            data-cursor-hover
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-surface/80 backdrop-blur-md border border-border-soft text-ink hover:text-orange hover:border-orange/50 transition-colors shadow-xl"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image Content Container */}
        <div className="relative z-10 max-w-6xl max-h-[85vh] p-2 flex items-center justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImg}
              src={currentImg}
              alt={title || "Project screenshot preview"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-h-[82vh] max-w-full object-contain rounded-xl shadow-2xl border border-border-soft/60"
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
