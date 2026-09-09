"use client";

import type { SiteContent } from "@/lib/types";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { TextReveal } from "@/components/animations/TextReveal";

export function Contact({ content }: { content: SiteContent }) {
  return (
    <section id="contact" className="relative bg-warm-black py-24 text-ivory sm:py-32 lg:py-40">
      <div className="section-shell relative z-10 grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Left Column: Direct Contact Details */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="eyebrow text-bronze">Initiate Project</p>
            <TextReveal
              as="h2"
              lines={["LET'S BUILD", "SOMETHING", "REMARKABLE."]}
              className="mt-6 max-w-3xl"
              lineClassName="display-headline text-ivory"
            />

            <div className="mt-12 space-y-8">
              <div>
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-stone">Direct Call / WhatsApp</span>
                <a
                  href={`tel:${content.contact.phone}`}
                  className="group mt-2 flex items-center gap-3 font-display text-2xl tracking-[-0.02em] text-ivory transition-colors hover:text-bronze sm:text-4xl"
                >
                  +91 {content.contact.phone}
                  <span className="text-bronze transition-transform duration-300 group-hover:translate-x-2">→</span>
                </a>
              </div>

              <div>
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-stone">Email Enquiry</span>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="group mt-2 block text-base font-medium uppercase tracking-[0.16em] text-stone/90 transition-colors hover:text-ivory sm:text-lg"
                >
                  {content.contact.email}
                </a>
              </div>

              <div>
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-stone">Execution Regions</span>
                <p className="mt-2 text-base leading-relaxed text-stone/80">{content.contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Enquiry Form Box */}
        <div className="border border-white/15 bg-charcoal/90 p-8 shadow-cinematic backdrop-blur-md sm:p-12">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <h3 className="font-display text-xl uppercase tracking-[0.15em] text-ivory sm:text-2xl">Project Enquiry</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone">
                Provide your build requirements below. Submitting will validate fields and launch WhatsApp ready to send.
              </p>
            </div>
            <span className="h-2 w-2 rounded-full bg-bronze animate-ping" />
          </div>

          <div className="mt-8">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}

