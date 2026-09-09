"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    let frame = 0;
    let value = 0;
    const tick = () => {
      value += value < 70 ? 14 : value < 92 ? 6 : 3;
      if (value >= 100) {
        setProgress(100);
        window.setTimeout(onComplete, 180);
        return;
      }
      setProgress(value);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [onComplete, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-warm-black text-ivory"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center text-center">
        <span className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-ivory p-2 shadow-cinematic sm:h-20 sm:w-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bsc-icon.png" alt="BSC" className="h-full w-full object-contain" />
        </span>
        <p className="mt-6 font-display text-sm tracking-[0.4em] text-stone">{progress}%</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-charcoal">
        <motion.div
          className="h-full bg-bronze"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
}
