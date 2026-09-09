import { LandingPage } from "@/components/landing-page";
import { defaultSiteContent } from "@/data/site-content";

export default function Home() {
  return <LandingPage initialContent={defaultSiteContent} />;
}
