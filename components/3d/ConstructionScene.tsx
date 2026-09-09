"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const blueprintPaths = [
  "M80 380 L80 180 L220 80 L380 80 L420 180 L420 380 Z",
  "M80 380 L420 380",
  "M220 80 L220 380",
  "M80 240 L420 240",
  "M160 180 L160 380",
  "M340 180 L340 380",
  "M220 80 L380 180",
  "M80 180 L220 80"
];

export function ConstructionScene() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.55], [0, 1]);
  const photoOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const photoScale = useTransform(scrollYProgress, [0.45, 0.85], reducedMotion ? [1, 1] : [1.08, 1]);
  const structureOpacity = useTransform(scrollYProgress, [0.55, 0.85], [1, 0.15]);

  return (
    <section ref={ref} className="relative min-h-[120vh] bg-charcoal py-24 text-ivory sm:py-32">
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden">
        <div className="section-shell-wide grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square max-h-[70vh] w-full justify-self-center lg:max-h-none">
            <motion.svg
              viewBox="0 0 500 500"
              className="absolute inset-0 h-full w-full"
              style={{ opacity: structureOpacity }}
              aria-hidden="true"
            >
              {blueprintPaths.map((d) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="rgba(235, 228, 216, 0.55)"
                  strokeWidth="1.2"
                  style={{ pathLength: lineProgress }}
                />
              ))}
            </motion.svg>

            <motion.div
              className="absolute inset-[12%] overflow-hidden bg-warm-black"
              style={{ opacity: photoOpacity, scale: photoScale }}
            >
              <SafeImage
                src="/projects/rooftop-dome-fabrication.jpg"
                alt="Architectural steel dome structure under fabrication by Boppana Srinivas Contractor"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-warm-black/40 to-transparent" />
            </motion.div>
          </div>

          <div>
            <p className="eyebrow text-stone">Structure</p>
            <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-[-0.02em] sm:text-6xl">
              From
              <span className="block text-bronze">Line</span>
              To Landmark
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-stone sm:text-base">
              Precision begins in planning. Every beam, surface, and span is coordinated before it
              reaches the site — then executed with the same clarity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
