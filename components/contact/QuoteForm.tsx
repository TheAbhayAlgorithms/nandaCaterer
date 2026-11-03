"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { CheckCircle2, MessageCircle, AlertCircle, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useQuoteSelection } from "@/context/QuoteSelectionContext";
import { openWhatsApp, getWhatsAppUrl } from "@/lib/whatsapp";

const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

const quoteSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().regex(phoneRegex, "Please enter a valid 10-digit Indian phone number"),
  service: z.enum(["Wedding", "Corporate Event", "General Event", "Party / Function", "Others"], {
    errorMap: () => ({ message: "Please select a catering service type" }),
  }),
  location: z.string().optional(),
  eventDate: z.string().optional(),
  guests: z.string().optional(),
  message: z.string().optional(),
  // Honeypot field
  botField: z.string().max(0, "Bot detected"),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteFormProps {
  initialService?: string;
  initialDishes?: string[];
  className?: string;
}

export function QuoteForm({ initialService, initialDishes, className }: QuoteFormProps) {
  const { selectedDishes } = useQuoteSelection();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<QuoteFormData | null>(null);

  const activeDishes = initialDishes || selectedDishes;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      service: (initialService as QuoteFormData["service"]) || "Wedding",
      location: "",
      eventDate: "",
      guests: "",
      message: "",
      botField: "",
    },
  });

  useEffect(() => {
    if (initialService) {
      setValue("service", initialService as QuoteFormData["service"]);
    }
  }, [initialService, setValue]);

  const triggerMarigoldConfetti = () => {
    // Saffron, Gold & Marigold petal confetti burst
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#F29A1F", "#E8B004", "#7A1F2B", "#FFF8EC"],
    });
  };

  const onSubmit = async (data: QuoteFormData) => {
    setErrorMessage(null);

    // Spam honeypot
    if (data.botField) return;

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          selectedDishes: activeDishes,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit enquiry request");
      }

      setSubmittedData(data);
      setIsSuccess(true);
      triggerMarigoldConfetti();

      // Automatically open WhatsApp with all filled details
      openWhatsApp({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        service: data.service,
        location: data.location,
        eventDate: data.eventDate,
        guestCount: data.guests,
        message: data.message,
        selectedDishes: activeDishes,
      });

      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please call us directly.";
      setErrorMessage(msg);
    }
  };

  if (isSuccess && submittedData) {
    const successDetails = {
      firstName: submittedData.firstName,
      lastName: submittedData.lastName,
      phone: submittedData.phone,
      service: submittedData.service,
      location: submittedData.location,
      eventDate: submittedData.eventDate,
      guestCount: submittedData.guests,
      message: submittedData.message,
      selectedDishes: activeDishes,
    };
    const whatsappLink = getWhatsAppUrl(successDetails);

    return (
      <div className="rounded-2xl bg-ivory p-8 md:p-10 border border-turmeric/40 shadow-warm text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-leaf/10 text-leaf mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-maroon">
            Thank You, {submittedData.firstName}!
          </h3>
          <p className="text-charcoal/80 text-base max-w-md mx-auto">
            Your catering enquiry has been received. Our banquet team will review your requirements and respond within a couple of hours.
          </p>
        </div>

        {activeDishes.length > 0 && (
          <div className="p-4 rounded-xl bg-cream/70 text-left max-w-md mx-auto text-xs space-y-1">
            <span className="font-semibold text-maroon block">
              Dishes Attached ({activeDishes.length}):
            </span>
            <p className="text-charcoal/70 line-clamp-2">
              {activeDishes.join(", ")}
            </p>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappLink}
            onClick={(e) => {
              e.preventDefault();
              openWhatsApp(successDetails);
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-500 shadow-md transition-colors cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Send Details on WhatsApp</span>
          </a>

          <Button
            variant="outline"
            onClick={() => {
              setIsSuccess(false);
              setSubmittedData(null);
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="pricing-form"
      onSubmit={handleSubmit(onSubmit)}
      className={`rounded-2xl bg-ivory p-6 sm:p-8 md:p-10 border border-turmeric/30 shadow-warm space-y-5 ${className || ""}`}
      noValidate
    >
      <div className="border-b border-charcoal/10 pb-4 mb-2">
        <h3 className="font-heading font-bold text-2xl text-maroon">
          Request Catering Pricing
        </h3>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
          Custom packages for weddings, corporate meetings & celebrations across Mumbai.
        </p>
      </div>

      {/* Selected Dishes Pill Notice */}
      {activeDishes.length > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-cream border border-turmeric/40 text-xs text-maroon">
          <UtensilsCrossed className="w-4 h-4 text-saffron shrink-0" />
          <span>
            <strong>{activeDishes.length} custom dishes</strong> from your selection will be included with this enquiry.
          </span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-chilli/10 border border-chilli/30 text-xs text-chilli">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Honeypot field (hidden) */}
      <input
        type="text"
        {...register("botField")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
            First Name <span className="text-chilli">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            aria-invalid={errors.firstName ? "true" : "false"}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            placeholder="e.g. Ramesh"
            className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
          />
          {errors.firstName && (
            <p id="firstName-error" className="text-xs text-chilli mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
            Last Name <span className="text-chilli">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            aria-invalid={errors.lastName ? "true" : "false"}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            placeholder="e.g. Shah"
            className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
          />
          {errors.lastName && (
            <p id="lastName-error" className="text-xs text-chilli mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Contact Number */}
      <div>
        <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
          Contact Number <span className="text-chilli">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          placeholder="10-digit Mobile (e.g. 9820012345)"
          className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
        />
        {errors.phone && (
          <p id="phone-error" className="text-xs text-chilli mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Service Type */}
        <div>
          <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
            Catering Service For <span className="text-chilli">*</span>
          </label>
          <select
            id="service"
            {...register("service")}
            className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron cursor-pointer"
          >
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="General Event">General Event</option>
            <option value="Party / Function">Party / Function</option>
            <option value="Others">Others</option>
          </select>
          {errors.service && (
            <p className="text-xs text-chilli mt-1">{errors.service.message}</p>
          )}
        </div>

        {/* Event Location */}
        <div>
          <label htmlFor="location" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
            Event Location
          </label>
          <input
            id="location"
            type="text"
            {...register("location")}
            placeholder="e.g. Bandra, Mumbai or Pune"
            className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Event Date */}
        <div>
          <label htmlFor="eventDate" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
            Event Date (Optional)
          </label>
          <input
            id="eventDate"
            type="date"
            {...register("eventDate")}
            className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
          />
        </div>

        {/* Guest Count */}
        <div>
          <label htmlFor="guests" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
            Approx. Guests (Optional)
          </label>
          <input
            id="guests"
            type="text"
            {...register("guests")}
            placeholder="e.g. 250 - 500"
            className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
          Special Notes or Specific Cuisine Requests
        </label>
        <textarea
          id="message"
          rows={3}
          {...register("message")}
          placeholder="Mention any dietary needs (Jain / Swaminarayan), decoration ideas, or venue details..."
          className="w-full px-4 py-2.5 rounded-xl border border-charcoal/20 bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full"
      >
        Submit Enquiry Request
      </Button>

      <p className="text-[11px] text-center text-charcoal/60">
        🔒 Your personal details are completely private and used exclusively for your catering enquiry.
      </p>
    </form>
  );
}
