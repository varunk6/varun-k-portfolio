import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    const onOver = (e) => {
      const target = e.target.closest(
        "a, button, [data-cursor-hover], input, textarea"
      );
      setHovering(Boolean(target));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
      }}
    >
      <motion.div
        animate={{
          width: hovering ? 28 : 8,
          height: hovering ? 28 : 8,
          backgroundColor: hovering ? "rgba(255,122,51,0.15)" : "#FF7A33",
          borderColor: "#FF7A33",
          borderWidth: hovering ? 1.5 : 0,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="rounded-full flex items-center justify-center relative"
        style={{
          boxShadow: hovering
            ? "0 0 20px rgba(255,122,51,0.4)"
            : "0 0 10px rgba(255,122,51,0.7)",
        }}
      >
        {hovering && (
          <div className="w-1.5 h-1.5 rounded-full bg-orange" />
        )}
      </motion.div>
    </motion.div>
  );
}
