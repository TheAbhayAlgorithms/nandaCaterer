import { NextResponse } from "next/server";
import { demoTestimonials, demoGoogleRating } from "@/data/siteContent";

export interface StandardReview {
  id: string;
  name: string;
  photoUrl?: string;
  rating: number;
  text: string;
  relativeTime: string;
  eventType?: string;
  isGoogleReview: boolean;
}

export interface ReviewsResponse {
  rating: number;
  reviewCount: number;
  mapsUrl: string;
  writeReviewUrl: string;
  reviews: StandardReview[];
  source: "google" | "fallback";
}

// In-memory cache for API route responses (refreshed every 6 hours)
let cachedData: ReviewsResponse | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  const now = Date.now();
  if (cachedData && now - lastFetchTime < CACHE_DURATION_MS) {
    return NextResponse.json(cachedData, {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=43200",
      },
    });
  }

  // Fallback reviews structure using the site's existing verified/demo reviews
  const fallbackReviews: StandardReview[] = demoTestimonials.map((item, index) => ({
    id: item.id || `fallback-${index}`,
    name: item.name,
    photoUrl: undefined,
    rating: 5,
    text: item.text,
    relativeTime: "Recently",
    eventType: item.eventType,
    isGoogleReview: false,
  }));

  const fallbackData: ReviewsResponse = {
    rating: demoGoogleRating.rating,
    reviewCount: demoGoogleRating.reviewCount,
    mapsUrl: demoGoogleRating.mapsUrl,
    writeReviewUrl: placeId
      ? `https://search.google.com/local/writereview?placeid=${placeId}`
      : demoGoogleRating.mapsUrl,
    reviews: fallbackReviews,
    source: "fallback",
  };

  if (!apiKey || !placeId) {
    return NextResponse.json(fallbackData);
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,url,reviews&key=${apiKey}`;
    const response = await fetch(url, {
      next: { revalidate: 21600 }, // 6 hours Next.js data cache
    });

    if (!response.ok) {
      console.error("Google Places API HTTP error:", response.status);
      return NextResponse.json(fallbackData);
    }

    const data = await response.json();

    if (data.status !== "OK" || !data.result) {
      console.warn("Google Places API returned non-OK status:", data.status, data.error_message);
      return NextResponse.json(fallbackData);
    }

    const result = data.result;
    const googleReviews: StandardReview[] = (result.reviews || []).map(
      (r: {
        author_name?: string;
        profile_photo_url?: string;
        rating?: number;
        text?: string;
        relative_time_description?: string;
        time?: number;
      }, i: number) => ({
        id: `google-${r.time || i}`,
        name: r.author_name || "Google Reviewer",
        photoUrl: r.profile_photo_url || undefined,
        rating: r.rating || 5,
        text: r.text || "",
        relativeTime: r.relative_time_description || "Recently",
        eventType: "Verified Google Review",
        isGoogleReview: true,
      })
    );

    const freshResponse: ReviewsResponse = {
      rating: result.rating || demoGoogleRating.rating,
      reviewCount: result.user_ratings_total || demoGoogleRating.reviewCount,
      mapsUrl: result.url || demoGoogleRating.mapsUrl,
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
      reviews: googleReviews.length > 0 ? googleReviews : fallbackReviews,
      source: googleReviews.length > 0 ? "google" : "fallback",
    };

    cachedData = freshResponse;
    lastFetchTime = now;

    return NextResponse.json(freshResponse, {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Error fetching Google Places reviews:", error);
    return NextResponse.json(fallbackData);
  }
}
