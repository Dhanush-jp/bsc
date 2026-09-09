"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { SiteContent } from "@/lib/types";

const STORAGE_KEY = "bsc-site-content-v2";
const SESSION_KEY = "bsc-admin-session";
const OLD_DEFAULT_MAP = "https://www.google.com/maps?q=Andhra%20Pradesh%2C%20India&output=embed";

type ContentContextValue = {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
  resetContent: () => void;
  isAdminAuthed: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

function normalizeContent(saved: Partial<SiteContent>, fallback: SiteContent): SiteContent {
  const hero = saved.hero as SiteContent["hero"] & { title?: string; tagline?: string };
  const about = saved.about as SiteContent["about"] & { title?: string; yearsExperience?: number };

  return {
    ...fallback,
    ...saved,
    hero: {
      ...fallback.hero,
      ...hero,
      label: hero?.label || hero?.title || fallback.hero.label,
      headline: hero?.headline || (hero?.title ? [hero.title] : fallback.hero.headline),
      supporting: hero?.supporting || hero?.tagline || fallback.hero.supporting,
      backgroundImage: hero?.backgroundImage || fallback.hero.backgroundImage,
      secondaryImage: hero?.secondaryImage || fallback.hero.secondaryImage
    },
    about: {
      ...fallback.about,
      ...about,
      headline: about?.headline || (about?.title ? about.title.split(" ") : fallback.about.headline),
      body: about?.body || fallback.about.body,
      mission: about?.mission || fallback.about.mission,
      image: about?.image || fallback.about.image,
      secondaryImage: about?.secondaryImage || fallback.about.secondaryImage
    },
    services: (saved.services?.length ? saved.services : fallback.services).map((service, index) => ({
      number: service.number || String(index + 1).padStart(2, "0"),
      title: service.title,
      description: service.description,
      image: service.image || fallback.services[index]?.image || "/projects/placeholder.svg"
    })),
    projects: saved.projects?.length ? saved.projects : fallback.projects,
    whyChooseUs: saved.whyChooseUs?.items?.length ? saved.whyChooseUs : fallback.whyChooseUs,
    contact: { ...fallback.contact, ...saved.contact },
    theme: { ...fallback.theme, ...saved.theme },
    visibility: { ...fallback.visibility, ...saved.visibility },
    seo: { ...fallback.seo, ...saved.seo }
  };
}

export function ContentProvider({
  initialContent,
  children
}: {
  initialContent: SiteContent;
  children: React.ReactNode;
}) {
  const [content, setContentState] = useState(initialContent);
  const [isAdminAuthed, setAdminAuthed] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const session = window.sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        const parsed = normalizeContent(JSON.parse(saved) as Partial<SiteContent>, initialContent);
        if (parsed.contact?.mapEmbed === OLD_DEFAULT_MAP) {
          parsed.contact.mapEmbed = initialContent.contact.mapEmbed;
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
        setContentState(parsed);
      } catch {
        setContentState(initialContent);
      }
    }
    setAdminAuthed(session === "true");
  }, [initialContent]);

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      setContent: (next) => {
        setContentState(next);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      },
      resetContent: () => {
        setContentState(initialContent);
        window.localStorage.removeItem(STORAGE_KEY);
      },
      isAdminAuthed,
      login: (username, password) => {
        const ok = username === "srinivas" && password === "honey123";
        if (ok) {
          setAdminAuthed(true);
          window.sessionStorage.setItem(SESSION_KEY, "true");
        }
        return ok;
      },
      logout: () => {
        setAdminAuthed(false);
        window.sessionStorage.removeItem(SESSION_KEY);
      }
    }),
    [content, initialContent, isAdminAuthed]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within ContentProvider");
  }
  return context;
}
