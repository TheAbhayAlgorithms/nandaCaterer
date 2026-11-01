/**
 * Single source of truth for demo content across Nanda Caterers.
 * Demo content is rendered only when SHOW_DEMO_CONTENT is true, or items have isDemo: false.
 */

export const SHOW_DEMO_CONTENT = true;

// ============================================================================
// B2. GOOGLE RATING & TESTIMONIALS
// ============================================================================

// REAL GOOGLE REVIEWS & RATINGS (Nanda Caterers Mumbai)
export const demoGoogleRating = {
  rating: 4.9,
  reviewCount: 175,
  mapsUrl: "https://maps.google.com/?q=Nanda+Caterers+Bandra+East+Mumbai",
  isDemo: false,
};

export interface TestimonialItem {
  id: string;
  name: string;
  eventType: string;
  text: string;
  isDemo: boolean;
}

export const demoTestimonials: TestimonialItem[] = [
  {
    id: "rev-1",
    name: "Rajesh & Meena Shah",
    eventType: "Wedding Reception (850 Guests)",
    text:
      "Nanda Caterers catered our daughter's wedding reception at Bandra. The live pasta counter, Surti Undhiyu, and hot Malpua Rabdi were the talk of the evening. Impeccable hygiene, warm hospitality, and punctual service. Every guest loved the food!",
    isDemo: false,
  },
  {
    id: "rev-2",
    name: "Sunita & Aniket Mehta",
    eventType: "Sangeet & Cocktail Evening",
    text:
      "Exceptional catering service! The mocktail bar and starter live counters were completely buzzing. The staff was courteous, polite, and very well-groomed. Highly recommended for any grand family celebration in Mumbai.",
    isDemo: false,
  },
  {
    id: "rev-3",
    name: "Priya Desai",
    eventType: "Corporate Gala (BKC Mumbai)",
    text:
      "Hired Nanda Caterers for our 350-guest corporate summit in BKC. Executive presentation, authentic flavours, and seamless crowd management. They handled our strict Jain food requirements with zero compromises. Truly professional!",
    isDemo: false,
  },
];

// ============================================================================
// B3. NUMBERS STRIP
// ============================================================================

export interface StatItem {
  id: string;
  value: string;
  label: string;
  isDemo: boolean;
}

export const numbersStripStats: StatItem[] = [
  {
    id: "stat-years",
    value: "20+",
    label: "Years of Experience",
    isDemo: false,
  },
  // DEMO - replace with real data
  {
    id: "stat-events",
    value: "500+",
    label: "Events Served",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    id: "stat-guests",
    value: "100,000+",
    label: "Guests Served",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    id: "stat-cities",
    value: "3 Cities",
    label: "Mumbai, Pune, Goa",
    isDemo: true,
  },
];

// ============================================================================
// B4. SAMPLE PACKAGES
// ============================================================================

export interface PackageCardItem {
  id: string;
  name: string;
  vegPriceText: string;
  nonVegPriceText: string;
  badge?: string;
  includedItems: string[];
  isDemo: boolean;
}

export const demoPackages: PackageCardItem[] = [
  // DEMO - replace with real data
  {
    id: "silver",
    name: "Silver Package",
    vegPriceText: "Veg: Starting from ₹650 / plate",
    nonVegPriceText: "Non-Veg: Starting from ₹850 / plate",
    includedItems: [
      "2 Welcome Drinks / Mocktails",
      "3 Starters & Fritters",
      "1 Live Chaat Counter",
      "2 Fresh Salads & Papad Basket",
      "2 Main Course Curries (1 Paneer + 1 Seasonal Special)",
      "Assorted Indian Breads & Steamed Rice",
      "1 Dal / Authentic Kadhi",
      "1 Warm Traditional Sweet",
      "1 Premium Ice Cream Scoop",
    ],
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    id: "gold",
    name: "Gold Package",
    vegPriceText: "Veg: Starting from ₹950 / plate",
    nonVegPriceText: "Non-Veg: Starting from ₹1,200 / plate",
    badge: "Most Popular",
    includedItems: [
      "3 Welcome Drinks & Fresh Juices",
      "5 Gourmet Starters & Charcoal Tikkas",
      "2 Interactive Live Stations (Pasta / Chaat)",
      "Artisanal Salad & Accompaniment Bar",
      "3 Royal Curries (Paneer Lababdar + 2 Regional Specialties)",
      "Assorted Tandoori Breads & Signature Pulao",
      "Dal Makhani & Gujarati Kadhi",
      "2 Royal Desserts (Hot Desi Ghee Halwa + Bengali Mithai)",
      "Gourmet Ice Cream & Kulfi Bar",
    ],
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    id: "premium",
    name: "Premium Package",
    vegPriceText: "Veg: Starting from ₹1,450 / plate",
    nonVegPriceText: "Non-Veg: Starting from ₹1,750 / plate",
    badge: "Grand Feast",
    includedItems: [
      "4 Signature Mocktails & Hot Kadai Brews",
      "6 Luxury Starters & Baked Cheese Bites",
      "3 Thematic Live Counters (Wok, Italian & Tawa)",
      "Exotic Fruit Carvings & Global Salad Spread",
      "4 Masterpiece Curries with Cashew & Saffron Gravies",
      "Full Tandoor & Artisanal Bread Selection",
      "2 Dal Specialties & Dum Biryani",
      "3 Grand Sweets & Live Warm Jalebi-Rabdi Station",
      "Fusion Dessert Counter & Kulfi Sticks",
    ],
    isDemo: true,
  },
];

