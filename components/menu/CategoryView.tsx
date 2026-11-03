"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { MenuCategory, menuCategories, Dish } from "@/data/menu";
import { SubTabs } from "./SubTabs";
import { DishList } from "./DishList";
import { SectionShell } from "@/components/shape/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/shape/Divider";
import { NextStepStrip } from "@/components/shape/NextStepStrip";

interface CategoryViewProps {
  category: MenuCategory;
}

export function CategoryView({ category }: CategoryViewProps) {
  const [activeSectionTitle, setActiveSectionTitle] = useState(
    category.sections[0]?.title || ""
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Sub-section tab items with counts
  const subSectionTabs = useMemo(() => {
    return category.sections.map((s) => ({
      title: s.title,
      count: s.dishes.length,
    }));
  }, [category.sections]);

  // Current active section dishes
  const activeSection = useMemo(() => {
    return (
      category.sections.find((s) => s.title === activeSectionTitle) ||
      category.sections[0]
    );
  }, [category.sections, activeSectionTitle]);

  // If search query is non-empty, search across all sections of this category
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    const allDishes: Dish[] = [];
    category.sections.forEach((sec) => {
      sec.dishes.forEach((d) => {
        const text = `${d.name} ${d.description || ""}`.toLowerCase();
        if (text.includes(q)) {
          allDishes.push(d);
        }
      });
    });
    return allDishes;
  }, [category.sections, searchQuery]);

  // Previous & Next cuisine navigation
  const currentIndex = menuCategories.findIndex((c) => c.slug === category.slug);
  const prevCategory =
    currentIndex > 0
      ? menuCategories[currentIndex - 1]
      : menuCategories[menuCategories.length - 1];
  const nextCategory =
    currentIndex < menuCategories.length - 1
      ? menuCategories[currentIndex + 1]
      : menuCategories[0];

  return (
    <div className="w-full bg-cream/40">
      {/* Sticky Sub-section Tabs */}
      <SubTabs
        sections={subSectionTabs}
        activeSection={activeSectionTitle}
        onSelectSection={(title) => {
          setSearchQuery("");
          setActiveSectionTitle(title);
        }}
      />

      <SectionShell className="pt-8 sm:pt-12 pb-16">
        {/* Search dishes input per Section 6.5 */}
        <div className="relative w-full max-w-lg mx-auto mb-8 sm:mb-12">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-ink/40 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search dishes in ${category.title}...`}
              className="w-full pl-11 pr-10 py-2.5 rounded-full bg-paper border border-ink/15 text-base sm:text-sm text-ink placeholder:text-ink/45 shadow-xs focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 p-1 text-ink/40 hover:text-ink transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dish List View */}
        {searchQuery ? (
          <div>
            <div className="text-center mb-6">
              <Eyebrow text="SEARCH RESULTS" />
              <h2 className="font-heading font-bold text-2xl text-ink mt-1">
                Matching dishes for &ldquo;{searchQuery}&rdquo;
              </h2>
              <Divider align="center" className="my-2" />
              <p className="text-xs text-ink/60">
                Found {searchResults.length} matching items across all sections
              </p>
            </div>

            <DishList dishes={searchResults} searchQuery={searchQuery} />
          </div>
        ) : (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <Eyebrow text={category.title.toUpperCase()} />
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-ink mt-1">
                {activeSection?.title}
              </h2>
            </div>

            {activeSection && (
              <DishList
                dishes={activeSection.dishes}
                sectionTitle={activeSection.title}
              />
            )}
          </div>
        )}

        {/* Category Switcher Strip (Previous / Next cuisine) per Section 6.5 */}
        <div className="flex items-center justify-between border-t border-ink/10 mt-16 pt-8 text-sm">
          <Link
            href={`/menu/${prevCategory.slug}`}
            className="group flex items-center gap-2 font-medium text-ink/75 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-ink/40 block font-normal">
                Previous Cuisine
              </span>
              <span className="font-semibold text-xs sm:text-sm">
                {prevCategory.title}
              </span>
            </div>
          </Link>

          <Link
            href={`/menu/${nextCategory.slug}`}
            className="group flex items-center gap-2 font-medium text-ink/75 hover:text-accent transition-colors text-right"
          >
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-ink/40 block font-normal">
                Next Cuisine
              </span>
              <span className="font-semibold text-xs sm:text-sm">
                {nextCategory.title}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </SectionShell>

      {/* One-strip NextStepStrip CTA strip per Section 6.5 & Rule 5 */}
      <NextStepStrip
        headline="Ready to curate your celebration menu?"
        primaryButtonText="Connect"
        primaryAction="enquiry"
        secondaryButtonText="All Cuisines"
        secondaryHref="/menu"
      />
    </div>
  );
}
