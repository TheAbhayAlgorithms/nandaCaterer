import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { RelatedPages } from "@/components/ui/RelatedPages";

export const metadata: Metadata = {
  title: "Get Instant Catering Pricing | Multi-Step Wizard",
  description:
    "Calculate your per-plate catering estimate in seconds. Customize guest count, cuisine selections, live food counters, and request an estimate on WhatsApp from Nanda Caterers Mumbai.",
  openGraph: {
    title: "Instant Catering Pricing Wizard | Nanda Caterers Mumbai",
    description:
      "Interactive 5-step catering estimate builder for weddings, corporate banquets, and family parties in Mumbai.",
  },
};

export default function QuotePage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* Standard PageHero matching the rest of the website */}
      <PageHero
        title="Event Pricing Wizard"
        breadcrumb="Pricing"
        badge="Instant Per-Plate Estimate"
        imageSrc="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&crop=top&w=1920&h=750&q=80"
        bottomColor="var(--cream)"
      />

      {/* Intro Header */}
      <section className="bg-cream pt-10 sm:pt-14 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Eyebrow text="INTERACTIVE ESTIMATOR" />
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink mt-1 tracking-tight">
            Calculate Your Catering Investment
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-ink/75 max-w-xl mx-auto leading-relaxed">
            Calculate your estimated per-plate investment, specify dietary requirements, and receive a formal breakdown directly from our master planners.
          </p>
        </div>
      </section>

      {/* Suspended Client Wizard */}
      <Suspense
        fallback={
          <div className="py-20 text-center text-charcoal/60 font-serif">
            Loading interactive pricing builder...
          </div>
        }
      >
        <QuoteWizard />
      </Suspense>

      {/* Cross-linking to Related Pages */}
      <RelatedPages
        title="Explore Catering Packages & Menus"
        subtitle="Review our curated menu packages or discover past wedding setups"
        links={[
          {
            title: "Royal Packages",
            description: "Silver, Gold, and Royal banqueting packages with per-plate pricing.",
            href: "/packages",
            tag: "Curated Sets",
          },
          {
            title: "13 Food Cuisines",
            description: "Explore 500+ delicacies across Indian & international spreads.",
            href: "/menu",
            tag: "Full Menu",
          },
          {
            title: "Wedding Catering",
            description: "Grand multi-course wedding feasts with live interactive food stations.",
            href: "/services/wedding",
            tag: "Flagship",
          },
          {
            title: "Banquet Photo Gallery",
            description: "View real photos of our live counters, chaat stations, and dessert bars.",
            href: "/gallery",
            tag: "Visuals",
          },
        ]}
      />
    </div>
  );
}
