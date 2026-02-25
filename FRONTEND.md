# FRONTEND.md - Monarchy Homes HMO Website

## Project Overview

This document outlines the **frontend implementation** details for the Monarchy Homes website targeting HMO landlords in Gloucestershire. The site prioritizes **speed, responsiveness, clarity, authority, and conversion**.

Frontend must reflect the brand’s **professional, calm, structured, and authoritative** personality while driving users toward lead capture.

---

## Tech Stack

- **Framework:** Next.js 14 (React-based, server-side rendering, fast performance)  
- **Styling:** TailwindCSS (utility-first, responsive, scalable, rapid development)  
- **Animations:** Framer Motion (subtle, professional motion for hero, CTA buttons, transitions)  
- **Forms:** React Hook Form + Yup (validation + integration with Supabase API)  
- **Images:** Next/Image with lazy loading and WebP format for performance  
- **Icons:** Heroicons or custom SVG icons (for trust, compliance, services)  

---

## Core Pages & Layouts

### 1. Home Page (HMO Management Home)

**Hero Section**
- Full-width background: professional HMO interior
- Headline: "Gloucestershire HMO Landlords, Increase Yield. Eliminate Risk."
- Subtext: "Specialist HMO property management focused on compliance, occupancy, and stable income."
- Primary CTA: Button → "Get Free HMO Income Assessment"
- Secondary CTA: Button → "Speak to a Specialist"
- Floating callback button

**Pain / Problem Section**
- Grid or flex layout with icons & bullets:
  - Licensing stress
  - Room voids reducing profit
  - Tenant disputes
  - Council inspections
  - Fire safety compliance worries
  - Endless maintenance calls
- Color-coded highlights (gold for pain, navy for calm)

**Authority Section**
- Cards / blocks displaying:
  - HMO compliance expertise
  - Fire safety management
  - EICR & Gas Safety coordination
  - Council liaison
- Include small animated counters for:
  - HMOs Managed
  - Rooms Under Management
  - Average Occupancy %
  - Rent Collection Rate %

**4-Step System Section**
- Horizontal timeline or step cards:
  1. HMO Compliance Review
  2. Tenant Sourcing & Professional Vetting
  3. Room by Room Management
  4. Monthly Income Reporting & Ongoing Protection

**Case Study / Testimonial Section**
- Before & After carousel
- Optional video snippets
- Client name & property location

**CTA Section**
- Full-width banner with CTA: "Book Your Free HMO Income & Compliance Review"

---

### 2. Our HMO Management System

- Multi-section page with alternating image & text blocks
- Detail services:
  - Tenant sourcing & vetting
  - Room-by-room management
  - Rent collection
  - Maintenance & repairs
- Optional interactive tool: Occupancy calculator
- Highlight compliance expertise visually

---

### 3. Compliance & Licensing Expertise

- Blog / Knowledge Hub layout
  - Latest articles / guides
  - Filters: Licensing, Fire Safety, Legal Updates
- Downloadable resources section
  - HMO Licensing Checklist
  - Compliance guides
- Card-based layout for each compliance topic
- CTA to “Book Free HMO Assessment” prominently

---

### 4. Free HMO Rental Assessment / Contact Page

- Multi-step or single form layout
- Forms:
  1. HMO Assessment Form:
     - Full Name, Phone, Email
     - Property postcode
     - Number of rooms
     - Licensed yes/no
     - Current occupancy
     - Current monthly income
  2. Request Call Back
     - Name, Phone, Best time
  3. Portfolio Owner Form
     - For landlords with 2+ HMOs
- Include validation & inline errors
- Integrate directly with **Supabase** API
- Success page or modal confirmation
- CTA button for floating contact form

---

## UI / UX Guidelines

- Mobile-first design (tailwind breakpoints: sm, md, lg, xl)
- Responsive hero images
- Minimal scroll friction
- Clear visual hierarchy with whitespace
- Color palette:
  - Deep Navy (primary)
  - Muted Gold (highlights / buttons)
  - White / Soft Grey (backgrounds / typography)
- Typography:
  - Headings: Strong serif (authority)
  - Body: Clean sans-serif (clarity)
- Buttons:
  - Primary CTA: Bold gold background, white text, subtle shadow
  - Secondary CTA: Navy outline with hover gold fill
- Animations:
  - Framer Motion fade & slide
  - Subtle hover effects on buttons and cards
- Trust signals prominent above the fold
- Sticky floating callback button (bottom-right)

---

## Components Library

**Reusable Components**
- HeroBanner
- CTAButton (primary & secondary)
- TestimonialCarousel
- FeatureCard
- StatisticCounter
- FormSection (for different forms)
- Navbar / Footer
- Modal / Slide-in Form

**Integration**
- Forms → Supabase API → Dashboard
- CTA buttons linked to forms or booking system
- Analytics triggers on CTA clicks

---

## SEO & Performance

- Server-side rendered pages (Next.js SSR)
- Meta tags per page (title, description, og:image, canonical)
- Structured data (schema.org) for HMO business and articles
- Images: optimized with `next/image` lazy loading & WebP
- Lighthouse score target: 90+ across mobile & desktop
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## Analytics Integration

- Google Analytics 4
- Microsoft Clarity (heatmaps & scroll tracking)
- Optional PostHog for detailed funnel & form drop-off analysis
- Track:
  - Form submissions
  - CTA clicks
  - Lead funnel progression
  - Exit pages and bounce rate
  - Scroll depth

---

## Frontend Developer Notes

- Use **Tailwind config** for brand colors & fonts
- Create **utility classes** for spacing, cards, buttons
- Animate numbers on scroll (occupancy %, rent collection)
- Ensure **a11y**: alt tags, ARIA roles, contrast ratios
- Test responsiveness across devices & screen sizes
- Deploy to **Vercel** for production
- Maintain clean component hierarchy for easy dashboard integration

---

## Optional Enhancements

- Dark/light mode toggle
- Interactive calculators or tools for landlords
- Video backgrounds for hero sections (subtle)
- Micro-interactions for buttons and cards
- Dynamic testimonial slider fetched from CMS/Supabase