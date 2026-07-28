'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { throttle } from '@/lib/throttle'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // ⚡ BOLT OPTIMIZATION: Throttled scroll listener (100ms) prevents main-thread load and layout thrashing.
  // Wrapped in useMemo to preserve throttle state across renders.
  const throttledToggle = useMemo(() => {
    return throttle(() => {
      setIsVisible(window.scrollY > 500)
    }, 100)
  }, [])

  useEffect(() => {
    // Initial check on mount
    throttledToggle()

    // `{ passive: true }` improves scroll performance by indicating the listener will not call preventDefault().
    window.addEventListener('scroll', throttledToggle, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledToggle)
      throttledToggle.cancel() // Cancel pending executions to prevent memory leaks/state updates on unmounted components
    }
  }, [throttledToggle])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div
      className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
}