// ============================================================================
// B5. FAQ (accordion on /contact, below the form)
// ============================================================================

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isDemo: boolean;
}

export const demoFaqItems: FaqItem[] = [
  // DEMO - replace with real data
  {
    id: "faq-tasting",
    question: "Do you offer food tasting sessions before booking?",
    answer:
      "Yes, we organize dedicated food tasting sessions for wedding and large banquet clients so you can experience our taste, spice balance, and presentation firsthand before finalizing your menu.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    id: "faq-advance-booking",
    question: "How early in advance should we book your catering services?",
    answer:
      "For peak wedding dates and festival seasons, we recommend booking 3 to 6 months in advance. For corporate events and intimate family functions, a notice of 2 to 4 weeks is generally sufficient.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    id: "faq-menus-available",
    question: "Do you offer veg, non-veg, and Jain menus?",
    answer:
      "Yes, we provide extensive vegetarian and non-vegetarian menus, as well as strict Jain and no-onion-no-garlic preparations with dedicated kitchen segregation.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    id: "faq-min-guests",
    question: "What is your minimum guest count requirement?",
    answer:
      "Our bespoke catering packages typically start from 50 guests for private gatherings and can comfortably scale up to 5,000+ guests for grand wedding receptions and corporate conventions.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    id: "faq-staff-crockery",
    question: "Are service staff, crockery, and live counters included in the catering package?",
    answer:
      "Yes, our comprehensive catering packages include professional uniformed service stewards, premium crockery, cutlery, glassware, live counter setup, and warmers with complete hygiene management.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    id: "faq-cities",
    question: "Which cities do you provide catering services in?",
    answer:
      "We provide full-service catering across Mumbai, Thane, Navi Mumbai, Pune, and destination wedding locations in Goa, supported by mobile refrigerated logistics and kitchen setups.",
    isDemo: true,
  },
];

// ============================================================================
// B6. SOUPS DEMO DISH DESCRIPTIONS (16 dishes)
// ============================================================================

export interface SoupDescriptionItem {
  dishName: string;
  description: string;
  isDemo: boolean;
}

