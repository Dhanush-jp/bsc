"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Service } from "@/lib/types";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { cn } from "@/lib/utils";

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="bg-cream py-24 sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Services</p>
          <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[-0.02em] text-charcoal sm:text-6xl">
            Built Across
            <span className="block">Every Scale</span>
          </h2>
        </div>

        <div className="mt-16 divide-y divide-charcoal/10 border-y border-charcoal/10">
          {services.map((service, index) => (
            <ServiceRow key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"]
  });
  const x = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.35, 1]);

  return (
    <motion.article
      ref={ref}
      className="group relative grid gap-5 py-8 sm:grid-cols-[5rem_1fr_18rem] sm:items-center sm:gap-8 sm:py-10"
      style={{ x, opacity }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {/* Mobile: full-width image leads the card so real project photography stays visible */}
      <div className="relative aspect-[16/10] overflow-hidden sm:hidden">
        <ParallaxImage
          src={service.image}
          alt={service.title}
          className="absolute inset-0"
          sizes="100vw"
          speed={0.05}
        />
      </div>

      <p className="font-display text-sm tracking-[0.25em] text-bronze">{service.number}</p>
      <div>
        <h3 className="font-display text-2xl uppercase tracking-[-0.02em] text-charcoal transition-transform duration-500 ease-cinematic group-hover:translate-x-2 sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          {service.description}
        </p>
      </div>

      {/* Desktop: image sits alongside the text */}
      <div className="relative hidden aspect-[4/3] overflow-hidden sm:block">
        <ParallaxImage
          src={service.image}
          alt={service.title}
          className="absolute inset-0"
          sizes="18rem"
          speed={0.08}
          imageClassName={cn(
            "transition duration-700 ease-cinematic",
            active ? "scale-105" : "scale-100"
          )}
        />
      </div>
    </motion.article>
  );
}
