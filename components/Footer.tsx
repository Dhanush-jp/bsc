import type { SiteContent } from "@/lib/types";
import { BSCMark } from "@/components/navigation/Navigation";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="bg-warm-black py-16 text-ivory sm:py-20">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <BSCMark size={36} />
              <p className="font-display text-sm uppercase tracking-[0.28em]">Boppana Srinivas Contractor</p>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-stone">
              Precision construction for industrial, commercial, and structural projects.
            </p>
          </div>

          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-stone">Navigate</p>
            <nav className="mt-5 grid gap-3" aria-label="Footer">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-stone">Contact</p>
            <div className="mt-5 grid gap-3 text-sm">
              <a href={`tel:${content.contact.phone}`} className="text-ivory/75 transition-colors hover:text-ivory">
                {content.contact.phone}
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="break-all text-ivory/75 transition-colors hover:text-ivory"
              >
                {content.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.22em] text-stone">
          © {new Date().getFullYear()} Boppana Srinivas Contractor
        </div>
      </div>
    </footer>
  );
}
