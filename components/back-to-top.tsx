'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // ⚡ BOLT OPTIMIZATION: Throttle scroll event handling with requestAnimationFrame and passive listener
    // Prevents layout thrashing and main-thread blocking during scrolling.
    let frameId: number | null = null

    const toggleVisibility = () => {
      if (frameId !== null) return
      frameId = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 500)
        frameId = null
      })
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
    }
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
