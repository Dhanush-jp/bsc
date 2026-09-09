import type { MetadataRoute } from "next";
import { defaultSiteContent } from "@/data/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}

export const metadata = {
  title: defaultSiteContent.seo.title
};
