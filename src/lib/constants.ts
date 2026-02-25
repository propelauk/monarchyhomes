// Site-wide constants and configuration

export const SITE_CONFIG = {
  name: 'Monarchy Homes',
  tagline: 'HMO & Single Let Property Specialists',
  phone: '01452 452308',
  email: 'hello@monarchyhomes.com',
  address: 'Gloucestershire, UK',
} as const;

export const COLORS = {
  navy: {
    primary: '#0D1B2A',
    light: '#2d4a72',
  },
  charcoal: {
    primary: '#424242',
    light: '#757575',
  },
  gold: {
    primary: '#FFC857',
    light: '#ffe599',
  },
} as const;

// Stats - Update these from admin dashboard
export const STATS = {
  hmosManaged: 45,
  roomsUnderManagement: 320,
  averageOccupancy: 97,
  rentCollectionRate: 99.2,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  leads: '/api/leads',
  assessment: '/api/assessment',
  callback: '/api/callback',
  download: '/api/download',
} as const;
