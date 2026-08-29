import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import SectionHeading from "./SectionHeading";

const images = [
  { src: "/gallery/gallery-01.jpg", rotate: -1.5, span: "row-span-2", title: "Mysore Palace" },
  { src: "/gallery/gallery-02.webp", rotate: 1.5, span: "" },
  { src: "/gallery/gallery-03.webp", rotate: -1.5, span: "" },
  { src: "/gallery/gallery-04.webp", rotate: 1.5, span: "row-span-2" },
  { src: "/gallery/gallery-05.webp", rotate: -1.5, span: "" },
  { src: "/gallery/gallery-06.webp", rotate: 1.5, span: "" },
];

function GalleryItem({ image, index }) {
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: image.rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      className={`group relative rounded-xl overflow-hidden border border-border-soft bg-surface ${image.span} ${
        image.span ? "aspect-[3/4]" : "aspect-square"
      }`}
    >
      {!error ? (
        <img
          src={image.src}
          alt="Moment from Varun K's life"
          onError={() => setError(true)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-ink-muted bg-gradient-to-br from-surface-2 to-surface">
          <ImageOff size={20} />
          <span className="text-[10px] font-mono text-center px-3">
            {image.src}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          number="05"
          label="Moments"
          title="Life in"
          accent="Frames"
          align="center"
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 auto-rows-[140px] sm:auto-rows-[160px] gap-3 sm:gap-4">
          {images.map((image, i) => (
            <GalleryItem key={image.src} image={image} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
