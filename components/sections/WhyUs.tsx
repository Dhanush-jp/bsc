"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import type { SiteContent } from "@/lib/types";

export function WhyUs({ content }: { content: SiteContent }) {
  return (
    <section className="bg-charcoal py-24 text-ivory sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-stone">Core Values</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[-0.02em] text-ivory sm:text-6xl">
            Why Partner
            <span className="block text-bronze">With BSC</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {content.whyChooseUs.items.map((item, index) => (
            <motion.div
              key={item.lines.join("-")}
              className="group relative flex flex-col justify-between overflow-hidden border border-white/10 bg-warm-black/80 p-8 sm:p-10"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
            >
              {/* Background Project Image with Dark Overlay */}
              <div className="absolute inset-0 z-0 opacity-25 transition-opacity duration-700 ease-cinematic group-hover:opacity-40">
                <SafeImage
                  src={item.image || "/projects/placeholder.svg"}
                  alt={item.lines.join(" ")}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/70 to-transparent" />
              </div>

              <div className="relative z-10">
                <span className="font-display text-xs uppercase tracking-[0.35em] text-bronze">
                  0{index + 1}
                </span>

                <h3 className="mt-8 font-display text-2xl uppercase leading-tight tracking-[-0.02em] text-ivory sm:text-3xl">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
              </div>

              <div className="relative z-10 mt-8 border-t border-white/10 pt-6">
                <p className="text-sm leading-relaxed text-stone/90">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