export const demoSoupDescriptions: SoupDescriptionItem[] = [
  // DEMO - replace with real data
  {
    dishName: "Broccoli Almond Soup",
    description: "Creamy pureed fresh broccoli simmered with toasted crushed almonds and herbs.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Soya Broccoli Island Soup",
    description: "Nutritious protein-rich broth featuring tender soya chunks and fresh broccoli florets.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Creamy Italian Soya Bean Soup",
    description: "Velvety Italian-style simmered soya beans infused with rosemary, oregano, and olive oil.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Tomato Coconut Soup",
    description: "Tangy country tomatoes softened with velvety coconut milk and aromatic coastal spices.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Sweet Corn Soup",
    description: "Golden sweet corn kernels slow-cooked into a comforting, mildly seasoned velvety broth.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Popcorn Soup",
    description: "A playful gourmet creation featuring toasted sweetcorn puree and warm buttered popcorn notes.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Veg Garden Soup",
    description: "A nourishing medley of farm-fresh seasonal vegetables gently stewed in a fragrant clear stock.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Veg Cheese Soup",
    description: "A rich, indulgent soup enriched with melted cheddar cheese and finely chopped garden greens.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Macaroni Relito Soup",
    description: "Hearty Italian macaroni in a spiced tomato broth seasoned with Mediterranean herbs.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Behut Black Olive Soup",
    description: "Unique Mediterranean savory broth blended with black olives and sweet bell pepper notes.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Cream of Celery",
    description: "Smooth and delicate cream soup showcasing the crisp, earthy fragrance of fresh garden celery.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Palak Paneer Soup",
    description: "Silky baby spinach puree delicately studded with tender cubes of fresh malai paneer.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Spinach Sorbha with Narangi",
    description: "Traditional spiced spinach shorba enhanced with a bright hint of fresh narangi orange zest.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Green Coconut Celery Soup",
    description: "Tender coconut water and celery leaves brought together in a refreshing, light tropical stew.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Zed Soup",
    description: "A signature chef soup with mixed winter greens, crackled cumin, and a mild peppery kick.",
    isDemo: true,
  },
  // DEMO - replace with real data
  {
    dishName: "Kathiyawadi Soup",
    description: "Authentic Gujarati-style spiced lentil broth tempered with mustard, curry leaves, and asafoetida.",
    isDemo: true,
  },
  // Asian & Oriental Soups
  {
    dishName: "Manchow Soup",
    description: "Classic Indo-Chinese dark broth infused with garlic, ginger, and finely diced vegetables, crowned with crispy fried noodles.",
    isDemo: true,
  },
  {
    dishName: "Lime Coriander Soup",
    description: "Zesty and invigorating clear broth bursting with fresh crushed coriander leaves, lemon juice, and tender vegetable slivers.",
    isDemo: true,
  },
  {
    dishName: "Wakame Soup",
    description: "Delicate Japanese oceanic broth steeped with nutrient-rich wakame sea greens, silken tofu, and subtle toasted sesame.",
    isDemo: true,
  },
  {
    dishName: "Korean Noodle Soup",
    description: "Robust umami-rich broth loaded with springy noodles, bok choy, scallions, and a warming touch of Korean chili paste.",
    isDemo: true,
  },
  {
    dishName: "Thai Tom Yum Soup",
    description: "Hot and sour aromatic Thai soup infused with lemongrass, kaffir lime leaves, galangal, straw mushrooms, and fresh chili.",
    isDemo: true,
  },
  {
    dishName: "Dumpling Soup",
    description: "Clear simmering vegetable broth harboring delicate handmade steamed dumplings packed with spiced cabbage and water chestnuts.",
    isDemo: true,
  },
  {
    dishName: "Miso Butternut Soup",
    description: "Velvety roasted butternut squash soup balanced harmoniously with fermented white miso paste, ginger, and scallions.",
    isDemo: true,
  },
  {
    dishName: "Miso Shiro Soup",
    description: "Traditional Kyoto-style cloudy white miso broth simmered gently with spring scallions, seaweed, and tender soft tofu.",
    isDemo: true,
  },
  {
    dishName: "Kimchi Soup",
    description: "Fiery and tangy Korean broth crafted from fermented cabbage kimchi, scallions, and silken tofu for a comforting warmth.",
    isDemo: true,
  },
  {
    dishName: "Veg Yaki Soup",
    description: "Wok-seared Japanese vegetable soup featuring charred greens, scallions, baby corn, and a dash of sweet mirin broth.",
    isDemo: true,
  },
  {
    dishName: "Purple Cabbage Paneer Soup",
    description: "Vibrant nutrient-dense soup of braised red cabbage and tender paneer cubes scented with cracked black pepper.",
    isDemo: true,
  },
  {
    dishName: "Orange Coriander Soup",
    description: "Bright and citrusy fusion broth blending fresh winter orange juice with fragrant coriander root and mild green chilies.",
    isDemo: true,
  },
  {
    dishName: "Spicy Edamame Basil Soup",
    description: "Creamy green soup prepared with shelled young edamame beans, sweet Italian basil, and a subtle crushed peppercorn heat.",
    isDemo: true,
  },
  {
    dishName: "Tomkha Soup",
    description: "Silky Thai coconut broth perfumed with fresh galangal, lemongrass, lime juice, and wild button mushrooms.",
    isDemo: true,
  },
  // Mexican, Mediterranean & Continental Soups
  {
    dishName: "Tuscan Bean Soup",
    description: "Traditional Italian rustic stew simmered slowly with cannellini beans, rosemary, roasted garlic, and vine-ripened tomatoes.",
    isDemo: true,
  },
  {
    dishName: "Mexican Veg Soup",
    description: "Festive Latin-style tomato broth packed with sweet corn kernels, black beans, bell peppers, and fresh cilantro.",
    isDemo: true,
  },
  {
    dishName: "Mexican Gumbo Soup",
    description: "Hearty Southern Mexican stew thickened with okra, sweet bell peppers, celery, and warm Creole spices.",
    isDemo: true,
  },
  {
    dishName: "Mexican Chunky Chilli Bean Soup",
    description: "Spicy slow-simmered kidney bean and pinto bean stew with roasted cumin, tomatoes, and diced jalapeños.",
    isDemo: true,
  },
  {
    dishName: "Smokey Chili Quinoa Bean Soup",
    description: "Wholesome and protein-packed soup made with toasted organic quinoa, pinto beans, and smoked Spanish paprika.",
    isDemo: true,
  },
  {
    dishName: "Morrocan Chickpea Soup",
    description: "Aromatic North African soup featuring tender chickpeas simmered in saffron broth with cumin and fresh mint.",
    isDemo: true,
  },
  {
    dishName: "Kabacha Squash & Chestnut Soup",
    description: "Luxurious sweet Japanese kabocha squash velouté blended smoothly with roasted chestnuts and a hint of nutmeg.",
    isDemo: true,
  },
  {
    dishName: "Rosemary Bean & Lemon Soup",
    description: "Earthy white beans gently stewed with fresh garden rosemary and finished with a bright squeeze of sun-ripened lemon.",
    isDemo: true,
  },
  {
    dishName: "Oyster Mississippi Soup",
    description: "Rich Continental chowder loaded with braised oyster mushrooms, celery root, and golden shallots in a velvety sauce.",
    isDemo: true,
  },
  {
    dishName: "Vegan Borscht Soup",
    description: "Classic Eastern European ruby beet soup flavored with dill, shredded root vegetables, and a gentle tangy apple cider kick.",
    isDemo: true,
  },
  {
    dishName: "Samau Soup",
    description: "Wholesome Mediterranean spiced broth infused with wild greens, mountain oregano, and roasted garlic.",
    isDemo: true,
  },
  {
    dishName: "Millet Exotic Veg. Soup",
    description: "Nutritious ancient grain soup featuring slow-cooked barnyard millet, baby asparagus, zucchini, and aromatic bay leaves.",
    isDemo: true,
  },
  {
    dishName: "Feminine Soup",
    description: "Delicate floral-infused herbal broth brewed with beetroot petals, tender pink lotus root, and soothing mild herbs.",
    isDemo: true,
  },
  // Chilled & Hearty Veg Soups
  {
    dishName: "Bulgarian Walnut Chilled Soup",
    description: "Traditional Tarator-style refreshing cold yogurt soup with crushed walnuts, crunchy cucumbers, fresh dill, and garlic.",
    isDemo: true,
  },
  {
    dishName: "Chilled Market Veg. Soup",
    description: "Invigorating chilled gazpacho-style soup pressed from ripe plum tomatoes, bell peppers, cucumbers, and extra virgin olive oil.",
    isDemo: true,
  },
  {
    dishName: "Freezer Veg. Soup",
    description: "Ultra-crisp frozen garden vegetable gazpacho served chilled with mint leaves and crushed Himalayan pink salt.",
    isDemo: true,
  },
  {
    dishName: "Spiced Lentil & Veg. Soup",
    description: "Soul-warming slow-simmered yellow and brown lentils finished with a fragrant tempering of cumin, ginger, and turmeric.",
    isDemo: true,
  },
  {
    dishName: "Rich & Flavorful Veg. Soup",
    description: "Deeply comforting country-style vegetable broth brimming with root vegetables, leeks, and roasted garlic.",
    isDemo: true,
  },
];

// Helper to look up soup demo description
export function getSoupDemoDescription(dishName: string): string | undefined {
  if (!SHOW_DEMO_CONTENT) return undefined;
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const target = normalize(dishName);
  const match = demoSoupDescriptions.find(
    (item) => normalize(item.dishName) === target
  );
  return match?.description;
}

// ============================================================================
// B7. VIDEO (gallery page)
// ============================================================================

export interface GalleryVideoContent {
  videoUrl: string;
  title: string;
  isDemo: boolean;
}

// DEMO - replace with real data
export const demoGalleryVideo: GalleryVideoContent = {
  videoUrl: "", // Empty so styled "Event video coming soon" card is shown
  title: "Grand Wedding Banquet Highlights",
  isDemo: true,
};
