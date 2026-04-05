import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AssessmentCTA } from '@/components/assessment-cta'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { areas, siteConfig, services } from '@/lib/site-config'
import { CheckCircle2, Phone, MapPin, ArrowRight, Clock, Shield } from 'lucide-react'

export const revalidate = 86400 // ISR: revalidate every 24 hours

interface AreaPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return areas.map((area) => ({
    slug: area.slug,
  }))
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  
  if (!area) {
    return {
      title: 'Area Not Found',
    }
  }

  return {
    title: `${area.title} | ${siteConfig.shortName}`,
    description: area.description,
    openGraph: {
      title: area.title,
      description: area.description,
      url: `${siteConfig.url}/areas/${area.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/areas/${area.slug}`,
    },
  }
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)

  if (!area) {
    notFound()
  }

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
                <li><Link href="/#areas" className="hover:text-primary">Areas</Link></li>
                <li>/</li>
                <li className="text-foreground font-medium">{area.name}</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  <MapPin className="h-3 w-3 mr-1" />
                  {area.name}
                </Badge>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                  {area.title}
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  {area.description}
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">On-site cleaning - no curtain removal</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Shield className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">100% no-shrinkage guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">Same-day service available</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8">
                    <Link href="/quote">{area.cta}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-primary h-14 px-8">
                    <a href={`tel:${siteConfig.contact.primary.phoneFormatted}`} className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      {siteConfig.contact.primary.phone}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Map / Visual */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-primary/10 aspect-video flex items-center justify-center">
                  <MapPin className="h-32 w-32 text-primary/30" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card border-2 border-accent rounded-xl p-6 shadow-xl">
                  <div className="text-3xl font-bold text-accent">{area.suburbs.length}+</div>
                  <div className="text-sm text-muted-foreground">Suburbs Covered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Suburbs Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Suburbs We Service in {area.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {area.suburbs.map((suburb) => (
                <Badge key={suburb} variant="secondary" className="px-4 py-2 text-sm bg-card">
                  {suburb}
                </Badge>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6 text-sm">
              Don&apos;t see your suburb? We likely still service your area. <Link href="/quote" className="text-primary hover:underline">Contact us</Link> to confirm.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Our Services in {area.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    On The Spot provides comprehensive cleaning services throughout {area.name}. 
                    Our professional team brings state-of-the-art equipment directly to your home or business, 
                    ensuring minimal disruption and maximum results.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {services.slice(0, 6).map((service) => (
                    <Card key={service.slug} className="hover:border-primary transition-colors">
                      <CardContent className="p-4">
                        <h3 className="font-bold text-foreground mb-2">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose Us in {area.name}?</h3>
                  <ul className="space-y-3">
                    {siteConfig.usp.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="border-2 border-accent">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Book Your Free Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      Get a no-obligation quote for curtain cleaning in {area.name}. Our experts will assess your needs on-site.
                    </p>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/quote">Book Now</Link>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Or call <a href={`tel:${siteConfig.contact.primary.phoneFormatted}`} className="text-primary">{siteConfig.contact.primary.phone}</a>
                    </p>
                  </CardContent>
                </Card>

                {/* Other Areas */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Other Service Areas</h3>
                    <ul className="space-y-2">
                      {areas.filter(a => a.slug !== area.slug).map((a) => (
                        <li key={a.slug}>
                          <Link 
                            href={`/areas/${a.slug}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ArrowRight className="h-4 w-4" />
                            {a.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Opening Hours</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Mon - Fri</span>
                        <span className="text-foreground font-medium">{siteConfig.hours.weekdays}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Saturday</span>
                        <span className="text-foreground font-medium">{siteConfig.hours.saturday}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Sunday</span>
                        <span className="text-foreground font-medium">{siteConfig.hours.sunday}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <AssessmentCTA variant="area" area={area.name} />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
