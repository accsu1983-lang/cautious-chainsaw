import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AssessmentCTA } from '@/components/assessment-cta'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { siteConfig } from '@/lib/site-config'
import { CheckCircle2, Award, Users, Clock, Shield, Heart, Leaf, Phone } from 'lucide-react'

export const revalidate = 86400 // ISR: revalidate every 24 hours

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.shortName}`,
  description: 'Learn about On The Spot Curtain Cleaning Specialists - Johannesburg\'s trusted curtain cleaning experts with 15+ years of experience.',
  openGraph: {
    title: `About Us | ${siteConfig.shortName}`,
    description: 'Johannesburg\'s trusted curtain cleaning experts with 15+ years of experience.',
    url: `${siteConfig.url}/about`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
}

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '10,000+', label: 'Happy Customers' },
  { value: '100%', label: 'Satisfaction Rate' },
  { value: '0%', label: 'Shrinkage Rate' },
]

const values = [
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'We stand behind every job with our 100% no-shrinkage guarantee.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We go above and beyond to exceed expectations.',
  },
  {
    icon: Leaf,
    title: 'Eco-Conscious',
    description: 'We use environmentally friendly cleaning products wherever possible.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our trained professionals bring years of experience to every job.',
  },
]

export default function AboutPage() {
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
                <li className="text-foreground font-medium">About Us</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  Est. 2009
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                  About On The Spot Curtain Cleaning Specialists
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  For over 15 years, On The Spot has been Johannesburg&apos;s trusted name in professional 
                  curtain cleaning. We pioneered the on-site dry cleaning method that allows us to clean 
                  your curtains right where they hang - no removal, no downtime, no shrinkage.
                </p>
                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                  <Image
                    src="/images/highly-20polished-203d-20v.png"
                    alt="Kathy Dunlop"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-bold text-foreground">{siteConfig.contact.primary.name}</p>
                    <p className="text-sm text-muted-foreground">{siteConfig.contact.primary.title}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/curtain-cleaning.webp"
                    alt="On The Spot Curtain Cleaning Team"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-card border-2 border-accent rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-accent" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">15+</div>
                      <div className="text-sm text-muted-foreground">Years Trusted</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  On The Spot Curtain Cleaning Specialists was founded with a simple mission: to provide 
                  Johannesburg homes and businesses with professional curtain cleaning that doesn&apos;t 
                  disrupt their daily lives.
                </p>
                <p>
                  Traditional curtain cleaning required removing curtains, taking them off-site, and 
                  waiting days or weeks for them to return - often with shrinkage or damage. We knew 
                  there had to be a better way.
                </p>
                <p>
                  After extensive research and training, we developed our signature on-site dry cleaning 
                  process. Using specialized equipment and techniques, we can now clean curtains right 
                  where they hang, eliminating the risk of shrinkage and the inconvenience of removal.
                </p>
                <p>
                  Today, we&apos;re proud to serve residential homes, hotels, corporate offices, healthcare 
                  facilities, schools, and theatres across Johannesburg, Pretoria, and Midrand. Our 
                  commitment to quality, convenience, and customer satisfaction remains at the heart 
                  of everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do at On The Spot.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <Card key={value.title}>
                    <CardContent className="p-6 space-y-4 text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10">
                        <Icon className="h-7 w-7 text-accent" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose On The Spot?</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {siteConfig.usp.map((point, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{point}</p>
                  </div>
                ))}
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
