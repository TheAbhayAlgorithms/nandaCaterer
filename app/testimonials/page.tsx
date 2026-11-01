import React from "react";
import type { Metadata } from "next";
import { MessageCircle, ArrowRight } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";
import { siteConfig } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { TestimonialsFeed } from "@/components/testimonials/TestimonialsFeed";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews | Verified Wedding & Corporate Hosts",
  description:
    "Read real reviews from wedding families, corporate planners, and party hosts who trusted Nanda Caterers across Mumbai, Thane, Navi Mumbai, Pune & Goa.",
  openGraph: {
    title: "Client Testimonials | Nanda Caterers Mumbai",
    description:
      "4.9 / 5.0 rated caterer in Mumbai. Verified reviews from wedding receptions, corporate galas, and family milestones.",
  },
};

export default function TestimonialsPage() {
  const verifiedNonDemoReviews = testimonialsData.filter(
    (t: any) => !t.isPlaceholder && !t.isDemo
  );

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "CateringBusiness",
    name: siteConfig.name,
  };

  if (verifiedNonDemoReviews.length > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: verifiedNonDemoReviews.length.toString(),
      bestRating: "5",
      worstRating: "1",
    };
    jsonLd.review = verifiedNonDemoReviews.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      datePublished: "2026-01-15",
      reviewBody: t.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating.toString(),
        bestRating: "5",
      },
    }));
  }

  const whatsappHref = buildWhatsAppLink({
    customMessage: "Hello Nanda Caterers, I read your client reviews and would like to inquire about booking catering for our event.",
  });

  return (
    <div className="flex flex-col w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Standard PageHero matching the rest of the website */}
      <PageHero
        title="Client Testimonials"
        breadcrumb="Testimonials"
        badge="5,000+ Celebrations Catered"
        imageSrc="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&crop=top&w=1920&h=750&q=80"
        bottomColor="var(--cream)"
      />

      {/* Verified Feedback Intro Header */}
      <section className="bg-cream pt-10 sm:pt-14 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Eyebrow text="VERIFIED CUSTOMER FEEDBACK" />
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink mt-1 tracking-tight">
            Loved By Families &amp; Corporate Planners
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-ink/75 max-w-2xl mx-auto leading-relaxed">
            Over 5,000 successful banquets catered across Mumbai, Thane, Pune &amp; Goa since 2005. Here is what hosts have to say about our authentic taste, meticulous hygiene, and gracious service.
          </p>
        </div>
      </section>

      {/* Testimonials Grid with Dynamic Latest Google Reviews First */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 w-full">
        <TestimonialsFeed initialTestimonials={testimonialsData} />
      </section>

      {/* CTA Band matching site design system */}
      <section className="bg-peach/60 border-y border-ink/10 py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <Eyebrow text="PLAN YOUR CELEBRATION" />
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink">
            Ready to Plan an Unforgettable Feast?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-ink/75 max-w-xl mx-auto leading-relaxed">
            Experience our culinary quality firsthand with a complimentary pre-event tasting session.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Button href="/quote" variant="primary" size="lg">
              <span>Request Custom Pricing</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-soft"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>

      {/* Cross-linking to Related Pages */}
      <RelatedPages
        title="Explore Catering Services & Food Menus"
        subtitle="Discover the culinary collections and event arrangements our hosts loved"
        links={[
          {
            title: "Royal Wedding Catering",
            description: "Grand wedding banquets with live counters, sweets & attentive stewards.",
            href: "/services/wedding",
            tag: "Flagship",
          },
          {
            title: "13 Food Cuisines",
            description: "Explore 500+ delicacies across Indian & international spreads.",
            href: "/menu",
            tag: "Full Menu",
          },
          {
            title: "Curated Packages",
            description: "Silver, Gold, and Royal banqueting packages with per-plate pricing.",
            href: "/packages",
            tag: "Pricing",
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
