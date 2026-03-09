'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from './Analytics'

export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Skip tracking for admin pages
    if (pathname?.startsWith('/admin')) {
      return
    }

    // Track page view
    trackEvent('page_view', {
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname])

  return null
}
