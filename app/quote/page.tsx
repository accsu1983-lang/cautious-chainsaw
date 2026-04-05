import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { MultiStepQuoteForm } from '@/components/multi-step-quote-form'
import { siteConfig } from '@/lib/site-config'
import { Shield, Clock, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic' // SSR for form page

export const metadata: Metadata = {
  title: `Book Your Free On-Site Assessment | ${siteConfig.shortName}`,
  description: 'Get a free, no-obligation quote for professional curtain cleaning in Johannesburg. Book your on-site assessment today.',
  openGraph: {
    title: `Book Your Free Assessment | ${siteConfig.shortName}`,
    description: 'Professional curtain cleaning assessment - no obligation, no hidden fees.',
    url: `${siteConfig.url}/quote`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/quote`,
  },
}

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Book Your Free On-Site Assessment
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Complete this form and our team will contact you to arrange a convenient time 
                for your free, no-obligation on-site assessment.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">100% Guarantee</p>
                  <p className="text-xs text-muted-foreground">No shrinkage promise</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">No Obligation</p>
                  <p className="text-xs text-muted-foreground">Free assessment</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Quick Response</p>
                  <p className="text-xs text-muted-foreground">Same-day callback</p>
                </div>
              </div>
            </div>

            {/* Multi-Step Form */}
            <MultiStepQuoteForm />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
