import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, MessageCircle, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-background to-secondary/30 pt-20 pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <Badge variant="secondary" className="text-sm px-4 py-1.5 bg-accent/10 text-accent border-accent/20">
              Johannesburg&apos;s Trusted Curtain Cleaning Experts
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              Curtain Cleaning{' '}
              <span className="text-primary">Johannesburg</span> - Professional On-Site Service
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              Looking for expert curtain cleaning in Johannesburg? On The Spot offers professional on-site <Link href="#services" className="text-primary font-medium hover:underline">curtain cleaning</Link>, <Link href="#services" className="text-primary font-medium hover:underline">upholstery cleaning</Link>, and <Link href="#services" className="text-primary font-medium hover:underline">mattress cleaning</Link> services across all Johannesburg suburbs. We come to you with professional equipment for spotless results every time.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">No shrinkage or damage guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">On-site cleaning - no need to remove curtains</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">Free no-obligation quotations</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 h-14">
                <a href="#contact">Get Free Quote</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10 text-base px-8 h-14 bg-transparent">
                <a href="tel:+27750119200" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  075 011 9200
                </a>
              </Button>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 h-14">
                <a href="https://wa.me/27750119200" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/curtain-cleaning.webp"
                alt="Professional curtain cleaning service in Johannesburg - on-site cleaning"
                width={600}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-card border-2 border-primary rounded-xl p-6 shadow-xl">
              <div className="text-4xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
    </section>
  )
}
