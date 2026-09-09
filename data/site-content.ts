import type { SiteContent } from "@/lib/types";

export const defaultSiteContent: SiteContent = {
  hero: {
    label: "Boppana Srinivas Contractor",
    headline: ["BUILT", "TO", "LAST."],
    supporting:
      "Precision contracting for PEB industrial sheds, commercial facilities, and structural steel works — executed with site discipline and enduring quality across Andhra Pradesh & Telangana.",
    backgroundImage: "/projects/peb-steel-structure.jpg",
    secondaryImage: "/projects/rooftop-terrace-completed.jpg"
  },
  about: {
    eyebrow: "About BSC",
    headline: ["BUILT", "WITH", "PRECISION."],
    body:
      "Boppana Srinivas Contractor delivers disciplined site execution, practical planning, and quality-focused construction for clients who value dependable timelines and clear communication.",
    mission:
      "We build durable, heavy-duty industrial and commercial spaces with transparent coordination, skilled site teams, and careful attention to every stage of work — from the first foundation to the final handover.",
    image: "/projects/warehouse-wall-finishing.jpeg",
    secondaryImage: "/projects/industrial-roof-structure.jpeg"
  },
  services: [
    {
      number: "01",
      title: "Pre-Engineered Buildings",
      description:
        "PEB structural framing, heavy industrial sheds, metal walling, access canopies, and site-ready developments built for multi-decadal performance.",
      image: "/projects/peb-structure-plastering.jpg"
    },
    {
      number: "02",
      title: "Industrial Construction",
      description:
        "Large-format industrial halls, warehousing facilities, and manufacturing plants with structural steel coordination and concrete works.",
      image: "/projects/large-industrial-interior.jpeg"
    },
    {
      number: "03",
      title: "Commercial Construction",
      description:
        "Showrooms, commercial storefronts, hypermart facilities, and corporate spaces built for daily operation and brand presence.",
      image: "/projects/showroom-frontage-finishing.jpeg"
    },
    {
      number: "04",
      title: "Structural Steel Works",
      description:
        "Steel framing, concrete works, and load-bearing systems executed with engineering discipline and precision site supervision.",
      image: "/projects/steel-beam-finishing.jpg"
    },
    {
      number: "05",
      title: "Roofing & Cladding",
      description:
        "Wide-span metal roofing, skylight integration, and weather-resistant cladding systems for industrial-scale structures.",
      image: "/projects/roof-truss-installation.jpg"
    },
    {
      number: "06",
      title: "Civil Construction & Yards",
      description:
        "Concrete hardstanding yards, site infrastructure, boundary structures, and civil foundation works for heavy-duty applications.",
      image: "/projects/civil-construction-completed.jpg"
    },
    {
      number: "07",
      title: "Interior & Finishing Works",
      description:
        "Functional sports halls, partitions, wall treatment, and utility coordination for clean, professional project handovers.",
      image: "/projects/badminton-academy-interior.jpeg"
    },
    {
      number: "08",
      title: "Project Execution",
      description:
        "End-to-end site coordination, vendor management, quality checks, scaffolding safety, and progress tracking from inception to handover.",
      image: "/projects/commercial-facade-progress.jpeg"
    }
  ],
  projects: [
    {
      id: "national-mart-hypermart",
      title: "National Mart Hypermart",
      category: "Commercial Construction",
      location: "Andhra Pradesh",
      image: "/projects/national-mart-hypermart.jpg",
      description:
        "Full-scale commercial hypermart facility with PEB structure, wide glazed frontage, and a complete concrete apron delivered for grand retail opening.",
      layout: "fullscreen",
      featured: true
    },
    {
      id: "ratnadeep-peb-building",
      title: "Ratnadeep Commercial PEB",
      category: "Pre-Engineered Buildings",
      location: "Hyderabad",
      image: "/projects/ratnadeep-peb-building.jpg",
      images: [
        "/projects/ratnadeep-peb-building.jpg",
        "/projects/ratnadeep-facade-construction.jpg",
        "/projects/ratnadeep-signage-install.jpg"
      ],
      description:
        "Modern blue-and-white PEB commercial facility for Ratnadeep, delivered from structural shell through signage installation and final handover.",
      layout: "split",
      featured: true
    },
    {
      id: "peb-frame-aerial",
      title: "PEB Frame — Aerial Completion",
      category: "Pre-Engineered Buildings",
      location: "Andhra Pradesh",
      image: "/projects/peb-frame-aerial.jpg",
      description:
        "Elevated view of a completed steel skeleton with full purlin grid and precision-welded connections, set across an open rural plot.",
      layout: "overlap"
    },
    {
      id: "mahindra-service-showroom",
      title: "Mahindra Automobile Service Showroom",
      category: "Commercial Construction",
      image: "/projects/mahindra-service-showroom.jpeg",
      description:
        "Full-scale automotive facility featuring ACP metal cladding, structural glass frontage, and dedicated service bay infrastructure.",
      layout: "portrait"
    },
    {
      id: "tata-motors-frontage",
      title: "Tata Motors Commercial Frontage",
      category: "Commercial Construction",
      image: "/projects/tata-motors-frontage.jpeg",
      description:
        "Vehicle showroom exterior frontage with frameless structural glazing, branded panel cladding, and a concrete entrance ramp.",
      layout: "split"
    },
    {
      id: "service-center-epoxy-flooring",
      title: "Automobile Service Bay — Epoxy Flooring",
      category: "Interior & Finishing Works",
      image: "/projects/service-center-epoxy-flooring.jpg",
      description:
        "Heavy-duty epoxy-coated service bay flooring with lane markings and hydraulic lift zones, finished for daily automotive operations.",
      layout: "fullscreen"
    },
    {
      id: "industrial-interior-completed",
      title: "Industrial Warehouse — Completed Interior",
      category: "Industrial Construction",
      image: "/projects/industrial-interior-completed.jpg",
      description:
        "Clear-span warehouse interior with exposed structural steel columns, natural daylighting, and a finished concrete floor slab.",
      layout: "portrait"
    },
    {
      id: "industrial-shed-lighting",
      title: "Industrial Shed — Ambient Interior",
      category: "Industrial Construction",
      image: "/projects/industrial-shed-lighting.jpeg",
      description:
        "Large-span industrial shed interior with optimized natural and artificial lighting, structural truss system, and concrete floor.",
      layout: "overlap"
    },
    {
      id: "active-site-execution",
      title: "Active Site — Structural Execution",
      category: "Project Execution",
      image: "/projects/hero-ai-construction.jpg",
      description:
        "Live structural steel erection captured mid-execution — coordinated scaffolding, safety protocol, and precision site supervision.",
      layout: "fullscreen"
    }
  ],
  whyChooseUs: {
    items: [
      {
        lines: ["PRECISION", "IN EVERY", "DETAIL."],
        description: "Material-aware execution, structural discipline, and rigorous site supervision at every phase.",
        image: "/projects/indoor-sports-roofing.jpeg"
      },
      {
        lines: ["BUILT", "TO", "ENDURE."],
        description: "Heavy-duty structures engineered for multi-decadal performance under severe industrial loads.",
        image: "/projects/warehouse-exterior-cladding.jpeg"
      },
      {
        lines: ["QUALITY", "THAT", "SHOWS."],
        description: "Our work speaks through clean execution, safety compliance, and dependable project handovers.",
        image: "/projects/roadside-commercial-shell.jpeg"
      }
    ]
  },
  contact: {
    phone: "9390055667",
    email: "bsc@boppanasrinivascontractor.com",
    address: "Andhra Pradesh & Telangana, India",
    whatsapp: "919390055667",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.3995858377502!2d78.55916747493714!3d17.488428683416085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9bbd503c00a5%3A0x944a3c6187e921d8!2sBoppana%20Srinivas%20Contractor!5e0!3m2!1sen!2sin!4v1778492848869!5m2!1sen!2sin"
  },
  theme: {
    accent: "#9A7355",
    sand: "#EBE4D8",
    dark: "#121110"
  },
  visibility: {
    hero: true,
    featured: true,
    construction: true,
    services: true,
    projects: true,
    about: true,
    whyUs: true,
    contact: true
  },
  seo: {
    title: "Boppana Srinivas Contractor | Industrial & PEB Construction Specialists",
    description:
      "Specialized in Pre-Engineered Buildings (PEB), Industrial Warehousing, Commercial Showrooms, and Heavy Civil Contracting across Andhra Pradesh & Telangana.",
    keywords: [
      "PEB contractor",
      "pre-engineered building",
      "industrial shed builder",
      "commercial construction",
      "civil contractor Andhra Pradesh",
      "Boppana Srinivas Contractor",
      "BSC contractor",
      "National Mart construction",
      "Ratnadeep PEB"
    ]
  }
};

export const projectTypes = defaultSiteContent.services.map((service) => service.title);
