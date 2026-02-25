# Monarchy Homes - Frontend Setup Guide

A premium, high-converting website for Monarchy Homes, targeting HMO landlords in Gloucestershire. Built with Next.js 14, TailwindCSS, and Framer Motion.

## Features

- **Hero Section** - Eye-catching headline with dual CTAs and trust indicators
- **Pain Points** - Addresses common HMO landlord challenges
- **Authority Stats** - Animated counters showcasing track record
- **4-Step Process** - Clear explanation of management approach
- **Case Studies** - Before/after results with testimonials
- **Lead Capture Forms** - Multi-step HMO assessment form
- **Lead Magnet** - Free compliance checklist download
- **Floating Callback** - Always-visible callback request button
- **Analytics Ready** - GA4, Microsoft Clarity, and PostHog integration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to project directory
cd monarchyhomes

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase (for production database)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_id
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key

# Email Service (for form notifications)
RESEND_API_KEY=your_resend_api_key
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── callback/     # Callback request endpoint
│   │   ├── download/     # Lead magnet download endpoint
│   │   └── leads/        # Lead submission endpoint
│   ├── globals.css       # Global styles & Tailwind
│   ├── layout.tsx        # Root layout with analytics
│   └── page.tsx          # Homepage
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── PainSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── CaseStudySection.tsx
│   │   ├── CTASection.tsx
│   │   ├── LeadMagnetSection.tsx
│   │   └── AssessmentForm.tsx
│   ├── Analytics.tsx
│   ├── Button.tsx
│   ├── FloatingCallback.tsx
│   ├── Footer.tsx
│   └── Header.tsx
└── lib/
    ├── constants.ts      # Site config & stats
    └── utils.ts          # Helper functions
```

## Customization

### Updating Stats

Edit `src/lib/constants.ts` to update business stats:

```typescript
export const STATS = {
  hmosManaged: 45,
  roomsUnderManagement: 320,
  averageOccupancy: 97,
  rentCollectionRate: 99.2,
}
```

### Changing Contact Info

Update `src/lib/constants.ts`:

```typescript
export const SITE_CONFIG = {
  name: 'Monarchy Homes',
  phone: '01234 567890',
  email: 'info@monarchyhomes.co.uk',
  address: 'Gloucestershire, UK',
}
```

### Color Palette

The theme uses:
- **Navy**: `#0D1B2A` (primary brand color)
- **Gold**: `#FFC857` (accent/CTA color)
- **Charcoal**: `#424242` (text color)

Customize in `tailwind.config.js`.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Build for Production

```bash
npm run build
npm start
```

## API Routes

All form submissions are handled via API routes:

- `POST /api/leads` - HMO assessment form submissions
- `POST /api/callback` - Callback request submissions
- `POST /api/download` - Lead magnet download requests

In production, connect these to Supabase and your email service.

## Performance

The site is optimized for:
- Lighthouse score 90+
- Fast LCP with optimized images (WebP)
- Minimal JavaScript bundle
- Lazy loading for below-fold content

## Homepage Sections

1. **Hero** - Main headline with "Increase Yield. Eliminate Risk." messaging
2. **Pain Section** - Highlights landlord frustrations (licensing, voids, tenants)
3. **Stats Section** - Authority badges showing HMOs managed, occupancy rates
4. **Process Section** - 4-step management approach
5. **Case Studies** - Before/after comparisons with real results
6. **CTA Section** - "Let's Review Your HMO" call-to-action
7. **Assessment Form** - Multi-step lead capture form
8. **Lead Magnet** - Free HMO Compliance Checklist download

## License

Private - Monarchy Homes
