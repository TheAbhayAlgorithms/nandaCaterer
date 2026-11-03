# Nanda Caterers – Official Web Application

[![Live Production](https://img.shields.io/badge/Live-nandacaterer.com-B8391B?style=for-the-badge&logo=vercel)](https://nandacaterer.com)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

Official high-performance web platform for **Nanda Caterers**, Mumbai's premier 100% vegetarian wedding and corporate banqueting specialist (serving celebrations since 2005 across Mumbai, Pune, and Goa).

**Live Website**: [https://nandacaterer.com](https://nandacaterer.com)

---

## 🌟 Core Architecture & Capabilities

### 1. Progressive Disclosure Homepage
- **Cinematic Hero**: Full-bleed backdrop, subtle dark overlay, clean typography, primary action pill, secondary menu explorer, and signature torn-paper SVG boundary.
- **Dynamic Metrics Strip**: Live counter animation powered by **SF Pro Display Heavy (weight: 800)** with tabular lining figures. Automatically computes years of culinary excellence from 2005 alongside verified milestones (500+ events, 100,000+ guests served, 3 key cities).
- **About Bento Showcase**: Two-column responsive storytelling grid pairing authentic brand history with 2×2 culinary imagery.
- **Services Showcase**: 6 signature banqueting offerings with modal deep-dives and the 4 trust pillars (**Punctuality**, **Professional Team**, **Quick Booking**, and **Food Quality**).
- **Interactive Cuisine Showcase**: Visual gateway into 8 culinary categories.
- **Gallery Snapshot & Lightbox**: Interactive snapshot strip leading to full banqueting albums.
- **Deterministic Torn-Paper SVG**: Mathematical pseudo-random SVG paths generated with zero hydration mismatches (`<TornEdge />`).

### 2. Comprehensive 635+ Delicacies Menu
- **8 Dedicated Cuisine Hubs** (`/menu/[category]`):
  - Beverages & Mocktails
  - Soups & Shorbhas
  - Starters & Appetizers
  - Live Counters & Interactive Stalls
  - Mains & Royal Curries
  - Breads, Rice & Biryanis
  - Salads & Accompaniments
  - Sweets, Mithai & Desserts
- **Culinary Descriptions**: Every single dish includes an authentic, crafted 2–3 line culinary description (`data/dishDescriptions.ts`).
- **Strict Baseline Alignment**: Dish headings, descriptions, and tag pills (`Popular`, `Jain Available`, `Extra Rs.30/-`) are aligned flush left for clean readability.
- **Real-Time Dish Filter**: Fast in-page keyword search with instant mark highlighting.

### 3. Interactive Selection Tray & WhatsApp Integration
- **Persistent Selection Tray**: Clients can browse dishes, tap `+` to collect favorites, and review selections in a persistent session tray.
- **Automated WhatsApp Booking Engine** (`lib/whatsapp.ts`):
  - Blank, direct chat initiation via the floating WhatsApp FAB button.
  - Comprehensive catering inquiries with emojis, client credentials, event date, guest estimate, venue, and bulleted menu selections.
  - Generates rich OpenGraph website preview cards in WhatsApp pointing directly to `https://nandacaterer.com`.

### 4. Admin Management Portal (`/admin`)
- **Secure Authentication**: Session-based admin login (`/admin/login`).
- **Live Menu Manager** (`/admin/menu`): Real-time delicacy management, dish visibility, special pricing notes, and popularity flags backed by Supabase with resilient static fallback data.
- **Live Gallery Manager** (`/admin/gallery`): Upload banquet photography, assign event categories, and update captions.

### 5. SEO & Web Standards
- Canonical links, metadata, OpenGraph, and Twitter Cards configured for `https://nandacaterer.com`.
- Dynamic XML Sitemap (`/sitemap.xml`) and search crawler directives (`/robots.txt`).
- Structured Schema.org JSON-LD breadcrumbs on all primary pages.
- 100% Pure Vegetarian assurance with segregated Jain & Swaminarayan preparations.

---

## 🎨 Design Tokens & Typography

| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--accent` | `#B8391B` | Terracotta / Rust (CTA buttons, icons, highlights) |
| `--accent-dark` | `#8E2A12` | Hover states and deep active elements |
| `--ink` | `#2A1B16` | Primary high-contrast body typography |
| `--maroon` | `#5C1A1B` | Royal banqueting overlays and premium cards |
| `--paper` | `#FFFFFF` | Core section backgrounds |
| `--peach` | `#FDEFE7` | Warm secondary accents & service cards |
| `--cream` | `#FFF8EF` | Menu backdrop & subtle highlights |
| `--leaf` | `#2F6B3C` | Vegetarian guarantee badge |

**Typography**:
- **Headings**: Playfair Display / HeadingAmpersand (`font-heading`)
- **Body Text**: Poppins / Sans-serif (`font-body`)
- **Editorial Subheadings**: Lora (`font-lora`)
- **Live Counting Metrics**: Apple SF Pro Display Heavy, 800 weight (`font-sf-pro-bold`)

---

## 📁 Project Directory Structure

```
├── app/
│   ├── (site)/             # Public pages (Home, About, Services, Menu, Gallery, Connect, Contact, FAQ)
│   ├── admin/              # Admin dashboard, Menu Manager, Gallery Manager, Login
│   ├── api/                # API routes for contact inquiries and reviews
│   ├── layout.tsx          # Root layout with metadata for nandacaterer.com
│   ├── robots.ts           # Dynamic search engine directives
│   └── sitemap.ts          # Automated XML sitemap generation
├── components/
│   ├── home/               # Hero, NumbersStrip, AboutBento, Services, MenuTeaser, Gallery
│   ├── menu/               # DishList, DishItem, CategoryView, MenuSearch
│   ├── services/           # ServiceCard, ServiceModal, ServicesContent
│   ├── layout/             # Header, Footer, WhatsAppFab, MegaMenu, Selection Tray
│   ├── ui/                 # Counter, Modal, Reveal, Breadcrumbs, Badges
│   └── shape/              # TornEdge (mathematical SVG generator), NextStepStrip
├── data/
│   ├── site.ts             # Business facts, contacts, working hours, headquarters
│   ├── siteContent.ts      # Live stats configuration (calculated from 2005)
│   ├── menu.ts             # 8 menu categories, sections, and dish definitions
│   ├── dishDescriptions.ts # Detailed culinary descriptions for all 635 dishes
│   ├── services.ts         # 6 core services and Why Choose Us pillars
│   ├── gallery.ts          # Curated event albums and banqueting photos
│   └── faq.ts              # Frequently asked catering questions
└── lib/
    ├── whatsapp.ts         # WhatsApp message builder and link generator
    ├── supabase/           # Supabase client and server authentication helpers
    └── cn.ts               # Tailwind class merge utility
```

---

## 🚀 Local Development Setup

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/TheAbhayAlgorithms/nandaCaterers.git
cd nandaCaterers
npm install
```

### 2. Configure Environment Variables
Copy the template configuration:
```bash
cp .env.example .env.local
```

Populate `.env.local` with your credentials:
```env
# Supabase Configuration (Admin Portal)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Production Site URL
NEXT_PUBLIC_SITE_URL=https://nandacaterer.com

# Optional: Google Places API for verified reviews
GOOGLE_PLACES_API_KEY=your-places-api-key
GOOGLE_PLACE_ID=your-place-id
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🚢 Production Deployment

The project is configured for automated deployment via Vercel:

1. Connect your repository to [Vercel](https://vercel.com).
2. Configure the production domain: **`nandacaterer.com`**.
3. Add the production environment variables (`NEXT_PUBLIC_SITE_URL=https://nandacaterer.com`, Supabase credentials).
4. Deploy on the `main` branch. Every push to `main` automatically builds and deploys to production.

---

## 📞 Business Information & Contact

- **Brand**: Nanda Caterers (Est. 2005)
- **Official Website**: [https://nandacaterer.com](https://nandacaterer.com)
- **Headquarters**: Shop No. 12, Ground Floor, Ocean View Building, Hill Road, Bandra West, Mumbai 400050
- **Direct Phone**: [+91 99678 94979](tel:+919967894979)
- **Official Email**: `info@nandacaterer.com`
- **Service Regions**: Mumbai, Navi Mumbai, Thane, Pune, and Goa
