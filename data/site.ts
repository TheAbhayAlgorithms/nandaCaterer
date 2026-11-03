// Business configuration and facts per Section 9.1
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const SITE_URL =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://nandacaterer.com";

export const siteConfig = {
  name: "Nanda Caterers",
  legalName: "Nanda Caterers Mumbai",
  headline: "A Perfect Blend of Sensational Food",
  tagline: "A Perfect Blend of Sensational Food",
  subline: "Wedding catering with new ideas, served in our own style.",
  description:
    "Nanda Caterers: Veg and non-veg catering in Mumbai, Thane, Navi Mumbai, Pune & Goa. Specializing in lavish wedding feasts, Gujarati & Punjabi delicacies, and corporate events.",
  canonicalUrl: SITE_URL,
  foundedYear: 2005,
  experienceYears: 20,

  // Served areas
  areasServed: ["Mumbai", "Thane", "Navi Mumbai", "Pune", "Goa"],

  phone: {
    display: "+91 99678 94979",
    raw: "+919967894979",
    whatsappNumber: "919967894979",
  },
  phoneTel: "tel:+919967894979",
  whatsappUrl: getWhatsAppUrl(),
  hours: "MON-SAT: 9 AM - 9 PM",
  mapDirectionsUrl: "https://maps.google.com/?q=Nanda+Caterers+Bandra+East+Mumbai",

  workingHours: {
    days: "Monday to Saturday",
    time: "9:00 AM to 9:00 PM",
    display: "MON-SAT: 9 AM - 9 PM",
    raw: "Mo-Sa 09:00-21:00",
  },

  // Response promise: "We just need a couple of hours! No more than 2 working days since receiving your enquiry."
  responsePromise: "We just need a couple of hours! No more than 2 working days since receiving your enquiry.",

  mapEmbedUrl: "https://maps.google.com/maps?q=nanda%20caterers&t=m&z=17&output=embed&iwloc=near",

  offices: [
    {
      type: "Main Office",
      name: "Main Office (Bandra East)",
      address: "Siddhart Colony, Service Road, Near Cardinal Gracious High School, W.E. Highway, Bandra (East), Mumbai 400 051",
      city: "Mumbai",
      pinCode: "400051",
      isPrimary: true,
      directionsUrl: "https://maps.google.com/?q=Nanda+Caterers+Bandra+East+Mumbai",
    },
    {
      type: "Branch Office",
      name: "Branch Office (Khar East)",
      address: "Shop No 1, Prajakta Apartment, Nirmal Nagar, Near Nirmal Nagar Police Station, Khar (East), Mumbai 400 051",
      city: "Mumbai",
      pinCode: "400051",
      isPrimary: false,
      directionsUrl: "https://maps.google.com/?q=Shop+No+1+Prajakta+Apartment+Khar+East+Mumbai",
    },
  ],

  // Stats: varieties: 500, customers: 5000, years: 15, freshness: 100 with // TODO: confirm with client
  stats: {
    varieties: { value: 500, suffix: "+", label: "Foods Variety" }, // TODO: confirm with client
    customers: { value: 5000, suffix: "+", label: "Satisfied Customers" }, // TODO: confirm with client
    years: { value: 20, suffix: "+", label: "Years of Experience" }, // TODO: confirm with client
    freshness: { value: 100, suffix: "%", label: "Fresh & Tasty Food %" }, // TODO: confirm with client
  },

  social: {
    facebook: {
      name: "Facebook",
      url: "https://www.facebook.com/nandacaterer",
    },
    x: {
      name: "X",
      url: "https://x.com/nandacaterers",
    },
    instagram: {
      name: "Instagram",
      url: "https://www.instagram.com/nanda_caterers/",
    },
    whatsapp: {
      name: "WhatsApp",
      url: getWhatsAppUrl(),
    },
  },
};
