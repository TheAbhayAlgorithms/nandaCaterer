# Nanda Caterers – Official Website (Reference-Layout Edition)

A complete, production-ready, fully responsive website built for **Nanda Caterers**, Mumbai's premier wedding and event catering company (founded 2005).

Built with **Next.js 15 (App Router)**, **TypeScript (strict)**, **Tailwind CSS**, and **Framer Motion**, strictly following the **Master Prompt v2 (Progressive Disclosure & Reference-Layout Edition)**.

---

## 🌟 Progressive Disclosure & Architecture

1. **Short Teaser Home Page**:
   - Exactly 5 sections + dark offer band + compact footer:
     1. **Hero**: Full-bleed photo, 45% dark overlay, centered stack, single outlined pill button ("Get a Quote" opening Quote Sheet), secondary "Explore Menu" link, and signature torn-paper bottom edge.
     2. **About Bento**: 2-column layout (concise story on left; 2×2 checkerboard photo and terracotta accent bento on right).
     3. **Services Teaser**: Pale peach doodle pattern background, 3×2 grid of 6 white cards with line-clamp and "Show More" opening accessible Service modal.
     4. **Gallery Carousel**: Horizontal snap carousel of 8 photo cards with round white overlapping arrows and lightbox trigger.
     5. **Menu Teaser**: Cream background, row of 8 rounded cuisine cards linking to menu categories.
     6. **Offer / Quote Band**: Dark full-bleed background, torn-paper top edge, right-aligned content with highlighted "Free Quote" background.
     7. **Footer**: 3 columns (Contact, Working hours, Quick links), mobile accordions.
2. **Signature Torn-Paper Edge**:
   - `<TornEdge position="top|bottom" color="..." />` with deterministic seeded pseudo-random SVG generation in `lib/tornPath.ts` (zero hydration mismatch).
3. **Small & Focused Inner Pages**:
   - All inner pages start with a compact hero (240–320px, dark overlay, centered H1, breadcrumb, and torn bottom edge) and contain at most 2 to 3 focused content blocks.
   - `/about`: Segmented pill control tabs (`Our Story` | `Our Reach` | `Our Crew` | `In Numbers`), URL `?tab=` sync, bento reuse.
   - `/services`: 3×2 card grid, `ServiceModal`, 4-icon "Why Nanda Caterers" row, and deep-link `/services/[slug]`.
   - `/menu`: Segmented control (`Indian Food` 8 cards | `Global Cuisines` 5 cards).
   - `/menu/[category]`: One cuisine, sub-section tabs, paginated dish grid (18 items + "Show more dishes"), category search, category switcher, and floating selection chip.
   - `/gallery`: 12 photos + filter chips (`All`, `Weddings`, `Corporate`, `Decor`, `Food`), "Load more" for next 12, accessible Lightbox.
   - `/contact`: Tabs (`Send Enquiry` | `Visit Us` | `FAQ` accordion).
4. **Interactive Quote Selection Tray**:
   - Per-dish "+" button saves items to `localStorage`.
   - Floating chip "Your selection (n)" opens a sheet with remove buttons, "Get Quote with these dishes", and WhatsApp prefilled message.
5. **Universal One-Strip NextStepStrip**:
   - Every page ends with a single clean forward-navigation strip (one headline + one or two buttons) rather than long footer stacks.

---

## 🎨 Design Tokens

- `--accent: #B8391B` (rust/terracotta; buttons, tiles, icons, highlighted words)
- `--accent-dark: #8E2A12` (hover)
- `--ink: #2A1B16` (text)
- `--maroon: #5C1A1B` (dark overlays)
- `--paper: #FFFFFF` (main sections)
- `--peach: #FDEFE7` (services band with subtle food doodle pattern)
- `--cream: #FFF8EF` (menu band)
- `--night: #1B1210` (dark band, footer)
- `--leaf: #2F6B3C` (vegetarian badge)

**Typography**:
- Headings: Playfair Display / Cormorant Garamond (`font-heading`)
- Body & UI: Poppins / DM Sans (`font-body`)
- Fluid sizes via `clamp()` tokens in `app/globals.css`.

---

## 🚀 Setup & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your variables:
```env
# Optional: Resend API credentials for emailing quotes
RESEND_API_KEY=re_123456789
QUOTE_TO_EMAIL=info@nandacateres.com

# Site URL for canonical metadata & Open Graph
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
*(In development, quote submissions are safely logged to the server terminal if no Resend key is provided).*

### 3. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 4. Production Build
```bash
npm run build
npm run start
```

---

## 📁 How to Update Content (Data Files)

All content is strictly isolated under `/data`:
- `data/site.ts`: Business facts, office addresses, phone/WhatsApp, email, hours, response promise, map URL, stats.
- `data/about.ts`: Story copy, timeline, reach text, cities, occasions, crew cards.
- `data/services.ts`: 6 core services (slug, title, icon, short copy ≤110 chars, modal copy, highlights, image) + 4 "Why" features.
- `data/menu.ts`: 13 cuisine categories (`breakfast`, `starter`, `welcome-drink`, `main-course`, `gujarati`, `south-indian`, `sweets`, `ice-cream`, `chinese`, `continental`, `thai`, `italian`, `mexican`) with sub-sections and dishes.
- `data/gallery.ts`: 24 gallery items categorized under `Weddings`, `Corporate`, `Decor`, `Food`.
- `data/testimonials.ts`: Reviews flagged for real client updates.
- `data/faq.ts`: 5 core Q&As covering minimum guests, advance booking, custom menus, areas served, and decoration.

---

## 🚢 Deploying to Vercel

1. Push to GitHub.
2. In [Vercel](https://vercel.com), select **"Add New Project"** and import the repository.
3. Configure Environment Variables:
   - `RESEND_API_KEY`
   - `QUOTE_TO_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (e.g., `https://nandacaterer.com`)
4. Click **"Deploy"**.

---

## 📋 Client TODO List Before Launch

Please review and confirm these items before going live:

1. **Confirm Email Spelling**:
   - The original website listed `info@nandacateres.com` (missing the second 'r'). Confirm whether this typo inbox is active or if `info@nandacaterer.com` should be used. Configured in `data/site.ts`.
2. **Replace Placeholder Crew & Testimonials**:
   - `data/about.ts`: Replace the 3 role-based placeholder cards (Head Chef, Event Manager, Kitchen Lead) with actual team members.
   - `data/testimonials.ts`: Replace placeholder reviews with real client testimonials.
3. **Confirm Welcome Drink List**:
   - The original source page for Welcome Drinks was unavailable. `data/menu.ts` contains a placeholder list of standard Indian welcome drinks (Fresh Lime Soda, Mango Lassi, Jaljeera, Aam Panna, Rose Sharbat, Fruit Punch, Masala Chaas, Cold Coffee).
4. **Confirm Business Stats**:
   - Current stats: 500 Varieties, 5,000 Customers, 15 Years, 100% Freshness in `data/site.ts`. Confirm exact numbers.
5. **Add Real Social Media URLs**:
   - Update Facebook, Instagram, and Twitter URLs in `data/site.ts`.
6. **Swap Stock Photos for Real Photos**:
   - Update `data/gallery.ts`, service photos, and hero backgrounds with photographs of real Nanda Caterers banquet setups, dishes, and live counters.
