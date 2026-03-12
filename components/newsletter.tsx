'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle2, Send, Gift } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { subscribeToNewsletter } = await import('@/lib/actions/forms')
      const result = await subscribeToNewsletter(email)

      if (result.success) {
        setSubmitStatus('success')
        setEmail('')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('[v0] Newsletter subscription failed:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-background rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl mb-6">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
              Get Expert Cleaning Tips & Exclusive Offers
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
              Join our newsletter for seasonal cleaning advice, special discounts, and early access to promotions. No spam, just valuable tips from Johannesburg&apos;s cleaning experts.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-2xl mx-auto">
            {submitStatus === 'success' ? (
              <div className="bg-primary-foreground rounded-2xl p-8 text-center shadow-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Welcome Aboard!</h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for subscribing. Check your email for a special welcome offer!
                </p>
                <Button
                  onClick={() => setSubmitStatus('idle')}
                  variant="outline"
                  size="sm"
                >
                  Subscribe Another Email
                </Button>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="bg-primary-foreground rounded-2xl p-8 text-center shadow-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/20 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Oops!</h3>
                <p className="text-muted-foreground mb-4">
                  This email might already be subscribed or there was an error. Please try again or contact us directly.
                </p>
                <Button
                  onClick={() => setSubmitStatus('idle')}
                  variant="outline"
                  size="sm"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-primary-foreground rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="pl-12 h-14 bg-background border-border text-foreground placeholder:text-muted-foreground text-base"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      'Subscribing...'
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Subscribe Now
                      </>
                    )}
                  </Button>
                </div>

                {/* Benefits */}
                <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                    <span>Cleaning tips & tricks</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gift className="h-4 w-4 text-accent flex-shrink-0" />
                    <span>Exclusive discounts</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                    <span>No spam, unsubscribe anytime</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from On The Spot Cleaning Services.
                </p>
              </form>
            )}
          </div>

          {/* Social Proof */}
          <div className="text-center mt-8">
            <p className="text-sm text-primary-foreground/80">
              Join <span className="font-bold">2,500+ Johannesburg residents</span> getting our cleaning tips
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
