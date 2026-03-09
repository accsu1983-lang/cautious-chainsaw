import { Card, CardContent } from '@/components/ui/card'
import { Shield, Award, Users, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Shield,
    title: 'No Shrinkage Guarantee',
    description: 'We stand behind our work with a comprehensive no shrinkage or damage guarantee on all fabrics.'
  },
  {
    icon: Award,
    title: '15+ Years Experience',
    description: 'Over 15 years of professional cleaning experience serving Johannesburg homes and businesses.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Trained and certified cleaning specialists led by industry expert Kathy with decades of experience.'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Evening and weekend appointments available to fit your busy schedule.'
  }
]

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Trusted Curtain Cleaning Johannesburg Specialists
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Why choose On The Spot for curtain cleaning in Johannesburg? We are Johannesburg&apos;s trusted curtain cleaning specialists with over 15 years of experience delivering exceptional results to homes and businesses across all suburbs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/dsc6346copy1.jpeg"
                alt="On The Spot professional cleaning team in Johannesburg"
                width={600}
                height={700}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Professional Curtain Cleaning Johannesburg - Services You Can Trust
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              At On The Spot, we specialize in professional <Link href="#services" className="text-primary font-medium hover:underline">curtain cleaning in Johannesburg</Link> and <Link href="#services" className="text-primary font-medium hover:underline">upholstery cleaning services</Link> across all Johannesburg areas. With over 15 years of curtain cleaning experience in Johannesburg, we&apos;ve built our reputation on delivering exceptional results and outstanding customer service to residential and commercial clients.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our on-site cleaning service means you don&apos;t have to remove your curtains or move furniture. We come to you with professional-grade equipment and cleaning solutions designed specifically for different fabric types. Learn more about <Link href="#process" className="text-primary font-medium hover:underline">our process</Link> or <Link href="#areas" className="text-primary font-medium hover:underline">view all service areas in Johannesburg</Link>.
            </p>

            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-2 text-lg">Meet Kathy - Our Lead Specialist</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                With over 20 years in the professional cleaning industry, Kathy brings unmatched expertise to every job. Her attention to detail and commitment to customer satisfaction has made On The Spot Johannesburg&apos;s trusted name in curtain cleaning.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1">Professional Equipment</h5>
                  <p className="text-sm text-muted-foreground">Industrial-grade cleaning machines for superior results</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1">Eco-Friendly Solutions</h5>
                  <p className="text-sm text-muted-foreground">Safe for your family, pets, and the environment</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1">Satisfaction Guaranteed</h5>
                  <p className="text-sm text-muted-foreground">We don&apos;t leave until you&apos;re 100% satisfied</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="#contact">Get Your Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
