"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  ArrowRight,
  Utensils,
  X,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const CATERING_SERVICES = [
  "Wedding",
  "Corporate Event",
  "General Event",
  "Party / Function",
  "Others",
];

const STORAGE_KEY = "nanda_caterers_selected_dishes";
const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

export function ConnectContent() {
  const searchParams = useSearchParams();

  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Wedding");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedWaUrl, setGeneratedWaUrl] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSelectedDishes(JSON.parse(stored));
      }
    } catch {
      // LocalStorage access handled
    }
  }, []);

  useEffect(() => {
    const srvParam = searchParams.get("service");
    if (srvParam) {
      const match = CATERING_SERVICES.find(
        (s) => s.toLowerCase() === srvParam.toLowerCase()
      );
      if (match) {
        setService(match);
      }
    }
  }, [searchParams]);

  const removeDish = (dish: string) => {
    setSelectedDishes((prev) => {
      const updated = prev.filter((d) => d !== dish);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const clearSelection = () => {
    setSelectedDishes([]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch {
      // ignore
    }
  };

  const triggerMarigoldConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#F29A1F", "#E8B004", "#7A1F2B", "#FFF8EC"],
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = "Must be at least 2 characters";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Contact number is required";
    } else if (!phoneRegex.test(phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit Indian phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
    const waUrl = buildWhatsAppLink({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName,
      phone: phone.trim(),
      email: email.trim() || undefined,
      service,
      location: location.trim() || undefined,
      eventDate: eventDate || undefined,
      guestCount: guests.trim() || undefined,
      message: message.trim() || undefined,
      selectedDishes: selectedDishes.length > 0 ? selectedDishes : undefined,
    });

    setGeneratedWaUrl(waUrl);
    setIsSuccess(true);
    triggerMarigoldConfetti();

    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setGeneratedWaUrl("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setLocation("");
    setEventDate("");
    setGuests("");
    setMessage("");
    setErrors({});
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column: Direct Contact Info (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-3xl bg-maroon text-cream p-7 sm:p-9 shadow-warm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-turmeric block">
              Direct Reach
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mt-1">
              Tell us about your celebration
            </h2>
            <p className="text-cream/80 text-sm mt-3 leading-relaxed">
              Share your event details and menu choices. We connect directly on WhatsApp to coordinate tasting sessions and reservations.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Phone Direct */}
            <a
              href={`tel:${siteConfig.phone.raw}`}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0 shadow-sm text-white group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cream/70 block">
                  Phone Direct
                </span>
                <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {siteConfig.phone.display}
                </span>
              </div>
            </a>

            {/* WhatsApp Desk */}
            <a
              href={`https://wa.me/${siteConfig.phone.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm text-white group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cream/70 block">
                  WhatsApp Desk
                </span>
                <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {siteConfig.phone.display} (Instant)
                </span>
              </div>
            </a>

            {/* Operating Hours */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 shadow-sm text-turmeric">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cream/70 block">
                  Operating Hours
                </span>
                <span className="text-sm font-semibold text-white">
                  {siteConfig.workingHours.days}: {siteConfig.workingHours.time}
                </span>
              </div>
            </div>

            {/* Office Location */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 shadow-sm text-turmeric mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cream/70 block">
                  Bandra Headquarters
                </span>
                <span className="text-xs sm:text-sm text-cream/90 leading-relaxed block mt-0.5">
                  {siteConfig.offices[0].address}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/15 text-xs text-cream/75 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-turmeric shrink-0" />
            <span>Direct WhatsApp response within 30 minutes during hours.</span>
          </div>
        </div>
      </div>

      {/* Right Column: Connect Form (7 cols) */}
      <div className="lg:col-span-7">
        <div className="rounded-3xl bg-white p-6 sm:p-9 shadow-warm border border-charcoal/10">
          {isSuccess ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-bold text-2xl text-charcoal">
                  WhatsApp Chat Ready!
                </h3>
                <p className="text-sm text-charcoal/70 max-w-md mx-auto">
                  Your event details and menu choices have been pre-formatted. If WhatsApp didn’t open automatically, click the button below:
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generatedWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Open WhatsApp Chat Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-charcoal/20 text-charcoal text-sm font-medium hover:bg-cream transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Form Title & Subtitle */}
              <div className="border-b border-charcoal/10 pb-4">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-maroon">
                  Connect for Catering
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                  Custom packages for weddings, corporate meetings & celebrations across Mumbai.
                </p>
              </div>

              {/* Selected Dishes Notification */}
              {selectedDishes.length > 0 && (
                <div className="p-4 rounded-2xl bg-peach/70 border border-accent/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" />
                      {selectedDishes.length} Custom Dishes Included
                    </span>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="text-xs text-charcoal/60 hover:text-accent underline cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedDishes.map((dish) => (
                      <span
                        key={dish}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-xs text-charcoal border border-charcoal/10 shadow-xs"
                      >
                        <span>{dish}</span>
                        <button
                          type="button"
                          onClick={() => removeDish(dish)}
                          className="text-charcoal/40 hover:text-chilli cursor-pointer"
                          aria-label={`Remove ${dish}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-charcoal/60">
                    These dishes will automatically be appended to your WhatsApp enquiry.
                  </p>
                </div>
              )}

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
                  >
                    First Name <span className="text-chilli">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) {
                        setErrors((prev) => ({ ...prev, firstName: "" }));
                      }
                    }}
                    placeholder="e.g. Ramesh"
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron transition-all",
                      errors.firstName ? "border-chilli ring-1 ring-chilli" : "border-charcoal/20"
                    )}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-chilli mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
                  >
                    Last Name <span className="text-chilli">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) {
                        setErrors((prev) => ({ ...prev, lastName: "" }));
                      }
                    }}
                    placeholder="e.g. Shah"
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron transition-all",
                      errors.lastName ? "border-chilli ring-1 ring-chilli" : "border-charcoal/20"
                    )}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-chilli mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Contact Phone & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
                  >
                    Contact Phone <span className="text-chilli">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) {
                        setErrors((prev) => ({ ...prev, phone: "" }));
                      }
                    }}
                    placeholder="10-digit Mobile (e.g. 07039145304)"
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron transition-all",
                      errors.phone ? "border-chilli ring-1 ring-chilli" : "border-charcoal/20"
                    )}
                  />
                  {errors.phone && (
                    <p className="text-xs text-chilli mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. krishnasahu1702@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
              </div>

              {/* Catering Service & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="service"
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
                  >
                    Catering Service For <span className="text-chilli">*</span>
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
                  >
                    {CATERING_SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
                  >
                    Event Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bandra, Mumbai or Pune"
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
              </div>

              {/* Event Date & Approx. Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
                  >
                    Event Date (Optional)
                  </label>
                  <input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guests"
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
                  >
                    Approx. Guests (Optional)
                  </label>
                  <input
                    id="guests"
                    type="text"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    placeholder="e.g. 250 - 500"
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
              </div>

              {/* Special Notes or Specific Cuisine Requests */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
                >
                  Special Notes or Specific Cuisine Requests
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention any dietary needs (Jain / Swaminarayan), decoration ideas, or venue details..."
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron resize-none"
                />
              </div>

              {/* Submit Button (Direct to WhatsApp) */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-accent hover:bg-accent-dark text-white font-bold text-sm tracking-wide shadow-soft active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Connect on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-charcoal/60">
                🔒 Your details go directly to our catering desk on WhatsApp. No server storage or spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
