import React from "react";
import { Hero } from "@/components/home/Hero";
import { AboutBento } from "@/components/home/AboutBento";
import { NumbersStrip } from "@/components/home/NumbersStrip";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { GalleryCarousel } from "@/components/home/GalleryCarousel";
import { MenuTeaser } from "@/components/home/MenuTeaser";
import { OfferBand } from "@/components/home/OfferBand";
import { getPublicMenuCategories, getPublicGalleryImages } from "@/lib/supabase/data";

export default async function HomePage() {
  const [categories, images] = await Promise.all([
    getPublicMenuCategories(),
    getPublicGalleryImages(),
  ]);

  const menuItems = categories.slice(0, 8).map((cat) => ({
    name: cat.title,
    slug: cat.slug,
    image: cat.image,
    tagline: cat.tagline,
  }));

  const carouselItems = images.slice(0, 8).map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    caption: img.title,
  }));

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero */}
      <Hero />

      {/* 2. About Bento */}
      <AboutBento />

      {/* B3. Numbers Strip (below the About section) */}
      <NumbersStrip />

      {/* 3. Services Teaser */}
      <ServicesTeaser />

      {/* B2. Testimonials + Google Rating (after the Services section) */}
      <HomeTestimonials />

      {/* 4. Gallery Carousel */}
      <GalleryCarousel items={carouselItems} />

      {/* 5. Menu Teaser */}
      <MenuTeaser items={menuItems} />

      {/* Offer / Enquiry Band */}
      <OfferBand />
    </div>
  );
}
