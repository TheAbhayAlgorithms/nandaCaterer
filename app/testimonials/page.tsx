import React from "react";
import type { Metadata } from "next";
import { Star, ShieldCheck, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";
import { siteConfig } from "@/data/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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

      {/* Header */}
      <section className="bg-maroon text-cream pt-28 pb-14 md:pt-36 md:pb-20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <Breadcrumbs
            items={[{ label: "Testimonials" }]}
            className="text-cream/70 justify-center mb-2 px-0"
          />

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-saffron text-charcoal text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-charcoal text-charcoal" />
            Verified Customer Feedback
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Loved By Families & Corporate Planners
          </h1>

          <p className="text-sm sm:text-base text-cream/85 max-w-2xl mx-auto leading-relaxed">
            Over 5,000 successful banquets catered since 2005. Here is what hosts have to say about our taste, meticulous hygiene, and gracious service.
          </p>

          {/* Aggregate Rating Pill */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs">
            <div className="flex items-center gap-1 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-bold">4.9 / 5.0 Rating</span>
            <span className="text-cream/60">•</span>
            <span className="text-cream/80">500+ Verified Celebrations</span>
          </div>
        </div>
      </section>

      {/* Testimonials Grid with Dynamic Latest Google Reviews First */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <TestimonialsFeed initialTestimonials={testimonialsData} />
      </section>

      {/* CTA Band */}
      <section className="bg-cream border-y border-turmeric/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-charcoal">
            Ready to Plan an Unforgettable Feast?
          </h2>
          <p className="text-sm text-charcoal/75 max-w-xl mx-auto leading-relaxed">
            Experience our culinary quality firsthand with a complimentary pre-event tasting session.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button href="/quote" variant="primary" size="lg">
              <span>Request Custom Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
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
