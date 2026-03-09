# Monarchy Homes - HMO Income & Compliance Specialist Website

## Project Overview

This project is a complete digital transformation for **Monarchy Homes**, targeting HMO landlords in **Gloucestershire**. The website is designed to convert landlord leads, showcase authority in HMO compliance and management, and integrate a professional admin dashboard for lead management, analytics, and email automation.

The site emphasizes **trust, authority, clarity, and local expertise**, converting visitors into qualified landlord leads.

---

## Target Audience

- HMO landlords (single HMOs, multi-unit portfolios)
- Concerned about compliance, inspections, tenant turnover, rent collection, and council regulations
- Analytical, profit-focused, and risk-averse
- Located specifically in **Gloucestershire** (Gloucester, Cheltenham, Stroud, Tewkesbury)

---

## Core Emotional Promise

> "You earn more, stay compliant, and reduce stress. We manage the hard parts so you don’t have to."

**Key Emotional Drivers**:
- Protection (compliance & legal safety)
- Income stability (maximizing occupancy & rent collection)
- Simplicity (stress-free management)
- Authority (trusted local experts)

---

## Website Structure

### Page 1: HMO Management Home

**Hero Section**
- Headline: "Gloucestershire HMO Landlords, Increase Yield. Eliminate Risk."
- Subtext: Specialist HMO management focused on compliance, occupancy, and stable income
- Primary CTA: "Get Free HMO Income Assessment"
- Secondary CTA: "Speak to a Specialist"
- Visual: Calm interior of shared accommodation, subtle animated CTA buttons
- Floating Request Callback button

**Pain Section**
- Headline: "Running an HMO Shouldn’t Feel Like Fighting Fires Daily"
- Pain bullets:
  - Licensing stress
  - Room voids reducing profit
  - Tenant disputes
  - Council inspections
  - Fire safety compliance worries
  - Endless maintenance calls
- Emotional reassurance: "We Handle It All"

**Authority Section**
- HMO licensing expertise
- Fire safety compliance management
- EICR and Gas Safety coordination
- Council liaison
- Occupancy rate statistics
- Void reduction metrics
- Testimonials from landlords

**4-Step System**
1. HMO Compliance Review
2. Tenant Sourcing & Professional Vetting
3. Room by Room Management
4. Monthly Income Reporting & Ongoing Protection

**Numbers Section**
- HMOs Managed: XX
- Rooms Under Management: XXX
- Average Occupancy: XX%
- Rent Collection Rate: XX%
- Years in Management: XX

**Case Study Example**
- 6 Bed HMO in Gloucester
- Before: 2 rooms vacant, irregular rent
- After: 100% occupancy, structured tenancy management

**CTA**
- Headline: "Let’s Review Your HMO"
- Button: "Book Your Free HMO Income & Compliance Review"

---

### Page 2: Our HMO Management System
- Detailed description of services:
  - Tenant sourcing and vetting
  - Room-by-room management
  - Rent collection
  - Maintenance and repairs
- Compliance & Licensing Expertise:
  - Fire safety
  - Council liaison
  - Licensing coordination
- Optional interactive tool: Occupancy calculator

---

### Page 3: Compliance & Licensing Expertise
- Downloadable guides:
  - HMO licensing checklist for Gloucestershire
  - Compliance tips and best practices
- Blog / Knowledge Hub:
  - Licensing updates
  - Fire safety regulations
  - Renters Reform Bill impact
- Positions Monarchy Homes as strategic advisors

---

### Page 4: Free HMO Rental Assessment / Contact
**Forms Required**
1. HMO Assessment Form:
   - Full Name
   - Phone
   - Email
   - Property postcode
   - Number of rooms
   - Licensed yes/no
   - Current occupancy
   - Current monthly income
2. Request Call Back Form:
   - Name
   - Phone
   - Best time to call
3. Portfolio Owner Form:
   - For landlords with 2+ HMOs

- CTA: "Book Your Free HMO Income & Compliance Review"
- Floating request callback button for convenience

---

## Lead Capture & Conversion Funnel
1. Instagram / Social → Website Landing Page  
2. Free HMO Compliance Call Form → Qualified Lead  
3. CRM Tracking → Follow-Up Emails  
4. Consultation → Signed Management Contract

