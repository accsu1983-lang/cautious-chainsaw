'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { sectors, areas, services } from '@/lib/site-config'
import { submitContactForm } from '@/lib/actions/forms'
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2, Building2, Briefcase, Cross, GraduationCap, Presentation, Home, MapPin } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Briefcase,
  Cross,
  GraduationCap,
  Presentation,
  Home,
}

type FormData = {
  sector: string
  area: string
  services: string[]
  name: string
  email: string
  phone: string
  address: string
  suburb: string
  message: string
}

const steps = [
  { id: 1, name: 'Sector', description: 'What type of property?' },
  { id: 2, name: 'Location', description: 'Where are you located?' },
  { id: 3, name: 'Services', description: 'What do you need?' },
  { id: 4, name: 'Details', description: 'Your contact info' },
]

export function MultiStepQuoteForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    sector: '',
    area: '',
    services: [],
    name: '',
    email: '',
    phone: '',
    address: '',
    suburb: '',
    message: '',
  })
  const [error, setError] = useState('')

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const toggleService = (serviceSlug: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceSlug)
        ? prev.services.filter(s => s !== serviceSlug)
        : [...prev.services, serviceSlug]
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.sector !== ''
      case 2:
        return formData.area !== ''
      case 3:
        return formData.services.length > 0
      case 4:
        return formData.name !== '' && formData.email !== '' && formData.phone !== ''
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    if (!canProceed()) return

    startTransition(async () => {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.services.join(', '),
        message: `Sector: ${formData.sector}\nArea: ${formData.area}\n\n${formData.message}`,
        address: formData.address,
        suburb: formData.suburb,
      })

      if (result.success) {
        router.push('/quote/thank-you')
      } else {
        setError(result.message)
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`flex flex-col items-center flex-1 ${step.id !== steps.length ? 'relative' : ''}`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-colors ${
                  currentStep > step.id 
                    ? 'bg-accent text-accent-foreground' 
                    : currentStep === step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.id ? <CheckCircle2 className="h-5 w-5" /> : step.id}
              </div>
              <div className="mt-2 text-center hidden sm:block">
                <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.name}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-0">
          <div 
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Card */}
      <Card className="border-2">
        <CardContent className="p-6 sm:p-8">
          {/* Step 1: Sector Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">What type of property?</h2>
                <p className="text-muted-foreground">Select the sector that best describes your property.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectors.map((sector) => {
                  const Icon = iconMap[sector.icon] || Building2
                  return (
                    <button
                      key={sector.slug}
                      type="button"
                      onClick={() => updateFormData('sector', sector.slug)}
                      className={`p-4 rounded-lg border-2 text-left transition-all hover:border-primary ${
                        formData.sector === sector.slug 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${formData.sector === sector.slug ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{sector.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{sector.description.slice(0, 50)}...</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Area Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Where are you located?</h2>
                <p className="text-muted-foreground">Select your area in Johannesburg.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {areas.map((area) => (
                  <button
                    key={area.slug}
                    type="button"
                    onClick={() => updateFormData('area', area.slug)}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover:border-primary ${
                      formData.area === area.slug 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${formData.area === area.slug ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{area.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{area.suburbs.slice(0, 3).join(', ')}...</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Service Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">What services do you need?</h2>
                <p className="text-muted-foreground">Select all that apply.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => toggleService(service.slug)}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover:border-primary ${
                      formData.services.includes(service.slug) 
                        ? 'border-accent bg-accent/5' 
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{service.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{service.description.slice(0, 60)}...</p>
                      </div>
                      {formData.services.includes(service.slug) && (
                        <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Contact Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Your contact details</h2>
                <p className="text-muted-foreground">We&apos;ll use this to arrange your free assessment.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="071 234 5678"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="suburb">Suburb</Label>
                  <Input
                    id="suburb"
                    type="text"
                    value={formData.suburb}
                    onChange={(e) => updateFormData('suburb', e.target.value)}
                    placeholder="Sandton"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">Additional Details (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    placeholder="Tell us more about your curtains, any specific concerns, or preferred times for the assessment..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Your Selection Summary</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><span className="font-medium">Sector:</span> {sectors.find(s => s.slug === formData.sector)?.name || '-'}</li>
                  <li><span className="font-medium">Area:</span> {areas.find(a => a.slug === formData.area)?.name || '-'}</li>
                  <li><span className="font-medium">Services:</span> {formData.services.map(s => services.find(srv => srv.slug === s)?.name).join(', ') || '-'}</li>
                </ul>
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed() || isPending}
                className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Book Free Assessment
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
