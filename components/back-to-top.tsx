'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // ⚡ BOLT OPTIMIZATION: Throttle scroll event listener using requestAnimationFrame and { passive: true }
  // Prevents main-thread blocking during high-frequency scrolling and aligns UI updates with display refresh rate.
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 500)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
