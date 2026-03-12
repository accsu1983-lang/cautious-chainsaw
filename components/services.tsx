import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight, Blinds, Sofa, Bed, Grip, Home, Building2, Briefcase, UtensilsCrossed, Cross, Store } from 'lucide-react'

const services = [
  {
    id: 'curtains',
    title: 'Curtain Cleaning Johannesburg',
    description: 'Professional on-site curtain cleaning in Johannesburg for all types of curtains including delicate fabrics, heavy drapes, and blinds. Our expert curtain cleaning service in Johannesburg means we clean your curtains while they hang - no removal needed.',
    image: '/images/curtain-cleaning.webp',
    alt: 'Professional curtain cleaning Johannesburg - on-site curtain cleaning service',
    icon: Blinds,
    benefits: ['No shrinkage guarantee', 'No need to remove curtains', 'All fabric types', 'Same-day service available']
  },
  {
    id: 'upholstery',
    title: 'Upholstery Cleaning',
    description: 'Deep cleaning for all upholstered furniture including sofas, chairs, dining chairs, and office furniture. Remove stains, dirt, and allergens effectively.',
    image: '/images/dsc6349-20copy.jpg',
    alt: 'Upholstery cleaning services Johannesburg - sofa and furniture cleaning',
    icon: Sofa,
    benefits: ['Stain removal', 'Odor elimination', 'Fabric protection', 'Quick drying time']
  },
  {
    id: 'mattress',
    title: 'Mattress Cleaning',
    description: 'Thorough mattress cleaning and sanitization to remove dust mites, allergens, and bacteria. Improve your sleep quality with a clean, fresh mattress.',
    image: '/images/mattress-cleaning.webp',
    alt: 'Mattress cleaning Johannesburg - dust mite and allergen removal',
    icon: Bed,
    benefits: ['Dust mite removal', 'Allergen reduction', 'Stain treatment', 'Sanitization included']
  },
  {
    id: 'carpet',
    title: 'Carpet Cleaning',
    description: 'Professional carpet cleaning using advanced extraction methods. Restore your carpets to their original beauty and extend their lifespan.',
    image: '/images/dsc6346copy1.jpeg',
    alt: 'Carpet cleaning services Johannesburg - professional deep cleaning',
    icon: Grip,
    benefits: ['Deep extraction cleaning', 'Fast drying', 'Stain & odor removal', 'Carpet protection treatment']
  }
]

const industries = [
  { name: 'Residential', icon: Home, description: 'Homes & Apartments' },
  { name: 'Hotels', icon: Building2, description: 'Hotels & Lodges' },
  { name: 'Offices', icon: Briefcase, description: 'Corporate Offices' },
  { name: 'Restaurants', icon: UtensilsCrossed, description: 'Food & Beverage' },
  { name: 'Healthcare', icon: Cross, description: 'Medical Facilities' },
  { name: 'Retail', icon: Store, description: 'Shops & Showrooms' }
]

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Curtain Cleaning Johannesburg & Professional Cleaning Services
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Expert curtain cleaning Johannesburg services for homes and businesses. We specialize in on-site curtain cleaning, upholstery cleaning, mattress cleaning, and carpet cleaning across all Johannesburg suburbs with professional equipment and guaranteed results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service) => {
            const ServiceIcon = service.icon
            return (
              <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-border group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground p-3 rounded-full">
                    <ServiceIcon className="h-6 w-6" />
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ServiceIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>

                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant="ghost" className="w-full group/btn text-primary hover:text-primary hover:bg-primary/10">
                    <a href="#contact" className="flex items-center justify-center gap-2">
                      Get Quote for {service.title}
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Industries Section */}
        <div className="mt-20 bg-secondary/50 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-foreground mb-6 text-center text-balance">Industries We Serve</h3>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Professional cleaning solutions tailored to your industry needs across Johannesburg
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry) => {
              const IndustryIcon = industry.icon
              return (
                <div key={industry.name} className="bg-card rounded-lg p-6 border border-border hover:border-primary hover:shadow-lg transition-all group">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="p-3 bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground rounded-full transition-colors">
                      <IndustryIcon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{industry.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{industry.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
