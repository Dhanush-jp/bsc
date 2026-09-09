"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { SafeImage } from "@/components/ui/SafeImage";
import type { SiteContent } from "@/lib/types";

/**
 * Image-driven flagship-project reveal. This replaces the old standalone
 * text-only "manifesto" quote block — the space is used to build visual
 * flow between the hero and the rest of the site instead of an empty
 * quote section.
 */
export function FeaturedProject({ content }: { content: SiteContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.3, 0.5], [24, 0]);
  const accentOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const accentY = useTransform(scrollYProgress, [0.45, 0.65], [32, 0]);

  const flagship = content.projects.find((project) => project.featured) ?? content.projects[0];

  return (
    <section ref={ref} className="relative bg-warm-black py-24 text-ivory sm:py-32 lg:py-40">
      <div className="section-shell-wide">
        <p className="eyebrow text-stone">Featured Work</p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="space-y-6">
            {/* Flagship project — primary formation image */}
            <ImageReveal
              src="/projects/national-mart-grand-opening.jpg"
              alt="National Mart Hypermart grand opening, built by Boppana Srinivas Contractor"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />

            {/* Structural steel craft — secondary accent image */}
            <motion.div
              className="relative overflow-hidden"
              style={{ opacity: accentOpacity, y: accentY }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal">
                <SafeImage
                  src="/projects/steel-truss-fabrication.jpg"
                  alt="Structural steel truss fabrication by Boppana Srinivas Contractor"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-warm-black/20 to-transparent" />
                <div className="grain absolute inset-0 opacity-25 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.28em] text-bronze">Structural Steel</p>
                    <p className="mt-1 font-display text-sm uppercase tracking-[-0.01em] text-ivory">
                      Truss Fabrication &amp; Site Erection
                    </p>
                  </div>
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-stone">BSC</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project details reveal */}
          <div className="lg:pt-10">
            <motion.div style={{ opacity: titleOpacity, y: titleY }}>
              <p className="font-display text-sm uppercase tracking-[0.3em] text-bronze">
                Flagship Project
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-[-0.02em] sm:text-5xl">
                {flagship?.title}
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-stone sm:text-base">
                {flagship?.description}
              </p>

              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-stone">Also Delivered</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="relative h-14 w-20 overflow-hidden bg-charcoal">
                    <SafeImage
                      src="/projects/steel-truss-fabrication.jpg"
                      alt="Structural steel works"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.2em] text-bronze">
                      Structural Steel Works
                    </p>
                    <p className="mt-1 text-sm text-ivory">Truss Fabrication &amp; Site Erection</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
