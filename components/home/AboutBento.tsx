"use client";

import React from "react";
import { SectionShell } from "@/components/shape/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/shape/Divider";
import { Button } from "@/components/ui/Button";
import { BentoGrid } from "@/components/shape/BentoGrid";
import { BentoTile } from "@/components/shape/BentoTile";

export function AboutBento() {
  return (
    <SectionShell className="bg-paper text-ink">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Text Block */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <Eyebrow>ABOUT US</Eyebrow>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight text-ink mb-2">
            Great Catering Goes Beyond <span className="text-accent italic">Delicious Dishes</span>; It&apos;s Built on Outstanding Service.
          </h2>

          <Divider align="left" color="bg-accent" />

          {/* Two short paragraphs per Section 4.3 */}
          <div className="space-y-3 text-ink/75 text-sm sm:text-base leading-relaxed mb-6">
            <p>
              {/* TODO: add FSSAI licence no. */}
              Nanda Caterers makes every occasion memorable, just for you. We believe in leaving lasting impressions with over 20 years of experience and an FSSAI-licensed kitchen.
            </p>
            <p>
              Founded in 2005, Nanda Caterers has specialised in grand wedding banquets, corporate meetings, and joyful family celebrations across Mumbai, Pune, and Goa.
            </p>
          </div>

          {/* Outlined pill button "Learn More" -> /about */}
          <Button href="/about" variant="outline" size="md">
            Learn More
          </Button>
        </div>

        {/* Right Bento (2x2 grid of 4 catering feast photos) */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <BentoGrid>
            {/* Tile 1: Top-Left - Event buffet banquet arrangement */}
            <BentoTile
              type="photo"
              imageSrc="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
              imageAlt="Luxury wedding banquet buffet arrangement"
            />

            {/* Tile 2: Top-Right - Tandoori starters & skewers live counter */}
            <BentoTile
              type="photo"
              imageSrc="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80"
              imageAlt="Tandoori live counter and appetizers"
            />

            {/* Tile 3: Bottom-Left - Royal biryani & wedding feast handis */}
            <BentoTile
              type="photo"
              imageSrc="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"
              imageAlt="Royal Indian wedding biryani and feast handis"
            />

            {/* Tile 4: Bottom-Right - Royal Indian feast and thali display */}
            <BentoTile
              type="photo"
              imageSrc="/images/gujarati-kathiyawadi.jpg"
              imageAlt="Royal Indian feast and traditional festive spread"
            />
          </BentoGrid>
        </div>
      </div>
    </SectionShell>
  );
}
