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
import { services, siteConfig, areas } from '@/lib/site-config'
import { CheckCircle2, Phone, ArrowRight, Blinds, Sofa, Bed, Grip, Wrench, Star } from 'lucide-react'

export const revalidate = 86400 // ISR: revalidate every 24 hours

const iconMap: Record<string, React.ElementType> = {
  Blinds,
  Sofa,
  Bed,
  Grip,
  Wrench,
}

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} | ${siteConfig.shortName}`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      url: `${siteConfig.url}/services/${service.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/services/${service.slug}`,
    },
  }
}

const serviceContent: Record<string, {
  intro: string
  process: string[]
  benefits: string[]
  faqs: { q: string; a: string }[]
  image: string
}> = {
  'curtain-cleaning': {
    intro: 'Our signature service: professional on-site curtain cleaning where your curtains hang. No removal, no downtime, and our 100% no-shrinkage guarantee means your curtains will look refreshed without any risk of damage.',
    process: [
      'Free on-site assessment of your curtains',
      'Fabric analysis to determine optimal cleaning method',
      'Pre-treatment of stains and problem areas',
      'Professional dry cleaning while curtains hang',
      'Hardware inspection and minor repairs included',
      'Final inspection and quality check',
    ],
    benefits: [
      'No shrinkage or damage guaranteed',
      'No need to remove or rehang curtains',
      'Same-day service available',
      'All fabric types including delicate materials',
      'Extends curtain lifespan',
      'Removes dust, allergens, and odors',
    ],
    faqs: [
      { q: 'How long does curtain cleaning take?', a: 'Most homes can be completed in 2-4 hours depending on the number of curtains.' },
      { q: 'Will my curtains shrink?', a: 'No. We guarantee no shrinkage with our specialized dry cleaning process.' },
      { q: 'Do I need to remove the curtains?', a: 'No, we clean them right where they hang - no removal necessary.' },
    ],
    image: '/images/curtain-cleaning.webp',
  },
  'blind-cleaning': {
    intro: 'Professional cleaning for all blind types including venetian, vertical, roller, and wooden blinds. We restore your blinds to like-new condition without the hassle of removal.',
    process: [
      'Assessment of blind type and condition',
      'Dust removal using specialized tools',
      'Ultrasonic cleaning for venetian blinds',
      'Deep cleaning of fabric roller blinds',
      'Mechanism check and lubrication',
      'Final polish and inspection',
    ],
    benefits: [
      'All blind types serviced',
      'Ultrasonic cleaning available',
      'Extends blind lifespan',
      'Improves light quality',
      'Removes allergens and dust',
      'Same-day service available',
    ],
    faqs: [
      { q: 'Can you clean wooden blinds?', a: 'Yes, we have specialized methods for wooden and faux-wood blinds.' },
      { q: 'Do you clean vertical blinds?', a: 'Absolutely. We clean all vertical blind types including fabric and PVC.' },
    ],
    image: '/images/curtain-cleaning.webp',
  },
  'upholstery-cleaning': {
    intro: 'Deep cleaning for all upholstered furniture including sofas, chairs, and dining chairs. Our professional service removes stains, dirt, and allergens while protecting your fabric.',
    process: [
      'Fabric assessment and spot testing',
      'Pre-treatment of stains',
      'Deep extraction cleaning',
      'Fabric protection application (optional)',
      'Quick-dry process',
      'Final inspection',
    ],
    benefits: [
      'Deep stain removal',
      'Allergen and dust mite elimination',
      'Odor removal',
      'Extends furniture life',
      'Quick drying time',
      'Fabric protection available',
    ],
    faqs: [
      { q: 'How long until I can use my furniture?', a: 'Most upholstery is dry within 2-4 hours.' },
      { q: 'Can you remove pet stains?', a: 'Yes, we specialize in pet stain and odor removal.' },
    ],
    image: '/images/dsc6349-20copy.jpg',
  },
  'mattress-cleaning': {
    intro: 'Thorough mattress cleaning and sanitization to create a healthier sleep environment. We remove dust mites, allergens, bacteria, and stains for a fresher, cleaner mattress.',
    process: [
      'Mattress inspection',
      'Dust and debris removal',
      'Stain pre-treatment',
      'Deep sanitization cleaning',
      'Allergen treatment',
      'Deodorization',
    ],
    benefits: [
      'Dust mite elimination',
      'Allergen removal',
      'Stain treatment',
      'Odor elimination',
      'Sanitization included',
      'Better sleep quality',
    ],
    faqs: [
      { q: 'How often should I clean my mattress?', a: 'We recommend professional cleaning every 6-12 months.' },
      { q: 'Can you remove old stains?', a: 'We can significantly improve most stains, though some old set-in stains may not completely disappear.' },
    ],
    image: '/images/mattress-cleaning.webp',
  },
  'carpet-cleaning': {
    intro: 'Professional carpet cleaning using advanced extraction methods. We restore your carpets to their original beauty while extending their lifespan.',
    process: [
      'Pre-inspection and spot identification',
      'Pre-treatment of high-traffic areas',
      'Hot water extraction cleaning',
      'Stain spot treatment',
      'Speed drying',
      'Post-cleaning inspection',
    ],
    benefits: [
      'Deep extraction cleaning',
      'Fast drying time',
      'Stain and odor removal',
      'Carpet protection available',
      'Extends carpet life',
      'Improves indoor air quality',
    ],
    faqs: [
      { q: 'How long does carpet cleaning take?', a: 'A typical room takes 20-30 minutes to clean.' },
      { q: 'How long until the carpet is dry?', a: 'Most carpets are dry within 2-6 hours depending on humidity.' },
    ],
    image: '/images/dsc6346copy1.jpeg',
  },
  'hardware-repair': {
    intro: 'We include free curtain hardware inspection with every cleaning service. Minor repairs are included at no extra charge, and we can quote on more extensive repairs or replacements.',
    process: [
      'Complete rail and track inspection',
      'Hook and ring assessment',
      'Pulley and mechanism check',
      'Minor repairs and adjustments',
      'Lubrication of moving parts',
      'Recommendations for replacements if needed',
    ],
    benefits: [
      'Included free with cleaning',
      'Extends hardware life',
      'Smoother curtain operation',
      'Identifies problems early',
      'Minor repairs included',
      'Expert recommendations',
    ],
    faqs: [
      { q: 'Is hardware inspection really free?', a: 'Yes, it is included with every curtain cleaning service at no extra charge.' },
      { q: 'What if I need major repairs?', a: 'We will provide a separate quote for any major repairs or replacements needed.' },
    ],
    image: '/images/curtain-cleaning.webp',
  },
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const Icon = iconMap[service.icon] || Blinds
  const content = serviceContent[service.slug] || serviceContent['curtain-cleaning']

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
                <li><Link href="/#services" className="hover:text-primary">Services</Link></li>
                <li>/</li>
                <li className="text-foreground font-medium">{service.name}</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  <Icon className="h-3 w-3 mr-1" />
                  Professional Service
                </Badge>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                  {service.title}
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8">
                    <Link href="/quote">Book Free Assessment</Link>
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={content.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover aspect-video"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card border-2 border-accent rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">4.9/5</div>
                      <div className="text-sm text-muted-foreground">Customer Rating</div>
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
              <div className="lg:col-span-2 space-y-12">
                {/* Introduction */}
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    About Our {service.name} Service
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {content.intro}
                  </p>
                </div>

                {/* Process */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Our Process</h3>
                  <div className="space-y-4">
                    {content.process.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-foreground pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Benefits</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {content.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {content.faqs.map((faq, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <h4 className="font-bold text-foreground mb-2">{faq.q}</h4>
                          <p className="text-muted-foreground">{faq.a}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="border-2 border-accent sticky top-24">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Book Your Free Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      Get a no-obligation quote for {service.name.toLowerCase()}. Our experts will assess your needs on-site.
                    </p>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/quote">Book Now</Link>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Or call <a href={`tel:${siteConfig.contact.primary.phoneFormatted}`} className="text-primary">{siteConfig.contact.primary.phone}</a>
                    </p>
                  </CardContent>
                </Card>

                {/* Other Services */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Other Services</h3>
                    <ul className="space-y-2">
                      {services.filter(s => s.slug !== service.slug).map((s) => (
                        <li key={s.slug}>
                          <Link 
                            href={`/services/${s.slug}`}
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

                {/* Service Areas */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Service Areas</h3>
                    <ul className="space-y-2">
                      {areas.slice(0, 4).map((area) => (
                        <li key={area.slug}>
                          <Link 
                            href={`/areas/${area.slug}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ArrowRight className="h-4 w-4" />
                            {area.name}
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
        <AssessmentCTA />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
