'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import { SuccessCheckmark } from '@/components/ui/success-checkmark'
import { Spinner } from '@/components/ui/spinner'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const { submitContactForm } = await import('@/lib/actions/forms')
      const result = await submitContactForm(formData)
      
      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('[v0] Form submission failed:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Get Your Free Quote Today
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Contact us for a free no-obligation quotation. We respond within 1 hour during business hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <Card className="border-border hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                    <a href="tel:+27750119200" className="text-primary hover:text-primary/80 transition-colors font-medium">
                      075 011 9200
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">Mon-Sat: 8AM - 6PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                    <a 
                      href="https://wa.me/27750119200" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      075 011 9200
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">Quick responses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <a href="mailto:info@curtaincleaning.co.za" className="text-primary hover:text-primary/80 transition-colors text-sm break-all">
                      info@curtaincleaning.co.za
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">24/7 inbox</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Service Address</h3>
                    <p className="text-sm text-muted-foreground">
                      Martha North Rd, Randburg, Johannesburg, 2194
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">We come to you!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: By appointment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="075 011 9200"
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium text-foreground">
                      Service Required *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a service</option>
                      <option value="curtain">Curtain Cleaning</option>
                      <option value="upholstery">Upholstery Cleaning</option>
                      <option value="mattress">Mattress Cleaning</option>
                      <option value="carpet">Carpet Cleaning</option>
                      <option value="multiple">Multiple Services</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Additional Details
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your cleaning requirements, number of items, preferred date, etc."
                      rows={5}
                      className="bg-background border-border resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base h-12 transition-all hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Spinner size="sm" className="border-primary-foreground" />
                        Sending...
                      </span>
                    ) : (
                      'Get Free Quote'
                    )}
                  </Button>

                  {submitStatus === 'success' && (
                    <div className="bg-accent/10 border-2 border-accent text-accent rounded-lg p-6 text-center animate-fadeInUp">
                      <SuccessCheckmark size="md" />
                      <p className="font-bold text-lg mt-3 mb-1">Quote Request Received!</p>
                      <p className="text-sm opacity-90">We&apos;ll contact you within 1 hour during business hours.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-destructive/10 border-2 border-destructive text-destructive rounded-lg p-4 text-center animate-fadeInUp">
                      <p className="font-medium">Something went wrong. Please try again or call us directly at 075 011 9200.</p>
                    </div>
                  )}
                </form>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  By submitting this form, you agree to our privacy policy. We respect your privacy and will never share your information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
