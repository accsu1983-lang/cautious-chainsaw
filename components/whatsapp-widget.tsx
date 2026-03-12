'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const phoneNumber = '27750119200' // WhatsApp format (no + or spaces)
  const message = encodeURIComponent('Hi! I would like to get a quote for curtain cleaning services.')

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Chat Preview Bubble */}
          {isOpen && (
            <div className="bg-white rounded-lg shadow-2xl p-4 max-w-xs animate-in slide-in-from-bottom-5 duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm">On The Spot</p>
                  <p className="text-xs text-muted-foreground">Typically replies instantly</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto text-muted-foreground hover:text-foreground"
                  aria-label="Close chat preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Hi there! 👋 Need a quote for curtain cleaning? Chat with us on WhatsApp!
              </p>
              <a
                href={`https://wa.me/${phoneNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white">
                  Start Chat
                </Button>
              </a>
            </div>
          )}

          {/* Main WhatsApp Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Open WhatsApp chat"
          >
            <MessageCircle className="h-8 w-8 fill-current" />

            {/* Notification Dot */}
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />

            {/* Ripple Effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          </button>
        </div>
      )}
    </>
  )
}
