import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function inferProjectCopy(fileName: string, index: number) {
  const name = fileName.toLowerCase();

  if (name.includes("badminton") || name.includes("sports")) {
    return {
      title: "Indoor Sports Facility",
      category: "Interior Works",
      description:
        "High-roof indoor court facility with steel framing, bright wall finishes, and controlled lighting for daily use."
    };
  }

  if (name.includes("roof") || name.includes("shed") || name.includes("pre-engineered")) {
    return {
      title: "Pre-Engineered Steel Structure",
      category: "Civil Contracting",
      description:
        "Industrial shed execution with structural steel, metal roofing, wall cladding, and wide-span interior planning."
    };
  }

  if (name.includes("showroom") || name.includes("motors") || name.includes("mahindra") || name.includes("tata")) {
    return {
      title: "Automobile Showroom Build",
      category: "Commercial Construction",
      description:
        "Commercial frontage and service-bay construction with facade panels, glazing, and practical access areas."
    };
  }

  if (name.includes("warehouse") || name.includes("logistics")) {
    return {
      title: "Warehouse Construction",
      category: "Commercial Construction",
      description:
        "Large-format warehouse work with durable wall systems, concrete movement areas, and utility-ready interiors."
    };
  }

  return {
    title: `Construction Project ${index + 1}`,
    category: "Site Supervision",
    description:
      "Documented site progress showing coordinated civil, structural, and finishing work for a commercial build."
  };
}

export function hexToHsl(hex: string) {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
