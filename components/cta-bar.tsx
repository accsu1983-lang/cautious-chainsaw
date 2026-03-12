'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle, Mail, X } from 'lucide-react'

export function CTABar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-2xl border-t-2 border-primary-foreground/20 animate-in slide-in-from-bottom">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          <div className="hidden md:block">
            <p className="font-bold text-lg">Need a Free Quote?</p>
            <p className="text-sm text-primary-foreground/90">Contact us now - No obligation</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center w-full md:w-auto">
            <a
              href="tel:+27750119200"
              className="flex items-center gap-2 bg-background text-foreground hover:bg-background/90 font-medium px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
            >
              <Phone className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-sm">Call Now</span>
            </a>

            <a
              href="https://wa.me/27750119200"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-medium px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-sm">WhatsApp</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 bg-background text-foreground hover:bg-background/90 font-medium px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
            >
              <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-sm">Email</span>
            </a>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 md:relative md:top-0 md:right-0 p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
