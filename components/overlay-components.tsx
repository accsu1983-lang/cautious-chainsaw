'use client'

import dynamic from 'next/dynamic'

const ExitIntentPopup = dynamic(() => import('@/components/exit-intent-popup').then(mod => mod.ExitIntentPopup), {
  ssr: false
})

export function OverlayComponents() {
  return <ExitIntentPopup />
}
