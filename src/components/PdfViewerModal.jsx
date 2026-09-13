import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";

export default function PdfViewerModal({ pdfUrl, title, downloadUrl, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!pdfUrl) return;

    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pdfUrl, onClose]);

  if (!pdfUrl) return null;

  const targetDownload = downloadUrl || pdfUrl;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label={title || "PDF Document Viewer"}
      >
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-surface border border-border-soft rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Controls Bar */}
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-border-soft bg-surface-2/90 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-orange-soft text-orange flex items-center justify-center shrink-0">
                <FileText size={18} />
              </div>
              <h3 className="font-display font-bold text-sm sm:text-base text-ink truncate">
                {title || "PDF Document"}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Download Button */}
              <a
                href={targetDownload}
                download
                data-cursor-hover
                aria-label="Download PDF"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-ink-soft bg-surface border border-border-soft hover:text-orange hover:border-orange/40 transition-colors"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download</span>
              </a>

              {/* Open in New Tab Button */}
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                aria-label="Open PDF in new tab"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-ink-soft bg-surface border border-border-soft hover:text-orange hover:border-orange/40 transition-colors"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">New Tab</span>
              </a>

              {/* Close Button */}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                data-cursor-hover
                aria-label="Close PDF Viewer"
                className="p-1.5 rounded-full border border-border-soft text-ink-muted hover:text-ink hover:border-orange/50 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="relative flex-1 w-full bg-black/40 overflow-hidden">
            <iframe
              src={`${pdfUrl}#toolbar=0`}
              title={title || "PDF document viewer"}
              className="w-full h-full border-0"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
