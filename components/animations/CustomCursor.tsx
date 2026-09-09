"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const { x, y } = useMousePosition(enabled);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(finePointer && !reducedMotion);

    if (!finePointer || reducedMotion) return;

    document.body.classList.add("has-custom-cursor");

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(
        !!target?.closest("a, button, [role='button'], input, textarea, select, label")
      );
    };

    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mouseover", handleOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden mix-blend-difference md:block"
        animate={{
          x: x - (hovering ? 28 : 8),
          y: y - (hovering ? 28 : 8),
          width: hovering ? 56 : 16,
          height: hovering ? 56 : 16
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.4 }}
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full border border-white/80" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[89] hidden h-1 w-1 rounded-full bg-bronze md:block"
        animate={{ x: x - 2, y: y - 2 }}
        transition={{ type: "spring", stiffness: 700, damping: 32, mass: 0.2 }}
        aria-hidden="true"
      />
    </>
  );
}
