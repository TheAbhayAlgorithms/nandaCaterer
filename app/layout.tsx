import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins, Caveat, Lora, Merriweather } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { QuoteTray } from "@/components/layout/QuoteTray";
import { QuoteSheetModal } from "@/components/layout/QuoteSheetModal";
import { SplashLoader } from "@/components/layout/SplashLoader";
import { RefreshRedirect } from "@/components/layout/RefreshRedirect";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { QuoteSelectionProvider } from "@/context/QuoteSelectionContext";
import { siteConfig } from "@/data/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#7A1F2B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nandacaterer.com"),
  title: {
    default: "Nanda Caterers | Best Wedding Caterers in Mumbai",
    template: "%s | Nanda Caterers – Wedding Caterers in Mumbai",
  },
  description:
    "Nanda Caterers: Veg and non-veg catering in Mumbai, Thane, Navi Mumbai, Pune & Goa. Specializing in lavish wedding feasts, Gujarati & Punjabi delicacies, and corporate events.",
  keywords: [
    "caterers in mumbai",
    "wedding caterers mumbai",
    "veg and non veg caterers mumbai",
    "gujarati caterers bandra",
    "nanda caterers",
    "corporate catering mumbai",
    "best wedding catering pune goa",
  ],
  authors: [{ name: "Nanda Caterers" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nandacaterer.com",
    siteName: "Nanda Caterers",
    title: "Nanda Caterers – Wedding Caterers in Mumbai",
    description:
      "A Perfect Blend of Sensational Food. Veg and non-veg catering for weddings and celebrations.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Nanda Caterers Royal Wedding Banquet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nanda Caterers – Wedding Caterers in Mumbai",
    description:
      "A Perfect Blend of Sensational Food. Veg and non-veg catering for weddings and celebrations.",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/logo-transparent.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/logo-transparent.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["CateringService", "LocalBusiness"],
    name: "Nanda Caterers",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    telephone: "+91 99678 94979",
    url: "https://nandacaterer.com",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Siddhart Colony, Service Road, Near Cardinal Gracious High School, W.E. Highway, Bandra East",
      addressLocality: "Mumbai",
      postalCode: "400051",
      addressCountry: "IN",
    },
    openingHours: "Mo-Sa 09:00-21:00",
    foundingDate: "2005",
    sameAs: [
      siteConfig.social.facebook.url,
      siteConfig.social.x.url,
      siteConfig.social.instagram.url,
    ],
  };

  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${poppins.variable} ${caveat.variable} ${lora.variable} ${merriweather.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-saffron selection:text-charcoal">
        <QuoteSelectionProvider>
          <RefreshRedirect />
          <PublicLayoutWrapper>
            {/* Top Scroll Progress Indicator */}
            <ScrollProgress />

            {/* First Load Splash Screen */}
            <SplashLoader />

            {/* Header & Sticky Navigation */}
            <Navbar />
          </PublicLayoutWrapper>

          {/* Main Landmark */}
          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          <PublicLayoutWrapper>
            {/* Footer */}
            <Footer />

            {/* Floating Actions */}
            <QuoteTray />
            <QuoteSheetModal />
            <ScrollToTop />
            <WhatsAppFab />
          </PublicLayoutWrapper>
        </QuoteSelectionProvider>
      </body>
    </html>
  );
}
