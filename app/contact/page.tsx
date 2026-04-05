import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.shortName}`,
  description: 'Get in touch with On The Spot Curtain Cleaning Specialists. Call, WhatsApp, or visit us in Johannesburg.',
  openGraph: {
    title: `Contact Us | ${siteConfig.shortName}`,
    description: 'Contact Johannesburg\'s trusted curtain cleaning experts.',
    url: `${siteConfig.url}/contact`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
}

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    primary: siteConfig.contact.primary.phone,
    secondary: siteConfig.contact.secondary.phone,
    description: 'Speak with our team directly',
    action: `tel:${siteConfig.contact.primary.phoneFormatted}`,
    actionLabel: 'Call Now',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    primary: siteConfig.contact.primary.phone,
    description: 'Quick responses via WhatsApp',
    action: `https://wa.me/${siteConfig.contact.primary.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20curtain%20cleaning`,
    actionLabel: 'Send Message',
    isExternal: true,
  },
  {
    icon: Mail,
    title: 'Email',
    primary: siteConfig.contact.email,
    description: 'Send us a detailed enquiry',
    action: `mailto:${siteConfig.contact.email}`,
    actionLabel: 'Send Email',
  },
]

export default function ContactPage() {
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
                <li className="text-foreground font-medium">Contact</li>
              </ol>
            </nav>

            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
                Get In Touch
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Ready to book your free assessment or have a question? 
                We&apos;re here to help. Choose your preferred contact method below.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <Card key={method.title} className="text-center hover:border-primary transition-colors">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10">
                        <Icon className="h-7 w-7 text-accent" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">{method.title}</h2>
                      <div>
                        <p className="font-semibold text-foreground">{method.primary}</p>
                        {method.secondary && (
                          <p className="text-sm text-muted-foreground">{method.secondary}</p>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <a 
                          href={method.action}
                          target={method.isExternal ? '_blank' : undefined}
                          rel={method.isExternal ? 'noopener noreferrer' : undefined}
                        >
                          {method.actionLabel}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Location & Hours */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Our Location</h2>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <MapPin className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Office Address</p>
                          <p className="text-muted-foreground">
                            {siteConfig.contact.address.street}<br />
                            {siteConfig.contact.address.city}, {siteConfig.contact.address.region}<br />
                            {siteConfig.contact.address.postalCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Clock className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Business Hours</p>
                          <ul className="text-muted-foreground text-sm space-y-1">
                            <li>Monday - Friday: {siteConfig.hours.weekdays}</li>
                            <li>Saturday: {siteConfig.hours.saturday}</li>
                            <li>Sunday: {siteConfig.hours.sunday}</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Service Area Note */}
                <Card className="border-accent">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-2">Service Area</h3>
                    <p className="text-sm text-muted-foreground">
                      We provide on-site curtain cleaning services throughout Johannesburg, 
                      Midrand, Centurion, and Pretoria. No matter where you are in our service 
                      area, we come to you!
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Book Assessment CTA */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Book Your Free Assessment</h2>
                <Card className="border-2 border-primary">
                  <CardContent className="p-6 space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Calendar className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Ready to Get Started?
                      </h3>
                      <p className="text-muted-foreground">
                        Book your free, no-obligation on-site assessment today. 
                        We&apos;ll provide a detailed quote and answer all your questions.
                      </p>
                    </div>

                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        100% free, no obligation
                      </li>
                      <li className="flex items-center gap-2 text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Same-day appointments available
                      </li>
                      <li className="flex items-center gap-2 text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Accurate, transparent pricing
                      </li>
                      <li className="flex items-center gap-2 text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        No pressure sales
                      </li>
                    </ul>

                    <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/quote">Book Free Assessment</Link>
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Or call us directly at{' '}
                      <a href={`tel:${siteConfig.contact.primary.phoneFormatted}`} className="text-primary hover:underline">
                        {siteConfig.contact.primary.phone}
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
