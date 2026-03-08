# Lezof Auto Services - لزوف لخدمات السيارات

## Overview
Landing page for Lezof Auto Services, a luxury automotive service center in Riyadh specializing in Land Rover Defender (L663) maintenance program. Built with a "Luxury Dark Mode" aesthetic.

## Architecture
- **Frontend**: React SPA with Tailwind CSS, custom IntersectionObserver animations (FadeUp component)
- **Backend**: Express.js (minimal, serving static assets)
- **Routing**: Wouter (single page - landing page)
- **Styling**: Custom dark theme with Lezof brand colors
- **Note**: Do NOT use framer-motion — causes React hook conflict; use FadeUp component with IntersectionObserver instead

## Design System
- **Background Main**: #0A0B0A (Very Dark Onyx)
- **Background Surface**: #141514 (Cards/Tables)
- **Background Hover**: #1E201E (Interactive elements)
- **Text Primary**: #FFFFFF (Headings)
- **Text Secondary**: #A1A5A1 (Paragraphs)
- **Text Accent**: #E5E5E5 (Emphasized body text)
- **Accent Green Bright**: #00A64F (CTA Buttons)
- **Accent Green Dark**: #005A2B (Badges/Borders)
- **Accent Red**: #D32F2F (Comprehensive maintenance indicator)
- **Border Color**: #2A2D2A (Dividers)
- **Font**: Cairo (Arabic, Google Fonts)
- **Direction**: RTL

## Structure
```
client/src/
├── pages/
│   ├── home.tsx          # Main landing page (all sections)
│   └── not-found.tsx     # 404 page
├── App.tsx               # Router setup
├── index.css             # Theme colors and custom styles
└── main.tsx              # Entry point
```

## Page Sections (in order)
1. **Hero** - H1, value line, price anchor, CTA, trust bar
2. **Problem** - 3 pain-point cards
3. **Why Us** - 8 trust cards grid + social proof counter
4. **Pricing** - Engine selector tabs (2.0L/3.0L/5.0L V8), comparison table, stage indicator
5. **Blog** - RTL carousel with 3 article cards
6. **Guarantee** - 3 risk-reversal cards
7. **FAQ** - 3-question accordion (price, parts, value)
8. **Final CTA** - Background image overlay with booking button
9. **Footer** + Sticky mobile CTA

## Key Features
- Interactive engine selector (2.0L, 3.0L, 5.0L V8) with dynamic pricing
- Engine-specific data: spark plug count (4/6/8), V8-only supercharger belt row
- Comparison table for Regular vs Comprehensive maintenance packages (12 rows)
- FAQ accordion (pure CSS/state, no libraries)
- Social proof counter (configurable via SOCIAL_PROOF_COUNT constant)
- Blog carousel with RTL-correct scrolling
- Sticky mobile CTA button (md:hidden)
- Responsive design (Mobile-first)
- Custom FadeUp animations via IntersectionObserver

## External Links
- Booking URL: https://book.lezof.com

## Assets
- Lezof Arabic logo (white/inverted on dark bg via `brightness-0 invert`)
- Land Rover logo
- Workshop/Defender photos from actual Lezof center