"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionShell } from "@/components/shape/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/shape/Divider";
import { Button } from "@/components/ui/Button";

// The 8 menu categories from Master Catering Menu
const cuisineTeaserItems = [
  {
    name: "Beverages",
    slug: "beverages",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    tagline: "Exotic mocktails, fresh coolers & hot kadai brews",
    itemCount: "32+ Dishes",
  },
  {
    name: "Soups",
    slug: "soups",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    tagline: "Classic creamy & Asian specialty broths",
    itemCount: "48+ Dishes",
  },
  {
    name: "Starters",
    slug: "starters",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    tagline: "Paneer tikkas, crispy rolls & kebabs",
    itemCount: "73+ Dishes",
  },
  {
    name: "Live Counters",
    slug: "live-counters",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    tagline: "Chaat stations, artisanal pasta & live stalls",
    itemCount: "114+ Dishes",
  },
  {
    name: "Salads & Sides",
    slug: "salads-accompaniments",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tagline: "Gourmet platters, fresh fruits & accompaniments",
    itemCount: "30+ Dishes",
  },
  {
    name: "Main Course",
    slug: "main-course",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    tagline: "Royal gravies, paneer, dals & artisanal breads",
    itemCount: "161+ Dishes",
  },
  {
    name: "Sweets",
    slug: "sweets",
    image: "/images/sweets.jpg",
    tagline: "Authentic halwas, dry fruit mithai & rabdi",
    itemCount: "98+ Dishes",
  },
  {
    name: "Desserts & Ice Cream",
    slug: "desserts-ice-cream",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    tagline: "Artisanal kulfi, falooda bar & sundaes",
    itemCount: "79+ Dishes",
  },
];

export interface MenuTeaserItem {
  name: string;
  slug: string;
  image: string;
  tagline?: string;
  itemCount?: string | number;
}

export function MenuTeaser({ items = cuisineTeaserItems }: { items?: MenuTeaserItem[] }) {
  // Merge fallback metadata (tagline, itemCount) with incoming items if needed
  const displayItems = items.map((item) => {
    const fallback = cuisineTeaserItems.find((c) => c.slug === item.slug);
    return {
      name: item.name,
      slug: item.slug,
      image: item.image || fallback?.image || "/images/hero-wedding-feast.jpg",
      tagline: item.tagline || fallback?.tagline || "Authentic culinary specialties prepared with passion",
      itemCount: item.itemCount || fallback?.itemCount || "Featured",
    };
  });

  return (
    <SectionShell className="bg-cream text-ink">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <Eyebrow>FOOD MENU</Eyebrow>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink">
          A Menu for Every Taste
        </h2>
        <p className="text-xs sm:text-sm text-ink/75 max-w-md mt-2">
          Crafted with authentic royal spices, premium farm-fresh ingredients, and bespoke presentation.
        </p>
        <Divider align="center" color="bg-accent" />
      </div>

      {/* Responsive Grid of Attractive Food Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 mb-10 max-w-6xl mx-auto">
        {displayItems.map((item) => (
          <Link
            key={item.slug}
            href={`/menu/${item.slug}`}
            prefetch={true}
            className="group relative flex flex-col justify-end aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-charcoal border border-accent/15 shadow-card hover:shadow-warm-lg hover:-translate-y-1.5 active:scale-98 transition-all duration-300 cursor-pointer select-none"
          >
            {/* Background Image with gentle zoom on hover */}
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Layered Gradient Overlay for rich contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

            {/* Top Badge: Item Count / Tag */}
            <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 z-10">
              <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/40 backdrop-blur-md text-white/95 border border-white/20 shadow-xs">
                <Sparkles className="w-2.5 h-2.5 text-turmeric shrink-0" />
                <span>{item.itemCount}</span>
              </span>
            </div>

            {/* Bottom Content Card Info */}
            <div className="relative z-10 p-3.5 sm:p-5 flex flex-col justify-end">
              <h3 className="font-heading font-extrabold text-sm sm:text-lg text-white group-hover:text-turmeric transition-colors duration-200 leading-tight">
                {item.name}
              </h3>

              <p className="text-[10.5px] sm:text-xs text-white/75 font-normal line-clamp-2 mt-1 sm:mt-1.5 leading-relaxed drop-shadow-xs">
                {item.tagline}
              </p>

              {/* Action Prompt */}
              <div className="flex items-center gap-1.5 mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-bold text-turmeric group-hover:text-white transition-colors">
                <span>View Menu</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>

            {/* Ambient hover border highlight */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-accent/40 pointer-events-none transition-colors duration-300" />
          </Link>
        ))}
      </div>

      {/* Button to full menu */}
      <div className="flex justify-center">
        <Button href="/menu" variant="filled" size="md">
          Explore All Categories & Dishes
        </Button>
      </div>
    </SectionShell>
  );
}
