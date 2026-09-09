"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
  priority?: boolean;
  sizes?: string;
};

export function ImageReveal({
  src,
  alt,
  className,
  overlay = true,
  priority,
  sizes = "100vw"
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"]
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [1.08, 1]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.4, 0.85, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reducedMotion
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(12% 8% 12% 8%)", "inset(4% 2% 4% 2%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="relative aspect-[16/10] overflow-hidden bg-charcoal sm:aspect-[21/10] will-change-transform"
        style={{
          scale,
          opacity,
          clipPath
        }}
      >
        <SafeImage src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
        {overlay ? <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 via-warm-black/20 to-transparent" /> : null}
        <div className="grain absolute inset-0 opacity-30 pointer-events-none" />
      </motion.div>
    </div>
  );
}

