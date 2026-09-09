"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  "aria-label": ariaLabel
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: MouseEvent) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.18, y: y * 0.18 });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const styles = cn(
    "group relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.24em] transition-transform duration-500 ease-cinematic focus-ring",
    variant === "primary" &&
      "border border-bronze/80 bg-bronze text-ivory hover:bg-bronze/90",
    variant === "secondary" &&
      "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/45 hover:bg-white/10",
    variant === "ghost" &&
      "border border-charcoal/15 bg-transparent text-charcoal hover:border-bronze hover:text-bronze",
    disabled && "pointer-events-none opacity-50",
    className
  );

  const content = (
    <>
      <span
        className="relative z-10 flex items-center gap-2"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      >
        {children}
      </span>
      <span className="absolute inset-0 origin-left scale-x-0 bg-white/10 transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={styles}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={reset}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={styles}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {content}
    </button>
  );
}
