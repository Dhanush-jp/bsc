"use client";

import { motion } from "framer-motion";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { TextReveal } from "@/components/animations/TextReveal";
import { SafeImage } from "@/components/ui/SafeImage";
import type { SiteContent } from "@/lib/types";

export function About({ content }: { content: SiteContent }) {
  return (
    <section id="about" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          {/* Left Column: Text Story & Badges */}
          <div>
            <p className="eyebrow">{content.about.eyebrow}</p>
            <TextReveal
              as="h2"
              lines={content.about.headline}
              className="mt-6 max-w-xl"
              lineClassName="display-headline text-charcoal"
            />
            
            <p className="mt-8 max-w-xl text-base leading-relaxed text-charcoal/80 font-normal">
              {content.about.body}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {content.about.mission}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-charcoal/10 pt-8 sm:grid-cols-3">
              <div className="border-l-2 border-bronze pl-4">
                <p className="font-display text-2xl font-semibold text-charcoal">100%</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Structural Integrity</p>
              </div>
              <div className="border-l-2 border-bronze pl-4">
                <p className="font-display text-2xl font-semibold text-charcoal">PEB & Heavy</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Industrial Sheds</p>
              </div>
              <div className="col-span-2 border-l-2 border-bronze pl-4 sm:col-span-1">
                <p className="font-display text-2xl font-semibold text-charcoal">End-to-End</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Site Execution</p>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Image Architectural Photo Composition */}
          <div className="relative pb-28 sm:pb-0">
            {/* Primary Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-cinematic">
              <ParallaxImage
                src={content.about.image}
                alt="Boppana Srinivas Contractor Pre-Engineered Building Project"
                className="h-full w-full"
                sizes="(min-width: 1024px) 40vw, 100vw"
                speed={0.08}
              />
            </div>

            {/* Overlapping Secondary Image — stays visible on mobile, just repositioned
                below the primary image instead of overlapping it, so nothing gets clipped
                by the viewport edge. */}
            <motion.div
              className="absolute -bottom-2 left-4 right-4 w-auto overflow-hidden border-4 border-ivory shadow-cinematic sm:-bottom-8 sm:left-auto sm:-left-8 sm:right-auto sm:w-2/3 lg:-left-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative aspect-[16/10] w-full sm:aspect-[4/3]">
                <SafeImage
                  src={content.about.secondaryImage || content.about.image}
                  alt="Industrial Roof Structure Execution by Boppana Srinivas Contractor"
                  fill
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Overlapping Accent Tag */}
            <div className="absolute -right-1 top-8 hidden border border-bronze/40 bg-warm-black/90 px-4 py-3 text-ivory backdrop-blur-md sm:block">
              <p className="font-display text-xs uppercase tracking-[0.28em] text-bronze">Civil & PEB Works</p>
              <p className="mt-1 text-[0.62rem] tracking-[0.18em] text-stone">Precision Engineering</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

