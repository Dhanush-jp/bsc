import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { defaultSiteContent } from "@/data/site-content";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap"
});

function resolveMetadataBase() {
  const fallback = "http://localhost:3000";
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  try {
    return new URL(value || fallback);
  } catch {
    return new URL(fallback);
  }
}

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: defaultSiteContent.seo.title,
  description: defaultSiteContent.seo.description,
  keywords: defaultSiteContent.seo.keywords,
  openGraph: {
    title: defaultSiteContent.seo.title,
    description: defaultSiteContent.seo.description,
    type: "website",
    locale: "en_IN",
    siteName: "Boppana Srinivas Contractor",
    images: [
      {
        url: defaultSiteContent.hero.backgroundImage,
        width: 1600,
        height: 1000,
        alt: "Boppana Srinivas Contractor — construction project"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSiteContent.seo.title,
    description: defaultSiteContent.seo.description,
    images: [defaultSiteContent.hero.backgroundImage]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
