"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star, CheckCircle2, User, ExternalLink, Edit3 } from "lucide-react";
import type { StandardReview, ReviewsResponse } from "@/app/api/reviews/route";
import { testimonialsData, Testimonial } from "@/data/testimonials";

interface TestimonialsFeedProps {
  initialTestimonials?: Testimonial[];
}

export function TestimonialsFeed({ initialTestimonials = testimonialsData }: TestimonialsFeedProps) {
  const [reviews, setReviews] = useState<StandardReview[]>(() => {
    // Initial state from verified testimonials data
    return initialTestimonials.map((item, idx) => ({
      id: item.id || `init-${idx}`,
      name: item.name,
      rating: item.rating,
      text: item.text,
      relativeTime: item.date,
      eventType: item.eventType,
      isGoogleReview: false,
    }));
  });

  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [googleMeta, setGoogleMeta] = useState<{
    rating: number;
    reviewCount: number;
    mapsUrl: string;
    writeReviewUrl: string;
  }>({
    rating: 4.9,
    reviewCount: 175,
    mapsUrl: "https://maps.google.com/?q=Nanda+Caterers+Bandra+East+Mumbai",
    writeReviewUrl: "https://maps.google.com/?q=Nanda+Caterers+Bandra+East+Mumbai",
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchLatestReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data: ReviewsResponse = await res.json();
          if (isMounted && data.reviews && data.reviews.length > 0) {
            setGoogleMeta({
              rating: data.rating,
              reviewCount: data.reviewCount,
              mapsUrl: data.mapsUrl,
              writeReviewUrl: data.writeReviewUrl,
            });

            // Put Google reviews first (newest first), then verified static reviews
            const googleItems = data.reviews.filter((r) => r.isGoogleReview);
            const remaining = initialTestimonials
              .filter((init) => !googleItems.some((g) => g.name.toLowerCase() === init.name.toLowerCase()))
              .map((item, idx) => ({
                id: item.id || `static-${idx}`,
                name: item.name,
                rating: item.rating,
                text: item.text,
                relativeTime: item.date,
                eventType: item.eventType,
                isGoogleReview: false,
              }));

            setReviews([...googleItems, ...remaining]);
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest Google reviews on testimonials page:", err);
      }
    }

    fetchLatestReviews();
    return () => {
      isMounted = false;
    };
  }, [initialTestimonials]);

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-10">
      {/* Action banner: Live Google rating & Write a Review */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-paper border border-ink/10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-bold text-sm text-ink">{googleMeta.rating.toFixed(1)} / 5.0</span>
          <span className="text-xs text-ink/60">({googleMeta.reviewCount}+ Google Reviews)</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={googleMeta.writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-white hover:bg-accent-dark transition-all text-xs font-semibold shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write a Google Review</span>
          </a>
          <a
            href={googleMeta.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-paper border border-ink/15 hover:border-accent text-xs font-semibold text-ink/80 hover:text-accent transition-all"
          >
            <span>View on Google</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Reviews Grid: Newest Google reviews appear first */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((item, index) => {
          const isLong = item.text.length > 200;
          const isExpanded = expandedReviews[item.id];
          const displayText = isLong && !isExpanded ? `${item.text.slice(0, 200)}...` : item.text;

          return (
            <div
              key={item.id}
              className="bg-ivory rounded-3xl p-6 sm:p-8 border border-turmeric/30 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(Math.min(5, Math.max(1, Math.round(item.rating))))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>

                  {item.isGoogleReview ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {index === 0 ? "★ Latest Google Review" : "Google Verified"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Host
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed italic mb-4">
                  &ldquo;{displayText}&rdquo;
                </p>

                {isLong && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    className="mb-4 text-[11px] font-bold text-accent hover:underline cursor-pointer"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>

              {/* Author & Event Info */}
              <div className="pt-4 border-t border-charcoal/10 flex items-center gap-3">
                {item.photoUrl ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-charcoal/15">
                    <Image
                      src={item.photoUrl}
                      alt={item.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                    <User className="w-4 h-4" />
                  </div>
                )}

                <div className="space-y-0.5">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-maroon leading-tight">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-charcoal/60">
                    <span>{item.eventType || "Event Catering"}</span>
                    {item.relativeTime && (
                      <>
                        <span>•</span>
                        <span>{item.relativeTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
