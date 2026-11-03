"use client";

import React from "react";
import Image from "next/image";
import { Plus, Check, Sparkles, Flame } from "lucide-react";
import { useQuoteSelection } from "@/context/QuoteSelectionContext";
import { Dish } from "@/data/menu";
import { getDishDescription } from "@/data/dishDescriptions";
import { cn } from "@/lib/cn";

interface DishItemProps {
  name: string;
  dish?: Dish;
  searchQuery?: string;
  className?: string;
}

export function DishItem({ name, dish, searchQuery, className }: DishItemProps) {
  const { isDishSelected, toggleDish } = useQuoteSelection();
  const isSelected = isDishSelected(name);

  // Check for special notes
  const hasExtraCharge = name.includes("(Extra Rs.30/-)") || !!dish?.extraPriceNote;
  const cleanName = name.replace("(Extra Rs.30/-)", "").trim();
  const description = dish?.description || getDishDescription(cleanName) || getDishDescription(name);

  // Render text with search highlight if applicable
  const renderHighlightedName = (text: string, query?: string) => {
    if (!query || query.trim() === "") return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={i}
          className="bg-turmeric/40 text-charcoal font-semibold rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between py-2.5 px-3 rounded-xl transition-all duration-200 hover:bg-saffron/10 border border-transparent hover:border-turmeric/20",
        isSelected && "bg-saffron/15 border-turmeric/30",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Leading Veg Dot & Name */}
        <div className="flex items-center gap-2 min-w-0 pr-1">
          {dish?.type && (
            <span
              className={cn(
                "w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform duration-200",
                dish.type === "veg" ? "bg-leaf" : "bg-red-600"
              )}
              aria-label={dish.type === "veg" ? "Vegetarian" : "Non-Vegetarian"}
            />
          )}
          <span className="font-semibold text-xs sm:text-sm text-charcoal truncate">
            {renderHighlightedName(cleanName, searchQuery)}
          </span>
        </div>

        {/* Dotted Leader Line */}
        <div className="flex-1 mx-1 border-b border-dotted border-charcoal/20 group-hover:border-saffron transition-colors" />

        {/* Action Button */}
        <button
          type="button"
          onClick={() => toggleDish(name)}
          aria-label={isSelected ? `Remove ${cleanName} from menu selection` : `Add ${cleanName} to menu selection`}
          className={cn(
            "shrink-0 w-7 h-7 min-w-[28px] min-h-[28px] max-w-[28px] max-h-[28px] aspect-square p-0 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
            isSelected
              ? "bg-accent text-white shadow-xs scale-105"
              : "bg-peach/60 text-ink/60 hover:bg-accent hover:text-white border border-accent/20"
          )}
        >
          {isSelected ? <Check className="w-3.5 h-3.5 shrink-0" /> : <Plus className="w-3.5 h-3.5 shrink-0" />}
        </button>
      </div>

      {/* Optional image if present */}
      {dish?.image && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden my-2">
          <Image
            src={dish.image}
            alt={cleanName}
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover"
          />
        </div>
      )}

      {/* Description & Tags if available */}
      {(dish || description) && (
        <div className="pl-4 mt-1 space-y-1">
          {description && (
            <p className="text-[11px] text-charcoal/65 leading-relaxed line-clamp-3">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {dish?.isJainAvailable && (
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                Jain Option
              </span>
            )}
            {dish?.isLiveCounter && (
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 flex items-center gap-0.5">
                <Flame className="w-2.5 h-2.5 text-amber-600" />
                Live Stall
              </span>
            )}
            {dish?.isPopular && (
              <span className="text-[9px] font-bold uppercase tracking-wider text-maroon bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                Chef&apos;s Special
              </span>
            )}
            {hasExtraCharge && (
              <span className="text-[9px] font-bold bg-maroon/10 text-maroon px-1.5 py-0.2 rounded">
                {dish?.extraPriceNote || "Extra Rs.30/-"}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
