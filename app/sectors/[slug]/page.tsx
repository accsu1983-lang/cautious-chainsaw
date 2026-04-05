import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AssessmentCTA } from '@/components/assessment-cta'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { sectors, siteConfig } from '@/lib/site-config'
import { CheckCircle2, Phone, Building2, Briefcase, Cross, GraduationCap, Presentation, Home, ArrowRight } from 'lucide-react'

export const revalidate = 86400 // ISR: revalidate every 24 hours

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Briefcase,
  Cross,
  GraduationCap,
  Presentation,
  Home,
}

interface SectorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return sectors.map((sector) => ({
    slug: sector.slug,
  }))
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params
  const sector = sectors.find((s) => s.slug === slug)
  
  if (!sector) {
    return {
      title: 'Sector Not Found',
    }
  }

  return {
    title: `${sector.title} | ${siteConfig.shortName}`,
    description: sector.description,
    openGraph: {
      title: sector.title,
      description: sector.description,
      url: `${siteConfig.url}/sectors/${sector.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/sectors/${sector.slug}`,
    },
  }
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params
  const sector = sectors.find((s) => s.slug === slug)

  if (!sector) {
    notFound()
  }

  const Icon = iconMap[sector.icon] || Building2

  const sectorContent: Record<string, { intro: string; features: string[]; whyUs: string }> = {
    hotels: {
      intro: 'Hotels and hospitality venues understand that first impressions matter. Clean, fresh curtains contribute to the overall guest experience and reflect your commitment to excellence. On The Spot provides discreet, professional curtain cleaning that minimizes disruption to your operations.',
      features: [
        'Room-by-room scheduling to avoid guest inconvenience',
        'Quick turnaround for urgent bookings',
        'Regular maintenance contracts with priority service',
        'Specialized treatment for heavy blackout curtains',
      ],
      whyUs: 'We work around your occupancy schedule, ensuring curtains in vacant rooms are cleaned and ready before check-in.',
    },
    corporate: {
      intro: 'A professional office environment starts with clean, well-maintained window treatments. Dusty blinds and stained curtains can undermine your corporate image. On The Spot delivers efficient cleaning services that keep your workspace looking its best.',
      features: [
        'After-hours and weekend service available',
        'All blind types including venetian, vertical, and roller',
        'Boardroom and reception priority scheduling',
        'Annual maintenance agreements for consistent results',
      ],
      whyUs: 'We understand the importance of minimal workplace disruption and can work around your business hours.',
    },
    healthcare: {
      intro: 'Healthcare facilities require the highest standards of hygiene. Privacy curtains, window drapes, and soft furnishings must be regularly cleaned and sanitized to maintain infection control standards. On The Spot uses hospital-grade cleaning methods.',
      features: [
        'Hospital-grade sanitization protocols',
        'Privacy curtain cleaning specialists',
        'Compliance with infection control requirements',
        'Emergency and priority scheduling available',
      ],
      whyUs: 'Our cleaning process meets strict healthcare hygiene standards while extending the life of your soft furnishings.',
    },
    schools: {
      intro: 'Schools and educational institutions need clean environments for students and staff. Curtains in classrooms, halls, and auditoriums collect dust and allergens that can affect air quality. On The Spot provides safe, effective cleaning during school holidays.',
      features: [
        'Holiday scheduling to avoid disruption',
        'Child-safe, non-toxic cleaning products',
        'Hall and auditorium heavy drape specialists',
        'Budget-friendly packages for educational institutions',
      ],
      whyUs: 'We offer special rates for schools and can complete large projects during holiday periods.',
    },
    theatres: {
      intro: 'Theatre curtains and stage drapes are substantial investments that require specialized care. From velvet stage curtains to acoustic drapes, On The Spot has the expertise and equipment to clean and maintain your venue soft furnishings.',
      features: [
        'Heavy drape and stage curtain expertise',
        'Fire-retardant treatment applications',
        'Velvet and specialty fabric care',
        'Flexible scheduling around performances',
      ],
      whyUs: 'Our team has experience with the unique challenges of theatre and venue curtains, ensuring proper care for specialty fabrics.',
    },
    residential: {
      intro: 'Your home deserves the same professional care we provide to commercial clients. Whether you have delicate sheers, heavy blackout curtains, or designer drapes, On The Spot brings professional cleaning to your doorstep.',
      features: [
        'All fabric types from sheers to heavy drapes',
        'Delicate and designer fabric expertise',
        'Pet odor and stain treatment',
        'Allergy-friendly deep cleaning',
      ],
      whyUs: 'We treat your home with respect, protecting your floors and furniture while delivering exceptional cleaning results.',
    },
  }

  const content = sectorContent[sector.slug] || sectorContent.residential

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
                <li><Link href="/#services" className="hover:text-primary">Sectors</Link></li>
                <li>/</li>
                <li className="text-foreground font-medium">{sector.name}</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  {sector.name}
                </Badge>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                  {sector.title}
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  {sector.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8">
                    <Link href="/quote">{sector.cta}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-primary h-14 px-8">
                    <a href={`tel:${siteConfig.contact.primary.phoneFormatted}`} className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      {siteConfig.contact.primary.phone}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-primary/10 aspect-video flex items-center justify-center">
                  <Icon className="h-32 w-32 text-primary/30" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card border-2 border-primary rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">No Shrinkage Guarantee</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Professional Curtain Cleaning for {sector.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {content.intro}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">What We Offer</h3>
                  <ul className="space-y-3">
                    {content.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose On The Spot?</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty mb-4">
                    {content.whyUs}
                  </p>
                  <ul className="space-y-2">
                    {siteConfig.usp.map((point, index) => (
                      <li key={index} className="flex items-center gap-2 text-foreground">
                        <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="border-2 border-primary">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Key Benefits</h3>
                    <ul className="space-y-3">
                      {sector.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/quote">Get Free Assessment</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Contact Us</h3>
                    <div className="space-y-3 text-sm">
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-accent" />
                        <a href={`tel:${siteConfig.contact.primary.phoneFormatted}`} className="hover:text-primary">
                          {siteConfig.contact.primary.phone}
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        Speak with {siteConfig.contact.primary.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Other Sectors */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Other Sectors</h3>
                    <ul className="space-y-2">
                      {sectors.filter(s => s.slug !== sector.slug).slice(0, 4).map((s) => (
                        <li key={s.slug}>
                          <Link 
                            href={`/sectors/${s.slug}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ArrowRight className="h-4 w-4" />
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <AssessmentCTA variant="sector" sector={sector.name} />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
