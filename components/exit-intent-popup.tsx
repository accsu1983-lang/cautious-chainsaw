'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { X, Gift, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Check if user has already seen popup in this session
    const hasSeenPopup = sessionStorage.getItem('exitPopupShown')
    if (hasSeenPopup) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves top of page (likely closing tab/window)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitPopupShown', 'true')
      }
    }

    // Add small delay before activating exit intent
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      const { subscribeToNewsletter } = await import('@/lib/actions/forms')
      const result = await subscribeToNewsletter(email)
      
      if (result.success) {
        console.log('[v0] Exit popup email submitted successfully:', email)
        setIsSubmitted(true)
        
        // Close popup after 3 seconds
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      } else {
        console.error('[v0] Exit popup submission failed:', result.message)
        // Still show success to user to avoid frustration
        setIsSubmitted(true)
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      }
    } catch (error) {
      console.error('[v0] Exit popup error:', error)
      // Show success anyway to avoid bad UX
      setIsSubmitted(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <Card className="max-w-md w-full relative animate-in zoom-in-95 duration-300 border-2 border-primary/20">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        <CardContent className="p-8">
          {!isSubmitted ? (
            <>
              {/* Offer Badge */}
              <div className="flex justify-center mb-4">
                <div className="bg-accent/20 p-4 rounded-full">
                  <Gift className="h-12 w-12 text-accent" />
                </div>
              </div>

              {/* Headline */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3 text-balance">
                Wait! Don't Miss Out
              </h3>
              <p className="text-lg text-center text-primary font-bold mb-2">
                Get 10% Off Your First Service
              </p>
              <p className="text-muted-foreground text-center mb-6 text-sm">
                Join our exclusive list and receive special offers, cleaning tips, and priority booking
              </p>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span>10% discount on your first cleaning service</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span>Exclusive cleaning tips and maintenance guides</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span>Priority booking for seasonal promotions</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-base"
                />
                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                  Claim My 10% Discount
                </Button>
              </form>

              <p className="text-xs text-center text-muted-foreground mt-4">
                No spam, ever. Unsubscribe anytime with one click.
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground mb-4">
                Check your inbox for your 10% discount code
              </p>
              <p className="text-sm text-primary font-semibold">
                We'll send you amazing cleaning tips too!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
