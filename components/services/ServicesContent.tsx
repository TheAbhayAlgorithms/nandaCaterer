"use client";

import React, { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { ServiceModal } from "./ServiceModal";
import { servicesData, ServiceItem, whyChooseUs, commitmentStatement } from "@/data/services";
import { NextStepStrip } from "@/components/shape/NextStepStrip";
import { Clock, Users, CalendarCheck, ShieldCheck } from "lucide-react";

const whyIconMap = {
  punctual: Clock,
  delivery: Clock,
  team: Users,
  booking: CalendarCheck,
  quality: ShieldCheck,
};

export function ServicesContent() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <div className="w-full">
      {/* 6 Service Cards on Peach Doodle Band per Section 6.2 */}
      <section className="bg-food-doodle py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-accent/10">
        <div className="max-w-[1200px] mx-auto">
          {/* Commitment Line per Section 6.2 */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-2">
              Culinary Standards
            </p>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink">
              Bespoke Catering for Every Celebration
            </h2>
            <p className="text-ink/80 text-sm sm:text-base italic mt-2">
              &ldquo;{commitmentStatement}&rdquo;
            </p>
          </div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {servicesData.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                onSelect={(srv) => setSelectedService(srv)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* "Why Nanda Caterers" compact 4-icon row per Section 6.2 */}
      <section className="bg-paper py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-accent">
              Our Promise
            </span>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-ink mt-1">
              Why Choose Nanda Caterers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => {
              const Icon = whyIconMap[item.icon as keyof typeof whyIconMap] || ShieldCheck;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-peach/40 border border-accent/15 flex flex-col items-center text-center shadow-soft"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center mb-3 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-ink mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-ink/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Strip per Section 6.2 */}
      <div className="max-w-[1200px] mx-auto px-4">
        <NextStepStrip
          headline="Have an upcoming occasion in mind?"
          primaryButtonText="Connect"
          secondaryButtonText="Explore Food Menu"
          secondaryHref="/menu"
        />
      </div>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
