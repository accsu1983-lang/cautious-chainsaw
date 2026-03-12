import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import Link from 'next/link'

const testimonials = [
  {
    name: 'Sarah Thompson',
    location: 'Sandton',
    rating: 5,
    service: 'Curtain Cleaning',
    text: 'Absolutely thrilled with the service! My curtains look brand new and they cleaned them right on the spot. No hassle with taking them down. Highly recommend On The Spot!',
    date: 'January 2026'
  },
  {
    name: 'Michael van der Berg',
    location: 'Rosebank',
    rating: 5,
    service: 'Upholstery Cleaning',
    text: 'Professional service from start to finish. Kathy and her team did an amazing job on our office furniture. The stains we thought were permanent are completely gone!',
    date: 'December 2025'
  },
  {
    name: 'Priya Naidoo',
    location: 'Fourways',
    rating: 5,
    service: 'Mattress Cleaning',
    text: 'My son has allergies and the mattress cleaning service has made such a difference. Quick, efficient, and the team was so friendly. Will definitely use them again.',
    date: 'January 2026'
  },
  {
    name: 'David Johnson',
    location: 'Randburg',
    rating: 5,
    service: 'Carpet Cleaning',
    text: 'Our carpets were in desperate need of cleaning and On The Spot delivered exceptional results. Fair pricing, punctual, and very professional. Five stars!',
    date: 'November 2025'
  },
  {
    name: 'Linda Mbatha',
    location: 'Midrand',
    rating: 5,
    service: 'Complete Home Cleaning',
    text: 'Had them clean all our curtains, upholstery, and carpets. The transformation is incredible! Great value for money and the no-shrinkage guarantee gave me peace of mind.',
    date: 'December 2025'
  },
  {
    name: 'James Peters',
    location: 'Centurion',
    rating: 5,
    service: 'Office Cleaning',
    text: 'We use On The Spot for our corporate office quarterly cleaning. Always reliable, thorough, and minimal disruption to our work. Highly professional service.',
    date: 'January 2026'
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Don&apos;t just take our word for it. See what our satisfied customers across Johannesburg have to say about our <Link href="#services" className="text-primary font-medium hover:underline">cleaning services</Link>.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg relative">
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-12 w-12 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Service Badge */}
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {testimonial.service}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed text-sm relative z-10">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-border">
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    <Link href="#areas" className="hover:text-primary transition-colors">{testimonial.location}</Link> · {testimonial.date}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-secondary/50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
            Ready to Experience Our Exceptional Service?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
            Join hundreds of satisfied customers across Johannesburg. Get your free quote today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Get Free Quote
            </a>
            <a
              href="tel:+27750119200"
              className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary/10 font-medium px-8 py-3 rounded-lg transition-colors bg-transparent"
            >
              Call 075 011 9200
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
