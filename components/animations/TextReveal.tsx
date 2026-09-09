"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

function RevealLine({
  line,
  index,
  progress,
  reducedMotion,
  className
}: {
  line: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
  className?: string;
}) {
  const start = index * 0.12;
  const opacity = useTransform(
    progress,
    [start, start + 0.18],
    reducedMotion ? [1, 1] : [0.15, 1]
  );
  const y = useTransform(
    progress,
    [start, start + 0.18],
    reducedMotion ? [0, 0] : [48, 0]
  );

  return (
    <motion.span className={cn("block", className)} style={{ opacity, y }}>
      {line}
    </motion.span>
  );
}

type TextRevealProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p";
};

export function TextReveal({
  lines,
  className,
  lineClassName,
  as: Tag = "h2"
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.45"]
  });

  return (
    <div ref={ref} className={className}>
      <Tag>
        {lines.map((line, index) => (
          <RevealLine
            key={`${line}-${index}`}
            line={line}
            index={index}
            progress={scrollYProgress}
            reducedMotion={reducedMotion}
            className={lineClassName}
          />
        ))}
      </Tag>
    </div>
  );
}
