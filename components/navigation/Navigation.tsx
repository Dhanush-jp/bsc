"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

// Real BSC monogram (green B, magenta S, orange/yellow C) kept on a small
// ivory chip so its true colors always read correctly on dark backgrounds.
export function BSCMark({ size = 32 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-ivory shadow-sm"
      style={{ width: size, height: size, padding: Math.max(2, size * 0.08) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/bsc-icon.png" alt="" className="h-full w-full object-contain" aria-hidden="true" />
    </span>
  );
}

export function BSCLogo({ className, showMark = true, showWordmark = true }: { className?: string; showMark?: boolean; showWordmark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {showMark && <BSCMark size={32} />}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ivory">
            B Srinivas
          </span>
          <span className="mt-0.5 text-[0.52rem] font-medium uppercase tracking-[0.32em] text-stone">
            Contractor
          </span>
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 100], ["rgba(18,17,16,0)", "rgba(18,17,16,0.92)"]);
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[60]"
        style={{ backgroundColor: background, backdropFilter: backdropBlur }}
      >
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-white"
          style={{ opacity: borderOpacity }}
        />
        <div className="section-shell flex h-[4.5rem] items-center justify-between sm:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 focus-ring rounded-sm"
            aria-label="Boppana Srinivas Contractor — Home"
          >
            <BSCMark size={40} />
            <div className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-ivory">
                B Srinivas
              </span>
              <span className="mt-1 text-[0.5rem] font-medium uppercase tracking-[0.3em] text-stone">
                Contractor
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ivory/70 transition-colors duration-300 hover:text-ivory focus-ring rounded-sm"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-bronze transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <MagneticButton
              href="#contact"
              variant="secondary"
              className="hidden px-5 py-2.5 text-[0.68rem] lg:inline-flex"
            >
              Start a Project
            </MagneticButton>
            <button
              type="button"
              className="relative z-[62] flex h-11 w-11 items-center justify-center text-ivory focus-ring rounded-sm lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={cn(
                  "absolute h-px w-6 bg-current transition-all duration-300",
                  menuOpen ? "rotate-45" : "-translate-y-2"
                )}
              />
              <span
                className={cn(
                  "absolute h-px bg-current transition-all duration-300",
                  menuOpen ? "w-0 opacity-0" : "w-6 opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-6 bg-current transition-all duration-300",
                  menuOpen ? "-rotate-45" : "translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[61] bg-warm-black lg:hidden"
      initial={false}
      animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!open}
      aria-modal={open}
      role="dialog"
    >
      {/* Architectural grid overlay */}
      <div className="arch-grid absolute inset-0 opacity-10 pointer-events-none" />
      <div className="grain absolute inset-0 opacity-30 pointer-events-none" />

      <div className="flex h-full flex-col justify-between px-6 pb-12 pt-28 sm:px-10">
        {/* Logo in mobile menu */}
        <div className="mb-8">
          <BSCMark size={44} />
        </div>

        <nav className="grid gap-1" aria-label="Mobile navigation">
          {links.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="group flex items-baseline gap-4 border-b border-white/6 py-5 font-display text-4xl font-medium uppercase tracking-[0.06em] text-ivory transition-colors hover:text-bronze sm:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : 24 }}
              transition={{ delay: open ? 0.05 * index : 0, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[0.55rem] font-medium uppercase tracking-[0.28em] text-bronze opacity-70">
                0{index + 1}
              </span>
              {link.label}
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 16 }}
          transition={{ delay: open ? 0.25 : 0, duration: 0.4 }}
          className="mt-8 space-y-4"
        >
          <MagneticButton href="#contact" onClick={onClose} className="w-full justify-center">
            Start a Project
          </MagneticButton>
          <div className="flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.28em] text-stone">
            <a href="tel:9390055667" className="hover:text-bronze transition-colors">+91 93900 55667</a>
            <span>·</span>
            <span>PEB & Civil Works</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
