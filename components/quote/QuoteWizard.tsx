"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  Trash2,
  Utensils,
} from "lucide-react";
import { useQuoteSelection } from "@/context/QuoteSelectionContext";
import { siteConfig } from "@/data/site";
import { openWhatsApp, getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

const EVENT_TYPES = [
  { id: "Wedding", label: "Wedding / Reception", desc: "Grand multi-course feast with live counters" },
  { id: "Corporate Event", label: "Corporate Banquet", desc: "Punctual corporate lunches & high-teas" },
  { id: "Party / Function", label: "Birthday / Party", desc: "Interactive stalls, chaat & party snacks" },
  { id: "Family Function", label: "Family Function / Pooja", desc: "Traditional sattvic or regional feast" },
  { id: "Social Event", label: "Festival / Community", desc: "Large gathering buffets and farali catering" },
  { id: "Others", label: "Custom Occasion", desc: "Bespoke setup tailored to your requirements" },
];

const PACKAGES = [
  { id: "silver", name: "Silver Package", price: 750, desc: "₹650 – ₹850 / plate (Essential 3-Course Spread)" },
  { id: "gold", name: "Gold Package", price: 1100, desc: "₹950 – ₹1,250 / plate (Most Popular Wedding Feast)" },
  { id: "royal", name: "Royal Feast", price: 1550, desc: "₹1,400 – ₹1,800+ / plate (Luxury Bespoke Banqueting)" },
  { id: "custom", name: "Build From Scratch", price: 900, desc: "A-la-carte selection across our 13 cuisines" },
];

const LOCATIONS = [
  "Mumbai - Bandra / Khar / Santacruz",
  "Mumbai - South Mumbai / Town",
  "Mumbai - Western Suburbs (Andheri to Borivali)",
  "Mumbai - Central Suburbs (Kurla to Mulund)",
  "Thane City & Ghodbunder",
  "Navi Mumbai (Vashi, Nerul, Belapur)",
  "Pune City & Suburbs",
  "Goa (Destination Event)",
  "Other Location",
];

export function QuoteWizard() {
  const searchParams = useSearchParams();
  const { selectedDishes, removeDish, clearSelection } = useQuoteSelection();

  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState("Wedding");
  const [selectedPackage, setSelectedPackage] = useState("gold");
  const [guestCount, setGuestCount] = useState<number>(250);
  const [eventDate, setEventDate] = useState("");
  const [mealSlot, setMealSlot] = useState("Dinner");
  const [location, setLocation] = useState(LOCATIONS[0]);

  // Dietary options
  const [jainRequired, setJainRequired] = useState(false);
  const [liveCountersWanted, setLiveCountersWanted] = useState(true);
  const [specialDietary, setSpecialDietary] = useState("");

  // Contact info
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Initialize from search params
  useEffect(() => {
    const srvParam = searchParams.get("service");
    if (srvParam) {
      const match = EVENT_TYPES.find((e) => e.id.toLowerCase() === srvParam.toLowerCase());
      if (match) setEventType(match.id);
    }
    const pkgParam = searchParams.get("package");
    if (pkgParam) {
      const matchPkg = PACKAGES.find((p) => p.id === pkgParam.toLowerCase());
      if (matchPkg) setSelectedPackage(matchPkg.id);
    }
  }, [searchParams]);

  // Calculate estimated price range
  const currentPkg = PACKAGES.find((p) => p.id === selectedPackage) || PACKAGES[1];
  const baseRate = currentPkg.price;
  const estimatedMinTotal = Math.round(baseRate * guestCount * 0.95);
  const estimatedMaxTotal = Math.round(baseRate * guestCount * 1.15);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const whatsappDetails = {
    fullName,
    phone,
    location,
    event: `${eventType} (${currentPkg.name})`,
    date: eventDate ? `${eventDate} (${mealSlot})` : mealSlot,
    guests: `${guestCount} Guests`,
    notes: `${notes}${jainRequired ? " | Strict Jain Menu Required" : ""}${liveCountersWanted ? " | Live Food Counters Requested" : ""}`,
    selectedDishes: selectedDishes.length > 0 ? selectedDishes : undefined,
  };

  const whatsappHref = getWhatsAppUrl(whatsappDetails);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Step Indicators */}
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[1, 2, 3, 4, 5].map((i) => {
            const isCompleted = step > i;
            const isCurrent = step === i;
            return (
              <div key={i} className="flex items-center">
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-maroon text-gold ring-4 ring-gold/30 shadow-md"
                      : "bg-charcoal/10 text-charcoal/40"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : i}
                </button>
                {i < 5 && (
                  <div
                    className={`w-8 sm:w-16 h-1 mx-1 sm:mx-2 rounded transition-colors ${
                      step > i ? "bg-emerald-600" : "bg-charcoal/10"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-3">
          <span className="text-xs font-bold uppercase tracking-widest text-maroon">
            {step === 1 && "Step 1: Event Type & Package Tier"}
            {step === 2 && "Step 2: Date, Location & Guest Count"}
            {step === 3 && "Step 3: Food Preferences & Selected Dishes"}
            {step === 4 && "Step 4: Contact & Venue Details"}
            {step === 5 && "Step 5: Instant Cost Estimate & WhatsApp Handoff"}
          </span>
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="bg-ivory rounded-3xl p-6 sm:p-10 border border-turmeric/30 shadow-warm">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                Select Your Event Type
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                Choose the occasion you are celebrating. We calibrate menu balance and kitchen logistics to the event format.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {EVENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setEventType(type.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    eventType === type.id
                      ? "border-maroon bg-cream ring-2 ring-maroon/20 shadow-sm"
                      : "border-charcoal/15 bg-white/60 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-bold text-base text-charcoal">
                      {type.label}
                    </span>
                    {eventType === type.id && (
                      <CheckCircle2 className="w-4 h-4 text-maroon shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-charcoal/70 leading-snug">
                    {type.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-charcoal/10">
              <h3 className="font-serif text-xl font-bold text-charcoal mb-3">
                Preferred Banqueting Tier
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedPackage === pkg.id
                        ? "border-maroon bg-cream ring-2 ring-maroon/20 shadow-sm"
                        : "border-charcoal/15 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-bold text-base text-maroon">
                        {pkg.name}
                      </span>
                      {selectedPackage === pkg.id && (
                        <CheckCircle2 className="w-4 h-4 text-maroon shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-charcoal/70">{pkg.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(2)} variant="primary" size="md">
                <span>Next: Event Logistics</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                Event Logistics & Guest Count
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                Tell us when, where, and how many guests you expect so we can ensure kitchen capacity and live stalls.
              </p>
            </div>

            {/* Guest Count Slider & Number Input */}
            <div className="bg-cream/70 rounded-2xl p-6 border border-turmeric/30 space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="guest-range" className="font-serif font-bold text-base sm:text-lg text-charcoal flex items-center gap-2">
                  <Users className="w-5 h-5 text-maroon" />
                  Expected Guest Count:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="30"
                    max="5000"
                    step="10"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(20, parseInt(e.target.value) || 20))}
                    className="w-24 px-3 py-1.5 text-right font-bold text-maroon font-serif text-lg rounded-xl border border-charcoal/20 bg-white"
                  />
                  <span className="text-xs text-charcoal/60 font-semibold">Guests</span>
                </div>
              </div>

              <input
                id="guest-range"
                type="range"
                min="50"
                max="2500"
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full accent-maroon cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-charcoal/50 font-medium">
                <span>50 (Intimate)</span>
                <span>250 (Reception)</span>
                <span>500 (Grand)</span>
                <span>1,000+ (Imperial)</span>
              </div>
            </div>

            {/* Date & Meal Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  Approximate Event Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:border-maroon"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  Service Meal Slot
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Lunch", "Dinner", "High-Tea"].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setMealSlot(slot)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        mealSlot === slot
                          ? "bg-maroon text-cream border-maroon shadow-xs"
                          : "bg-white text-charcoal/70 border-charcoal/20 hover:bg-cream"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* City / Venue Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                Event City / Service Area
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:border-maroon"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between pt-4">
              <Button onClick={() => setStep(1)} variant="outline" size="md">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button onClick={() => setStep(3)} variant="primary" size="md">
                <span>Next: Food Preferences</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                Food Preferences & Custom Menu
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                Customize dietary tags, live food counters, and view dishes you have added from the menu.
              </p>
            </div>

            {/* Dietary Tags Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-charcoal/15 cursor-pointer hover:border-maroon/50 transition-colors">
                <input
                  type="checkbox"
                  checked={jainRequired}
                  onChange={(e) => setJainRequired(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-maroon rounded"
                />
                <div>
                  <span className="font-bold text-sm text-charcoal block">
                    Strict Jain Preparations Needed
                  </span>
                  <span className="text-xs text-charcoal/70 block mt-0.5">
                    Segregated kitchen cookware, prepared without root vegetables (onion, garlic, potato).
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-charcoal/15 cursor-pointer hover:border-maroon/50 transition-colors">
                <input
                  type="checkbox"
                  checked={liveCountersWanted}
                  onChange={(e) => setLiveCountersWanted(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-maroon rounded"
                />
                <div>
                  <span className="font-bold text-sm text-charcoal block">
                    Interactive Live Stalls (Chaat / Tandoor)
                  </span>
                  <span className="text-xs text-charcoal/70 block mt-0.5">
                    Include live cooking counters where chefs prepare hot items in front of guests.
                  </span>
                </div>
              </label>
            </div>

            {/* Selected Dishes From Menu Tray */}
            <div className="bg-cream/60 rounded-2xl p-6 border border-turmeric/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-maroon" />
                  <h3 className="font-serif font-bold text-lg text-charcoal">
                    Selected Dishes ({selectedDishes.length})
                  </h3>
                </div>
                {selectedDishes.length > 0 && (
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="text-xs text-rose-700 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {selectedDishes.length === 0 ? (
                <div className="text-center py-6 text-charcoal/60 space-y-2">
                  <p className="text-xs sm:text-sm">
                    No individual dishes selected yet. You can browse our 13 categories to hand-pick favorites.
                  </p>
                  <Link
                    href="/menu"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon hover:underline"
                  >
                    <span>Browse 500+ Dishes in New Tab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                  {selectedDishes.map((dish) => (
                    <span
                      key={dish}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-charcoal/15 text-xs font-medium text-charcoal shadow-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-leaf" />
                      <span>{dish}</span>
                      <button
                        type="button"
                        onClick={() => removeDish(dish)}
                        className="text-charcoal/40 hover:text-rose-600 transition-colors ml-1"
                        aria-label={`Remove ${dish}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button onClick={() => setStep(2)} variant="outline" size="md">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button onClick={() => setStep(4)} variant="primary" size="md">
                <span>Next: Host Details</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                Contact & Venue Details
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                Where should we send your official per-plate breakdown and arrange your tasting consultation?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Shah"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:border-maroon"
                />
              </div>


              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  Venue Name or Special Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Celebration Hall in Juhu, need live Jalebi counter and 20 Jain portions"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:border-maroon"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button onClick={() => setStep(3)} variant="outline" size="md">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button
                onClick={() => {
                  if (!fullName.trim() || !phone.trim()) {
                    alert("Please provide your Name and Phone/WhatsApp number so we can prepare your pricing.");
                    return;
                  }
                  setStep(5);
                }}
                variant="primary"
                size="md"
              >
                <span>View Instant Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & ESTIMATE */}
        {step === 5 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-1">
                ✓ Calculation Complete
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-charcoal">
                Your Banqueting Estimate Summary
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                Here is a transparent breakdown based on your celebration parameters.
              </p>
            </div>

            {/* Estimate Result Box */}
            <div className="bg-gradient-to-br from-cream via-amber-50/50 to-ivory rounded-3xl p-6 sm:p-8 border-2 border-turmeric shadow-md text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-charcoal/60 block">
                Estimated Total Investment Range
              </span>
              <div className="font-serif text-3xl sm:text-5xl font-extrabold text-maroon">
                {formatCurrency(estimatedMinTotal)} – {formatCurrency(estimatedMaxTotal)}*
              </div>
              <p className="text-xs text-charcoal/70 max-w-md mx-auto">
                Approx. <span className="font-bold text-charcoal">₹{baseRate} / plate</span> for {guestCount} guests under our {currentPkg.name}.
                Includes full buffet setup, uniformed stewards, and kitchen staff.
              </p>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-charcoal/80 bg-white rounded-2xl p-6 border border-charcoal/10">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-charcoal">Event:</span> {eventType}
                </p>
                <p>
                  <span className="font-semibold text-charcoal">Banqueting Tier:</span> {currentPkg.name}
                </p>
                <p>
                  <span className="font-semibold text-charcoal">Guest Count:</span> {guestCount} Guests
                </p>
                <p>
                  <span className="font-semibold text-charcoal">Timing:</span> {eventDate || "Date TBD"} ({mealSlot})
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-charcoal">Location:</span> {location}
                </p>
                <p>
                  <span className="font-semibold text-charcoal">Dietary:</span> Veg & Non-Veg {jainRequired ? "+ Jain Available" : ""}
                </p>
                <p>
                  <span className="font-semibold text-charcoal">Client:</span> {fullName} ({phone})
                </p>
                <p>
                  <span className="font-semibold text-charcoal">Menu Items Picked:</span> {selectedDishes.length} Dishes
                </p>
              </div>
            </div>

            {/* Handoff Actions */}
            <div className="space-y-3 pt-4 border-t border-charcoal/10">
              <a
                href={whatsappHref}
                onClick={(e) => {
                  e.preventDefault();
                  openWhatsApp(whatsappDetails);
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Lock In This Pricing On WhatsApp (Instant Reply)</span>
              </a>

              <div className="text-center">
                <span className="text-xs text-charcoal/50">
                  Or call our senior banquet consultant directly at{" "}
                  <a href={`tel:${siteConfig.phone.raw}`} className="font-bold text-maroon hover:underline">
                    {siteConfig.phone.display}
                  </a>
                </span>
              </div>
            </div>

            <div className="flex justify-start pt-2">
              <Button onClick={() => setStep(4)} variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4" />
                <span>Edit Parameters</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
