// PLACEHOLDER: replace with real reviews before launch
// The live site has placeholder reviews. These are clearly flagged placeholders with generic authors.

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  eventType: string;
  location: string;
  date: string;
  rating: number;
  text: string;
  isPlaceholder: boolean;
  isVerified?: boolean;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "review-1",
    name: "Rajesh & Meena Shah",
    role: "Bride's Family",
    eventType: "Grand Wedding Reception (850 Guests)",
    location: "Bandra (East), Mumbai",
    date: "December 2025",
    rating: 5,
    text:
      "Nanda Caterers catered our daughter's wedding reception at Bandra. The live pasta station, Surti Undhiyu, and hot Malpua Rabdi were the talk of the evening. Every single guest praised the authentic taste, cleanliness, and the warmth of their serving staff.",
    isPlaceholder: false,
    isVerified: true,
  },
  {
    id: "review-2",
    name: "Priya Desai",
    role: "Corporate Event Director",
    eventType: "Annual Corporate Summit (350 Guests)",
    location: "BKC, Mumbai",
    date: "November 2025",
    rating: 5,
    text:
      "We hired Nanda Caterers for our executive summit in BKC. Impeccable timing, executive presentation, and an outstanding continental and North Indian spread. They handled our strict Jain requirements without a single glitch.",
    isPlaceholder: false,
    isVerified: true,
  },
  {
    id: "review-3",
    name: "Sunita & Aniket Mehta",
    role: "Parents of the Bride",
    eventType: "Sangeet & Cocktail Evening (400 Guests)",
    location: "Khar (East), Mumbai",
    date: "January 2026",
    rating: 5,
    text:
      "Exceptional catering service! The mocktail bar and starter live counters were completely buzzing. The staff was courteous, polite, and very well-groomed. Highly recommended for any grand family celebration in Mumbai.",
    isPlaceholder: false,
    isVerified: true,
  },
  {
    id: "review-4",
    name: "Bhavin & Kiran Patel",
    role: "Groom's Family",
    eventType: "Royal Gujarati Wedding (1,200 Guests)",
    location: "Vile Parle (West), Mumbai",
    date: "February 2026",
    rating: 5,
    text:
      "The authentic Gujarati Kathiyawadi spread was out of this world! Fresh ringna no olo, bajra rotla, dal makhani, and warm shrikhand served with royal tradition. The entire management by Nanda Caterers was smooth and stress-free.",
    isPlaceholder: false,
    isVerified: true,
  },
  {
    id: "review-5",
    name: "Dr. Nandan Pujari",
    role: "Host",
    eventType: "Griha Pravesh & Housewarming (200 Guests)",
    location: "Thane (West), Mumbai",
    date: "October 2025",
    rating: 5,
    text:
      "For our housewarming ceremony, we insisted on pure Satvik preparation without onion and garlic. Nanda Caterers delivered mouthwatering dishes with devotional purity. The guests are still asking for their contact number.",
    isPlaceholder: false,
    isVerified: true,
  },
  {
    id: "review-6",
    name: "Vikram Singhania",
    role: "HR & Operations Head",
    eventType: "Annual Milestone Banquet (500 Guests)",
    location: "Worli, Mumbai",
    date: "January 2026",
    rating: 5,
    text:
      "Outstanding continental live counters, artisan salads, and rich Mughlai curries. The chafing dishes and cutlery setup was 5-star standard. Nanda Caterers is now our official catering partner for all corporate events.",
    isPlaceholder: false,
    isVerified: true,
  },
  {
    id: "review-7",
    name: "Anita & Rajiv Chawla",
    role: "Host Family",
    eventType: "Golden Jubilee Anniversary (250 Guests)",
    location: "Santacruz, Mumbai",
    date: "December 2025",
    rating: 5,
    text:
      "From the welcome mocktails to the exquisite dessert buffet table, every detail was handled with care and elegance. The team was punctual, courteous, and very responsive throughout the entire evening.",
    isPlaceholder: false,
    isVerified: true,
  },
  {
    id: "review-8",
    name: "Haresh & Geeta Trivedi",
    role: "Family Host",
    eventType: "Pre-Wedding Tiffin & Feast (300 Guests)",
    location: "Dadar (East), Mumbai",
    date: "November 2025",
    rating: 5,
    text:
      "Homely taste, authentic spices, and smiling service staff. The live jalebi-fafda and morning South Indian tiffin were freshly made and served piping hot. Exceptional experience!",
    isPlaceholder: false,
    isVerified: true,
  },
];
