export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: "Weddings" | "Corporate" | "Decor" | "Food";
}

export const galleryImages: GalleryImage[] = [
  {
    id: "gal-1",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    alt: "Royal Wedding Banquet Setup in Mumbai",
    title: "Grand Wedding Banquet Setup",
    category: "Weddings",
  },
  {
    id: "gal-2",
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    alt: "Lavish Buffet Presentation with Floral Decoration",
    title: "Floral Buffet Display",
    category: "Food",
  },
  {
    id: "gal-3",
    src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80",
    alt: "Tandoori Skewers and Starters Live Counter",
    title: "Tandoori Live Counter",
    category: "Food",
  },
  {
    id: "gal-4",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    alt: "Executive Corporate Banquet Buffet Setup",
    title: "Corporate Banquet",
    category: "Corporate",
  },
  {
    id: "gal-5",
    src: "/images/sweets.jpg",
    alt: "Assorted Indian Wedding Sweets & Mithai",
    title: "Traditional Mithai & Halwa Counter",
    category: "Food",
  },
  {
    id: "gal-6",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    alt: "Outdoor Catering and Evening Table Decoration",
    title: "Outdoor Gala Dinner Decor",
    category: "Decor",
  },
  {
    id: "gal-7",
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Rich Indian Curries & Fresh Breads",
    title: "Royal Main Course Delicacies",
    category: "Food",
  },
  {
    id: "gal-8",
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    alt: "Royal Traditional Sangeet Dining Decor",
    title: "Sangeet Dining Decor",
    category: "Weddings",
  },
  {
    id: "gal-9",
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    alt: "Gourmet Fresh Salad and Antipasti Counter",
    title: "Artisanal Fresh Salad Spread",
    category: "Food",
  },
  {
    id: "gal-10",
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    alt: "Grand Wedding Reception Decor and Floral Arches",
    title: "Reception Grand Entrance & Decor",
    category: "Decor",
  },
  {
    id: "gal-11",
    src: "/images/live-pasta-station.jpg",
    alt: "Live Italian Pasta and Continental Station",
    title: "Live Continental Pasta Station",
    category: "Food",
  },
  {
    id: "gal-12",
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
    alt: "Annual Corporate Gala Dinner Buffet",
    title: "Corporate Annual Dinner Banquet",
    category: "Corporate",
  },
  // Next 12 items (Revealed on "Load more")
  {
    id: "gal-13",
    src: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    alt: "Authentic South Indian Breakfast Feast",
    title: "Morning South Indian Tiffin Stall",
    category: "Food",
  },
  {
    id: "gal-14",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    alt: "Intimate Garden Mehendi Dining Setup",
    title: "Mehendi & Sangeet Pavilion Decor",
    category: "Weddings",
  },
  {
    id: "gal-15",
    src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
    alt: "Handcrafted Festive Kulfi & Ice Cream Station",
    title: "Festive Ice Cream & Kulfi Bar",
    category: "Food",
  },
  {
    id: "gal-16",
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    alt: "Corporate Product Launch Networking Reception",
    title: "Corporate Networking Finger Food",
    category: "Corporate",
  },
  {
    id: "gal-17",
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    alt: "Formal Corporate Conference Lunch Buffet",
    title: "Business Summit Lunch Spread",
    category: "Corporate",
  },
  {
    id: "gal-18",
    src: "/images/gujarati-kathiyawadi.jpg",
    alt: "Traditional Gujarati Thali Plating",
    title: "Royal Gujarati Kathiyawadi Spread",
    category: "Food",
  },
  {
    id: "gal-19",
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    alt: "Floral Mandap and Banquet Entrance Decor",
    title: "Floral Mandap Dining Backdrop",
    category: "Decor",
  },
  {
    id: "gal-20",
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    alt: "Candlelit Evening Wedding Reception Tables",
    title: "Candlelit Banquet Centerpieces",
    category: "Decor",
  },
  {
    id: "gal-21",
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    alt: "Crisp Street Food Chaat Counter",
    title: "Live Mumbai Chaat Bazaar",
    category: "Food",
  },
  {
    id: "gal-22",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    alt: "Vibrant Wedding Sangeet Dinner",
    title: "Vibrant Sangeet Banquet",
    category: "Weddings",
  },
  {
    id: "gal-23",
    src: "/images/signature-mocktails.jpg",
    alt: "Executive Cocktail & Mocktail Evening Bar",
    title: "Signature Mocktails & Welcome Drinks",
    category: "Corporate",
  },
  {
    id: "gal-24",
    src: "/images/dessert-buffet.jpg",
    alt: "Bespoke Dessert Table and Pastry Tier",
    title: "Artisanal Dessert Buffet Display",
    category: "Food",
  },
];
