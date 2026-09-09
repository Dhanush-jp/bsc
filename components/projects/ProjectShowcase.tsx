"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const AUTOPLAY_SPEED_PX_PER_SEC = 34; // slow, elegant, continuous drift
const RESUME_DELAY_MS = 2200; // resume autoplay this long after manual interaction
const LOOP_COPIES = 3; // duplicate the list so the loop always has content ahead/behind

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section id="work" className="bg-warm-black text-ivory">
      <div className="section-shell pt-24 sm:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-stone">Portfolio Showcase</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[0.95] tracking-[-0.03em] text-ivory">
              Selected
              <span className="block text-bronze">Works</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-xs uppercase tracking-[0.2em] text-stone md:block">
            Drag, scroll, or use the arrows to explore the full portfolio.
          </p>
        </div>
      </div>

      <div className="mt-12 pb-24 sm:mt-16 sm:pb-32">
        <Carousel projects={projects} />
      </div>
    </section>
  );
}

function Carousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const dragMoved = useRef(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const singleSetWidth = useRef(0);
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);

  const [canScroll, setCanScroll] = useState(true);

  const loopedProjects = Array.from({ length: LOOP_COPIES }, () => projects).flat();

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    singleSetWidth.current = track.scrollWidth / LOOP_COPIES;
  }, []);

  const wrapScroll = useCallback(() => {
    const track = trackRef.current;
    const width = singleSetWidth.current;
    if (!track || !width) return;

    // Keep the visible scroll position inside the middle copy so the user
    // can always keep dragging/scrolling in either direction forever.
    if (track.scrollLeft >= width * 2) {
      track.scrollLeft -= width;
    } else if (track.scrollLeft < width) {
      track.scrollLeft += width;
    }
  }, []);

  const pauseForInteraction = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  // Initial measure + center scroll position inside the middle copy.
  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (track && singleSetWidth.current) {
      track.scrollLeft = singleSetWidth.current;
    }
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure, projects]);

  // Autoplay + infinite-wrap loop.
  useEffect(() => {
    if (reducedMotion) return;

    const step = (time: number) => {
      const track = trackRef.current;
      if (track) {
        if (lastTime.current !== null && !pausedRef.current && !draggingRef.current) {
          const dt = (time - lastTime.current) / 1000;
          track.scrollLeft += AUTOPLAY_SPEED_PX_PER_SEC * dt;
        }
        wrapScroll();
      }
      lastTime.current = time;
      rafId.current = requestAnimationFrame(step);
    };

    rafId.current = requestAnimationFrame(step);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lastTime.current = null;
    };
  }, [reducedMotion, wrapScroll]);

  // Mouse drag-to-scroll (desktop). Touch swipe works natively via overflow-x-auto.
  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === "touch") return; // let native touch scrolling handle this
    const track = trackRef.current;
    if (!track) return;
    draggingRef.current = true;
    dragMoved.current = false;
    dragStartX.current = event.clientX;
    dragStartScroll.current = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
    setCanScroll(false);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const delta = event.clientX - dragStartX.current;
    if (Math.abs(delta) > 4) dragMoved.current = true;
    track.scrollLeft = dragStartScroll.current - delta;
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setCanScroll(true);
    pauseForInteraction();
  };

  const onTouchStart = () => {
    pauseForInteraction();
  };

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-project-card]");
    const distance = card ? card.getBoundingClientRect().width + 24 : 400;
    track.scrollBy({ left: distance * direction, behavior: "smooth" });
    pauseForInteraction();
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label="Project portfolio carousel"
        className={cn(
          "no-scrollbar flex gap-5 overflow-x-auto overflow-y-hidden px-5 pb-2 sm:gap-7 sm:px-8 lg:px-12",
          canScroll ? "" : "cursor-grabbing select-none"
        )}
        style={{ scrollBehavior: draggingRef.current ? "auto" : undefined, touchAction: "pan-x" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!draggingRef.current) pausedRef.current = false;
        }}
        onTouchStart={onTouchStart}
        onWheel={() => pauseForInteraction()}
      >
        {loopedProjects.map((project, index) => (
          <ProjectCard
            key={`${project.id}-${index}`}
            project={project}
            onClick={() => {
              if (dragMoved.current) {
                dragMoved.current = false;
                return;
              }
            }}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between px-5 sm:px-8 lg:px-12">
        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-stone sm:hidden">Swipe to explore</p>
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => scrollByCard(-1)}
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-ivory transition-colors duration-300 hover:border-bronze hover:text-bronze focus-ring"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => scrollByCard(1)}
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-ivory transition-colors duration-300 hover:border-bronze hover:text-bronze focus-ring"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const handleWhatsAppProjectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const text = encodeURIComponent(
      `Hello Boppana Srinivas Contractor,\nI am interested in your project: "${project.title}" (${project.category}).\n\nPlease share more details and timeline for a similar build.`
    );
    window.open(`https://wa.me/919390055667?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const extraPhotos = (project.images?.length ?? 0) > 1 ? (project.images!.length - 1) : 0;

  return (
    <article
      data-project-card
      onClick={onClick}
      className="group relative w-[80vw] shrink-0 select-none sm:w-[440px] lg:w-[500px]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal">
        <SafeImage
          src={project.image}
          alt={project.title}
          fill
          draggable={false}
          sizes="(min-width: 1024px) 500px, (min-width: 640px) 440px, 80vw"
          className="object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/25 to-transparent" />
        <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

        {project.featured && (
          <span className="absolute left-4 top-4 border border-bronze/80 bg-bronze/25 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-ivory backdrop-blur-sm">
            Flagship
          </span>
        )}
        {extraPhotos > 0 && (
          <span className="absolute right-4 top-4 border border-white/20 bg-warm-black/70 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-ivory backdrop-blur-sm">
            +{extraPhotos} photo{extraPhotos > 1 ? "s" : ""}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-bronze">
            {project.category}
            {project.location ? <span className="text-stone"> — {project.location}</span> : null}
          </p>
          <h3 className="mt-2 font-display text-xl uppercase leading-tight tracking-[-0.01em] text-ivory sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-md text-xs leading-relaxed text-stone/90 sm:text-sm">
            {project.description}
          </p>
          <button
            type="button"
            onClick={handleWhatsAppProjectClick}
            className="mt-4 inline-flex items-center gap-2 border-b border-bronze/60 pb-0.5 text-[0.62rem] uppercase tracking-[0.22em] text-ivory transition-colors duration-300 hover:text-bronze"
          >
            Enquire About This Build
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
