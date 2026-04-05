import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AssessmentCTA } from '@/components/assessment-cta'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { siteConfig } from '@/lib/site-config'
import { Phone, ClipboardCheck, Calendar, Sparkles, CheckCircle2, Shield, Clock, ThumbsUp } from 'lucide-react'

export const revalidate = 3600 // ISR: revalidate every hour

export const metadata: Metadata = {
  title: `How It Works | ${siteConfig.shortName}`,
  description: 'Learn about our professional on-site curtain cleaning process. Free assessment, no removal, no shrinkage guarantee.',
  openGraph: {
    title: `How It Works | ${siteConfig.shortName}`,
    description: 'Our simple 4-step process for professional curtain cleaning.',
    url: `${siteConfig.url}/process`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/process`,
  },
}

const steps = [
  {
    number: 1,
    title: 'Book Your Free Assessment',
    description: 'Contact us by phone, WhatsApp, or through our online form to schedule your free on-site assessment. We will find a time that works for you.',
    icon: Calendar,
    details: [
      'No obligation - completely free',
      'Same-day appointments often available',
      'Flexible scheduling including weekends',
      'We come to you - home or business',
    ],
  },
  {
    number: 2,
    title: 'On-Site Evaluation',
    description: 'Our expert assessor visits your property to inspect your curtains, identify fabric types, note any special requirements, and provide a detailed quote.',
    icon: ClipboardCheck,
    details: [
      'Professional fabric analysis',
      'Identification of stains and problem areas',
      'Hardware inspection included',
      'Accurate, transparent pricing',
    ],
  },
  {
    number: 3,
    title: 'Professional Cleaning',
    description: 'Our trained technicians clean your curtains right where they hang using our specialized dry-cleaning process. No removal, no downtime.',
    icon: Sparkles,
    details: [
      'State-of-the-art equipment',
      'Eco-friendly cleaning solutions',
      'All fabric types handled safely',
      'Minimal disruption to your day',
    ],
  },
  {
    number: 4,
    title: 'Quality Inspection',
    description: 'We conduct a thorough final inspection to ensure every curtain meets our high standards. Your satisfaction is guaranteed.',
    icon: CheckCircle2,
    details: [
      '100% no-shrinkage guarantee',
      'Complete quality check',
      'Any issues addressed immediately',
      'Follow-up support available',
    ],
  },
]

const guarantees = [
  {
    icon: Shield,
    title: 'No Shrinkage Guarantee',
    description: 'We guarantee your curtains will not shrink. If they do, we will replace them.',
  },
  {
    icon: Clock,
    title: 'Same-Day Service',
    description: 'Need your curtains cleaned urgently? We offer same-day service where possible.',
  },
  {
    icon: ThumbsUp,
    title: 'Satisfaction Guaranteed',
    description: 'Not happy with the results? We will re-clean at no extra charge.',
  },
]

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary">Home</Link></li>
                <li>/</li>
                <li className="text-foreground font-medium">How It Works</li>
              </ol>
            </nav>

            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
                Simple Process
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                How Our Curtain Cleaning Process Works
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                From booking to spotless curtains in 4 simple steps. We&apos;ve made professional 
                curtain cleaning easy, convenient, and completely hassle-free.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.number} className="relative">
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-border hidden md:block" />
                    )}
                    
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-[100px_1fr] gap-6">
                          {/* Step Number */}
                          <div className="bg-primary/5 p-6 flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                              {step.number}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-accent/10 rounded-lg">
                                <Icon className="h-6 w-6 text-accent" />
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-2">
                              {step.details.map((detail, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                                  <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Guarantees Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Guarantees</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We stand behind our work with these promises to you.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {guarantees.map((guarantee) => {
                const Icon = guarantee.icon
                return (
                  <Card key={guarantee.title} className="text-center">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10">
                        <Icon className="h-7 w-7 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{guarantee.title}</h3>
                      <p className="text-sm text-muted-foreground">{guarantee.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <AssessmentCTA />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
