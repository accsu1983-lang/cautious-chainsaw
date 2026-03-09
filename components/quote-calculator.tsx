'use client'

import React from "react"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Calculator, Check, ArrowRight, Mail, Phone, User } from 'lucide-react'
import Link from 'next/link'

const serviceTypes = [
  { id: 'curtains', name: 'Curtains', basePrice: 150 },
  { id: 'upholstery', name: 'Upholstery', basePrice: 200 },
  { id: 'mattress', name: 'Mattress', basePrice: 180 },
  { id: 'carpet', name: 'Carpet', basePrice: 120 }
]

const quantities = [
  { id: '1-3', label: '1-3 items', multiplier: 1 },
  { id: '4-6', label: '4-6 items', multiplier: 1.8 },
  { id: '7-10', label: '7-10 items', multiplier: 2.5 },
  { id: '10+', label: '10+ items', multiplier: 3.5 }
]

export function QuoteCalculator() {
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedQuantity, setSelectedQuantity] = useState<string>('')
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const calculateEstimate = () => {
    if (!selectedService || !selectedQuantity) return null

    const service = serviceTypes.find(s => s.id === selectedService)
    const quantity = quantities.find(q => q.id === selectedQuantity)

    if (!service || !quantity) return null

    const baseEstimate = service.basePrice * quantity.multiplier
    const minEstimate = Math.floor(baseEstimate * 0.9)
    const maxEstimate = Math.ceil(baseEstimate * 1.1)

    return { min: minEstimate, max: maxEstimate }
  }

  const estimate = calculateEstimate()

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!estimate) return

    setIsSubmitting(true)

    try {
      const { submitQuoteCalculator } = await import('@/lib/actions/forms')
      const service = serviceTypes.find(s => s.id === selectedService)
      
      const result = await submitQuoteCalculator({
        ...formData,
        serviceType: selectedService,
        quantity: selectedQuantity,
        estimatedPrice: (estimate.min + estimate.max) / 2
      })

      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '' })
        setTimeout(() => {
          setSubmitStatus('idle')
          setShowContactForm(false)
        }, 3000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('[v0] Quote calculator submission failed:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Calculator className="h-3 w-3 mr-1" />
              Instant Estimate
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Get Your Quote in Seconds
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Quick ballpark pricing for your cleaning needs
            </p>
          </div>

          <Card className="border-2">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-2xl">Instant Price Calculator</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select your service and quantity for an instant estimate
              </p>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Service Type Selection */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  1. What service do you need?
                </label>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:border-primary hover:shadow-md ${
                        selectedService === service.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{service.name}</span>
                        {selectedService === service.id && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">From R{service.basePrice}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  2. How many items?
                </label>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {quantities.map((quantity) => (
                    <button
                      key={quantity.id}
                      onClick={() => setSelectedQuantity(quantity.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-center hover:border-primary hover:shadow-md ${
                        selectedQuantity === quantity.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="font-bold">{quantity.label}</span>
                        {selectedQuantity === quantity.id && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Display */}
              {estimate && !showContactForm && submitStatus === 'idle' && (
                <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 md:p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-sm text-muted-foreground mb-2">Your Estimated Cost</p>
                  <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                    R{estimate.min} - R{estimate.max}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    *Final price depends on fabric type, condition, and location
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setShowContactForm(true)}
                    >
                      Save Quote & Get Callback
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <a href="tel:+27750119200">
                        Call Now: 075 011 9200
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Contact Form */}
              {estimate && showContactForm && submitStatus === 'idle' && (
                <form onSubmit={handleSubmitQuote} className="bg-primary/10 border-2 border-primary rounded-xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-sm text-muted-foreground mb-2 text-center">Your Estimated Cost</p>
                  <div className="text-4xl font-bold text-primary mb-4 text-center">
                    R{estimate.min} - R{estimate.max}
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-center">Get Your Personalized Quote</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="pl-10"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="pl-10"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Quote & Request Callback'}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="ghost" 
                    className="w-full mt-2"
                    onClick={() => setShowContactForm(false)}
                  >
                    Back to Estimate
                  </Button>
                </form>
              )}

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="bg-accent/10 border-2 border-accent rounded-xl p-6 md:p-8 text-center animate-in fade-in">
                  <Check className="h-12 w-12 mx-auto mb-3 text-accent" />
                  <h3 className="text-xl font-bold mb-2">Quote Saved Successfully!</h3>
                  <p className="text-muted-foreground">We'll contact you within 1 hour to confirm the details.</p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="bg-destructive/10 border-2 border-destructive rounded-xl p-6 text-center">
                  <p className="text-destructive font-medium">Something went wrong. Please try again or call us directly at 075 011 9200.</p>
                  <Button 
                    onClick={() => setSubmitStatus('idle')}
                    variant="outline"
                    className="mt-4"
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {!estimate && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select service and quantity to see your estimate</p>
                </div>
              )}

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">No Hidden Fees</p>
                    <p className="text-muted-foreground text-xs">Transparent pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">Free On-Site Quote</p>
                    <p className="text-muted-foreground text-xs">Accurate assessment</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">Same-Day Service</p>
                    <p className="text-muted-foreground text-xs">When available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
