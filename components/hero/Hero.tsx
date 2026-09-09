"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { SiteContent } from "@/lib/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero({ content }: { content: SiteContent }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["0%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-warm-black text-ivory"
    >
      {/* Background Active Site Construction Image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
      >
        <SafeImage
          src={content.hero.backgroundImage}
          alt="Active construction site execution by Boppana Srinivas Contractor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Filmic Gradient Overlay & Grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/70 to-warm-black/40" />
      <div className="arch-grid absolute inset-0 opacity-25 pointer-events-none" />
      <div className="grain absolute inset-0 opacity-40 pointer-events-none" />

      {/* Floating secondary image — adds layered depth without covering the primary photo */}
      {content.hero.secondaryImage && (
        <motion.div
          className="absolute right-4 top-24 z-10 hidden w-40 overflow-hidden border border-white/15 shadow-cinematic sm:right-6 sm:top-28 sm:block md:w-52 lg:w-60"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: imageY }}
        >
          <div className="relative aspect-[4/5] w-full">
            <SafeImage
              src={content.hero.secondaryImage}
              alt="Completed Boppana Srinivas Contractor project — finished result"
              fill
              sizes="240px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/50 via-transparent to-transparent" />
          </div>
          <div className="border-t border-white/10 bg-warm-black/85 px-3 py-2 backdrop-blur-md">
            <p className="text-[0.58rem] uppercase tracking-[0.22em] text-bronze">Finished Result</p>
          </div>
        </motion.div>
      )}

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 flex min-h-[100svh] items-end pb-12 pt-28 sm:pb-16 lg:pb-24"
        style={{ opacity }}
      >
        <div className="section-shell-wide grid w-full items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Eyebrow, Main Headline, Supporting Text & CTAs */}
          <div>
            <motion.div
              className="inline-flex items-center gap-3 border border-white/15 bg-warm-black/60 px-4 py-1.5 backdrop-blur-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-bronze animate-pulse" />
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-stone">
                {content.hero.label}
              </span>
            </motion.div>

            <div className="mt-6 space-y-1">
              {content.hero.headline.map((line, index) => (
                <motion.h1
                  key={line}
                  className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em] text-ivory"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.35 + index * 0.08,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {line}
                </motion.h1>
              ))}
            </div>

            <motion.p
              className="mt-6 max-w-xl text-sm leading-relaxed text-stone/90 sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.hero.supporting}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton href="#work">Explore Selected Work</MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                Start a Project
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Architectural Quote & Technical Badge */}
          <motion.div
            className="flex flex-col justify-end border-l border-bronze/40 pl-6 lg:pl-10"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <span className="font-editorial text-5xl text-bronze/50 leading-none">“</span>
              <p className="font-editorial text-lg italic leading-relaxed text-ivory/90 sm:text-xl -mt-4">
                True craftsmanship is not merely how a structure looks upon handover, but how impeccably it is engineered from the first foundation to the highest steel beam.
              </p>
              <p className="mt-4 font-display text-[0.65rem] font-medium uppercase tracking-[0.25em] text-bronze">
                — Boppana Srinivas Contractor
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-white/10 text-[0.62rem] uppercase tracking-[0.22em] text-stone">
              <span className="text-bronze">● Active Site Work</span>
              <span>•</span>
              <span>PEB & Structural</span>
              <span>•</span>
              <span>Telangana & AP</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        style={{ opacity }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.32em] text-stone/80">
          <span>Scroll</span>
          <motion.span
            className="block h-8 w-px bg-bronze"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

