export type Service = {
  number: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  location?: string;
  image: string;
  /** Optional additional gallery images for this project. `image` is always the cover shown in the carousel. */
  images?: string[];
  layout?: "fullscreen" | "split" | "portrait" | "overlap";
  featured?: boolean;
};

export type WhyUsItem = {
  lines: string[];
  description?: string;
  image?: string;
};

export type SiteContent = {
  hero: {
    label: string;
    headline: string[];
    supporting: string;
    backgroundImage: string;
    secondaryImage?: string;
  };
  about: {
    eyebrow: string;
    headline: string[];
    body: string;
    mission: string;
    image: string;
    secondaryImage?: string;
  };
  services: Service[];
  projects: Project[];
  whyChooseUs: {
    items: WhyUsItem[];
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
    mapEmbed: string;
  };
  theme: {
    accent: string;
    sand: string;
    dark: string;
  };
  visibility: Record<string, boolean>;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type EnquiryFormData = {
  name: string;
  phone: string;
  email: string;
  company?: string;
  projectType: string;
  projectLocation: string;
  message: string;
};
