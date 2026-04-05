import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/lib/site-config'
import { CheckCircle2, Phone, MessageCircle, Home, Clock, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: `Thank You | ${siteConfig.shortName}`,
  description: 'Thank you for your enquiry. We will be in touch shortly.',
}

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
            </div>

            {/* Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Thank You for Your Enquiry!
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              We&apos;ve received your request for a free on-site assessment. 
              A member of our team will contact you within 24 hours to arrange a convenient time.
            </p>

            {/* What Happens Next */}
            <Card className="mb-8 text-left">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-foreground">What happens next?</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">We&apos;ll call you</p>
                      <p className="text-sm text-muted-foreground">Our team will contact you within 24 hours to discuss your needs.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Free on-site assessment</p>
                      <p className="text-sm text-muted-foreground">We&apos;ll visit your property to assess your curtains and provide a quote.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">No-obligation quote</p>
                      <p className="text-sm text-muted-foreground">You&apos;ll receive a detailed quote with no pressure to proceed.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <div className="bg-secondary/50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                Need a quicker response?
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="outline" className="border-2">
                  <a href={`tel:${siteConfig.contact.primary.phoneFormatted}`} className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call {siteConfig.contact.primary.phone}
                  </a>
                </Button>
                <Button asChild className="bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                  <a 
                    href={`https://wa.me/${siteConfig.contact.primary.whatsapp}?text=Hi%2C%20I%20just%20submitted%20a%20quote%20request%20and%20would%20like%20to%20follow%20up`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Or email us at{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>

            {/* Return Home */}
            <Button asChild variant="outline" size="lg">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Return to Homepage
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
