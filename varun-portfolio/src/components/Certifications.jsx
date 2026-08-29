import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X, Calendar, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { certificates } from "../data/certificates";

const categories = ["All", "Professional & IT", "AI & Hackathon", "Data Science", "Innovation & Pitching"];

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState(null);

  const filteredCertificates = certificates.filter(
    (c) => activeCategory === "All" || c.category === activeCategory
  );

  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          number="05"
          label="Certifications"
          title="Certificates &"
          accent="Achievements"
          subtitle="Verified credentials, professional courses, hackathons, and technical symposiums."
        />

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-cursor-hover
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all ${
                activeCategory === cat
                  ? "bg-orange text-bg font-semibold shadow-[0_0_20px_rgba(255,122,51,0.3)]"
                  : "bg-surface border border-border-soft text-ink-muted hover:text-ink hover:border-orange/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCertificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col rounded-2xl border border-border-soft bg-surface overflow-hidden hover:border-orange/40 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              {/* Image Thumbnail Container */}
              <div
                onClick={() => setSelectedCert(cert)}
                data-cursor-hover
                className="relative aspect-[16/10] bg-surface-2 overflow-hidden cursor-pointer group/img"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity" />

                {/* Badge top-left */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg/80 backdrop-blur-md border border-border-soft text-[10px] font-mono text-orange">
                  <Award size={12} />
                  {cert.badge}
                </div>

                {/* Click to Expand overlay icon */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange/90 text-bg text-xs font-medium opacity-0 group-hover/img:opacity-100 transition-all transform translate-y-1 group-hover/img:translate-y-0 shadow-md">
                  <span>View Certificate</span>
                  <ExternalLink size={13} />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-ink-muted mb-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-orange" />
                    {cert.issuer}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {cert.date}
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedCert(cert)}
                  data-cursor-hover
                  className="font-display font-bold text-lg text-ink hover:text-orange transition-colors cursor-pointer leading-snug mb-2"
                >
                  {cert.title}
                </h3>

                <p className="text-sm text-ink-soft leading-relaxed line-clamp-2 mb-4 flex-1">
                  {cert.description}
                </p>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-soft/60">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-surface-2 text-[11px] font-mono text-ink-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal for Full Certificate View */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl my-auto flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-border-soft flex items-center justify-between gap-4 bg-surface-2/50">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-orange mb-1">
                    <Sparkles size={14} />
                    {selectedCert.issuer}
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-ink">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  data-cursor-hover
                  className="p-2 rounded-full border border-border-soft text-ink-muted hover:text-ink hover:border-orange/50 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Image Display */}
              <div className="relative overflow-auto p-4 sm:p-6 flex items-center justify-center bg-black/40 min-h-[300px]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-lg border border-border-soft"
                />
              </div>

              {/* Modal Footer Info */}
              <div className="p-4 sm:p-6 border-t border-border-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface-2/30">
                <div>
                  <p className="text-sm text-ink-soft mb-1">
                    {selectedCert.description}
                  </p>
                  {selectedCert.certId && (
                    <p className="text-xs font-mono text-ink-muted">
                      Certificate ID: <span className="text-orange">{selectedCert.certId}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedCert.pdf && (
                    <a
                      href={selectedCert.pdf}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange text-bg font-medium px-5 py-2.5 rounded-full hover:brightness-110 transition-all text-xs"
                    >
                      <span>Open PDF Certificate</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
