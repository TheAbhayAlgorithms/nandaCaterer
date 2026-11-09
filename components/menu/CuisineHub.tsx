"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { menuCategories, MenuCategory, getCategoryDishCount } from "@/data/menu";
import { NextStepStrip } from "@/components/shape/NextStepStrip";

interface CuisineHubProps {
  categories?: MenuCategory[];
}

export function CuisineHub({ categories = menuCategories }: CuisineHubProps) {
  return (
    <div className="w-full">
      {/* Cuisine Cards Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {categories.map((category) => {
            const dishCount = getCategoryDishCount(category);

            return (
              <Link
                key={category.slug}
                href={`/menu/${category.slug}`}
                prefetch={true}
                className="group relative rounded-3xl overflow-hidden bg-paper border border-accent/15 shadow-card hover:shadow-warm-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image container with gradient and dish count badge */}
                <div className="relative aspect-[16/11] overflow-hidden bg-charcoal">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Top Badge: Dish Count */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-white border border-white/20 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5 text-turmeric shrink-0" />
                      <span>{dishCount > 0 ? `${dishCount} Dishes` : "Specialty"}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-ink group-hover:text-accent transition-colors duration-200">
                      {category.title}
                    </h3>
                    <p className="text-xs text-ink/70 mt-1.5 line-clamp-2 leading-relaxed">
                      {category.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-accent/10 mt-4 flex items-center justify-between text-xs font-bold text-accent group-hover:text-accent-dark transition-colors">
                    <span>Explore Selection</span>
                    <div className="w-6 h-6 rounded-full bg-accent/10 group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-all duration-200">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>

      {/* CTA Strip */}
      <div className="max-w-[1200px] mx-auto px-4 mt-12">
        <NextStepStrip
          headline="Ready to curate your custom event menu?"
          primaryButtonText="Connect"
          secondaryButtonText="Explore Catering Services"
          secondaryHref="/services"
        />
      </div>
    </div>
  );
}
