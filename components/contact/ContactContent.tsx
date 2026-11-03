"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/site";
import { openWhatsApp, getWhatsAppUrl } from "@/lib/whatsapp";
import { faqList } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "./QuoteForm";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

interface ContactContentProps {
  initialService?: string;
  initialDishes?: string[];
}

export function ContactContent({ initialService, initialDishes }: ContactContentProps) {
  return (
    <div className="py-16 md:py-24 space-y-24">
      {/* Intro & 3 Info Cards */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="fadeUp">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-accent text-2xl text-saffron font-semibold block mb-1">
              get in touch
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-maroon leading-tight">
              To make requests for further information, contact us via our social channels.
            </h2>
            <p className="text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
              {siteConfig.responsePromise}
            </p>
          </div>
        </Reveal>

        {/* 3 Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Main Office */}
          <Reveal variant="fadeUp" delay={0.08} className="h-full">
            <div className="rounded-3xl bg-ivory p-6 sm:p-8 border border-charcoal/10 shadow-warm flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-gradient text-charcoal flex items-center justify-center shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron block">
                    Headquarters
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-maroon mt-0.5">
                    Main Office
                  </h3>
                  <p className="text-sm text-charcoal/80 mt-2 leading-relaxed">
                    {siteConfig.offices[0].address}
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-charcoal/5 mt-6">
                <a
                  href={siteConfig.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-maroon hover:text-saffron transition-colors"
                >
                  <span>Get Directions on Map</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Branch Office */}
          <Reveal variant="fadeUp" delay={0.16} className="h-full">
            <div className="rounded-3xl bg-ivory p-6 sm:p-8 border border-charcoal/10 shadow-warm flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-maroon text-turmeric flex items-center justify-center shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-maroon block">
                    Khar Branch
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-maroon mt-0.5">
                    Branch Office
                  </h3>
                  <p className="text-sm text-charcoal/80 mt-2 leading-relaxed">
                    {siteConfig.offices[1].address}
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-charcoal/5 mt-6">
                <span className="text-xs text-charcoal/60">
                  Near Nirmal Nagar Police Station
                </span>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Contact Channels */}
          <Reveal variant="fadeUp" delay={0.24} className="h-full">
            <div className="rounded-3xl bg-maroon text-cream p-6 sm:p-8 shadow-warm flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-turmeric flex items-center justify-center shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-turmeric block">
                    Direct Connections
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-white mt-0.5">
                    Contact Channels
                  </h3>
                  <div className="space-y-2 mt-3 text-sm text-cream/90">
                    <p>
                      <a href={`tel:${siteConfig.phone.raw}`} className="hover:text-turmeric transition-colors font-semibold">
                        {siteConfig.phone.display}
                      </a>
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-turmeric pt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{siteConfig.workingHours.days}: {siteConfig.workingHours.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <a
                  href={getWhatsAppUrl()}
                  onClick={(e) => {
                    e.preventDefault();
                    openWhatsApp();
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors text-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Form & Google Map Side-by-Side */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <QuoteForm initialService={initialService} initialDishes={initialDishes} />
          </div>

          {/* Map Embed (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl overflow-hidden bg-ivory border border-turmeric/30 shadow-warm p-3">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden">
                <iframe
                  src={siteConfig.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nanda Caterers Office Location Map"
                  className="w-full h-full"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-heading font-bold text-maroon text-sm">
                    Nanda Caterers Headquarters
                  </p>
                  <p className="text-xs text-charcoal/70">Bandra East, Mumbai</p>
                </div>
                <a
                  href={siteConfig.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-gradient text-charcoal text-xs font-semibold shadow-sm hover:shadow transition-all"
                >
                  <span>Get directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social Channels Strip */}
            <div className="rounded-2xl bg-ivory p-5 border border-charcoal/10 text-center space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/70 block">
                Connect on Social Networks
              </span>
              <div className="flex items-center justify-center gap-4">
                {[
                  { name: "Facebook", href: siteConfig.social.facebook.url },
                  { name: "Instagram", href: siteConfig.social.instagram.url },
                  { name: "X (Twitter)", href: siteConfig.social.x.url },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full border border-charcoal/15 text-xs font-semibold text-charcoal hover:bg-gold-gradient hover:border-transparent transition-all"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <Reveal variant="fadeUp">
          <SectionHeading
            eyebrow="Help & Answers"
            title="Frequently Asked Questions"
            subtitle="Common questions regarding guest capacity, advance bookings, custom menus, and areas served."
          />
        </Reveal>

        <div className="mt-10">
          <Accordion items={faqList} />
        </div>
      </section>
    </div>
  );
}
