export interface ServiceArea {
  slug: string;
  name: string;
  state: string;
  headline: string;
  description: string;
  popularVenues: string[];
  keyHighlights: string[];
  typicalEvents: string[];
  image: string;
}

export const serviceAreasData: ServiceArea[] = [
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    headline: "Premier Wedding & Event Catering in Mumbai",
    description:
      "Since 2005, Nanda Caterers has been based in Bandra East and Khar East, serving prestigious wedding banquets, corporate summits, and family gatherings across South Mumbai, Bandra, BKC, Juhu, Andheri, Powai, and Borivali.",
    popularVenues: [
      "MIG Cricket Club, Bandra East",
      "Jio World Convention Centre, BKC",
      "Khar Gymkhana, Khar West",
      "MCA Club, BKC",
      "Mayfair Banquets, Worli",
      "Bhartiya Vidya Bhavan, Chowpatty",
    ],
    keyHighlights: [
      "Twin offices in Bandra (East) & Khar (East) for rapid local coordination",
      "Equipped for residential clubhouses, luxury five-star lawns, and heritage community halls",
      "Experienced with local BMC and society delivery guidelines",
      "Live tandoor and chaat counters suitable for indoor and terrace venues",
    ],
    typicalEvents: ["Grand Wedding Receptions", "Sangeet & Mehendi", "BKC Corporate Luncheons", "Griha Pravesh Poojas"],
    image: "/images/gujarati-kathiyawadi.jpg",
  },
  {
    slug: "thane",
    name: "Thane",
    state: "Maharashtra",
    headline: "Premier Catering Across Thane & Ghodbunder Road",
    description:
      "Serving high-profile residential complexes, banquet lawns, and clubhouses across Majiwada, Ghodbunder Road, Hiranandani Estate, and Pokhran Road with dedicated transport caravans.",
    popularVenues: [
      "Hiranandani Estate Clubhouses",
      "Suraj Water Park Lawns, Ghodbunder",
      "Golden Swan Country Club, Yeoor Hills",
      "Vasant Vihar Community Banquets",
    ],
    keyHighlights: [
      "Direct transit corridor from our Mumbai central kitchens within 45 minutes",
      "Thermal insulated cambro transport preserving piping hot gravies and crisp tikkis",
      "Specialized in Gujarati, Maharashtrian, and Marwari community wedding spreads",
    ],
    typicalEvents: ["Society Annual Galas", "Winter Wedding Receptions", "Traditional Thread Ceremonies", "Anniversary Feasts"],
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "navi-mumbai",
    name: "Navi Mumbai",
    state: "Maharashtra",
    headline: "Authentic Event Catering in Vashi, Belapur & Kharghar",
    description:
      "Catering to technology parks, grand wedding grounds, and residential townships across Vashi, Sanpada, Nerul, Seawoods, and Kharghar.",
    popularVenues: [
      "CIDCO Exhibition Centre, Vashi",
      "Kharghar Valley Golf Course Grounds",
      "The Park Hotel Banquets, CBD Belapur",
      "Seawoods Grand Central Corporate Halls",
    ],
    keyHighlights: [
      "High-capacity mobile kitchens capable of serving 3,000+ guests at open exhibition grounds",
      "Executive corporate meal setups for Vashi and Mahape IT corridor companies",
      "Strict Jain and Swaminarayan dietary food protocols",
    ],
    typicalEvents: ["Exhibition Buffet Catering", "Destination Receptions", "Corporate High-Tea", "Family Gatherings"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    headline: "Destination Wedding & Resort Catering in Pune & Lonavala",
    description:
      "Our specialized mobile catering unit travels with full kitchen stoves, master chefs, and supervisors to cater destination weddings in Pune farmhouses, Koregaon Park venues, and Lonavala hill resorts.",
    popularVenues: [
      "Oxford Golf Resort, Lavale, Pune",
      "Aamby Valley City & Lonavala Resorts",
      "The Corinthians Resort & Club, Pune",
      "Farmhouse Lawns, Mulshi & Panshet",
    ],
    keyHighlights: [
      "On-site mobile kitchen caravans with specialized tandoors and sweet halwa stoves",
      "Multi-day wedding package support (Mehendi, Sangeet, Wedding, Reception)",
      "Zero compromise on freshness: fresh local procurement of vegetables combined with signature Mumbai spices",
    ],
    typicalEvents: ["Multi-Day Destination Weddings", "Weekend Resort Getaways", "Corporate Leadership Retreats"],
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "goa",
    name: "Goa",
    state: "Goa",
    headline: "Beach & Resort Wedding Catering in Goa",
    description:
      "For families desiring a breathtaking coastal wedding in North or South Goa without compromising on culinary authenticity. We bring our master maharajs and signature recipes straight to Goa's beachfront properties.",
    popularVenues: [
      "South Goa Beach Resorts (Benaulim, Cavelossim)",
      "North Goa Heritage Lawns & Villas (Candolim, Vagator)",
      "Grand Hyatt Lawns, Bambolim",
    ],
    keyHighlights: [
      "Dedicated segregated catering arrangements at premier Goa resort venues",
      "Master chefs skilled in Gujarati, Marwari, and North Indian destination feasts",
      "Full logistical transport of specialty ingredients, traditional utensils, and copper warmers",
    ],
    typicalEvents: ["Beachfront Sunset Receptions", "Marwari Destination Weddings", "Pre-Wedding Cocktail Galas"],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  },
];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreasData.find((a) => a.slug === slug);
}
