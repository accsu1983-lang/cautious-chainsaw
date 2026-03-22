'use client'

import dynamic from 'next/dynamic'

const WhatsAppWidget = dynamic(() => import('./whatsapp-widget').then(mod => mod.WhatsAppWidget), {
  ssr: false
})

const ExitIntentPopup = dynamic(() => import('./exit-intent-popup').then(mod => mod.ExitIntentPopup), {
  ssr: false
})

const BackToTop = dynamic(() => import('./back-to-top').then(mod => mod.BackToTop), {
  ssr: false
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
