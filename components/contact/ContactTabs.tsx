"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  Clock,
  MessageCircle,
  MapPin,
  ExternalLink,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { openWhatsApp, getWhatsAppUrl } from "@/lib/whatsapp";
import { fivePrimaryFaqs } from "@/data/faq";
import { SectionShell } from "@/components/shape/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/shape/Divider";
import { NextStepStrip } from "@/components/shape/NextStepStrip";
import { cn } from "@/lib/cn";

type ContactTabKey = "direct" | "visit" | "faq";

interface ContactTabsProps {
  initialService?: string;
  initialDishes?: string[];
}

export function ContactTabs({}: ContactTabsProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const validTabs: ContactTabKey[] = ["direct", "visit", "faq"];
  
  // Backwards compatibility for 'enquiry'
  const resolvedTab: ContactTabKey =
    tabParam === "visit"
      ? "visit"
      : tabParam === "faq"
      ? "faq"
      : "direct";

  const [activeTab, setActiveTab] = useState<ContactTabKey>(resolvedTab);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // First FAQ open by default

  useEffect(() => {
    if (tabParam === "visit" || tabParam === "faq") {
      setActiveTab(tabParam);
    } else {
      setActiveTab("direct");
    }
  }, [tabParam]);

  useEffect(() => {
    const handlePopState = () => {
      const currentUrl = new URL(window.location.href);
      const tab = currentUrl.searchParams.get("tab");
      if (tab === "visit" || tab === "faq") {
        setActiveTab(tab);
      } else {
        setActiveTab("direct");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleTabChange = (key: ContactTabKey) => {
    setActiveTab(key);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", key);
    const newUrl = `/contact?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  const tabs: { key: ContactTabKey; label: string }[] = [
    { key: "direct", label: "Direct Contact" },
    { key: "visit", label: "Visit Us" },
    { key: "faq", label: "FAQ" },
  ];

  return (
    <div className="w-full">
      {/* Segmented Pill Control per Section 6.6 & 7 */}
      <div className="py-8 bg-paper border-b border-ink/10 flex justify-center">
        <div
          role="tablist"
          aria-label="Contact options"
          className="inline-flex p-1.5 rounded-full bg-cream/80 border border-ink/10 shadow-xs"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.key)}
                className={cn(
                  "relative isolate px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer select-none",
                  isActive
                    ? "text-white"
                    : "text-ink/70 hover:text-accent hover:bg-paper/60"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="contactTabPill"
                    className="absolute inset-0 rounded-full bg-accent shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels with AnimatePresence */}
      <SectionShell className="pt-10 sm:pt-14 pb-20">
        <AnimatePresence mode="wait">
          {/* TAB 1: DIRECT CONTACT */}
          {activeTab === "direct" && (
            <motion.div
              key="direct"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl mx-auto space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <Eyebrow text="DIRECT REACH" />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-ink mt-1">
                  We&apos;re Here to Help Plan Your Event
                </h2>
                <Divider align="center" className="my-2" />
                <p className="text-xs sm:text-sm text-ink/70">
                  Whether you have questions about our catering menus, minimum guest requirements, or event scheduling, our team is directly accessible across multiple channels.
                </p>
              </div>

              {/* 3-card contact grid */}
              {/* 2-card direct contact channels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* 1. Phone Card */}
                <div className="p-6 rounded-2xl bg-paper border border-ink/10 shadow-xs flex flex-col justify-between hover:shadow-card hover:-translate-y-0.5 transition-all">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-ink">
                      Call Us Directly
                    </h3>
                    <p className="text-xs text-ink/70 mt-1.5 leading-relaxed">
                      Speak directly with our senior catering coordinators for immediate bookings and inquiries.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ink/10">
                    <a
                      href={siteConfig.phoneTel}
                      className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-dark transition-colors"
                    >
                      <span>{siteConfig.phone.display}</span>
                    </a>
                    <span className="block text-[10px] text-ink/40 mt-1">
                      Mon–Sat: 9:00 AM – 9:00 PM
                    </span>
                  </div>
                </div>

                {/* 2. WhatsApp Card */}
                <div className="p-6 rounded-2xl bg-paper border border-ink/10 shadow-xs flex flex-col justify-between hover:shadow-card hover:-translate-y-0.5 transition-all">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-leaf/10 text-leaf flex items-center justify-center mb-4">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-ink">
                      WhatsApp Chat
                    </h3>
                    <p className="text-xs text-ink/70 mt-1.5 leading-relaxed">
                      Fast, direct chat for quick questions, sample menus, and event consultations.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ink/10">
                    <a
                      href={getWhatsAppUrl()}
                      onClick={(e) => {
                        e.preventDefault();
                        openWhatsApp();
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-leaf text-white font-semibold text-xs shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <span className="block text-center text-[10px] text-ink/40 mt-1">
                      Typically replies in 30 minutes
                    </span>
                  </div>
                </div>
              </div>

              {/* Banner: Looking for an Instant Menu Quote? */}
              <div className="p-6 sm:p-8 rounded-2xl bg-peach/60 border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-accent font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Planning a Celebration?</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-ink">
                    Looking for Custom Catering Pricing?
                  </h3>
                  <p className="text-xs text-ink/70 max-w-lg">
                    Build your custom multi-cuisine menu from 13 authentic categories and get transparent pricing estimate online.
                  </p>
                </div>
                <Link
                  href="/quote"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-dark text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  <span>Build Estimate Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </motion.div>
          )}

          {/* TAB 2: VISIT US */}
          {activeTab === "visit" && (
            <motion.div
              key="visit"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Left Column: Two Office Cards per Section 6.6 */}
              <div className="lg:col-span-5 space-y-6">
                {/* Main Office Card */}
                <div className="bg-paper p-6 sm:p-7 rounded-2xl border border-ink/10 shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                      Headquarters
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-ink">
                    Main Office
                  </h3>
                  <p className="text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
                    {siteConfig.offices[0].address}
                  </p>
                  <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between text-xs">
                    <span className="text-ink/60">{siteConfig.hours}</span>
                    <a
                      href={siteConfig.mapDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      <span>Get directions</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Branch Office Card */}
                <div className="bg-paper p-6 sm:p-7 rounded-2xl border border-ink/10 shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                      Branch Facility
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-ink">
                    Branch Office
                  </h3>
                  <p className="text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
                    {siteConfig.offices[1].address}
                  </p>
                  <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between text-xs">
                    <span className="text-ink/60">{siteConfig.hours}</span>
                    <a
                      href={siteConfig.mapDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      <span>Get directions</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Google Maps Embed (Lazy iframe) per Section 6.6 & 10 */}
              <div className="lg:col-span-7 h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-ink/10 shadow-card bg-cream">
                <iframe
                  title="Nanda Caterers Mumbai Location"
                  src={siteConfig.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          )}

          {/* TAB 3: FAQ */}
          {activeTab === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl mx-auto space-y-4"
            >
              <div className="text-center mb-8">
                <Eyebrow text="FREQUENTLY ASKED QUESTIONS" />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-ink mt-1">
                  Everything You Need to Know
                </h2>
                <Divider align="center" className="my-2" />
              </div>

              {/* 5 Q&A Accordion (one open at a time) per Section 6.6 & 9.5 */}
              <div className="space-y-3">
                {fivePrimaryFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-2xl bg-paper border border-ink/10 shadow-xs overflow-hidden transition-all duration-200"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpenFaqIndex(isOpen ? null : idx)
                        }
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-peach/30 transition-colors"
                      >
                        <span className="font-heading font-semibold text-sm sm:text-base text-ink">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-accent shrink-0 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-ink/75 leading-relaxed border-t border-ink/5">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionShell>

      {/* One-strip NextStepStrip CTA per Section 1 Rule 5 */}
      <NextStepStrip
        headline="Ready to plan an unforgettable culinary feast?"
        primaryButtonText="Connect"
        primaryAction="enquiry"
        secondaryButtonText="Explore Menu"
        secondaryHref="/menu"
      />
    </div>
  );
}
