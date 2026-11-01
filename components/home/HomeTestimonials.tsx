"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star, MessageSquare, ExternalLink, Edit3, User } from "lucide-react";
import {
  demoTestimonials,
  demoGoogleRating,
} from "@/data/siteContent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/shape/Divider";
import type { ReviewsResponse, StandardReview } from "@/app/api/reviews/route";

export function HomeTestimonials() {
  const [data, setData] = useState<ReviewsResponse>({
    rating: demoGoogleRating.rating,
    reviewCount: demoGoogleRating.reviewCount,
    mapsUrl: demoGoogleRating.mapsUrl,
    reviewsUrl: demoGoogleRating.reviewsUrl,
    writeReviewUrl: demoGoogleRating.writeReviewUrl,
    reviews: demoTestimonials.map((item, index) => ({
      id: item.id || `fallback-${index}`,
      name: item.name,
      rating: 5,
      text: item.text,
      relativeTime: "Recently",
      eventType: item.eventType,
      isGoogleReview: false,
    })),
    source: "fallback",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && json.reviews && json.reviews.length > 0) {
            setData(json);
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic Google reviews, using fallback:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const reviewsToDisplay = data.reviews.slice(0, 6);

  return (
    <section className="w-full py-16 sm:py-20 bg-cream border-t border-ink/10 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Stack */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <Eyebrow text="CLIENT EXPERIENCES" />
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink mt-1">
            Celebrated by Hosts Across Mumbai
          </h2>
          <Divider align="center" color="bg-accent" />

          {/* Google Rating Badge & Action Links */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={data.reviewsUrl || data.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-paper border border-ink/10 shadow-xs hover:shadow-card hover:border-accent/40 transition-all text-xs sm:text-sm text-ink group"
              aria-label={`Google Rating ${data.rating.toFixed(1)} stars out of 5 from ${data.reviewCount} reviews`}
            >
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="font-bold text-ink">
                {data.rating.toFixed(1)}
              </span>
              <span className="text-ink/60">
                ({data.reviewCount} reviews on Google)
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-accent opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* Write a Review Button */}
            <a
              href={data.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent hover:text-white transition-all text-xs font-semibold text-accent group"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </a>
          </div>
        </div>

        {/* Testimonial Cards Grid (Reusing exact same design & responsive layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsToDisplay.map((item: StandardReview, index: number) => {
            const isLong = item.text.length > 180;
            const isExpanded = expandedReviews[item.id];
            const displayText = isLong && !isExpanded
              ? `${item.text.slice(0, 180)}...`
              : item.text;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-paper border border-ink/10 p-6 sm:p-7 shadow-xs hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(Math.min(5, Math.max(1, Math.round(item.rating))))].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <MessageSquare className="w-5 h-5 text-accent/40" />
                  </div>

                  <p className="text-xs sm:text-sm text-ink/80 leading-relaxed italic">
                    &ldquo;{displayText}&rdquo;
                  </p>

                  {isLong && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="mt-2 text-[11px] font-bold text-accent hover:underline cursor-pointer"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-ink/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Reviewer Profile Photo or Fallback Avatar */}
                    {item.photoUrl ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-ink/10">
                        <Image
                          src={item.photoUrl}
                          alt={item.name}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                        <User className="w-4 h-4" />
                      </div>
                    )}

                    <div>
                      <h4 className="font-heading font-bold text-sm text-ink leading-tight">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-accent font-medium mt-0.5">
                        <span>
                          {item.isGoogleReview
                            ? (index === 0 ? "★ Latest Google Review" : "Google Verified")
                            : (item.eventType || "Verified Host")}
                        </span>
                        {item.relativeTime && (
                          <>
                            <span className="text-ink/30">•</span>
                            <span className="text-ink/50 text-[10px]">
                              {item.relativeTime}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to view all reviews on Google */}
        <div className="mt-10 flex justify-center">
          <a
            href={data.reviewsUrl || data.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-ink/20 hover:border-accent text-ink/80 hover:text-accent font-semibold text-xs sm:text-sm transition-all bg-paper shadow-xs"
          >
            <span>View all reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
