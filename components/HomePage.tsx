"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { SiteContent } from "@/lib/types";
import { ContentProvider } from "@/components/content-provider";
import { LoadingScreen } from "@/components/animations/LoadingScreen";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { Navigation } from "@/components/navigation/Navigation";
import { Hero } from "@/components/hero/Hero";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { ConstructionScene } from "@/components/3d/ConstructionScene";
import { Services } from "@/components/sections/Services";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSiteContent } from "@/components/content-provider";

export function HomePage({ initialContent }: { initialContent: SiteContent }) {
  return (
    <ContentProvider initialContent={initialContent}>
      <Experience />
    </ContentProvider>
  );
}

function Experience() {
  const { content } = useSiteContent();
  const reducedMotion = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(reducedMotion);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded ? <LoadingScreen key="loader" onComplete={handleLoadComplete} /> : null}
      </AnimatePresence>

      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      <main className="bg-background text-foreground">
        {content.visibility.hero ? <Hero content={content} /> : null}
        {content.visibility.featured !== false ? <FeaturedProject content={content} /> : null}
        {content.visibility.construction !== false ? <ConstructionScene /> : null}
        {content.visibility.services ? <Services services={content.services} /> : null}
        {content.visibility.projects ? <ProjectShowcase projects={content.projects} /> : null}
        {content.visibility.about ? <About content={content} /> : null}
        {content.visibility.whyUs !== false ? <WhyUs content={content} /> : null}
        {content.visibility.contact ? <Contact content={content} /> : null}
        <Footer content={content} />
      </main>
    </>
  );
}
