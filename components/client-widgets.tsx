'use client'

import dynamic from 'next/dynamic'

// Lazy-load non-critical floating widgets to reduce initial bundle size and speed up hydration.
// We use ssr: false because these components are entirely interactive and depend on browser APIs like window.scrollY.
// In Next.js 16, using named exports requires the .then(mod => mod.Name) pattern for type safety and clarity.

const WhatsAppWidget = dynamic(() => import('./whatsapp-widget').then(mod => mod.WhatsAppWidget), {
  ssr: false,
})

const BackToTop = dynamic(() => import('./back-to-top').then(mod => mod.BackToTop), {
  ssr: false,
})

const ExitIntentPopup = dynamic(() => import('./exit-intent-popup').then(mod => mod.ExitIntentPopup), {
  ssr: false,
})

export function ClientWidgets() {
  return (
    <>
      <WhatsAppWidget />
      <BackToTop />
      <ExitIntentPopup />
    </>
  )
}
