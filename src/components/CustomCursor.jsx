import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(pointer: coarse)").matches;
  });
  const [hovering, setHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // High stiffness and low damping for ultra-fast, smooth cursor tracking
  const springX = useSpring(x, { stiffness: 1000, damping: 50, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 1000, damping: 50, mass: 0.15 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const leave = () => setVisible(false);

    const onOver = (e) => {
      const target = e.target.closest(
        "a, button, [data-cursor-hover], input, textarea, select, [role='button']"
      );
      setHovering(Boolean(target));
    };

    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y, enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-1px",
        translateY: "-1px",
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="relative">
        {/* Soft Radial Ambient Orange Glow Aura */}
        <motion.div
          animate={{
            scale: hovering ? 1.4 : isPressed ? 0.8 : 1,
            opacity: hovering ? 0.95 : 0.75,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute -top-2.5 -left-2.5 w-8 h-8 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,75,0,0.9) 0%, rgba(255,60,0,0.55) 40%, rgba(255,100,0,0.15) 65%, rgba(255,100,0,0) 80%)",
            filter: "blur(4px)",
          }}
        />

        {/* Glowing Orange Pointer Arrow SVG (Ultra Small Size) */}
        <motion.div
          animate={{
            scale: hovering ? 1.25 : isPressed ? 0.85 : 1,
            rotate: hovering ? -3 : 0,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            filter:
              "drop-shadow(0 0 3px #FF5500) drop-shadow(0 0 7px rgba(255, 75, 0, 0.95)) drop-shadow(0 0 12px rgba(255, 60, 0, 0.6))",
          }}
        >
          <svg
            width="12"
            height="14"
            viewBox="0 0 26 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 2.5L22.5 18.5H13.2L17.2 26.5L13.5 28.5L9.2 20.2L2.5 25.5V2.5Z"
              fill="url(#orangeCursorGradientSmall)"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="orangeCursorGradientSmall"
                x1="2.5"
                y1="2.5"
                x2="22.5"
                y2="28.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF6A00" />
                <stop offset="0.6" stopColor="#FF4500" />
                <stop offset="1" stopColor="#FF2200" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
