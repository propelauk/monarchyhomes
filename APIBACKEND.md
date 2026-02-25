# APIBACKEND.md - Monarchy Homes HMO Website

## Overview

This document outlines the backend and API architecture for the **Monarchy Homes HMO website**.  
The backend handles:

- Lead capture and management  
- Admin dashboard integration  
- Forms processing  
- Email notifications  
- Analytics and tracking  
- Compliance resource management  

The system is designed to be **secure, fast, and scalable**, connecting the frontend (Next.js) to the database (Supabase/PostgreSQL) and the admin dashboard.

---

## Tech Stack

- **Backend:** Next.js API Routes / Node.js (serverless functions)  
- **Database:** Supabase (PostgreSQL)  
- **Authentication:** Supabase Auth (email/password, admin roles)  
- **Email Service:** Resend or SendGrid  
- **Analytics:** Google Analytics 4, Microsoft Clarity, optional PostHog  

---

## API Structure

### 1. Leads API

**Endpoint:** `/api/leads`  
**Methods:** POST, GET, PUT, DELETE  

**Use Cases:**

- **POST:** Create a new lead from HMO Assessment Form or Callback Request  
- **GET:** Fetch leads for dashboard with filters (property type, portfolio, status)  
- **PUT:** Update lead status, add notes, assign tags  
- **DELETE:** Admin use only  

**POST Request Example:**
```json
{
  "fullName": "John Doe",
  "phone": "07123456789",
  "email": "john@example.com",
  "propertyPostcode": "GL1 1AA",
  "numberOfRooms": 5,
  "licensed": true,
  "currentOccupancy": 4,
  "currentMonthlyIncome": 2000,
  "leadSource": "website"
}

Response Example:

{
  "success": true,
  "message": "Lead successfully created",
  "leadId": "abc123"
}
2. Admin / Dashboard API

Endpoint: /api/admin/leads
Methods: GET, PUT

Fetch leads with filters: property type, licensed/unlicensed, portfolio owner, status (new, contacted, scheduled, closed)

Update notes, reminders, and statuses

Trigger email notifications for follow-ups

3. Forms API

Endpoint: /api/forms
Methods: POST

Handles submissions for:

HMO Assessment Form

Request Callback Form

Portfolio Owner Form

All submissions create a lead in the database and trigger email notifications to both the lead and admin.

Validation Rules:

Full Name: Required

Phone: Required, valid format

Email: Optional but recommended

Number of Rooms: Required for HMO assessment

Property Postcode: Required

Current Occupancy & Monthly Income: Optional

4. Email API

Endpoint: /api/email
Methods: POST

Handles automated emails for:

Lead confirmation

Admin notification

Newsletter or compliance update broadcast

Request Example:

{
  "to": "lead@example.com",
  "subject": "Your Free HMO Assessment Request",
  "html": "<p>Thank you for submitting your HMO assessment request. Our specialist will contact you shortly.</p>"
}
5. Analytics API

Endpoint: /api/analytics
Methods: POST

Tracks:

Form submissions

CTA clicks

User journeys

Stores session metadata:

Page visited

Exit page

Bounce event

Scroll depth

Feeds into PostHog or the admin dashboard for reporting.

6. Compliance Resource Management API

Endpoint: /api/resources
Methods: GET, POST, DELETE

Admin can upload compliance guides, checklists, and HMO updates

Frontend fetches resources dynamically for the knowledge hub

Optional: track downloads for lead capture

Security & Best Practices

Authentication: Supabase Auth for admin routes

Validation: Yup + backend checks for all inputs

CORS: Restrict access to frontend domain

Sanitization: Prevent SQL injection and XSS

Environment Variables: Store API keys securely

Rate Limiting: Prevent form spam

Deployment Notes

Backend functions hosted on Vercel via Next.js API routes

Supabase manages database and authentication

Email service connected via secure environment variables

Monitor logs for API errors and performance