**Lead Magnets**
- HMO Compliance Checklist PDF
- Interactive Occupancy & Income Calculator

---

## Admin Dashboard Features

**Lead Management / CRM**
- Track leads by property type, licensed/unlicensed, number of rooms
- Notes and call reminders
- Lead source tracking (Instagram, website, campaigns)

**Analytics & Behaviour Tracking**
- Daily, weekly, monthly visits
- Conversion rate
- Exit pages and bounce tracking
- Form drop-off tracking
- Heatmaps / scroll depth (Microsoft Clarity / PostHog)

**Email & Automation**
- Broadcast regulatory updates to landlords
- Automated follow-ups for new leads
- Notifications via SMS / email when new lead arrives

**Advanced Tools**
- Occupancy & rent calculator
- Compliance resource library
- Emergency 24/7 badge display (optional)

---

## Instagram & Social Media Strategy

**Bio**
> "HMO Income & Compliance Specialists | Gloucestershire Landlords | Maximise Yield. Eliminate Risk. Free HMO Assessment Below"

**Pinned Posts**
1. "Why HMO Landlords In Gloucestershire Switch To Us"
2. "HMO Licensing Explained for Gloucestershire"
3. Case Study with Numbers

**Content Strategy**
- Short talking head videos explaining compliance & inspections
- Before/after HMO management case studies
- Data-driven posts: occupancy %, rent collection, void periods
- Localized hashtags: #GloucestershireHMOs, #CheltenhamPropertyManagement
- CTAs pointing to website forms and lead magnets

---

## Design Direction

- Tone: Sharp, authoritative, structured, professional, confident
- Colors: Deep navy, charcoal, gold accents, white, soft grey
- Typography: Strong serif headings, clean sans serif body
- Layout: Structured grids, plenty of white space, clear data blocks
- Photography: Real staff and property interiors
- Subtle motion: Animated CTA buttons, hero section effects

---

## Tech Stack

**Frontend:** Next.js 14 + TailwindCSS + Framer Motion  
**Backend:** Next.js API routes  
**Database & Auth:** Supabase (PostgreSQL, real-time lead tracking, authentication)  
**Email:** Resend or SendGrid  
**Analytics:** Google Analytics 4, Microsoft Clarity, optional PostHog  
**Hosting:** Vercel  

**Advantages:** Fast, secure, modern, scalable, SEO-friendly, integrated dashboard and analytics

---

## Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/propelauk/monarchyhomes.git
cd monarchyhomes
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase (Required for production)
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Email - Option 1: Gmail (Recommended for small businesses)
GMAIL_USER=hello@yourdomain.com
GMAIL_APP_PASSWORD=your16characterapppassword

# Email - Option 2: Resend (Alternative for high volume)
# RESEND_API_KEY=your_resend_api_key

# Email Settings
FROM_EMAIL=Your Business <hello@yourdomain.com>
ADMIN_EMAIL=hello@yourdomain.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Setting up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy the contents of `supabase/schema.sql` and run it to create all tables
4. Copy your project URL and API keys from Settings > API

### 4. Setting up Email (Choose One)

**Option A: Gmail (Recommended for small businesses)**

1. Follow the guide in `docs/GMAIL_SETUP_GUIDE.md`
2. Create an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Add `GMAIL_USER` and `GMAIL_APP_PASSWORD` to your `.env.local`

**Option B: Resend (For higher volume)**

1. Create an account at [resend.com](https://resend.com)
2. Add and verify your domain
3. Create an API key
4. Add the `RESEND_API_KEY` to your `.env.local` file

### 5. Run Development Server

```bash
npm run dev
```

### 6. Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

---

## Lead Magnet Download System

The site includes a lead magnet system for "The Renters Rights Act Explained" PDF:

1. User fills in their details on the homepage
2. An email is sent with a secure download link
3. User clicks the link and is taken to a download page
4. Download is tracked in the database

The PDF file is located at: `public/The Renters Rights Act explained.pdf`

---

## Strategic Positioning Summary

- Headline: **"Maximise Your HMO Income Without The Compliance Headache"**  
- Tagline: **"HMO Income & Compliance Specialists for Gloucestershire Landlords"**  
- Messaging aligned across website, forms, lead magnets, and Instagram  
- Focus on authority, numbers, compliance expertise, and local familiarity