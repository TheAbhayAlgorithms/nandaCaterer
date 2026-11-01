import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { serviceAreasData } from "@/data/service-areas";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RelatedPages } from "@/components/ui/RelatedPages";

export const metadata: Metadata = {
  title: "Service Areas | Mumbai, Thane, Navi Mumbai, Pune & Goa",
  description:
    "Explore Nanda Caterers regional catering coverage. Providing catering services across Mumbai, Thane, Navi Mumbai, Pune, and destination weddings in Goa.",
  openGraph: {
    title: "Service Areas | Nanda Caterers Mumbai",
    description:
      "Wedding and corporate catering across Mumbai, Thane, Navi Mumbai, Pune, and Goa.",
  },
};

export default function ServiceAreasPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* Standard PageHero matching the rest of the website */}
      <PageHero
        title="Service Locations"
        breadcrumb="Service Areas"
        badge="Mumbai • Thane • Navi Mumbai • Pune • Goa"
        imageSrc="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&crop=top&w=1920&h=750&q=80"
        bottomColor="var(--cream)"
      />

      {/* Intro Header */}
      <section className="bg-cream pt-10 sm:pt-14 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Eyebrow text="REGIONAL COVERAGE" />
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink mt-1 tracking-tight">
            Catering Service Locations
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-ink/75 max-w-2xl mx-auto leading-relaxed">
            Headquartered in Bandra (East) with a branch in Khar (East), our logistics fleet and mobile kitchen caravans cater throughout the MMR region and destination retreats across Western India.
          </p>
        </div>
      </section>

      {/* 5 Area Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceAreasData.map((area) => (
            <div
              key={area.slug}
              className="group rounded-2xl bg-paper border border-ink/10 overflow-hidden shadow-xs hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={area.image}
                  alt={`${area.name} catering by Nanda Caterers`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-night/75 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {area.state}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight">
                    {area.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-ink/75 line-clamp-3 leading-relaxed mb-4">
                    {area.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-ink/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 block mb-1">
                      Popular Venues:
                    </span>
                    <ul className="text-xs text-ink/70 space-y-1">
                      {area.popularVenues.slice(0, 3).map((v, i) => (
                        <li key={i} className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span className="truncate">{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-ink/5 mt-5 flex items-center justify-between">
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-dark transition-colors group-hover:translate-x-1"
                  >
                    <span>View {area.name} Catering Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-linking to Related Pages */}
      <RelatedPages
        title="Explore Catering Packages & Menus"
        subtitle="Custom catering menus available across all our service locations"
        links={[
          {
            title: "Royal Packages",
            description: "Silver, Gold, and Royal banqueting packages with per-plate pricing.",
            href: "/packages",
            tag: "Pricing",
          },
          {
            title: "Royal Wedding Catering",
            description: "Grand wedding banquets with live counters, sweets & attentive stewards.",
            href: "/services/wedding",
            tag: "Flagship",
          },
          {
            title: "Interactive Pricing Wizard",
            description: "Calculate your estimated per-plate investment in 5 quick steps.",
            href: "/quote",
            tag: "Calculator",
          },
          {
            title: "Client Testimonials",
            description: "Read reviews from families and corporate clients across these cities.",
            href: "/testimonials",
            tag: "Reviews",
          },
        ]}
      />
    </div>
  );
}
