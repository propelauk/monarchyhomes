import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@/components/Analytics'
import { FloatingCallback } from '@/components/FloatingCallback'

export const metadata: Metadata = {
  metadataBase: new URL('https://monarchyhomes.com'),
  title: 'Monarchy Homes | Expert HMO & Single Let Property Management in Gloucestershire',
  description: 'Specialist HMO and single let property management focused on compliance, occupancy, and stable monthly income for landlords in Gloucestershire. Get your free property assessment today.',
  keywords: 'HMO management, single let management, Gloucestershire landlords, property management, HMO compliance, HMO licensing, letting agents Gloucester, Cheltenham property management',
  authors: [{ name: 'Monarchy Homes' }],
  openGraph: {
    title: 'Monarchy Homes | Expert HMO Property Management',
    description: 'Specialist HMO property management focused on compliance, occupancy, and stable monthly income.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Monarchy Homes',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Monarchy Homes - HMO Specialists',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monarchy Homes | Expert HMO Property Management',
    description: 'Specialist HMO property management in Gloucestershire.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen">
        <Analytics />
        {children}
        <FloatingCallback />
      </body>
    </html>
  )
}
