"use client";

import React, { useState, useId } from "react";
import Image from "next/image";
import {
  Phone,
  Clock,
  Award,
  MessageCircle,
  Calendar,
  Users,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Send,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

// Options
const EVENT_TYPES = [
  "Wedding",
  "Corporate",
  "Family Function",
  "Birthday/Party",
  "Festival",
  "Other",
] as const;

const GUEST_RANGES = [
  "Under 50",
  "50-100",
  "100-250",
  "250-500",
  "500+",
] as const;

const MENU_PREFERENCES = [
  "Veg",
  "Non-Veg",
  "Both",
  "Jain",
] as const;

interface FormState {
  // Step 1: Your Event
  eventType: string;
  eventDate: string;
  dateNotFixed: boolean;
  city: string;

  // Step 2: Menu & Guests
  guestRange: string;
  exactGuests: string;
  menuPreference: string;
  specialRequests: string;

  // Step 3: Your Details
  name: string;
  phone: string;

  // Honeypot field
  botTrap: string;
}

interface StepErrors {
  eventType?: string;
  eventDate?: string;
  city?: string;
  guests?: string;
  menuPreference?: string;
  name?: string;
  phone?: string;
}

export function EnquiryForm({ className = "" }: { className?: string }) {
  const formId = useId();

  // Current step (1, 2, or 3)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState<FormState>({
    eventType: "Wedding",
    eventDate: "",
    dateNotFixed: false,
    city: "Mumbai",
    guestRange: "100-250",
    exactGuests: "",
    menuPreference: "Both",
    specialRequests: "",
    name: "",
    phone: "",
    botTrap: "",
  });

  // Errors for the current step
  const [errors, setErrors] = useState<StepErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Format today's date for native min date (YYYY-MM-DD)
  const todayFormatted = new Date().toISOString().split("T")[0];

  // Effective display values for message & preview
  const effectiveDate = formData.dateNotFixed
    ? "Date not fixed yet"
    : formData.eventDate || "Not specified";

  const effectiveGuests = formData.exactGuests.trim()
    ? `${formData.exactGuests.trim()} guests`
    : formData.guestRange;

  // Build the exact WhatsApp text
  const buildMessageText = () => {
    const divider = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    const lines = [
      "👑 *NANDA CATERERS*",
      "🍽️ _A Perfect Blend of Sensational Food_",
      "",
      divider,
      "📋 *NEW CATERING ENQUIRY*",
      divider,
      `• 👤 *Client Name:* ${formData.name.trim() || "Valued Client"}`,
      `• 📞 *Contact Phone:* ${formData.phone.trim()}`,
      `• 🍽️ *Catering Service:* ${formData.eventType}`,
    ];

    if (effectiveDate) {
      lines.push(`• 📅 *Event Date:* ${effectiveDate}`);
    }
    if (effectiveGuests) {
      lines.push(`• 👥 *Estimated Guests:* ${effectiveGuests}`);
    }
    if (formData.city && formData.city.trim()) {
      lines.push(`• 📍 *Event Location:* ${formData.city.trim()}`);
    }
    if (formData.menuPreference) {
      lines.push(`• 🥗 *Menu Preference:* ${formData.menuPreference}`);
    }
    if (formData.specialRequests && formData.specialRequests.trim()) {
      lines.push(`• 📝 *Special Notes:* ${formData.specialRequests.trim()}`);
    }

    lines.push(divider);
    lines.push("For more information");
    lines.push("visit - https://nandacaterer.com");
    return lines.join("\n");
  };

  // Step 1 Validation
  const validateStep1 = (): boolean => {
    const newErrors: StepErrors = {};

    if (!formData.eventType) {
      newErrors.eventType = "Please select an event type.";
    }

    if (!formData.dateNotFixed) {
      if (!formData.eventDate) {
        newErrors.eventDate = "Please choose an event date or check 'My date is not fixed yet'.";
      } else {
        const selected = new Date(formData.eventDate);
        selected.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          newErrors.eventDate = "Event date cannot be in the past.";
        }
      }
    }

    if (!formData.city.trim()) {
      newErrors.city = "Please enter your event city.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = (): boolean => {
    const newErrors: StepErrors = {};

    if (!formData.guestRange && !formData.exactGuests.trim()) {
      newErrors.guests = "Please select or enter the estimated guest count.";
    } else if (formData.exactGuests.trim()) {
      const num = parseInt(formData.exactGuests.trim(), 10);
      if (isNaN(num) || num <= 0) {
        newErrors.guests = "Please enter a positive number of guests.";
      }
    }

    if (!formData.menuPreference) {
      newErrors.menuPreference = "Please select a menu preference.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = (): boolean => {
    const newErrors: StepErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const cleanedPhone = formData.phone
      .replace(/[\s\-+]/g, "")
      .replace(/^91/, "")
      .replace(/^0/, "");

    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Next Step Handlers
  const handleNextStep1 = () => {
    if (validateStep1()) {
      setErrors({});
      setCurrentStep(2);
    }
  };

  const handleNextStep2 = () => {
    if (validateStep2()) {
      setErrors({});
      setCurrentStep(3);
    }
  };

  // Final Submit Handler (WhatsApp Handoff)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot trap check
    if (formData.botTrap) return;

    if (!validateStep3()) {
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(true);

    const waText = buildMessageText();
    const waUrl = `https://wa.me/919967894979?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp in a new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div
      id="enquiry"
      className={cn(
        "w-full scroll-mt-28 rounded-2xl bg-paper shadow-warm border border-ink/10 overflow-hidden",
        className
      )}
    >
      {/* Top Eyebrow Section Header */}
      <div className="pt-6 sm:pt-8 pb-3 px-6 sm:px-8 text-center bg-cream/50 border-b border-ink/5">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#7A1F2B] block">
          PLAN YOUR EVENT
        </span>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink mt-1">
          Catering Availability &amp; Menu Consultation
        </h2>
      </div>

      {/* Two-Column Responsive Card: Left Panel + Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* ================================================================= */}
        {/* LEFT PANEL: Maroon #7A1F2B with Mandala / Gallery Overlay        */}
        {/* ================================================================= */}
        <div className="lg:col-span-5 bg-[#7A1F2B] text-white p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-between">
          {/* Subtle existing gallery photo overlay (low opacity 12%) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Nanda Caterers Banquet Decor"
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover opacity-12 mix-blend-luminosity"
            />
            {/* Gradient wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7A1F2B] via-[#7A1F2B]/95 to-[#5C1A1B]" />
          </div>

          {/* Decorative Paisley/Mandala SVG Pattern */}
          <div
            className="absolute -right-20 -top-20 w-80 h-80 pointer-events-none opacity-10 select-none z-0"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-[#C9A227] animate-spin-slow"
            >
              <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
              <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="25" stroke="currentColor" strokeWidth="1" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <path
                  key={deg}
                  d="M100 25 C108 55, 108 55, 100 85 C92 55, 92 55, 100 25 Z"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  fill="currentColor"
                  fillOpacity="0.15"
                  transform={`rotate(${deg} 100 100)`}
                />
              ))}
            </svg>
          </div>

          {/* Left Panel Content */}
          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/20 text-[#FFF8EF] border border-[#C9A227]/30 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-[#C9A227]" />
                Serving Mumbai since 2005
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                Tell us about your celebration
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Share your event details and menu choices. We connect directly on WhatsApp to coordinate tasting sessions and reservations.
              </p>
            </div>

            {/* Direct Contact Points */}
            <div className="space-y-3.5 pt-4 border-t border-white/15">
              {/* Phone */}
              <a
                href={`tel:${siteConfig.phone.raw}`}
                aria-label={`Call Nanda Caterers at ${siteConfig.phone.display}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C9A227] text-[#1B1210] flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-white/60 block font-medium">
                    Phone Direct
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-[#FFF8EF]">
                    +91 99678 94979
                  </span>
                </div>
              </a>

              {/* WhatsApp Link */}
              <a
                href="https://wa.me/919967894979"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Nanda Caterers on WhatsApp"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-white/60 block font-medium">
                    WhatsApp Desk
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-emerald-300">
                    +91 99678 94979 (Instant)
                  </span>
                </div>
              </a>

              {/* Map Location / Visit Us */}
              <a
                href={siteConfig.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Nanda Caterers on Google Maps"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#B8391B] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5 text-turmeric" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-white/60 block font-medium">
                    Map Location
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-turmeric flex items-center gap-1.5 transition-colors">
                    <span>Visit Us (Bandra East, Mumbai)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/60 group-hover:text-turmeric shrink-0" />
                  </span>
                </div>
              </a>

              {/* Hours */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-white/10 text-[#C9A227] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-white/60 block font-medium">
                    Operating Hours
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white/90">
                    Mon-Sat: 9 AM - 9 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT PANEL: 3-Step Multi-Step Form with Progress Bar             */}
        {/* ================================================================= */}
        <div className="lg:col-span-7 bg-ivory p-6 sm:p-8 md:p-10 flex flex-col justify-between">
          <div>
            {/* Step Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A1F2B]">
                  Step {currentStep} of 3:{" "}
                  {currentStep === 1 && "Your Event"}
                  {currentStep === 2 && "Menu & Guests"}
                  {currentStep === 3 && "Your Details"}
                </span>
                <span className="text-xs font-semibold text-ink/50">
                  {currentStep === 1 ? "33%" : currentStep === 2 ? "66%" : "100%"}
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2 rounded-full bg-cream border border-ink/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7A1F2B] via-[#B8391B] to-[#C9A227] transition-all duration-300 ease-out"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>

              {/* Step indicator pills */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                {[
                  { step: 1, label: "Your Event" },
                  { step: 2, label: "Menu & Guests" },
                  { step: 3, label: "Your Details" },
                ].map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    disabled={s.step > currentStep}
                    onClick={() => s.step < currentStep && setCurrentStep(s.step as 1 | 2 | 3)}
                    className={cn(
                      "text-[11px] font-semibold py-1 rounded transition-colors text-left sm:text-center",
                      currentStep === s.step
                        ? "text-[#7A1F2B] font-bold"
                        : currentStep > s.step
                        ? "text-ink/70 hover:text-ink cursor-pointer"
                        : "text-ink/30 cursor-not-allowed"
                    )}
                  >
                    {s.step}. {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FORM CONTAINER */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Spam Honeypot Field */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.botTrap}
                onChange={(e) => setFormData({ ...formData, botTrap: e.target.value })}
                className="hidden"
                aria-hidden="true"
              />

              {/* ============================================================= */}
              {/* STEP 1: YOUR EVENT                                            */}
              {/* ============================================================= */}
              {currentStep === 1 && (
                <div className="space-y-6 motion-reduce:transition-none transition-opacity duration-200">
                  {/* Event Type Selectable Pills */}
                  <div>
                    <label
                      id={`${formId}-event-type-label`}
                      className="block text-xs font-bold uppercase tracking-wider text-ink mb-2"
                    >
                      Event Type <span className="text-[#B8391B]">*</span>
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby={`${formId}-event-type-label`}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
                    >
                      {EVENT_TYPES.map((type) => {
                        const isSelected = formData.eventType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => {
                              setFormData({ ...formData, eventType: type });
                              if (errors.eventType) setErrors({ ...errors, eventType: undefined });
                            }}
                            className={cn(
                              "min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 text-center flex items-center justify-center border cursor-pointer select-none",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]",
                              isSelected
                                ? "bg-[#7A1F2B] text-white border-[#7A1F2B] shadow-xs"
                                : "bg-white text-ink border-ink/15 hover:border-[#C9A227]/60 hover:bg-cream"
                            )}
                          >
                            <span>{type}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.eventType && (
                      <p className="mt-1.5 text-xs text-[#B8391B] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.eventType}</span>
                      </p>
                    )}
                  </div>

                  {/* Event Date Picker & "Date not fixed yet" */}
                  <div>
                    <label
                      htmlFor={`${formId}-date`}
                      className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
                    >
                      Event Date <span className="text-[#B8391B]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id={`${formId}-date`}
                        type="date"
                        min={todayFormatted}
                        disabled={formData.dateNotFixed}
                        value={formData.eventDate}
                        onChange={(e) => {
                          setFormData({ ...formData, eventDate: e.target.value });
                          if (errors.eventDate) setErrors({ ...errors, eventDate: undefined });
                        }}
                        className={cn(
                          "w-full min-h-[44px] px-4 py-2.5 rounded-xl border text-sm text-ink transition-all",
                          "focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-[#C9A227]",
                          formData.dateNotFixed
                            ? "bg-ink/5 border-ink/10 text-ink/40 cursor-not-allowed"
                            : "bg-white border-ink/20"
                        )}
                      />
                    </div>

                    {/* Date not fixed checkbox */}
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        id={`${formId}-date-not-fixed`}
                        type="checkbox"
                        checked={formData.dateNotFixed}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormData({
                            ...formData,
                            dateNotFixed: checked,
                            eventDate: checked ? "" : formData.eventDate,
                          });
                          if (errors.eventDate) setErrors({ ...errors, eventDate: undefined });
                        }}
                        className="w-4 h-4 rounded text-[#7A1F2B] focus:ring-[#C9A227] cursor-pointer"
                      />
                      <label
                        htmlFor={`${formId}-date-not-fixed`}
                        className="text-xs text-ink/80 cursor-pointer select-none"
                      >
                        My date is not fixed yet
                      </label>
                    </div>

                    {errors.eventDate && (
                      <p className="mt-1.5 text-xs text-[#B8391B] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.eventDate}</span>
                      </p>
                    )}
                  </div>

                  {/* City Text Field */}
                  <div>
                    <label
                      htmlFor={`${formId}-city`}
                      className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
                    >
                      City / Event Location <span className="text-[#B8391B]">*</span>
                    </label>
                    <input
                      id={`${formId}-city`}
                      type="text"
                      placeholder="e.g. Mumbai, Thane, Navi Mumbai, Pune, Goa"
                      value={formData.city}
                      onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value });
                        if (errors.city) setErrors({ ...errors, city: undefined });
                      }}
                      className={cn(
                        "w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-ink/20 text-sm text-ink placeholder:text-ink/40 transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-[#C9A227]"
                      )}
                    />
                    {errors.city && (
                      <p className="mt-1.5 text-xs text-[#B8391B] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>

                  {/* Step 1 Actions */}
                  <div className="pt-4 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep1}
                      className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#7A1F2B] hover:bg-[#5C1A1B] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                    >
                      <span>Next: Menu &amp; Guests</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* STEP 2: MENU & GUESTS                                         */}
              {/* ============================================================= */}
              {currentStep === 2 && (
                <div className="space-y-6 motion-reduce:transition-none transition-opacity duration-200">
                  {/* Guests Selectable Pills */}
                  <div>
                    <label
                      id={`${formId}-guest-label`}
                      className="block text-xs font-bold uppercase tracking-wider text-ink mb-2"
                    >
                      Number of Guests <span className="text-[#B8391B]">*</span>
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby={`${formId}-guest-label`}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                    >
                      {GUEST_RANGES.map((range) => {
                        const isSelected = formData.guestRange === range && !formData.exactGuests.trim();
                        return (
                          <button
                            key={range}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => {
                              setFormData({ ...formData, guestRange: range, exactGuests: "" });
                              if (errors.guests) setErrors({ ...errors, guests: undefined });
                            }}
                            className={cn(
                              "min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 text-center flex items-center justify-center border cursor-pointer select-none",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]",
                              isSelected
                                ? "bg-[#7A1F2B] text-white border-[#7A1F2B] shadow-xs"
                                : "bg-white text-ink border-ink/15 hover:border-[#C9A227]/60 hover:bg-cream"
                            )}
                          >
                            <span>{range}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Optional Exact Guests Field */}
                    <div className="mt-2.5">
                      <label
                        htmlFor={`${formId}-exact-guests`}
                        className="text-[11px] text-ink/70 block mb-1"
                      >
                        Or enter exact number of guests (optional):
                      </label>
                      <input
                        id={`${formId}-exact-guests`}
                        type="number"
                        min="1"
                        placeholder="e.g. 175"
                        value={formData.exactGuests}
                        onChange={(e) => {
                          setFormData({ ...formData, exactGuests: e.target.value });
                          if (errors.guests) setErrors({ ...errors, guests: undefined });
                        }}
                        className={cn(
                          "w-full min-h-[44px] px-4 py-2 rounded-xl bg-white border border-ink/20 text-sm text-ink placeholder:text-ink/40 transition-all",
                          "focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-[#C9A227]"
                        )}
                      />
                    </div>

                    {errors.guests && (
                      <p className="mt-1.5 text-xs text-[#B8391B] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.guests}</span>
                      </p>
                    )}
                  </div>

                  {/* Menu Preference Selectable Pills */}
                  <div>
                    <label
                      id={`${formId}-menu-pref-label`}
                      className="block text-xs font-bold uppercase tracking-wider text-ink mb-2"
                    >
                      Menu Preference <span className="text-[#B8391B]">*</span>
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby={`${formId}-menu-pref-label`}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
                    >
                      {MENU_PREFERENCES.map((pref) => {
                        const isSelected = formData.menuPreference === pref;
                        return (
                          <button
                            key={pref}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => {
                              setFormData({ ...formData, menuPreference: pref });
                              if (errors.menuPreference) setErrors({ ...errors, menuPreference: undefined });
                            }}
                            className={cn(
                              "min-h-[44px] px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 text-center flex items-center justify-center border cursor-pointer select-none",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]",
                              isSelected
                                ? "bg-[#7A1F2B] text-white border-[#7A1F2B] shadow-xs"
                                : "bg-white text-ink border-ink/15 hover:border-[#C9A227]/60 hover:bg-cream"
                            )}
                          >
                            <span>{pref}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.menuPreference && (
                      <p className="mt-1.5 text-xs text-[#B8391B] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.menuPreference}</span>
                      </p>
                    )}
                  </div>

                  {/* Special Requests Optional Textarea */}
                  <div>
                    <label
                      htmlFor={`${formId}-special-requests`}
                      className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
                    >
                      Special Requests / Dietary Preferences (Optional)
                    </label>
                    <textarea
                      id={`${formId}-special-requests`}
                      rows={3}
                      placeholder="Mention any dietary needs (Jain / Swaminarayan), decoration ideas, or venue details..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className={cn(
                        "w-full px-4 py-2.5 rounded-xl bg-white border border-ink/20 text-sm text-ink placeholder:text-ink/40 transition-all resize-y",
                        "focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-[#C9A227]"
                      )}
                    />
                  </div>

                  {/* Step 2 Actions */}
                  <div className="pt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setErrors({});
                        setCurrentStep(1);
                      }}
                      className="min-h-[44px] px-5 py-2.5 rounded-full border border-ink/20 text-ink/80 hover:bg-cream font-semibold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep2}
                      className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#7A1F2B] hover:bg-[#5C1A1B] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                    >
                      <span>Next: Your Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* STEP 3: YOUR DETAILS                                          */}
              {/* ============================================================= */}
              {currentStep === 3 && (
                <div className="space-y-6 motion-reduce:transition-none transition-opacity duration-200">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor={`${formId}-name`}
                      className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
                    >
                      Your Name <span className="text-[#B8391B]">*</span>
                    </label>
                    <input
                      id={`${formId}-name`}
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={cn(
                        "w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-ink/20 text-sm text-ink placeholder:text-ink/40 transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-[#C9A227]"
                      )}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-[#B8391B] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* 10-Digit Mobile Number */}
                  <div>
                    <label
                      htmlFor={`${formId}-phone`}
                      className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
                    >
                      10-Digit Mobile Number (WhatsApp) <span className="text-[#B8391B]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-bold text-ink/50 select-none">
                        +91
                      </span>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        maxLength={15}
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        className={cn(
                          "w-full min-h-[44px] pl-12 pr-4 py-2.5 rounded-xl bg-white border border-ink/20 text-sm text-ink placeholder:text-ink/40 transition-all",
                          "focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-[#C9A227]"
                        )}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-[#B8391B] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Step 3 Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setErrors({});
                        setCurrentStep(2);
                      }}
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full border border-ink/20 text-ink/80 hover:bg-cream font-semibold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                      )}
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>Check Availability</span>
                    </button>
                  </div>

                  {/* Inline Feedback */}
                  {isSubmitted && isSubmitting && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping shrink-0" />
                      <span>Opening WhatsApp with your pre-filled enquiry...</span>
                    </div>
                  )}

                  {/* Trust Line */}
                  <p className="text-[11px] text-center text-ink/60 pt-2 border-t border-ink/5 leading-relaxed">
                    Replies within 2 working days. Your details are only sent to us on WhatsApp.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
