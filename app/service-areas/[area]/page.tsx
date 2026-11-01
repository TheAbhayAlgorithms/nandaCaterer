import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CheckCircle2,
  Building2,
  CalendarCheck,
  ArrowRight,
  MessageCircle,
  Phone,
} from "lucide-react";
import { serviceAreasData, getServiceArea } from "@/data/service-areas";
import { siteConfig } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface AreaPageProps {
  params: Promise<{ area: string }>;
}

export async function generateStaticParams() {
  return serviceAreasData.map((a) => ({
    area: a.slug,
  }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getServiceArea(slug);

  if (!area) {
    return {
      title: "Service Area Not Found | Nanda Caterers",
    };
  }

  return {
    title: `Best Caterers in ${area.name} | Wedding & Event Catering`,
    description: `${area.headline}. Catering for weddings, corporate events & parties in ${area.name} by Nanda Caterers.`,
    openGraph: {
      title: `Caterers in ${area.name} | Nanda Caterers`,
      description: area.description,
      images: [{ url: area.image, width: 1200, height: 630, alt: `${area.name} Catering` }],
    },
  };
}

export default async function ServiceAreaDetailPage({ params }: AreaPageProps) {
  const { area: slug } = await params;
  const area = getServiceArea(slug);

  if (!area) {
    notFound();
  }

  const whatsappHref = buildWhatsAppLink({
    location: area.name,
    customMessage: `Hello Nanda Caterers, I would like to inquire about catering services for our event in ${area.name}.`,
  });

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Standard PageHero */}
      <PageHero
        title={`Catering in ${area.name}`}
        breadcrumb={area.name}
        badge={`${area.name}, ${area.state}`}
        imageSrc={area.image}
        bottomColor="var(--cream)"
      />

      {/* Intro Header */}
      <section className="bg-cream pt-10 sm:pt-14 pb-8 border-b border-ink/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <Eyebrow text={`${area.name.toUpperCase()} CATERING EXCELLENCE`} />
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-ink tracking-tight">
            {area.headline}
          </h2>
          <p className="text-sm sm:text-base text-ink/75 max-w-2xl mx-auto leading-relaxed">
            {area.description}
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={`/quote?location=${encodeURIComponent(area.name)}`}
              variant="primary"
              size="lg"
            >
              <span>Get Pricing for {area.name}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-soft"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Planner</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content & Details */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-maroon block mb-1">
                Regional Presence
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                Flawless Event Execution in {area.name}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-charcoal/80 leading-relaxed">
                {area.description}
              </p>
            </div>

            {/* Key Regional Highlights */}
            <div className="bg-ivory rounded-3xl p-6 sm:p-8 border border-turmeric/30 space-y-4">
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Why Hosts in {area.name} Choose Nanda Caterers
              </h3>
              <div className="space-y-3">
                {area.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-leaf shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-charcoal/80 leading-snug">
                      {hl}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typical Events */}
            <div>
              <h3 className="font-serif text-xl font-bold text-charcoal mb-3">
                Events Frequently Catered in {area.name}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {area.typicalEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-cream/70 border border-turmeric/30 text-xs font-semibold text-charcoal"
                  >
                    • {evt}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Venues & Consultation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-cream rounded-3xl p-6 sm:p-8 border border-turmeric/40 shadow-sm space-y-4">
              <div className="border-b border-charcoal/10 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/50 block">
                  Local Experience
                </span>
                <h3 className="font-serif text-xl font-bold text-maroon mt-0.5">
                  Popular Venues Catered
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-charcoal/80">
                {area.popularVenues.map((venue, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                    <span>{venue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-maroon text-cream rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">
                Planning an Event in {area.name}?
              </h3>
              <p className="text-xs text-cream/80 leading-relaxed">
                Connect with our local event operations manager for venue logistics, kitchen setup permissions, and per-plate pricing.
              </p>
              <Button
                href={`/quote?location=${encodeURIComponent(area.name)}`}
                variant="primary"
                className="w-full justify-center"
              >
                <span>Calculate Per-Plate Pricing</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-linking to Related Pages */}
      <RelatedPages
        title={`Explore Menus & Packages for ${area.name}`}
        subtitle="Browse our 13 authentic cuisines and banquet tiers"
        links={[
          {
            title: "Royal Packages",
            description: "Silver, Gold, and Royal banqueting packages with per-plate pricing.",
            href: "/packages",
            tag: "Pricing",
          },
          {
            title: "Wedding Catering",
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
            title: "All Service Areas",
            description: "Explore our catering presence across Mumbai, Thane, Navi Mumbai, Pune & Goa.",
            href: "/service-areas",
            tag: "Coverage",
          },
        ]}
      />
    </div>
  );
}
