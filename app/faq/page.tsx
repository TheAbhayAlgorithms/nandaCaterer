import React from "react";
import type { Metadata } from "next";
import { HelpCircle, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { detailedFaqData, flatFaqList } from "@/data/faq";
import { siteConfig } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Catering Mumbai",
  description:
    "Find answers about booking notice, guest capacities, Jain catering standards, tasting sessions, payment terms, and service areas across Mumbai, Pune & Goa with Nanda Caterers.",
  openGraph: {
    title: "Catering FAQ | Nanda Caterers Mumbai",
    description:
      "All your catering questions answered: menu customization, live counters, Jain food segregation, and pricing.",
  },
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: flatFaqList.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const whatsappHref = buildWhatsAppLink({
    customMessage: "Hello Nanda Caterers, I have a specific question regarding catering for my event.",
  });

  return (
    <div className="flex flex-col w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Standard PageHero matching the rest of the website */}
      <PageHero
        title="Frequently Asked Questions"
        breadcrumb="FAQ"
        badge="Knowledge Base & Catering Guidelines"
        imageSrc="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&crop=top&w=1920&h=750&q=80"
        bottomColor="var(--cream)"
      />

      {/* Intro Header */}
      <section className="bg-cream pt-10 sm:pt-14 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Eyebrow text="KNOWLEDGE BASE" />
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink mt-1 tracking-tight">
            Common Inquiries &amp; Policies
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-ink/75 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about reserving Nanda Caterers, tailoring regional menus, booking tasting sessions, and banquet logistics.
          </p>
        </div>
      </section>

      {/* FAQ Categories & Accordions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12">
        {detailedFaqData.map((category, catIdx) => {
          const accordionItems = category.items.map((item) => ({
            title: item.question,
            content: (
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                {item.answer}
              </p>
            ),
          }));

          return (
            <div key={category.category} className="space-y-4">
              <div className="border-b border-charcoal/10 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-maroon block">
                  Category {catIdx + 1}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mt-0.5">
                  {category.category}
                </h2>
              </div>

              <Accordion items={accordionItems} defaultOpenIndex={catIdx === 0 ? 0 : undefined} />
            </div>
          );
        })}
      </section>

      {/* Unanswered Questions Callout Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <div className="bg-cream rounded-3xl p-6 sm:p-10 border border-turmeric/40 shadow-warm text-center space-y-4">
          <span className="font-serif italic text-xl text-saffron block">
            Direct Host Assistance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Have a Specific Question About Your Venue or Menu?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 max-w-lg mx-auto">
            Our senior banquet captains are available Monday through Saturday from 9:00 AM to 9:00 PM to assist with venue coordination and menu tuning.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp (Instant Reply)</span>
            </a>

            <a
              href={`tel:${siteConfig.phone.raw}`}
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-ivory hover:bg-white text-charcoal border border-charcoal/20 font-semibold text-xs sm:text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-maroon" />
              <span>Call {siteConfig.phone.display}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Cross-linking to Related Pages */}
      <RelatedPages
        title="Continue Planning Your Banquet"
        subtitle="Explore our food repertoires, banqueting packages, and pricing builder"
        links={[
          {
            title: "Royal Packages",
            description: "Silver, Gold, and Royal banqueting packages with per-plate pricing.",
            href: "/packages",
            tag: "Pricing",
          },
          {
            title: "Interactive Pricing Wizard",
            description: "Calculate your estimated per-plate investment in 5 quick steps.",
            href: "/quote",
            tag: "Calculator",
          },
          {
            title: "13 Food Cuisines",
            description: "Explore 500+ delicacies across Indian & international spreads.",
            href: "/menu",
            tag: "Full Menu",
          },
          {
            title: "Verified Testimonials",
            description: "Read reviews from families and corporate clients who hired us.",
            href: "/testimonials",
            tag: "Reviews",
          },
        ]}
      />
    </div>
  );
}
