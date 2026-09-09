import type { EnquiryFormData } from "@/lib/types";

const WHATSAPP_NUMBER = "919390055667";

export function buildWhatsAppMessage(data: EnquiryFormData): string {
  const lines = [
    "Hello Boppana Srinivas Contractor,",
    "I would like to make an enquiry.",
    "",
    `Name: ${data.name.trim()}`,
    `Phone: ${data.phone.trim()}`,
    `Email: ${data.email.trim()}`
  ];

  if (data.company?.trim()) {
    lines.push(`Company: ${data.company.trim()}`);
  }

  lines.push(
    `Project Type: ${data.projectType.trim()}`,
    `Project Location: ${data.projectLocation.trim()}`,
    `Message: ${data.message.trim()}`,
    "",
    "Please get in touch with me."
  );

  return lines.join("\n");
}

export function buildWhatsAppUrl(data: EnquiryFormData): string {
  const message = buildWhatsAppMessage(data);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppEnquiry(data: EnquiryFormData): void {
  const url = buildWhatsAppUrl(data);
  window.open(url, "_blank", "noopener,noreferrer");
}
