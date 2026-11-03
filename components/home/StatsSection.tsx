"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { Utensils, Users, Award, Sparkles } from "lucide-react";

export function StatsSection() {
  const statsList = [
    {
      ...siteConfig.stats.varieties,
      icon: Utensils,
    },
    {
      ...siteConfig.stats.customers,
      icon: Users,
    },
    {
      ...siteConfig.stats.years,
      icon: Award,
    },
    {
      ...siteConfig.stats.freshness,
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-maroon via-maroon-dark to-maroon text-cream relative overflow-hidden border-y-2 border-turmeric/40 font-lora">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} variant="fadeUp" delay={idx * 0.1}>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-turmeric flex items-center justify-center mb-3.5 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div
                    className="font-sf-pro-bold font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-1"
                    style={{
                      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "SF Pro", "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                      fontWeight: 800,
                    }}
                  >
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>

                  <p className="text-sm sm:text-base font-medium text-turmeric/90">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
