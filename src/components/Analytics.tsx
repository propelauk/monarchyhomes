'use client'

import Script from 'next/script'

export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
  const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_PROJECT_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}

      {/* PostHog */}
      {POSTHOG_KEY && (
        <Script id="posthog" strategy="afterInteractive">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('${POSTHOG_KEY}', {api_host: 'https://app.posthog.com'});
          `}
        </Script>
      )}
    </>
  )
}

// Analytics event tracking helper
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
  
  // PostHog
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(eventName, properties)
  }

  // Send to Supabase analytics API (our own analytics)
  if (typeof window !== 'undefined') {
    // Map event names to valid event types
    let eventType = 'page_view'
    const lowerEvent = eventName.toLowerCase()
    
    // CTA clicks - includes button clicks, opening modals, etc.
    if (lowerEvent.includes('click') || lowerEvent.includes('cta') || 
        lowerEvent.includes('_opened') || lowerEvent.includes('_open') ||
        lowerEvent.includes('callback_opened') || lowerEvent.includes('modal')) {
      eventType = 'cta_click'
    } else if (lowerEvent.includes('form_start') || lowerEvent.includes('started') || lowerEvent.includes('_step')) {
      eventType = 'form_start'
    } else if (lowerEvent.includes('submit') || lowerEvent.includes('submitted') || lowerEvent.includes('download')) {
      // Both form submissions AND downloads count as form_submit (user filled a form)
      eventType = 'form_submit'
    } else if (lowerEvent.includes('calculator')) {
      eventType = 'calculator_used'
    } else if (lowerEvent.includes('page_view')) {
      eventType = 'page_view'
    }

    // Get or create visitor/session IDs
    const visitorId = getOrCreateVisitorId()
    const sessionId = getOrCreateSessionId()

    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        page_url: window.location.href,
        page_title: document.title,
        visitor_id: visitorId,
        session_id: sessionId,
        referrer: document.referrer || null,
        metadata: { original_event: eventName, ...properties },
      }),
    }).catch(err => console.error('Analytics send error:', err))
  }
}

// Generate unique IDs for tracking
function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return ''
  let visitorId = localStorage.getItem('mh_visitor_id')
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem('mh_visitor_id', visitorId)
  }
  return visitorId
}

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  let sessionId = sessionStorage.getItem('mh_session_id')
  if (!sessionId) {
    sessionId = 's_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
    sessionStorage.setItem('mh_session_id', sessionId)
  }
  return sessionId
}

// Declare global types for analytics
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    posthog: {
      capture: (event: string, properties?: Record<string, unknown>) => void
    }
    clarity: (...args: unknown[]) => void
  }
}
