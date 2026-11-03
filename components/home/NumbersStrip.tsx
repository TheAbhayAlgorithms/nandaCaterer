"use client";

import React from "react";
import { numbersStripStats, SHOW_DEMO_CONTENT } from "@/data/siteContent";
import { TornEdge } from "@/components/shape/TornEdge";
import { Counter } from "@/components/ui/Counter";

export function NumbersStrip() {
  const activeStats = numbersStripStats.filter(
    (item) => SHOW_DEMO_CONTENT || !item.isDemo
  );

  if (activeStats.length === 0) return null;

  return (
    <section className="relative w-full bg-gradient-to-b from-[#E5CFBF] via-[#EEDCCD] to-[#F5E7DB] border-b border-ink/10 pt-12 sm:pt-14 pb-10 sm:pb-12 overflow-hidden">
      {/* Torn-paper top edge cut from previous white section with subtle paper drop-shadow */}
      <TornEdge
        position="top"
        color="var(--paper)"
        variant={1}
        className="overflow-visible drop-shadow-[0_4px_8px_rgba(42,27,22,0.12)]"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {activeStats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center">
              <Counter
                value={stat.numericValue}
                suffix={stat.suffix}
                singularSuffix={stat.singularSuffix}
                prefix={stat.prefix}
                duration={1.8}
                startValue={1}
                className="font-sf-pro-bold font-bold text-2xl sm:text-3xl lg:text-4xl text-accent tracking-tight"
                style={{
                  fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "SF Pro", "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                  fontWeight: 700,
                }}
              />
              <span className="text-xs sm:text-sm font-semibold text-ink mt-1.5 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
