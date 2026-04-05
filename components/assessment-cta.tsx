import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, Calendar } from 'lucide-react'
import Link from 'next/link'

interface AssessmentCTAProps {
  variant?: 'default' | 'sector' | 'area'
  sector?: string
  area?: string
  className?: string
}

export function AssessmentCTA({ variant = 'default', sector, area, className = '' }: AssessmentCTAProps) {
  const getHeadline = () => {
    if (variant === 'sector' && sector) {
      return `Book Your Free ${sector} Assessment`
    }
    if (variant === 'area' && area) {
      return `Book Your Free Assessment in ${area}`
    }
    return 'Book Your Free On-Site Assessment'
  }

  const getDescription = () => {
    if (variant === 'sector' && sector) {
      return `Get a tailored cleaning solution for your ${sector.toLowerCase()} facility. No obligation, no hidden fees.`
    }
    if (variant === 'area' && area) {
      return `Professional curtain cleaning services in ${area}. Free assessment with no obligation.`
    }
    return 'Our experts will assess your curtains on-site and provide a no-obligation quote. 100% free.'
  }

  return (
    <section className={`py-16 bg-primary ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            {getHeadline()}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 text-pretty">
            {getDescription()}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8 text-base">
              <Link href="/quote" className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book Free Assessment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8 text-base bg-transparent">
              <a href="tel:+27716226753" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                071 622 6753
              </a>
            </Button>
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white h-14 px-8 text-base">
              <a href="https://wa.me/27716226753?text=Hi%2C%20I'd%20like%20to%20book%20a%20free%20on-site%20assessment" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/70">
            Or email us at <a href="mailto:info@curtaincleaning.org" className="underline hover:text-primary-foreground">info@curtaincleaning.org</a>
          </p>
        </div>
      </div>
    </section>
  )
}
